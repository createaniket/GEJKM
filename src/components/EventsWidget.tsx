import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import {
  Calendar, MapPin, Users, ArrowRight, Megaphone, Sparkles,
  HeartHandshake, GraduationCap, Droplets, Flag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type EventTone = "saffron" | "river" | "leaf" | "violet" | "rose";

interface VillageEvent {
  id: string;
  category: { en: string; hi: string; gu: string };
  title: { en: string; hi: string; gu: string };
  blurb: { en: string; hi: string; gu: string };
  date: Date;
  endTime?: string;
  location: { en: string; hi: string; gu: string };
  attending: number;
  hostBadge?: { en: string; hi: string; gu: string };
  icon: LucideIcon;
  tone: EventTone;
}

const EVENTS: VillageEvent[] = [
  {
    id: "e-gram-sabha",
    category: { en: "Governance", hi: "शासन", gu: "શાસન" },
    title: { en: "Monthly Gram Sabha", hi: "मासिक ग्राम सभा", gu: "માસિક ગ્રામ સભા" },
    blurb: {
      en: "Bring your village concerns directly to the Sarpanch. Open floor for water, roads & welfare.",
      hi: "अपनी समस्याएँ सीधे सरपंच तक पहुँचाएँ। पानी, सड़क और कल्याण पर खुली चर्चा।",
      gu: "તમારી સમસ્યાઓ સીધી સરપંચ સુધી પહોંચાડો. પાણી, રસ્તા અને કલ્યાણ પર ખુલ્લી ચર્ચા.",
    },
    date: new Date(2026, 4, 7, 18, 0),
    endTime: "8:30 PM",
    location: { en: "Panchayat Hall, Kamrej", hi: "पंचायत हॉल, कामरेज", gu: "પંચાયત હોલ, કામરેજ" },
    attending: 142,
    hostBadge: { en: "Official", hi: "सरकारी", gu: "સરકારી" },
    icon: Megaphone,
    tone: "saffron",
  },
  {
    id: "e-jankam-camp",
    category: { en: "Jan Kaam camp", hi: "जन काम शिविर", gu: "જન કામ શિબિર" },
    title: { en: "Aadhaar Verification Camp", hi: "आधार सत्यापन शिविर", gu: "આધાર ચકાસણી શિબિર" },
    blurb: {
      en: "Get verified on Jan Kaam in 5 minutes. Free help with onboarding & first complaint.",
      hi: "5 मिनट में जन काम पर सत्यापित हों। ऑनबोर्डिंग में मुफ़्त मदद।",
      gu: "5 મિનિટમાં જન કામ પર ચકાસાવો. ઓનબોર્ડિંગમાં મફત મદદ.",
    },
    date: new Date(2026, 4, 10, 10, 0),
    endTime: "4:00 PM",
    location: { en: "Community Centre, Olpad", hi: "कम्युनिटी सेंटर, ओलपाड", gu: "કોમ્યુનિટી સેન્ટર, ઓલપાડ" },
    attending: 86,
    hostBadge: { en: "Jan Kaam", hi: "जन काम", gu: "જન કામ" },
    icon: Sparkles,
    tone: "river",
  },
  {
    id: "e-cleanliness",
    category: { en: "Drive", hi: "अभियान", gu: "અભિયાન" },
    title: { en: "Village Cleanliness Drive", hi: "गाँव सफ़ाई अभियान", gu: "ગ્રામ સફાઈ અભિયાન" },
    blurb: {
      en: "Two hours, one village, a hundred volunteers. Tea & breakfast provided.",
      hi: "दो घंटे, एक गाँव, सौ स्वयंसेवक। चाय और नाश्ता उपलब्ध।",
      gu: "બે કલાક, એક ગામ, સો સ્વયંસેવકો. ચા-નાસ્તો ઉપલબ્ધ.",
    },
    date: new Date(2026, 4, 12, 6, 30),
    endTime: "9:00 AM",
    location: { en: "Main Chowk, Bardoli", hi: "मुख्य चौक, बारडोली", gu: "મુખ્ય ચોક, બારડોલી" },
    attending: 213,
    icon: HeartHandshake,
    tone: "leaf",
  },
  {
    id: "e-women-health",
    category: { en: "Health", hi: "स्वास्थ्य", gu: "આરોગ્ય" },
    title: { en: "Women's Health Check-up", hi: "महिला स्वास्थ्य जाँच", gu: "મહિલા આરોગ્ય તપાસ" },
    blurb: {
      en: "Free check-ups by district doctors. Anganwadi & ASHA workers on-site.",
      hi: "जिला डॉक्टरों द्वारा मुफ़्त जाँच। आँगनवाड़ी और आशा कार्यकर्ता मौजूद।",
      gu: "જિલ્લા ડોક્ટરો દ્વારા મફત તપાસ. આંગણવાડી અને આશા કાર્યકરો હાજર.",
    },
    date: new Date(2026, 4, 15, 9, 0),
    endTime: "1:00 PM",
    location: { en: "PHC, Mandvi", hi: "PHC, मांडवी", gu: "PHC, માંડવી" },
    attending: 64,
    hostBadge: { en: "Free", hi: "मुफ़्त", gu: "મફત" },
    icon: HeartHandshake,
    tone: "rose",
  },
  {
    id: "e-youth-meet",
    category: { en: "Youth", hi: "युवा", gu: "યુવા" },
    title: { en: "Jan Kaam Village Captains Meet", hi: "जन काम ग्राम कैप्टन बैठक", gu: "જન કામ ગ્રામ કેપ્ટન મિટિંગ" },
    blurb: {
      en: "Become a digital captain for your ward. Open to all 18–30 year olds.",
      hi: "अपने वार्ड के डिजिटल कैप्टन बनें। 18–30 वर्ष के सभी युवा शामिल हो सकते हैं।",
      gu: "તમારા વોર્ડના ડિજિટલ કેપ્ટન બનો. 18–30 વર્ષના બધા યુવાનો માટે ખુલ્લું.",
    },
    date: new Date(2026, 4, 18, 17, 30),
    endTime: "7:30 PM",
    location: { en: "Town Hall, Surat", hi: "टाउन हॉल, सूरत", gu: "ટાઉન હોલ, સુરત" },
    attending: 58,
    hostBadge: { en: "Apply", hi: "आवेदन", gu: "અરજી" },
    icon: GraduationCap,
    tone: "violet",
  },
  {
    id: "e-water",
    category: { en: "Awareness", hi: "जागरूकता", gu: "જાગૃતિ" },
    title: { en: "Save Water Awareness Walk", hi: "जल बचाओ जागरूकता पदयात्रा", gu: "પાણી બચાઓ જાગૃતિ પદયાત્રા" },
    blurb: {
      en: "Walk with your neighbours. Pledge & poster activity for kids.",
      hi: "पड़ोसियों के साथ चलें। बच्चों के लिए शपथ और पोस्टर गतिविधि।",
      gu: "પડોશીઓ સાથે ચાલો. બાળકો માટે પ્રતિજ્ઞા અને પોસ્ટર પ્રવૃત્તિ.",
    },
    date: new Date(2026, 4, 22, 7, 0),
    endTime: "9:00 AM",
    location: { en: "Tapi Riverfront, Surat", hi: "तापी रिवरफ्रंट, सूरत", gu: "તાપી રિવરફ્રન્ટ, સુરત" },
    attending: 178,
    icon: Droplets,
    tone: "river",
  },
];

const toneClasses: Record<EventTone, { chip: string; iconBg: string; iconText: string; ring: string }> = {
  saffron: { chip: "bg-accent/10 text-accent",         iconBg: "bg-accent/10",        iconText: "text-accent",       ring: "ring-accent/20" },
  river:   { chip: "bg-primary/10 text-primary",        iconBg: "bg-primary/10",       iconText: "text-primary",      ring: "ring-primary/20" },
  leaf:    { chip: "bg-success/10 text-success",        iconBg: "bg-success/10",       iconText: "text-success",      ring: "ring-success/20" },
  violet:  { chip: "bg-violet-100 text-violet-700",     iconBg: "bg-violet-100",       iconText: "text-violet-700",   ring: "ring-violet-200" },
  rose:    { chip: "bg-rose-100 text-rose-700",         iconBg: "bg-rose-100",         iconText: "text-rose-700",     ring: "ring-rose-200" },
};

const monthShort: Record<string, { en: string; hi: string; gu: string }[]> = {
  m: [
    { en: "JAN", hi: "जन", gu: "જાન્યુ" },
    { en: "FEB", hi: "फर", gu: "ફેબ્રુ" },
    { en: "MAR", hi: "मार", gu: "માર્ચ" },
    { en: "APR", hi: "अप्र", gu: "એપ્રિ" },
    { en: "MAY", hi: "मई",  gu: "મે" },
    { en: "JUN", hi: "जून", gu: "જૂન" },
    { en: "JUL", hi: "जुल", gu: "જુલા" },
    { en: "AUG", hi: "अग",  gu: "ઓગસ્ટ" },
    { en: "SEP", hi: "सित", gu: "સપ્ટે" },
    { en: "OCT", hi: "अक्ट", gu: "ઓક્ટો" },
    { en: "NOV", hi: "नव",  gu: "નવે" },
    { en: "DEC", hi: "दिस", gu: "ડિસે" },
  ],
};

const formatTime = (d: Date) =>
  d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });

