// Heuristic offline PBS step generator. Used as a fallback when the AI API is
// unavailable, so the app stays useful without configuration.

import { PBS_TIPS_BY_EMOTION } from "./constants.js";

const PACKS = {
  "Going to the dentist": [
    { title: "Pack your bag",         emotion: "calm",       imagePrompt: "Calm flat illustration of a small backpack with headphones and a water bottle, soft pastel teal background, no faces, simple line art, easy-read pictogram style", pbsTip: "Let the person help pack. Familiar items lower uncertainty.", carerGuidance: "Bring ear defenders and a comfort item." },
    { title: "Travel to the dentist", emotion: "transition", imagePrompt: "Calm flat illustration of a car driving on a quiet street, side view, soft pastel sky, simple line art, easy-read pictogram style", pbsTip: "Say the journey time aloud. Use a visual timer if available.", carerGuidance: "Have headphones ready in the car." },
    { title: "Walk into reception",   emotion: "transition", imagePrompt: "Calm flat illustration of a welcoming dental reception with a smiling receptionist, soft warm lighting, easy-read pictogram style, no clinical imagery", pbsTip: "Point out something familiar in the room first.", carerGuidance: "Stay one step ahead — open doors before they reach them." },
    { title: "Sit in the chair",      emotion: "active",     imagePrompt: "Calm flat illustration of a comfortable dental chair from the side, soft mint green colour, pillow on the seat, easy-read pictogram style, no instruments visible", pbsTip: "Offer the choice of holding a fidget object.", carerGuidance: "Sit in the line of sight. Use a calm, steady voice." },
    { title: "Open mouth gently",     emotion: "active",     imagePrompt: "Calm flat illustration of a friendly face with mouth slightly open, soft round shapes, easy-read pictogram style", pbsTip: "Agree a stop signal before starting — raised hand works well.", carerGuidance: "Praise small effort: 'You opened. Well done.'" },
    { title: "Choose a sticker",      emotion: "reward",     imagePrompt: "Calm flat illustration of a sheet of cheerful round stickers (stars, smiley face, hearts), soft pastel background, easy-read pictogram style", pbsTip: "Real choice strengthens cooperation next time.", carerGuidance: "Let the person pick — even if it takes a moment." },
    { title: "Time for music",        emotion: "reward",     imagePrompt: "Calm flat illustration of headphones and musical notes, soft pastel background, easy-read pictogram style", pbsTip: "Link the reward to the activity, not to compliance.", carerGuidance: "Have a preferred playlist ready in the car for the journey home." },
  ],
  "Taking a shower": [
    { title: "Choose clean clothes",  emotion: "calm",       imagePrompt: "Calm flat illustration of two folded outfits on a bed, soft pastel bedroom, easy-read pictogram style", pbsTip: "Offer two options to invite a clear choice.", carerGuidance: "Lay out a towel nearby before starting." },
    { title: "Turn on warm water",    emotion: "transition", imagePrompt: "Calm flat illustration of a shower head with gentle water drops, soft blue tiles, easy-read pictogram style", pbsTip: "Test temperature together. Predictable sensation reduces shock.", carerGuidance: "Set water to the person's preferred warmth." },
    { title: "Step in slowly",        emotion: "transition", imagePrompt: "Calm flat illustration of a non-slip bath mat at the entrance to a shower cubicle, soft pastel bathroom, easy-read pictogram style", pbsTip: "Allow time. Rushing transitions raises anxiety.", carerGuidance: "Stay nearby but give space if preferred." },
    { title: "Wash with soap",        emotion: "active",     imagePrompt: "Calm flat illustration of a bar of soap and a soft sponge on a shelf, soft pastel green, easy-read pictogram style", pbsTip: "Use the same order each time — predictability supports independence.", carerGuidance: "Verbal prompts only if needed. Step back when you can." },
    { title: "Dry with towel",        emotion: "active",     imagePrompt: "Calm flat illustration of a folded fluffy towel in soft cream colour, easy-read pictogram style", pbsTip: "Texture-friendly towels avoid sensory overwhelm.", carerGuidance: "Have a soft, warm towel ready." },
    { title: "Get dressed",           emotion: "active",     imagePrompt: "Calm flat illustration of a folded t-shirt and trousers laid out, soft pastel bedroom, easy-read pictogram style", pbsTip: "Praise independence: 'You did that step yourself.'", carerGuidance: "Only help with the parts the person asks for." },
    { title: "All finished",          emotion: "reward",     imagePrompt: "Calm flat illustration of a green tick inside a soft rounded circle, easy-read pictogram style", pbsTip: "End with a clear, calm 'finished' signal each time.", carerGuidance: "Suggest a relaxing next activity, on their terms." },
  ],
  "Riding the bus": [
    { title: "Walk to bus stop",      emotion: "calm",       imagePrompt: "Calm flat illustration of two people walking on a quiet pavement towards a bus stop, soft sunny day, easy-read pictogram style", pbsTip: "Walk on the side that feels safer for the person.", carerGuidance: "Keep a steady pace. Avoid hurrying." },
    { title: "Wait at the stop",      emotion: "transition", imagePrompt: "Calm flat illustration of a simple red and white bus stop sign with a small bench, soft sky background, easy-read pictogram style", pbsTip: "Use a visual timer so waiting feels predictable.", carerGuidance: "Have a fidget item ready for the wait." },
    { title: "Show the bus pass",     emotion: "active",     imagePrompt: "Calm flat illustration of a hand holding a blue bus travel card, easy-read pictogram style, soft pastel background", pbsTip: "Rehearse the action gently the day before.", carerGuidance: "Have the pass within easy reach in advance." },
    { title: "Find a quiet seat",     emotion: "active",     imagePrompt: "Calm flat illustration of a single empty bus seat by a window, soft blue bus interior, easy-read pictogram style", pbsTip: "Sit where exit is in view — choice reduces overwhelm.", carerGuidance: "Choose a seat away from the engine if possible." },
    { title: "Press the red bell",    emotion: "active",     imagePrompt: "Calm flat illustration of a clear red 'stop' bell button on a yellow pole, easy-read pictogram style, soft background", pbsTip: "Show the bell first, then offer the press.", carerGuidance: "Point to the landmark one stop before yours." },
    { title: "Step off safely",       emotion: "transition", imagePrompt: "Calm flat illustration of open bus doors with a wide step, soft daylight, easy-read pictogram style", pbsTip: "Wait for full stop. Predictable timing is safer.", carerGuidance: "Hold the rail. Step down first if needed." },
    { title: "Time for the café",     emotion: "reward",     imagePrompt: "Calm flat illustration of a cup of tea on a saucer, soft pastel background, easy-read pictogram style", pbsTip: "Connect travel to a preferred outcome to build confidence.", carerGuidance: "Plan a preferred activity right after arrival." },
  ],
  "Hospital appointment": [
    { title: "Bring your bag",        emotion: "calm",       imagePrompt: "Calm flat illustration of a small bag with a letter and water bottle, easy-read pictogram style, soft pastel background", pbsTip: "Familiar items help anchor an unfamiliar place.", carerGuidance: "Pack the night before with the person." },
    { title: "Walk inside",           emotion: "transition", imagePrompt: "Calm flat illustration of welcoming hospital sliding doors, soft daylight, easy-read pictogram style", pbsTip: "Name the building aloud before going in.", carerGuidance: "Walk in slightly ahead so they can follow." },
    { title: "Tell your name",        emotion: "active",     imagePrompt: "Calm flat illustration of a friendly reception desk with a small name card, easy-read pictogram style", pbsTip: "Practise the sentence on the way: 'My name is …'", carerGuidance: "Stand close. Speak only if invited to help." },
    { title: "Sit and wait",          emotion: "transition", imagePrompt: "Calm flat illustration of a soft waiting room chair with a book on the arm, easy-read pictogram style, soft pastel walls", pbsTip: "Offer a preferred activity to make waiting bearable.", carerGuidance: "Bring headphones, snacks, fidget item." },
    { title: "Meet the doctor",       emotion: "active",     imagePrompt: "Calm flat illustration of a doctor figure with a kind smile and a name badge, soft pastel green clothing, easy-read pictogram style", pbsTip: "Introduce by first name to reduce status anxiety.", carerGuidance: "Ask the doctor to face the person and speak slowly." },
    { title: "Answer questions",      emotion: "active",     imagePrompt: "Calm flat illustration of a speech bubble with a question mark inside, easy-read pictogram style, soft pastel background", pbsTip: "Agree a 'pause' signal in advance.", carerGuidance: "Translate questions into shorter phrases if helpful." },
    { title: "Time to go home",       emotion: "reward",     imagePrompt: "Calm flat illustration of a small house with a warm yellow window, easy-read pictogram style, soft pastel evening sky", pbsTip: "End on a familiar, safe destination.", carerGuidance: "Plan something calming at home as a wind-down." },
  ],
  "Haircut": [
    { title: "Choose your style",     emotion: "calm",       imagePrompt: "Calm flat illustration of two simple haircut options on cards, easy-read pictogram style, soft pastel background", pbsTip: "Visual choice gives control before the cut starts.", carerGuidance: "Show the same two cards each visit." },
    { title: "Walk to the salon",     emotion: "transition", imagePrompt: "Calm flat illustration of a friendly local hair salon shopfront with green awning, easy-read pictogram style", pbsTip: "Walk past first if the person needs to preview the space.", carerGuidance: "Book a quiet time. Avoid busy weekends." },
    { title: "Sit in the chair",      emotion: "active",     imagePrompt: "Calm flat illustration of a comfortable hairdresser chair with a soft cape, easy-read pictogram style", pbsTip: "Let the cape be tried on calmly before starting.", carerGuidance: "Stay in their line of sight throughout." },
    { title: "Hair gets cut",         emotion: "active",     imagePrompt: "Calm flat illustration of comb and small scissors on a clean shelf, easy-read pictogram style, soft pastel background", pbsTip: "Agree a 'stop' hand signal with the hairdresser.", carerGuidance: "Use a calm running commentary if it helps." },
    { title: "Look in the mirror",    emotion: "reward",     imagePrompt: "Calm flat illustration of a round mirror in a soft frame, easy-read pictogram style, soft pastel background", pbsTip: "Celebrate the new look in their own words.", carerGuidance: "Offer a chosen photo if mirrors are uncomfortable." },
    { title: "Time for café",         emotion: "reward",     imagePrompt: "Calm flat illustration of a cup of tea and a small cake, easy-read pictogram style, soft pastel background", pbsTip: "Pair haircut with a preferred follow-up next time.", carerGuidance: "Go somewhere familiar straight after." },
  ],
  "Visiting the café": [
    { title: "Walk to the café",      emotion: "calm",       imagePrompt: "Calm flat illustration of a friendly café shopfront with hanging plants, easy-read pictogram style, soft pastel daylight", pbsTip: "Choose a café the person already knows where possible.", carerGuidance: "Aim for a quiet time of day." },
    { title: "Choose your drink",     emotion: "active",     imagePrompt: "Calm flat illustration of a paper menu with three simple drink pictures, easy-read pictogram style, soft pastel background", pbsTip: "Two or three options is enough — too many overwhelms.", carerGuidance: "Have a familiar default ready as a back-up." },
    { title: "Order at the counter",  emotion: "active",     imagePrompt: "Calm flat illustration of a café counter with a small bell, easy-read pictogram style, no faces, soft pastel background", pbsTip: "Practise the phrase on the way: 'A tea please.'", carerGuidance: "Stand alongside, not in front." },
    { title: "Find a quiet table",    emotion: "transition", imagePrompt: "Calm flat illustration of a small round café table with two chairs by a window, easy-read pictogram style, soft pastel light", pbsTip: "A corner seat with a wall behind feels safer.", carerGuidance: "Scan for the quietest corner before ordering." },
    { title: "Enjoy your drink",      emotion: "reward",     imagePrompt: "Calm flat illustration of a steaming cup of tea on a small saucer, easy-read pictogram style, soft pastel background", pbsTip: "Slow the moment down. Notice and name it together.", carerGuidance: "No timer. Let the pace be theirs." },
    { title: "Time to go home",       emotion: "reward",     imagePrompt: "Calm flat illustration of a small house with a warm window, easy-read pictogram style, soft pastel sky", pbsTip: "End at a calm time, before tiredness builds.", carerGuidance: "Signal 'last sip' five minutes before leaving." },
  ],
  "Going to bed": [
    { title: "Put on pyjamas",        emotion: "calm",       imagePrompt: "Calm flat illustration of folded soft pyjamas on a bed, easy-read pictogram style, soft pastel bedroom", pbsTip: "Same pyjamas, same drawer — routine builds calm.", carerGuidance: "Dim lights one room ahead." },
    { title: "Brush your teeth",      emotion: "active",     imagePrompt: "Calm flat illustration of a toothbrush and toothpaste tube side by side, easy-read pictogram style", pbsTip: "Use a sand timer for a clear, visible end.", carerGuidance: "Stay nearby; only prompt if asked." },
    { title: "Choose a book",         emotion: "active",     imagePrompt: "Calm flat illustration of two books on a shelf, easy-read pictogram style, soft pastel background", pbsTip: "Two books, not ten — small choice, low pressure.", carerGuidance: "Pre-select two known favourites." },
    { title: "Get into bed",          emotion: "transition", imagePrompt: "Calm flat illustration of a neatly made bed with a soft cushion, easy-read pictogram style, warm pastel light", pbsTip: "Weighted blanket if it's part of their plan.", carerGuidance: "Open curtains in the morning at the same time." },
    { title: "Lights down low",       emotion: "transition", imagePrompt: "Calm flat illustration of a small bedside lamp glowing softly, easy-read pictogram style, soft pastel night background", pbsTip: "Dim is gentler than off — and predictable.", carerGuidance: "Keep voice quiet and low from now on." },
    { title: "Time to rest",          emotion: "reward",     imagePrompt: "Calm flat illustration of a crescent moon and one small star, easy-read pictogram style, soft pastel night sky", pbsTip: "Close with the same words each night.", carerGuidance: "Same goodnight phrase every time." },
  ],
};

