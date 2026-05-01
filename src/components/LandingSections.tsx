import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import {
  ArrowRight, Lightbulb, MessageSquareHeart, Layers, Activity, Zap,
  Apple, Smartphone, Lock, Check, Fingerprint, Smartphone as PhoneIcon, ShieldCheck, Server,
  Droplets, Lightbulb as Bulb, Construction, CloudRain, Trash2, Waves,
  Stethoscope, ShieldAlert, Siren, Baby, Sparkles,
  GraduationCap, Dog, FileText, MoreHorizontal,
} from "lucide-react";
import suratSkyline from "@/assets/surat-skyline.jpg";
import editorialVillager from "@/assets/editorial-villager.jpg";
import editorialCommunity from "@/assets/editorial-community.jpg";
import editorialTrust from "@/assets/editorial-trust.jpg";

const useCtaTo = () => {
  const { user } = useAuth();
  return user ? "/home" : "/onboarding";
};

/* ============================================================
   HERO
   ============================================================ */
export const LandingHero = ({ compact = false }: { compact?: boolean }) => {
  const { t, lang, fontClass } = useLanguage();
  const { user } = useAuth();
  const ctaTo = useCtaTo();

  return (
    <section className={cn("relative overflow-hidden isolate", compact ? "rounded-3xl" : "")}>
      <img
        src={suratSkyline}
        alt="Aerial drone view of Surat city skyline at golden hour"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        loading={compact ? "lazy" : "eager"}
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/55 via-primary/30 to-accent/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-accent/40 blur-3xl -z-10" />

      <div
        className={cn(
          "container mx-auto px-4 max-w-6xl grid lg:grid-cols-12 gap-10 items-center",
          compact ? "py-10 sm:py-14" : "py-16 sm:py-24 lg:py-32",
        )}
      >
        <div className="lg:col-span-7 text-primary-foreground">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]",
              fontClass,
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {t("landingEyebrow")}
          </span>
          <h1
            className={cn(
              "font-display font-bold leading-[1.05] tracking-tight mt-5 text-balance text-white",
              compact ? "text-3xl sm:text-4xl lg:text-5xl" : "text-4xl sm:text-5xl lg:text-6xl",
              fontClass,
            )}
          >
            {t("landingHeadline")}
          </h1>
          <p
            className={cn(
              "mt-5 text-lg sm:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed",
              fontClass,
            )}
          >
            {t("landingSub")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={ctaTo}>
              <Button
                variant="hero"
                size="xl"
                className="bg-accent hover:bg-accent/90 text-accent-foreground border-0 h-14 px-7 text-base"
              >
                {user ? t("landingSignedIn") : t("landingCtaPrimary")}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/help">
              <Button
                variant="outline"
                size="xl"
                className="h-14 px-7 text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                {t("landingCtaSecondary")}
              </Button>
            </Link>
          </div>

          <p className={cn("mt-6 text-sm text-primary-foreground/75", fontClass)}>
            {t("landingProofLine")}
          </p>
        </div>

        {/* Hero preview card */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl bg-card text-foreground p-5 shadow-elegant border border-border">
            <div className="absolute -top-3 -right-3 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 shadow-glow">
              Live preview
            </div>
            <p className={cn("font-display text-2xl font-bold tracking-tight leading-tight", fontClass)}>
              {t("heroCardTitle")}
            </p>
            <p className={cn("text-sm text-muted-foreground mt-1.5 leading-snug", fontClass)}>{t("heroCardSub")}</p>
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              {["water", "electricity", "roads", "waste"].map((id) => {
                const c = categories.find((x) => x.id === id)!;
                const Icon = c.icon;
                return (
                  <div key={id} className="rounded-xl border-2 border-border p-3 flex items-start gap-2.5">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className={cn("font-bold text-sm leading-tight truncate", fontClass)}>
                        {c.label[lang]}
                      </p>
                      <p className="text-[10px] text-primary font-semibold mt-0.5">{c.helpline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground border-t border-dashed border-border pt-3">
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> SLA · 4h
              </span>
              <span>P2 · DGVCL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   WHAT IS JANKAM
   ============================================================ */
export const LandingWhatIs = () => {
  const { t, fontClass } = useLanguage();
  return (
    <section className="container mx-auto px-4 max-w-6xl py-20 sm:py-28">
      <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Editorial portrait */}
        <figure className="md:col-span-5 relative">
          <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] bg-secondary shadow-elegant">
            <img
              src={editorialVillager}
              alt="A village resident of Surat district reporting a civic issue on her phone at golden hour"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              width={1080}
              height={1350}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <figcaption className={cn("mt-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80", fontClass)}>
            <span className="text-accent font-bold">●</span> Surat district · Field report
          </figcaption>
        </figure>

        {/* Body */}
        <div className="md:col-span-7">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center">
              <Lightbulb className="h-6 w-6" />
            </div>
            <p className={cn("text-xs font-bold uppercase tracking-[0.22em] text-accent", fontClass)}>
              {t("appName")}
            </p>
          </div>
          <h2 className={cn("font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-5 leading-[1.05]", fontClass)}>
            {t("landingWhatTitle")}
          </h2>
          <p className={cn("mt-5 text-lg text-muted-foreground leading-relaxed", fontClass)}>
            {t("landingWhatBody")}
          </p>
          <p className={cn("mt-4 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70 leading-relaxed", fontClass)}>
            {[
              "Water","Electricity","Roads","Drainage","Cleanliness","Sanitation",
              "Health","Women’s Safety","Public Safety","Education","Anganwadi",
              "Toilets","Animals","Documents","Other",
            ].join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   WHY JOIN
   ============================================================ */
export const LandingWhyJoin = () => {
  const { t, fontClass } = useLanguage();
  const features = [
    { icon: MessageSquareHeart, title: t("landingFeat1Title"), body: t("landingFeat1Body") },
    { icon: Layers,             title: t("landingFeat2Title"), body: t("landingFeat2Body") },
    { icon: Activity,           title: t("landingFeat3Title"), body: t("landingFeat3Body") },
    { icon: Zap,                title: t("landingFeat4Title"), body: t("landingFeat4Body") },
  ];
  return (
    <section className="bg-background border-t border-border">
      <div className="container mx-auto px-6 max-w-6xl py-24 sm:py-32">
        {/* Editorial banner image */}
        <figure className="mb-16 sm:mb-20 relative overflow-hidden rounded-[2rem] aspect-[16/9] sm:aspect-[21/9] shadow-elegant">
          <img
            src={editorialCommunity}
            alt="Villagers gathered together looking at a phone, sharing a civic report at dusk"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <figcaption className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-10 max-w-xl">
            <p className={cn("text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-accent", fontClass)}>
              The neighbourhood, online
            </p>
            <p className={cn("font-display text-white text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight mt-2", fontClass)}>
              When one voice speaks, the whole street is heard.
            </p>
          </figcaption>
        </figure>

        {/* Section header — editorial, left-aligned on desktop */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className={cn("type-eyebrow text-accent mb-4", fontClass)}>Why Jan Kaam</p>
          <h2 className={cn("type-display-xl text-foreground", fontClass)}>
            {t("landingFeaturesTitle")}
          </h2>
        </div>

        {/* Editorial 2-column feature list — large numerals, hairline dividers, no boxes */}
        <ul className="grid sm:grid-cols-2 gap-x-16 gap-y-px sm:gap-y-px">
          {features.map(({ icon: Icon, title, body }, i) => (
            <li
              key={i}
              className="group relative flex gap-6 sm:gap-7 py-10 border-t border-border first:border-t sm:[&:nth-child(2)]:border-t"
            >
              <span className={cn(
                "font-display tabular-nums text-2xl font-semibold text-muted-foreground/60 pt-1 w-9 shrink-0",
                fontClass,
              )}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                  <h3 className={cn("type-display-sm text-foreground", fontClass)}>{title}</h3>
                </div>
                <p className={cn("type-body text-muted-foreground", fontClass)}>{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ============================================================
   TRUST
   ============================================================ */
export const LandingTrust = () => {
  const { t, fontClass } = useLanguage();

  const steps = [
    {
      icon: Fingerprint,
      title: "Aadhaar verified",
      body: "We confirm you are a real resident of Surat using India's national ID — no fake accounts, no bots.",
    },
    {
      icon: PhoneIcon,
      title: "Phone OTP",
      body: "A one-time code sent to your mobile keeps your account secure and your reports trusted.",
    },
    {
      icon: ShieldCheck,
      title: "DPDP Act 2023",
      body: "Your data is protected under India's Digital Personal Data Protection Act — your rights, by law.",
    },
  ];

  return (
    <section className="bg-secondary/40 border-y border-border">
      <div className="container mx-auto px-4 max-w-6xl py-24 sm:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Editorial trust photograph */}
          <figure className="lg:col-span-5 order-last lg:order-first">
            <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] shadow-elegant bg-foreground">
              <img
                src={editorialTrust}
                alt="Weathered hands holding a phone showing a verification screen — trust and dignity"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                width={1280}
                height={1600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            <figcaption className={cn("mt-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80", fontClass)}>
              <span className="text-success font-bold">●</span> Aadhaar-verified · DPDP Act 2023
            </figcaption>
          </figure>

          {/* Header */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-success/10 text-success border border-success/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
              <Lock className="h-3.5 w-3.5" /> Trust & Safety
            </span>
            <h2 className={cn("font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mt-6 leading-[1.05]", fontClass)}>
              Safe. Verified. Trusted.
            </h2>
            <p className={cn("mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed", fontClass)}>
              Every member is verified through Aadhaar and phone OTP — so every voice is real,
              and every report is taken seriously.
            </p>
          </div>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className="relative rounded-3xl bg-card border border-border p-7 shadow-soft hover:shadow-elegant transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="h-14 w-14 rounded-2xl bg-success/10 text-success flex items-center justify-center">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <span className="font-display text-sm font-semibold text-muted-foreground tabular-nums">
                  0{i + 1}
                </span>
              </div>
              <h3 className={cn("font-display text-xl font-semibold tracking-tight mt-6", fontClass)}>
                {title}
              </h3>
              <p className={cn("mt-2 text-sm text-muted-foreground leading-relaxed", fontClass)}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold text-muted-foreground uppercase tracking-[0.18em]">
          <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-success" /> End-to-end secure</span>
          <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-success" /> No data sold, ever</span>
          <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-success" /> Built with Govt. of Gujarat</span>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   SERVICES — what villagers can report
   ============================================================ */
export const LandingServices = () => {
  const { fontClass } = useLanguage();

  const groups = [
    {
      eyebrow: "01 — Essential services",
      title: "The everyday basics.",
      blurb: "The infrastructure that keeps a village running. Reported in seconds, routed to the right department.",
      items: [
        { icon: Droplets,     label: "Water Supply" },
        { icon: Bulb,         label: "Electricity & Street Lights" },
        { icon: Construction, label: "Roads & Transport Access" },
        { icon: CloudRain,    label: "Drainage & Flooding" },
        { icon: Trash2,       label: "Waste & Cleanliness" },
        { icon: Waves,        label: "Sewage & Sanitation" },
      ],
    },
    {
      eyebrow: "02 — Health, safety & welfare",
      title: "People before paperwork.",
      blurb: "Critical care, protection, and dignity for every member of the household — children, women, elderly.",
      items: [
        { icon: Stethoscope, label: "Health & Medical Support" },
        { icon: ShieldAlert, label: "Women's Safety" },
        { icon: Siren,       label: "Public Safety & Emergencies" },
        { icon: Baby,        label: "Anganwadi & Child Services" },
        { icon: Sparkles,    label: "Public Toilets & Hygiene" },
      ],
    },
    {
      eyebrow: "03 — Community & local administration",
      title: "Your village, your records.",
      blurb: "From schools to certificates — the local touchpoints that shape daily life and long-term opportunity.",
      items: [
        { icon: GraduationCap,  label: "Schools & Education Facilities" },
        { icon: Dog,            label: "Animal / Cattle Nuisance" },
        { icon: FileText,       label: "Government Documents & Local Certificates" },
        { icon: MoreHorizontal, label: "Other Village Issues" },
      ],
    },
  ];

  return (
    <section id="services" className="bg-background border-t border-border">
      <div className="container mx-auto px-4 max-w-6xl py-24 sm:py-32">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 text-accent border border-accent/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
            <Layers className="h-3.5 w-3.5" /> Services
          </span>
          <h2 className={cn("type-display-xl text-foreground mt-6", fontClass)}>
            Fifteen services.<br />
            <span className="text-muted-foreground">One app.</span>
          </h2>
          <p className={cn("type-body-lg text-muted-foreground mt-5", fontClass)}>
            Every issue a villager faces — grouped, routed, and tracked. From a leaking pipe to a missing certificate.
          </p>
        </div>

        {/* Groups */}
        <div className="space-y-20">
          {groups.map((g) => (
            <div key={g.eyebrow} className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-4">
                <p className={cn("type-eyebrow text-accent", fontClass)}>{g.eyebrow}</p>
                <h3 className={cn("type-display-md text-foreground mt-4", fontClass)}>{g.title}</h3>
                <p className={cn("type-body text-muted-foreground mt-4", fontClass)}>{g.blurb}</p>
              </div>
              <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-3">
                {g.items.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-4 rounded-2xl bg-secondary/40 hover:bg-secondary transition-colors p-5"
                  >
                    <div className="h-11 w-11 rounded-xl bg-background flex items-center justify-center shrink-0 shadow-soft">
                      <Icon className="h-5 w-5 text-foreground/80" strokeWidth={1.5} />
                    </div>
                    <p className={cn("type-body font-medium text-foreground", fontClass)}>{label}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-20 pt-10 border-t border-border text-center">
          <p className={cn("type-caption", fontClass)}>
            Don't see your issue? Tap <span className="text-foreground font-medium">"Other Village Issues"</span> — we'll route it to the right officer.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   FINAL CTA BANNER
   ============================================================ */
export const LandingFinalCta = () => {
  const { t, fontClass } = useLanguage();
  const { user } = useAuth();
  const ctaTo = useCtaTo();
  return (
    <section className="bg-background border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl py-24 sm:py-32 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          Join Jan Kaam
        </p>
        <h2
          className={cn(
            "font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mt-4 leading-[1.05] text-foreground",
            fontClass,
          )}
        >
          A smarter, cleaner,
          <br className="hidden sm:block" /> safer village.
        </h2>
        <p className={cn("mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed", fontClass)}>
          Free on iOS and Android. Available on the web today.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <Link
            to={ctaTo}
            className="inline-flex items-center gap-1 text-base font-medium text-accent hover:underline underline-offset-4"
          >
            {user ? t("landingSignedIn") : "Open web app"} <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="hidden sm:inline-block h-4 w-px bg-border" />
          <Link
            to="/help"
            className="inline-flex items-center gap-1 text-base font-medium text-foreground hover:underline underline-offset-4"
          >
            Learn more <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <button
            disabled
            className="group relative inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 text-foreground cursor-not-allowed min-w-[180px]"
          >
            <Apple className="h-7 w-7" strokeWidth={1.5} />
            <div className="text-left leading-tight">
              <p className="text-[10px] font-medium text-muted-foreground">Coming soon to</p>
              <p className="text-base font-semibold tracking-tight">App Store</p>
            </div>
          </button>
          <button
            disabled
            className="group relative inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 text-foreground cursor-not-allowed min-w-[180px]"
          >
            <Smartphone className="h-7 w-7" strokeWidth={1.5} />
            <div className="text-left leading-tight">
              <p className="text-[10px] font-medium text-muted-foreground">Coming soon to</p>
              <p className="text-base font-semibold tracking-tight">Google Play</p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
