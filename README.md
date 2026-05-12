# PBS Visual Storyboard Generator

A production-ready web app that generates **Positive Behaviour Support (PBS)**
visual storyboards for autistic adults and adults with learning disabilities.
Care teams enter a person's profile and the activity, and the app produces a
calm, predictable, 5–7 step storyboard with PBS-aligned language, image
prompts, carer guidance, and a print-ready A4 PDF.

> Built for residential care, supported living and day-service settings.
> Designed with safeguarding and accessibility as first-class concerns.

---

## Features

- **Dashboard** with caseload, recent storyboards, and quick-start actions.
- **3-step generator wizard** — Person → Activity → Review.
- **Real AI generation** via the **Claude API** (Anthropic) or **OpenAI API**,
  with a deterministic local template-based fallback when no key is configured
  or the API is unavailable.
- PBS-aligned outputs: short calm instructions (2–5 words), image-generation
  prompts, PBS support tips, carer guidance, emotion tagging
  (calm / transition / active / reward).
- **Anxiety-reduction** safeguards: trigger words listed in "Things to avoid"
  are filtered, reading level adapts caption length, motivators frame the
  ending of the story.
- **Storyboard review** with grid / strip / A4 print layouts and per-step
  editing in a side drawer.
- **Export**: A4 PDF download (jsPDF + html2canvas), browser print, JSON
  download for the person's care record, shareable link copy.
- **Accessibility**: keyboard-friendly, screen-reader labels, high-contrast
  mode, large/extra-large text, 4 brand palettes, persisted in localStorage.
- **Responsive**: desktop, tablet, and mobile with a collapsible sidebar.

---

## Tech stack

| Layer       | Choice                                    |
|-------------|-------------------------------------------|
| Frontend    | React 18 + Vite                           |
| Styling     | Hand-rolled CSS variables / utility-light |
| AI provider | Anthropic Claude (Sonnet 4.5) or OpenAI   |
| PDF export  | jsPDF + html2canvas                       |
| Deploy      | Vercel or Netlify (both configured)       |

---

## Getting started

```bash
# 1. Install
npm install

# 2. Configure (optional but recommended for AI)
cp .env.example .env
# then edit .env and add your ANTHROPIC_API_KEY (preferred) or OPENAI_API_KEY

# 3. Run in development
npm run dev          # http://localhost:5173

# 4. Build for production
npm run build

# 5. Preview the production build locally
npm run preview
```

> Without an API key the app still runs — it falls back to a curated, deterministic
> template-based generator so demos and offline use remain useful.

---

## Project structure

```
.
├── api/
│   └── generate.js              # Serverless function (Vercel / Netlify) — Claude/OpenAI
├── netlify/
│   └── functions/generate.js    # Netlify wrapper that calls into /api/generate.js
├── src/
│   ├── components/              # Reusable UI primitives (Icons, Sidebar, Topbar, …)
│   ├── screens/                 # Dashboard, ProfileForm, ActivityForm, …, ExportScreen
│   ├── lib/
│   │   ├── aiClient.js          # POSTs to /api/generate
│   │   ├── generateSteps.js     # Local template fallback
│   │   ├── pdfExport.js         # jsPDF + html2canvas
│   │   └── constants.js         # Defaults, palettes, presets
│   ├── App.jsx                  # Routes + state orchestration
│   ├── main.jsx                 # Vite entry
│   └── styles.css               # All CSS in one file (with print + responsive)
├── index.html
├── vite.config.js
├── vercel.json                  # Vercel deployment config
├── netlify.toml                 # Netlify deployment config
└── .env.example                 # Required environment variables
```

---

## AI integration

Generation happens **server-side** in `/api/generate.js`. The browser never
sees the API key. The function:

1. Builds a strict system prompt enforcing PBS principles (calm language,
   independence, choice, sensory-aware, trigger filtering).
2. Sends person + activity fields to Claude (preferred) or OpenAI.
3. Parses strict JSON output `{ steps: [{ title, emotion, imagePrompt, pbsTip, carerGuidance }, …] }`.
4. Returns it to the client, where `src/lib/aiClient.js` normalises and
   numbers the steps for display.

If both `ANTHROPIC_API_KEY` and `OPENAI_API_KEY` are set, **Anthropic is
preferred**. Override the model with `ANTHROPIC_MODEL` / `OPENAI_MODEL`.

### Environment variables

| Variable             | Required | Default                | Notes                                |
|----------------------|----------|------------------------|--------------------------------------|
| `ANTHROPIC_API_KEY`  | optional | —                      | Recommended; uses Claude             |
| `ANTHROPIC_MODEL`    | optional | `claude-sonnet-4-5`    | Any Anthropic chat model             |
| `OPENAI_API_KEY`     | optional | —                      | Used if Anthropic key is absent      |
| `OPENAI_MODEL`       | optional | `gpt-4o-mini`          | Any OpenAI chat model                |

> Set these in **Vercel Project Settings → Environment Variables** or
> **Netlify Site Configuration → Environment Variables**. Do **not** commit
> a real `.env` file.

---

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub.
2. Import the project at <https://vercel.com/new>.
3. Add `ANTHROPIC_API_KEY` (or `OPENAI_API_KEY`) under
   **Project → Settings → Environment Variables**.
4. Click **Deploy**. The Vite app builds to `dist/` and `/api/generate` is
   automatically deployed as a serverless function.

### Netlify

1. Push to GitHub and connect the repo at <https://app.netlify.com/start>.
2. Build command `npm run build`, publish directory `dist` (auto-detected from
   `netlify.toml`).
3. Set the env vars in **Site settings → Environment variables**.
4. Deploy. `/api/generate` is rewritten to `/.netlify/functions/generate`,
   which wraps the same handler used on Vercel.

### Static / GitHub Pages

The frontend builds as a pure static SPA — you can host `dist/` anywhere. The
AI endpoint requires a serverless runtime (Vercel / Netlify / Cloudflare
Workers). Without it, the app gracefully falls back to local template
generation.

---

## Safeguarding & data

- **No client data leaves the browser** except the person + activity profile
  posted to your own serverless function for AI generation.
- Storyboards are stored client-side only (downloaded as PDF/JSON); there is
  no built-in cloud database.
- Always review generated storyboards against the person's current PBS plan
  before use — the in-app safeguarding banner appears on every relevant
  screen and on every printed page.

---

## License

MIT — see [LICENSE](./LICENSE) if/when added by the deployer. This codebase
ships as a starter for care-tech teams; please adapt it to your organisation's
clinical governance, data-protection and accessibility standards before
production use.