export function generateSteps(person, activity) {
  const motivator = (person.motivators && person.motivators[0]) || "music";
  const motivatorLow = motivator.toLowerCase();

  const keyMatch = Object.keys(PACKS).find(
    (k) => k.toLowerCase() === String(activity.activityName || "").toLowerCase()
  );
  let base = keyMatch ? PACKS[keyMatch].map((s) => ({ ...s })) : null;

  if (!base) {
    base = [
      { title: "Get ready",       emotion: "calm",       imagePrompt: "Calm flat illustration of a small bag with a coat, easy-read pictogram style, soft pastel background", pbsTip: "Familiar items first. Predictability lowers anxiety.", carerGuidance: "Lay items out the night before." },
      { title: "Travel safely",   emotion: "transition", imagePrompt: "Calm flat illustration of a simple road with a parked car, easy-read pictogram style, soft pastel sky", pbsTip: "Name the journey time aloud.", carerGuidance: "Have headphones ready." },
      { title: "Arrive calmly",   emotion: "transition", imagePrompt: "Calm flat illustration of an open doorway with daylight, easy-read pictogram style, soft pastel walls", pbsTip: "Pause at the threshold. Let the person lead the entry.", carerGuidance: "Point out one familiar thing first." },
      { title: "Take your time",  emotion: "active",     imagePrompt: "Calm flat illustration of a small visual timer in soft green and yellow, easy-read pictogram style, soft pastel background", pbsTip: "Pace is theirs. Pauses are allowed.", carerGuidance: "Watch for early signs of overwhelm." },
      { title: "Almost finished", emotion: "active",     imagePrompt: "Calm flat illustration of a thumbs-up inside a soft rounded circle, easy-read pictogram style, soft pastel background", pbsTip: "Specific praise: name what they did.", carerGuidance: "Gentle voice, low and steady." },
      { title: "All done",        emotion: "reward",     imagePrompt: "Calm flat illustration of a green tick in a soft rounded circle, easy-read pictogram style, soft pastel background", pbsTip: "End with a clear, repeated 'finished' word.", carerGuidance: "Wait before introducing the next thing." },
      { title: `Time for ${motivatorLow}`, emotion: "reward", imagePrompt: `Calm flat illustration representing ${motivatorLow}, easy-read pictogram style, soft pastel background`, pbsTip: "Link effort to a preferred outcome.", carerGuidance: `Have ${motivatorLow} prepared and ready.` },
    ];
  }

  // Filter trigger words listed in activity.avoid
  const avoidList = String(activity.avoid || "")
    .split(/[\n,.;]/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length >= 3 && !/^(don't|do not|avoid|the|word|please)$/.test(s));
  const containsTrigger = (text) =>
    avoidList.some((w) => text && text.toLowerCase().includes(w));
  base = base.filter(
    (s) => !containsTrigger(s.title) && !containsTrigger(s.imagePrompt)
  );

  // Adapt instruction length to reading level
  const cap = {
    "Pictures only": 2,
    "1–3 word captions": 3,
    "Short sentences": 5,
    "Full sentences": 5,
  };
  const wordCap = cap[person.readingLevel] || 5;
  const trim = (t) => String(t).split(/\s+/).slice(0, wordCap).join(" ");
  base = base.map((s) => ({ ...s, title: trim(s.title) }));

  // Trim/pad to requested step count
  const n = Math.max(5, Math.min(7, Number(activity.numSteps) || 6));
  if (base.length > n) {
    const kept = [base[0]];
    const middleCount = n - 2;
    const middlePool = base.slice(1, -1);
    for (let i = 0; i < middleCount; i++) {
      const idx = Math.round(((i + 1) * middlePool.length) / (middleCount + 1)) - 1;
      kept.push(middlePool[Math.max(0, Math.min(middlePool.length - 1, idx))]);
    }
    kept.push(base[base.length - 1]);
    base = kept;
  } else if (base.length < n) {
    while (base.length < n) {
      base.push({
        title: trim("Pause and breathe"),
        emotion: "calm",
        imagePrompt: "Calm flat illustration of a soft cloud, easy-read pictogram style, soft pastel sky",
        pbsTip: "Build in regulation pauses inside long sequences.",
        carerGuidance: "Notice posture and breathing. Mirror calmly.",
      });
    }
  }

  return base.map((s, i, arr) => ({
    n: i + 1,
    title: s.title,
    emotion: s.emotion || "active",
    imagePrompt: s.imagePrompt || "Calm flat illustration, easy-read pictogram style",
    pbsTip: s.pbsTip || PBS_TIPS_BY_EMOTION[s.emotion || "active"],
    carerGuidance: s.carerGuidance || "",
    nextHint: i < arr.length - 1 ? arr[i + 1].title : "All finished",
    body: s.title,
    cue: s.imagePrompt,
  }));
}
