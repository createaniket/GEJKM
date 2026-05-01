// Mock AI triage engine — mirrors the Phase-1 spec section 3.
// Rules-based heuristics that classify a citizen report into:
//   - priority (P1 critical → P4 informational)
//   - SLA hours
//   - primary department (from category) + secondary routing
//   - automated first response
import { findCategory, type Department } from "@/data/categories";

export type Priority = "P1" | "P2" | "P3" | "P4";

export interface TriageResult {
  priority: Priority;
  slaHours: number;
  department: Department;
  secondaryDepartments: Department[];
  reason: string;
  firstResponse: string;
}

const P1_KEYWORDS = [
  "fire", "आग", "આગ",
  "gas leak", "गैस", "ગેસ",
  "collapse", "गिर", "તૂટ",
  "child at risk", "बच्चा", "બાળક",
  "contaminat", "दूषित", "દૂષિત",
  "unconscious", "बेहोश", "બેહોશ",
  "blood", "खून", "લોહી",
  "emergency", "आपातकाल", "કટોકટી",
];
const P2_KEYWORDS = [
  "overflow", "बहाव", "ઊભરાવી",
  "no power", "no water", "outage", "बंद", "બંધ",
  "large pothole", "बड़ा गड्ढा", "મોટો ખાડો",
  "missing manhole", "मैनहोल", "મેનહોલ",
  "assault", "हमला", "હુમલો",
  "spark", "स्पार्क", "સ્પાર્ક",
  "hanging wire", "लटकते तार", "લટકતા તાર",
];
const P4_KEYWORDS = [
  "schedule", "timetable", "बस समय", "બસ સમય",
  "admission", "प्रवेश", "પ્રવેશ",
  "eligibility", "पात्रता", "પાત્રતા",
  "renewal", "नवीनीकरण", "નવીનીકરણ",
  "how to", "कैसे", "કેવી રીતે",
  "when is", "कब", "ક્યારે",
];

const P1_CATEGORIES = new Set(["safety"]);
const P2_CATEGORIES = new Set(["crime", "drainage", "electricity", "water"]);
const P4_CATEGORIES = new Set(["welfare", "education", "business"]);

const SECONDARY_ROUTING: Array<{
  match: (catId: string, text: string) => boolean;
  add: Department[];
}> = [
  { match: (c, t) => c === "water" && /contaminat|दूषित|દૂષિત/i.test(t), add: ["Health Office"] },
  { match: (c, t) => c === "crime" && /domestic|घरेलू|ઘરેલું/i.test(t), add: ["Social Welfare"] },
  { match: (c, t) => c === "safety" && /child|बच्चा|બાળક/i.test(t), add: ["Police", "Social Welfare"] },
  { match: (c) => c === "drainage", add: ["Roads & Transport"] },
  { match: (c, t) => c === "buildings" && /school|स्कूल|શાળા/i.test(t), add: ["Education"] },
  { match: (c, t) => c === "crime" && /alcohol|शराब|દારૂ/i.test(t), add: ["Disaster & Environment"] },
  { match: (c, t) => c === "health" && /mental|मानसिक|માનસિક/i.test(t), add: ["Social Welfare"] },
];

const slaForPriority = (p: Priority): number => ({ P1: 0, P2: 4, P3: 48, P4: 0 }[p]);

export function triage(categoryId: string, description: string): TriageResult {
  const cat = findCategory(categoryId);
  const dept: Department = cat?.department ?? "Governance / RTI";
  const text = description.toLowerCase();

  let priority: Priority = "P3";
  let reason = "Routine maintenance request — added to queue.";

  if (P1_CATEGORIES.has(categoryId) || P1_KEYWORDS.some((k) => text.includes(k))) {
    priority = "P1";
    reason = "Critical — possible threat to life or safety.";
  } else if (P2_CATEGORIES.has(categoryId) || P2_KEYWORDS.some((k) => text.includes(k))) {
    priority = "P2";
    reason = "Urgent — service disruption or significant hazard.";
  } else if (P4_CATEGORIES.has(categoryId) && P4_KEYWORDS.some((k) => text.includes(k))) {
    priority = "P4";
    reason = "Informational query — answered instantly by AI.";
  }

  const secondary = Array.from(
    new Set(
      SECONDARY_ROUTING
        .filter((r) => r.match(categoryId, text))
        .flatMap((r) => r.add)
        .filter((d) => d !== dept),
    ),
  );

  const firstResponse = ({
    P1: "Emergency services alerted. A senior officer is being dispatched. Please call 112 immediately if anyone is in danger.",
    P2: "Officer assigned. You will receive an update within 4 hours.",
    P3: "Ticket received. The maintenance team will respond within 24–72 hours.",
    P4: "Here is the answer to your question — auto-resolved by AI.",
  } as const)[priority];

  return { priority, slaHours: slaForPriority(priority), department: dept, secondaryDepartments: secondary, reason, firstResponse };
}

export const priorityMeta: Record<Priority, { label: string; classes: string; description: string }> = {
  P1: { label: "P1 · Critical",      classes: "bg-destructive text-destructive-foreground", description: "Immediate" },
  P2: { label: "P2 · Urgent",        classes: "bg-accent text-accent-foreground",           description: "2–4 hours" },
  P3: { label: "P3 · Routine",       classes: "bg-primary text-primary-foreground",         description: "24–72 hours" },
  P4: { label: "P4 · Informational", classes: "bg-success text-success-foreground",         description: "Instant (AI)" },
};
