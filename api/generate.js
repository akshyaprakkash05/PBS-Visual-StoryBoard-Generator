// Serverless function (Vercel / Netlify-compatible) that turns person +
// activity profile into a PBS-aligned storyboard using a real LLM.
//
// Prefers Anthropic (Claude) if ANTHROPIC_API_KEY is set, otherwise OpenAI.
// The frontend at /src/lib/aiClient.js POSTs JSON here and expects:
//   { steps: [{ title, emotion, imagePrompt, pbsTip, carerGuidance }, ...] }

const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

const SYSTEM_PROMPT = `You are a Positive Behaviour Support (PBS) practitioner who designs
visual storyboards for autistic adults and adults with learning disabilities.

Follow PBS principles in every step:
- Use calm, predictable, supportive language.
- Reduce anxiety; never threaten, shame, or use compliance-based wording.
- Promote independence and choice — name what the person *can* do.
- Match the reading level provided. Keep step titles short (2–5 plain words).
- Acknowledge sensory sensitivities and triggers.
- Filter or rewrite anything the carer asked to avoid.
- End on a calm, motivating reward connected to the person's interests.

Return STRICT JSON only — no prose, no markdown fences. Schema:

{
  "steps": [
    {
      "title": "Short instruction (2-5 words)",
      "emotion": "calm" | "transition" | "active" | "reward",
      "imagePrompt": "Image-generation prompt for a calm flat pictogram visual",
      "pbsTip": "One sentence of PBS support guidance for staff",
      "carerGuidance": "One short practical sentence for the person on shift"
    }
  ]
}

Rules:
- "steps" length must equal the requested number (between 5 and 7).
- First step emotion = "calm". Last step emotion = "reward".
- imagePrompt always begins with "Calm flat illustration of " and ends with
  ", easy-read pictogram style, soft pastel background".
- Never include the avoided words in titles or image prompts.
`;

function buildUserPrompt(person, activity) {
  const numSteps = Math.max(5, Math.min(7, Number(activity?.numSteps) || 6));
  return `Create a ${numSteps}-step visual storyboard.

PERSON
- First name: ${person.firstName || "(not given)"}
- Age: ${person.age || "(not given)"}
- Pronouns: ${person.pronouns || "(not given)"}
- Diagnosis: ${person.diagnosis || "(not given)"}
- Communication style: ${person.commStyle || "(not given)"}
- Reading level: ${person.readingLevel || "Short sentences"}
- Sensory sensitivities: ${(person.sensitivities || []).join(", ") || "(none listed)"}
- What helps them feel safe: ${(person.regulators || []).join(", ") || "(none listed)"}
- Interests / motivators: ${(person.motivators || []).join(", ") || "(none listed)"}
- Other notes: ${person.notes || "(none)"}

ACTIVITY
- Name: ${activity.customName || activity.activityName || "(not given)"}
- Where: ${activity.location || "(not given)"}
- When: ${activity.when || "(not given)"}
- Support level: ${activity.supportLevel || "(not given)"}
- Tone of voice: ${activity.tone || "Warm & reassuring"}
- Things to highlight: ${(activity.highlights || []).join(", ") || "(none)"}
- Things to avoid or be careful with: ${activity.avoid || "(none)"}

Generate exactly ${numSteps} steps. Reply with JSON only.`;
}

function extractJson(text) {
  if (!text) return null;
  let t = text.trim();
  // Strip markdown fences if present
  if (t.startsWith("```")) {
    t = t.replace(/^```(?:json)?\s*/i, "").replace(/```$/i, "").trim();
  }
  // Fast path
  try { return JSON.parse(t); } catch { /* fall through */ }
  // Find first {...} block
  const m = t.match(/\{[\s\S]*\}/);
  if (m) {
    try { return JSON.parse(m[0]); } catch { /* fall through */ }
  }
  return null;
}

async function callAnthropic(person, activity) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserPrompt(person, activity) }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Anthropic ${res.status}: ${body}`);
  }
  const data = await res.json();
  const text = data?.content?.[0]?.text || "";
  return extractJson(text);
}

async function callOpenAI(person, activity) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(person, activity) },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI ${res.status}: ${body}`);
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content || "";
  return extractJson(text);
}

async function readJsonBody(req) {
  // Vercel-style: body may already be parsed.
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch { /* */ }
  }
  // Node stream fallback
  return await new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    return res.end(JSON.stringify({ error: "Method not allowed" }));
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: "Invalid JSON body" }));
  }

  const person = body?.person || {};
  const activity = body?.activity || {};

  const hasAnthropic = !!process.env.ANTHROPIC_API_KEY;
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  if (!hasAnthropic && !hasOpenAI) {
    res.statusCode = 501;
    res.setHeader("content-type", "application/json");
    return res.end(JSON.stringify({
      error: "No AI provider configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY.",
    }));
  }

  try {
    let parsed = null;
    if (hasAnthropic) parsed = await callAnthropic(person, activity);
    if (!parsed && hasOpenAI) parsed = await callOpenAI(person, activity);

    if (!parsed || !Array.isArray(parsed.steps)) {
      res.statusCode = 502;
      res.setHeader("content-type", "application/json");
      return res.end(JSON.stringify({ error: "AI returned malformed response." }));
    }

    res.statusCode = 200;
    res.setHeader("content-type", "application/json");
    return res.end(JSON.stringify({ steps: parsed.steps }));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    return res.end(JSON.stringify({ error: String(err?.message || err) }));
  }
}
