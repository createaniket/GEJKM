import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { MapPin, Camera, ListChecks, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
  const { t, fontClass } = useLanguage();

  const steps = [
    { icon: ListChecks, title: t("helpStep1Title"), body: t("helpStep1Body") },
    { icon: Camera,     title: t("helpStep2Title"), body: t("helpStep2Body") },
    { icon: MapPin,     title: t("helpStep3Title"), body: t("helpStep3Body") },
  ];

  const faqs = [
    { q: t("helpQ1"), a: t("helpA1") },
    { q: t("helpQ2"), a: t("helpA2") },
    { q: t("helpQ3"), a: t("helpA3") },
    { q: t("helpQ4"), a: t("helpA4") },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className={cn("font-display text-3xl sm:text-4xl font-bold tracking-tight", fontClass)}>{t("helpTitle")}</h1>
      <p className={cn("text-muted-foreground mt-2", fontClass)}>{t("helpSub")}</p>

      <ol className="mt-8 space-y-4">
        {steps.map(({ icon: Icon, title, body }, i) => (
          <li key={i} className="flex gap-4 rounded-2xl border-2 border-border bg-card p-5 shadow-soft">
            <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h2 className={cn("font-display text-xl font-bold", fontClass)}>{title}</h2>
              <p className={cn("text-sm text-muted-foreground mt-1 leading-relaxed", fontClass)}>{body}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className={cn("font-display text-2xl font-bold tracking-tight mt-12", fontClass)}>{t("helpFaqTitle")}</h2>
      <dl className="mt-4 divide-y divide-border border-2 border-border rounded-2xl bg-card overflow-hidden">
        {faqs.map(({ q, a }, i) => (
          <div key={i} className="p-5">
            <dt className={cn("font-bold", fontClass)}>{q}</dt>
            <dd className={cn("text-sm text-muted-foreground mt-1.5 leading-relaxed", fontClass)}>{a}</dd>
          </div>
        ))}
      </dl>

      <Link
        to="/home"
        className="mt-10 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
      >
        {t("reportFab")} <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default Help;