const EventsWidget = () => {
  const { lang, fontClass } = useLanguage();
  const [interested, setInterested] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setInterested((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const heading = { en: "Happening near you", hi: "आपके पास हो रहा है", gu: "તમારી પાસે થઈ રહ્યું છે" };
  const sub = {
    en: "Gram Sabhas, camps, drives & cultural meets — your village calendar, in one place.",
    hi: "ग्राम सभा, शिविर, अभियान और सांस्कृतिक कार्यक्रम — एक ही जगह।",
    gu: "ગ્રામ સભા, શિબિરો, અભિયાનો અને સાંસ્કૃતિક કાર્યક્રમ — એક જ જગ્યાએ.",
  };
  const eyebrow = { en: "EVENTS", hi: "कार्यक्रम", gu: "કાર્યક્રમ" };
  const interestedLbl = { en: "I'm interested", hi: "मैं रुचि रखता हूँ", gu: "મને રસ છે" };
  const goingLbl = { en: "You're going ✓", hi: "आप जा रहे हैं ✓", gu: "તમે જઈ રહ્યા છો ✓" };
  const seeAll = { en: "See all events", hi: "सभी कार्यक्रम देखें", gu: "બધા કાર્યક્રમ જુઓ" };

  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="container mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className={cn("type-eyebrow text-accent mb-3", fontClass)}>{eyebrow[lang]}</p>
            <h2 className={cn("type-display-lg text-foreground", fontClass)}>{heading[lang]}</h2>
            <p className={cn("type-body-lg text-muted-foreground mt-3", fontClass)}>{sub[lang]}</p>
          </div>
          <button
            className={cn(
              "hidden sm:inline-flex items-center gap-1.5 text-accent type-body-sm font-medium hover:underline shrink-0",
              fontClass,
            )}
          >
            {seeAll[lang]} <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Horizontal scroller */}
        <div className="-mx-6 px-6 overflow-x-auto scrollbar-none">
          <ul className="flex gap-5 snap-x snap-mandatory pb-4">
            {EVENTS.map((ev) => {
              const tones = toneClasses[ev.tone];
              const Icon = ev.icon;
              const day = ev.date.getDate();
              const month = monthShort.m[ev.date.getMonth()][lang];
              const isGoing = interested.has(ev.id);

              return (
                <li
                  key={ev.id}
                  className={cn(
                    "snap-start shrink-0 w-[88%] sm:w-[420px] rounded-3xl bg-background border border-border",
                    "shadow-soft hover:shadow-elegant transition-all duration-300",
                    "flex flex-col overflow-hidden",
                  )}
                >
                  {/* Header strip */}
                  <div className="p-6 pb-5 flex items-start gap-5">
                    {/* Date chip */}
                    <div className={cn(
                      "shrink-0 rounded-2xl bg-background border-2 border-border",
                      "w-16 h-[72px] flex flex-col items-center justify-center text-center",
                    )}>
                      <span className={cn("type-eyebrow text-accent", fontClass)}>{month}</span>
                      <span className={cn("font-display text-2xl font-semibold tabular-nums leading-none mt-0.5", fontClass)}>
                        {day}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                          tones.chip, fontClass,
                        )}>
                          <Icon className="h-3 w-3" strokeWidth={2} />
                          {ev.category[lang]}
                        </span>
                        {ev.hostBadge && (
                          <span className={cn(
                            "rounded-full bg-foreground text-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                            fontClass,
                          )}>
                            {ev.hostBadge[lang]}
                          </span>
                        )}
                      </div>
                      <h3 className={cn("type-display-sm text-foreground line-clamp-2", fontClass)}>
                        {ev.title[lang]}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-6 pb-5 flex-1">
                    <p className={cn("type-body-sm text-muted-foreground line-clamp-2", fontClass)}>
                      {ev.blurb[lang]}
                    </p>

                    <dl className="mt-5 space-y-2.5">
                      <div className="flex items-center gap-2.5 text-foreground/80">
                        <Calendar className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.75} />
                        <dd className={cn("type-body-sm tabular-nums", fontClass)}>
                          {formatTime(ev.date)}{ev.endTime ? ` – ${ev.endTime}` : ""}
                        </dd>
                      </div>
                      <div className="flex items-center gap-2.5 text-foreground/80">
                        <MapPin className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.75} />
                        <dd className={cn("type-body-sm truncate", fontClass)}>{ev.location[lang]}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-border px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex -space-x-2">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className={cn(
                              "h-7 w-7 rounded-full border-2 border-background ring-1",
                              tones.iconBg, tones.ring,
                            )}
                          />
                        ))}
                      </div>
                      <span className={cn("type-caption tabular-nums", fontClass)}>
                        <Users className="inline h-3 w-3 mr-1 -mt-0.5" />
                        {ev.attending + (isGoing ? 1 : 0)}
                      </span>
                    </div>
                    <button
                      onClick={() => toggle(ev.id)}
                      className={cn(
                        "rounded-full px-4 h-9 text-sm font-medium transition-colors",
                        isGoing
                          ? "bg-foreground text-background hover:bg-foreground/85"
                          : "bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground",
                        fontClass,
                      )}
                    >
                      {isGoing ? goingLbl[lang] : interestedLbl[lang]}
                    </button>
                  </div>
                </li>
              );
            })}

            {/* Submit-an-event tail card */}
            <li className="snap-start shrink-0 w-[78%] sm:w-[320px] rounded-3xl border-2 border-dashed border-border bg-background/50 p-7 flex flex-col justify-center items-start hover:border-accent transition-colors">
              <div className="h-11 w-11 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                <Flag className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p className={cn("type-display-sm text-foreground", fontClass)}>
                {lang === "gu" ? "તમારો કાર્યક્રમ ઉમેરો" : lang === "hi" ? "अपना कार्यक्रम जोड़ें" : "Host an event"}
              </p>
              <p className={cn("type-body-sm text-muted-foreground mt-2", fontClass)}>
                {lang === "gu"
                  ? "ગ્રામ સભા, શિબિર કે સાંસ્કૃતિક કાર્યક્રમની યોજના? જન કામ પર પ્રમોટ કરો."
                  : lang === "hi"
                  ? "ग्राम सभा, शिविर या सांस्कृतिक कार्यक्रम की योजना? जन काम पर प्रचारित करें।"
                  : "Planning a Gram Sabha, camp or cultural meet? Promote it on Jan Kaam."}
              </p>
              <button className={cn("mt-5 inline-flex items-center gap-1.5 text-accent font-medium text-sm hover:underline", fontClass)}>
                {lang === "gu" ? "શરૂ કરો" : lang === "hi" ? "शुरू करें" : "Get started"} <ArrowRight className="h-4 w-4" />
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile see-all */}
        <div className="sm:hidden mt-2 text-center">
          <button className={cn("inline-flex items-center gap-1.5 text-accent type-body-sm font-medium", fontClass)}>
            {seeAll[lang]} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsWidget;
