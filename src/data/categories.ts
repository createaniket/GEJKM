import {
  AlertTriangle, ShieldAlert, Building2, Construction, Droplets, Zap,
  Trash2, Stethoscope, MapPinned, HeartHandshake, GraduationCap,
  Briefcase, CloudRain, Scale, Bus,
} from "lucide-react";
import type { Tri } from "@/lib/translate";

export type Department =
  | "Emergency Services" | "Police" | "Buildings & Planning"
  | "Roads & Transport" | "Water Board" | "Electricity (DGVCL)"
  | "Drainage & Sanitation" | "Solid Waste" | "Health Office"
  | "Land & Revenue" | "Social Welfare" | "Education"
  | "Licences & Trade" | "Disaster & Environment" | "Governance / RTI";

export type CategoryTone = "danger" | "saffron" | "teal" | "river" | "leaf" | "violet";

export type Category = {
  id: string;
  label: Tri;
  description: Tri;
  department: Department;
  helpline: string;
  icon: typeof AlertTriangle;
  tone: CategoryTone;
  /** Minimum verification tier required to file in this category */
  minTier: "bronze" | "silver" | "gold";
  subcategories: Tri[];
};

export const categories: Category[] = [
  {
    id: "safety",
    label: { en: "Safety & Emergencies", hi: "Khatarnak hal / Emergency", gu: "સલામતી અને કટોકટી" },
    description: { en: "Fire, accident, gas leak, child at risk", hi: "Aag, accident, gas leak, bacha khatre mein", gu: "આગ, અકસ્માત, ગેસ લીક, બાળક જોખમમાં" },
    department: "Emergency Services", helpline: "112", icon: AlertTriangle, tone: "danger", minTier: "bronze",
    subcategories: [
      { en: "Fire", hi: "Aag", gu: "આગ" },
      { en: "Medical emergency", hi: "Medical emergency", gu: "તબીબી કટોકટી" },
      { en: "Gas leak", hi: "Gas leak", gu: "ગેસ લીક" },
      { en: "Building collapse", hi: "Imaarat girna", gu: "મકાન તૂટવું" },
      { en: "Child at risk", hi: "Bacha khatre mein", gu: "બાળક જોખમમાં" },
    ],
  },
  {
    id: "crime",
    label: { en: "Crime & Public Order", hi: "Chori / Maarpeet / Badmaashi", gu: "ગુનો અને કાયદો વ્યવસ્થા" },
    description: { en: "Theft, assault, harassment, illegal activity", hi: "Chori, ladai, harassment, galat kaam", gu: "ચોરી, હુમલો, હેરાનગતિ" },
    department: "Police", helpline: "100", icon: ShieldAlert, tone: "danger", minTier: "silver",
    subcategories: [
      { en: "Theft / robbery", hi: "Chori / dakaiti", gu: "ચોરી / લૂંટ" },
      { en: "Assault", hi: "Maarpeet", gu: "હુમલો" },
      { en: "Harassment", hi: "Harassment", gu: "હેરાનગતિ" },
      { en: "Domestic violence", hi: "Gharelu hinsa", gu: "ઘરેલું હિંસા" },
      { en: "Illegal alcohol", hi: "Avaidh sharab", gu: "ગેરકાયદે દારૂ" },
    ],
  },
  {
    id: "buildings",
    label: { en: "Buildings & Structures", hi: "Imaarat / Nirman ki samasya", gu: "મકાન અને બાંધકામ" },
    description: { en: "Unsafe building, illegal construction, planning", hi: "Kharaab imaarat, galat nirman, naksha", gu: "અસુરક્ષિત મકાન, ગેરકાયદે બાંધકામ" },
    department: "Buildings & Planning", helpline: "0261-2423751", icon: Building2, tone: "saffron", minTier: "silver",
    subcategories: [
      { en: "Unsafe structure", hi: "Asurakshit dhaancha", gu: "અસુરક્ષિત માળખું" },
      { en: "Illegal construction", hi: "Galat / avaidh nirman", gu: "ગેરકાયદે બાંધકામ" },
      { en: "Planning violation", hi: "Naksha ullanghan", gu: "યોજના ઉલ્લંઘન" },
      { en: "Encroachment", hi: "Atikraman", gu: "દબાણ" },
    ],
  },
  {
    id: "roads",
    label: { en: "Roads & Transport", hi: "Sadak / Raaste ki samasya", gu: "રસ્તા અને પરિવહન" },
    description: { en: "Pothole, road damage, BRTS, traffic signal", hi: "Gaddha, tuti sadak, signal kharaab", gu: "ખાડા, રસ્તાની તકલીફ, BRTS, સિગ્નલ" },
    department: "Roads & Transport", helpline: "0261-2423751", icon: Construction, tone: "saffron", minTier: "bronze",
    subcategories: [
      { en: "Pothole", hi: "Gaddha", gu: "ખાડો" },
      { en: "Broken footpath", hi: "Tuti footpath", gu: "તૂટેલી ફૂટપાથ" },
      { en: "Traffic signal fault", hi: "Signal kharaab", gu: "સિગ્નલ બગડ્યો" },
      { en: "Bus / BRTS", hi: "Bus / BRTS", gu: "બસ / BRTS" },
      { en: "Road sign missing", hi: "Sign gaayab", gu: "સાઇન ગુમ" },
    ],
  },
  {
    id: "water",
    label: { en: "Water Supply", hi: "Paani ki samasya", gu: "પાણી પુરવઠો" },
    description: { en: "No water, leak, contaminated water", hi: "Paani nahi aaya, pipe toot gayi, gandha paani", gu: "પાણી નથી, લીક, દૂષિત પાણી" },
    department: "Water Board", helpline: "0261-2422244", icon: Droplets, tone: "river", minTier: "bronze",
    subcategories: [
      { en: "No supply", hi: "Paani nahi aaya", gu: "પાણી નથી આવતું" },
      { en: "Leakage", hi: "Pipe toot gayi / leak", gu: "લીકેજ" },
      { en: "Low pressure", hi: "Kam pressure", gu: "ઓછું દબાણ" },
      { en: "Contaminated water", hi: "Gandha paani", gu: "દૂષિત પાણી" },
    ],
  },
  {
    id: "electricity",
    label: { en: "Electricity", hi: "Bijli ki samasya", gu: "વીજળી" },
    description: { en: "Power cut, sparking wires, meter issue", hi: "Light gayi, taar toot gaya, meter problem", gu: "વીજ કાપ, સ્પાર્કિંગ, મીટર" },
    department: "Electricity (DGVCL)", helpline: "1800-233-3003", icon: Zap, tone: "saffron", minTier: "bronze",
    subcategories: [
      { en: "Power cut", hi: "Light gayi", gu: "વીજ કાપ" },
      { en: "Sparking / hanging wires", hi: "Sparking / latakte taar", gu: "સ્પાર્કિંગ / લટકતા તાર" },
      { en: "Street light out", hi: "Street light bandh", gu: "સ્ટ્રીટ લાઇટ બંધ" },
      { en: "Meter problem", hi: "Meter problem", gu: "મીટરની તકલીફ" },
    ],
  },
  {
    id: "drainage",
    label: { en: "Drainage & Sanitation", hi: "Nali / Gutter ki samasya", gu: "ગટર અને સ્વચ્છતા" },
    description: { en: "Sewage overflow, blocked drain, open manhole", hi: "Nali band hai, manhole khula hai, ganda paani sadak par", gu: "ગટર ઊભરાવી, બંધ નાળું, ખુલ્લો મેનહોલ" },
    department: "Drainage & Sanitation", helpline: "0261-2422244", icon: CloudRain, tone: "teal", minTier: "bronze",
    subcategories: [
      { en: "Sewage overflow", hi: "Gutter ubharna", gu: "ગટર ઊભરાવી" },
      { en: "Blocked drain", hi: "Nali band", gu: "બંધ નાળું" },
      { en: "Open manhole", hi: "Khula manhole", gu: "ખુલ્લો મેનહોલ" },
      { en: "Road flooding", hi: "Sadak par paani", gu: "રસ્તા પર પાણી ભરાવું" },
    ],
  },
  {
    id: "waste",
    label: { en: "Waste & Cleanliness", hi: "Kachra / Safaai ki samasya", gu: "કચરો અને સફાઈ" },
    description: { en: "Garbage not collected, illegal dumping", hi: "Kachra nahi uthaya, ganda dumping", gu: "કચરો ઉઠાવાયો નથી, ગેરકાયદે ડમ્પિંગ" },
    department: "Solid Waste", helpline: "0261-2422244", icon: Trash2, tone: "leaf", minTier: "bronze",
    subcategories: [
      { en: "Garbage not collected", hi: "Kachra nahi uthaya", gu: "કચરો ઉઠાવાયો નથી" },
      { en: "Overflowing bin", hi: "Bhara dustbin", gu: "ભરેલો ડબ્બો" },
      { en: "Illegal dumping", hi: "Ganda dumping", gu: "ગેરકાયદે ડમ્પિંગ" },
      { en: "Dirty public toilet", hi: "Ganda toilet", gu: "ગંદો જાહેર શૌચાલય" },
    ],
  },
  {
    id: "health",
    label: { en: "Health & Pests", hi: "Sehat / Bimari / Janwar", gu: "આરોગ્ય અને જીવાત" },
    description: { en: "Mosquitoes, stray animals, disease outbreak", hi: "Machhar, awara janwar, bimari phail rahi hai", gu: "મચ્છર, રઝળતા પ્રાણી, બીમારી" },
    department: "Health Office", helpline: "108", icon: Stethoscope, tone: "leaf", minTier: "bronze",
    subcategories: [
      { en: "Mosquitoes / fogging", hi: "Machhar / fogging", gu: "મચ્છર / ફોગિંગ" },
      { en: "Stray animal", hi: "Awara janwar", gu: "રઝળતું પ્રાણી" },
      { en: "Disease outbreak", hi: "Bimari phailna", gu: "બીમારી ફેલાવી" },
      { en: "Mental health", hi: "Mansik sehat", gu: "માનસિક આરોગ્ય" },
    ],
  },
  {
    id: "land",
    label: { en: "Land & Property", hi: "Zameen / Makaan ka jhagda", gu: "જમીન અને મિલકત" },
    description: { en: "Land dispute, records, encroachment", hi: "Zameen par kabza, record mein ghalti, vivad", gu: "જમીન વિવાદ, રેકોર્ડ" },
    department: "Land & Revenue", helpline: "0261-2422244", icon: MapPinned, tone: "saffron", minTier: "silver",
    subcategories: [
      { en: "Land dispute", hi: "Zameen vivad", gu: "જમીન વિવાદ" },
      { en: "Property records (7/12)", hi: "Property record (7/12)", gu: "મિલકત રેકોર્ડ (૭/૧૨)" },
      { en: "Encroachment", hi: "Kabza / atikraman", gu: "દબાણ" },
    ],
  },
  {
    id: "welfare",
    label: { en: "Welfare & Social", hi: "Sarkari yojana / Madad", gu: "કલ્યાણ અને સામાજિક" },
    description: { en: "Pension, ration card, scheme eligibility", hi: "Pension nahi aayi, ration card, sarkaari scheme", gu: "પેન્શન, રાશન કાર્ડ, યોજનાઓ" },
    department: "Social Welfare", helpline: "1800-11-6446", icon: HeartHandshake, tone: "violet", minTier: "bronze",
    subcategories: [
      { en: "Pension query", hi: "Pension sawal", gu: "પેન્શન પ્રશ્ન" },
      { en: "Ration card", hi: "Ration card", gu: "રાશન કાર્ડ" },
      { en: "Scheme eligibility", hi: "Scheme eligibility", gu: "યોજના પાત્રતા" },
      { en: "Disability support", hi: "Viklang sahayata", gu: "વિકલાંગતા સહાય" },
    ],
  },
  {
    id: "education",
    label: { en: "Education", hi: "School / Padhaai ki samasya", gu: "શિક્ષણ" },
    description: { en: "School issues, admission, scholarships", hi: "Admission, scholarship, school mein problem", gu: "શાળા, પ્રવેશ, શિષ્યવૃત્તિ" },
    department: "Education", helpline: "1800-233-7965", icon: GraduationCap, tone: "violet", minTier: "bronze",
    subcategories: [
      { en: "School building", hi: "School building", gu: "શાળા ભવન" },
      { en: "Admission query", hi: "Admission sawal", gu: "પ્રવેશ પ્રશ્ન" },
      { en: "Scholarship", hi: "Scholarship", gu: "શિષ્યવૃત્તિ" },
      { en: "Mid-day meal", hi: "Mid-day meal", gu: "મધ્યાહ્ન ભોજન" },
    ],
  },
  {
    id: "business",
    label: { en: "Business & Licences", hi: "Dukaan / Vyapar ki samasya", gu: "વ્યવસાય અને લાઇસન્સ" },
    description: { en: "Trade licence, GST, shop registration", hi: "Licence, GST, dukaan registration", gu: "વ્યાપાર લાઇસન્સ, GST" },
    department: "Licences & Trade", helpline: "0261-2422244", icon: Briefcase, tone: "teal", minTier: "silver",
    subcategories: [
      { en: "Trade licence", hi: "Vyapar licence", gu: "વ્યાપાર લાઇસન્સ" },
      { en: "Shop registration", hi: "Dukaan registration", gu: "દુકાન નોંધણી" },
      { en: "Renewal", hi: "Renewal", gu: "નવીનીકરણ" },
    ],
  },
  {
    id: "disaster",
    label: { en: "Disaster & Environment", hi: "Aapda / Pradushan", gu: "આપત્તિ અને પર્યાવરણ" },
    description: { en: "Flood, fallen tree, pollution, animals", hi: "Baadh, ped gira, pradushan, janwar", gu: "પૂર, પડેલું ઝાડ, પ્રદૂષણ" },
    department: "Disaster & Environment", helpline: "1077", icon: Bus, tone: "leaf", minTier: "bronze",
    subcategories: [
      { en: "Flooding", hi: "Baadh", gu: "પૂર" },
      { en: "Fallen tree", hi: "Ped gira", gu: "પડેલું ઝાડ" },
      { en: "Air / water pollution", hi: "Hawa / paani pradushan", gu: "હવા / પાણી પ્રદૂષણ" },
      { en: "Wildlife", hi: "Janwar", gu: "વન્યજીવ" },
    ],
  },
  {
    id: "governance",
    label: { en: "Governance & RTI", hi: "Sarkari shikayat / RTI", gu: "શાસન અને RTI" },
    description: { en: "RTI, official complaint, corruption", hi: "RTI, bhrashtachar, grievance, official se problem", gu: "RTI, અધિકૃત ફરિયાદ, ભ્રષ્ટાચાર" },
    department: "Governance / RTI", helpline: "1800-11-0180", icon: Scale, tone: "violet", minTier: "gold",
    subcategories: [
      { en: "RTI request", hi: "RTI request", gu: "RTI વિનંતી" },
      { en: "Officer complaint", hi: "Officer ke khilaaf shikayat", gu: "અધિકારી ફરિયાદ" },
      { en: "Corruption", hi: "Bhrashtachar", gu: "ભ્રષ્ટાચાર" },
    ],
  },
];

export const findCategory = (id?: string) => categories.find((c) => c.id === id);

export const toneClasses: Record<CategoryTone, { bg: string; text: string; ring: string }> = {
  danger:  { bg: "bg-destructive/10",  text: "text-destructive", ring: "ring-destructive/30" },
  saffron: { bg: "bg-accent/15",       text: "text-accent",      ring: "ring-accent/30" },
  teal:    { bg: "bg-primary/10",      text: "text-primary",     ring: "ring-primary/30" },
  river:   { bg: "bg-primary-glow/15", text: "text-primary",     ring: "ring-primary/30" },
  leaf:    { bg: "bg-success/15",      text: "text-success",     ring: "ring-success/30" },
  violet:  { bg: "bg-violet-100",      text: "text-violet-700",  ring: "ring-violet-300" },
};
