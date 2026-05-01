import { useLanguage } from "@/context/LanguageContext";
import { Bus, GraduationCap, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { icon: Bus, title: { en: "Village bus", hi: "गाँव बस", gu: "ગામ બસ" }, rows: ["6:30 AM · Surat Stand", "9:15 AM · Surat Stand", "1:00 PM · Pal RTO", "5:45 PM · Adajan"] },
  { icon: GraduationCap, title: { en: "Primary school", hi: "प्राथमिक स्कूल", gu: "પ્રાથમિક શાળા" }, rows: ["Mon–Fri · 8:00 AM – 1:30 PM", "Sat · 8:00 AM – 11:00 AM"] },
  { icon: Stethoscope, title: { en: "Health clinic", hi: "स्वास्थ्य क्लिनिक", gu: "આરોગ્ય ક્લિનિક" }, rows: ["Daily OPD · 9 AM – 1 PM", "Vaccination · Wed 2 PM"] },
];

const Schedules = () => {
  const { t, lang, fontClass } = useLanguage();
  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className={cn("font-display text-2xl font-black", fontClass)}>{t("schedTitle")}</h1>
      <p className={cn("text-sm text-muted-foreground mb-4", fontClass)}>{t("schedSub")}</p>
      <div className="space-y-3">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.title.en} className="rounded-2xl border-2 border-border bg-card p-4 shadow-soft">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-5 w-5" /></div>
                <p className={cn("font-bold", fontClass)}>{it.title[lang as keyof typeof it.title]}</p>
              </div>
              <ul className="text-sm text-foreground/80 space-y-1 pl-13">
                {it.rows.map((r) => <li key={r}>• {r}</li>)}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedules;
