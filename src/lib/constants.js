export const PALETTES = {
  sage:   { sage: "#3D7C8E", deep: "#2E6273", soft: "#E6EFF2" },
  ocean:  { sage: "#2F6FA8", deep: "#23568A", soft: "#E2EBF4" },
  lilac:  { sage: "#7A6FA8", deep: "#5E5396", soft: "#ECE9F4" },
  forest: { sage: "#4F7A60", deep: "#3D604B", soft: "#E5EEE7" },
};

export const DEFAULT_PERSON = {
  firstName: "Aaron",
  lastInitial: "T.",
  age: "27",
  pronouns: "he / him",
  diagnosis: "Autism · learning disability",
  commStyle: "Verbal — short phrases",
  readingLevel: "Short sentences",
  sensitivities: ["Loud noise", "Bright lights", "Unexpected touch"],
  regulators: ["Ear defenders", "Familiar staff", "Visual timer"],
  motivators: ["Music", "Café visits"],
  notes:
    "Aaron may pace and tap his chest when overwhelmed. Offering his headphones and stepping outside usually helps.",
};

export const DEFAULT_ACTIVITY = {
  activityName: "Going to the dentist",
  customName: "Going to the dentist",
  location: "Bridgewater Dental Surgery, Reading",
  when: "Tomorrow at 10:30",
  numSteps: 6,
  supportLevel: "1:1 throughout",
  tone: "Warm & reassuring",
  highlights: [
    "What might feel new or different",
    "When breaks are available",
    "What happens after",
  ],
  avoid:
    "Don't mention the dentist drill until it's needed. Avoid the word 'injection'.",
};

export const RECENT = [
  { initials: "AT", colour: "#3D7C8E", activity: "Going to the dentist",     person: "Aaron T.",  steps: 6, ago: "Yesterday",   tag: "Saved",  tagClass: "sage" },
  { initials: "PK", colour: "#7A6FA8", activity: "Visiting Westfield café",  person: "Priya K.",  steps: 5, ago: "2 days ago",  tag: "Draft",  tagClass: "clay" },
  { initials: "MO", colour: "#B36A4F", activity: "Haircut appointment",     person: "Marcus O.", steps: 7, ago: "Last week",   tag: "Shared", tagClass: "lilac" },
  { initials: "LB", colour: "#C99343", activity: "Day service Wednesday trip", person: "Lara B.", steps: 6, ago: "Last week", tag: "Saved", tagClass: "sun" },
];

export const PBS_TIPS_BY_EMOTION = {
  calm: "Begin with a familiar object to anchor the routine.",
  transition: "Name what's next before moving on — predictability lowers anxiety.",
  active: "Offer a meaningful choice within the step to promote autonomy.",
  reward: "Celebrate effort, not only outcome.",
};

export const EMOTION_META = {
  calm:       { label: "Calm start",  icon: "Heart", colour: "var(--sage)" },
  transition: { label: "Transition",  icon: "Arrow", colour: "var(--lilac)" },
  active:     { label: "Main step",   icon: "Check", colour: "var(--sage-deep)" },
  reward:     { label: "Well done",   icon: "Star",  colour: "var(--sun)" },
};

export const ACTIVITY_PRESETS = [
  { name: "Going to the dentist",  icon: "🦷" },
  { name: "Taking a shower",       icon: "🚿" },
  { name: "Riding the bus",        icon: "🚌" },
  { name: "Hospital appointment",  icon: "🏥" },
  { name: "Haircut",               icon: "💇" },
  { name: "Visiting the café",     icon: "☕" },
  { name: "Going to bed",          icon: "🌙" },
  { name: "Custom activity",       icon: "✨" },
];
