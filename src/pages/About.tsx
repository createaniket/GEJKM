import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";

const About = () => {
  const { t, fontClass } = useLanguage();

  const departments = Array.from(new Set(categories.map((c) => c.department)));

  const blocks = [
    { title: t("aboutMissionTitle"), body: t("aboutMissionBody") },
    { title: t("aboutWhoTitle"),     body: t("aboutWhoBody") },
    { title: t("aboutPrivacyTitle"), body: t("aboutPrivacyBody") },
    { title: t("aboutLangTitle"),    body: t("aboutLangBody") },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className={cn("font-display text-3xl sm:text-4xl font-bold tracking-tight", fontClass)}>{t("aboutTitle")}</h1>
      <p className={cn("text-lg text-muted-foreground mt-3 leading-relaxed", fontClass)}>{t("aboutLead")}</p>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {blocks.map((b, i) => (
          <section key={i} className="rounded-2xl border-2 border-border bg-card p-5 shadow-soft">
            <h2 className={cn("font-display text-xl font-bold", fontClass)}>{b.title}</h2>
            <p className={cn("text-sm text-muted-foreground mt-2 leading-relaxed", fontClass)}>{b.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border-2 border-border bg-secondary/40 p-6">
        <h2 className={cn("font-display text-xl font-bold", fontClass)}>{t("aboutDeptsTitle")}</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {departments.map((d) => (
            <li
              key={d}
              className="rounded-full bg-card border border-border px-3 py-1 text-xs font-semibold text-foreground/80"
            >
              {d}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-xs text-muted-foreground text-center">
        © {new Date().getFullYear()} Jan Kaam · A BJP Surat District citizen-services pilot · Made in India 🇮🇳
      </p>
    </div>
  );
};

export default About;
