import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Languages, ArrowRight,
  ListChecks, Camera, MapPin, HelpCircle, Info,
} from "lucide-react";
import {
  LandingHero, LandingWhatIs, LandingWhyJoin, LandingTrust, LandingFinalCta, LandingServices,
} from "@/components/LandingSections";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LaunchCountdown from "@/components/LaunchCountdown";

// Fixed launch date — 20 days from the page being shipped (May 20, 2026)
const LAUNCH_DATE = new Date("2026-05-20T10:00:00+05:30");

const Landing = () => {
  const { t, fontClass, cycle, lang } = useLanguage();
  const { user } = useAuth();
  const next = lang === "en" ? "हिन्दी" : lang === "hi" ? "ગુજરાતી" : "English";
  const ctaTo = user ? "/home" : "/onboarding";

  const steps = [
    { icon: ListChecks, title: t("helpStep1Title"), body: t("helpStep1Body") },
    { icon: Camera,     title: t("helpStep2Title"), body: t("helpStep2Body") },
    { icon: MapPin,     title: t("helpStep3Title"), body: t("helpStep3Body") },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Public top-bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-6xl">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-soft">
              <svg viewBox="0 0 48 48" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
                <circle cx="24" cy="24" r="20" />
                <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" />
                {Array.from({ length: 24 }).map((_, i) => {
                  const a = (i * Math.PI) / 12;
                  return <line key={i} x1={24 + Math.cos(a) * 5} y1={24 + Math.sin(a) * 5} x2={24 + Math.cos(a) * 19} y2={24 + Math.sin(a) * 19} />;
                })}
              </svg>
            </div>
            <div className="leading-tight">
              <p className={cn("font-display font-bold text-xl tracking-tight", fontClass)}>{t("appName")}</p>
              <p className={cn("text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold", fontClass)}>{t("appTagline")}</p>
            </div>
          </Link>
          <div className="flex items-center gap-1.5">
            <Link to="/help" className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground">
              <HelpCircle className="h-4 w-4" /> {t("navHelp")}
            </Link>
            <Link to="/about" className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground">
              <Info className="h-4 w-4" /> {t("navAbout")}
            </Link>
            <LanguageSwitcher size="sm" />
            <Link to={ctaTo}>
              <Button variant="hero" size="sm" className="hidden sm:inline-flex">
                {user ? t("landingSignedIn") : t("landingCtaPrimary")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <LandingHero />

      {/* SCROLLING QUOTE — editorial cream ticker with live dot + author chip */}
      <section className="bg-secondary border-y border-border overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-3 sm:gap-4 py-2">
            {/* Left: LIVE label with pulse dot */}
            <div className="hidden sm:inline-flex items-center gap-1.5 shrink-0 rounded-full bg-background border border-border px-2.5 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className={cn("text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/70", fontClass)}>
                Voices
              </span>
            </div>

            {/* Quote glyph */}
            <span className="hidden sm:inline-block font-display text-xl text-accent leading-none -mt-1 shrink-0" aria-hidden>“</span>

            {/* Marquee */}
            <div
              className="relative flex-1 overflow-hidden"
              aria-label="A new generation of leadership is changing how Surat's villages solve problems — faster, smarter, and with real accountability. — Mehul Patel"
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-secondary to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-secondary to-transparent z-10" />

              <div className="flex whitespace-nowrap">
                <div className="flex shrink-0 animate-marquee">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "text-[11px] sm:text-xs tracking-wide pr-10 inline-flex items-center gap-2.5 text-foreground/70",
                        fontClass,
                      )}
                    >
                      A new generation of leadership is changing how Surat's villages solve problems — faster, smarter, and with real accountability.
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-2 py-0.5">
                        <span className="h-1 w-1 rounded-full bg-accent" />
                        <span className="text-foreground font-semibold">Mehul Patel</span>
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD THE APP */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl py-20 sm:py-28 text-center">
          <LaunchCountdown target={LAUNCH_DATE} fontClass={fontClass} />
          <h2 className={cn("font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mt-3", fontClass)}>
            Download the App
          </h2>
          <p className={cn("mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto", fontClass)}>
            Available on App Store and Google Play. Built for every citizen of Surat.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {/* App Store badge */}
            <a
              href="#"
              aria-label="Download on the App Store"
              className="group inline-flex items-center gap-3 rounded-2xl bg-foreground text-background px-6 py-3.5 hover:opacity-90 transition-opacity min-w-[200px]"
            >
              <svg viewBox="0 0 24 24" className="h-9 w-9 shrink-0" fill="currentColor" aria-hidden>
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <div className="text-left leading-tight">
                <p className="text-[10px] font-medium opacity-80">Download on the</p>
                <p className="text-xl font-semibold tracking-tight -mt-0.5">App Store</p>
              </div>
            </a>

            {/* Google Play badge */}
            <a
              href="#"
              aria-label="Get it on Google Play"
              className="group inline-flex items-center gap-3 rounded-2xl bg-foreground text-background px-6 py-3.5 hover:opacity-90 transition-opacity min-w-[200px]"
            >
              <svg viewBox="0 0 512 512" className="h-9 w-9 shrink-0" aria-hidden>
                <path fill="#00C3FF" d="M48.5 16.4C39.4 21 33 30.6 33 42v428c0 11.4 6.4 21 15.5 25.6L284.7 256 48.5 16.4z"/>
                <path fill="#FFD400" d="M421.6 207.7l-72.4-41.8-79.4 90.1 79.4 90.1 72.4-41.8c25.7-14.8 25.7-51.8 0-66.6z"/>
                <path fill="#FF3A44" d="M349.2 165.9L83.7 14.6C71.4 7.6 56.7 9.7 46.7 19.7L284.7 256l64.5-90.1z"/>
                <path fill="#00E676" d="M284.7 256L46.7 492.3c10 10 24.7 12.1 37 5.1l265.5-151.3-64.5-90.1z"/>
              </svg>
              <div className="text-left leading-tight">
                <p className="text-[10px] font-medium opacity-80">GET IT ON</p>
                <p className="text-xl font-semibold tracking-tight -mt-0.5">Google Play</p>
              </div>
            </a>
          </div>

          <p className={cn("mt-6 text-xs text-muted-foreground", fontClass)}>
            Free download · Verified by Aadhaar · Available in English, Hindi & Gujarati
          </p>
        </div>
      </section>

      <LandingWhatIs />
      <LandingWhyJoin />

      {/* HOW IT WORKS — clean horizontal timeline, no boxed cards */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-6 max-w-6xl py-24 sm:py-32">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className={cn("type-eyebrow text-accent mb-4", fontClass)}>How it works</p>
            <h2 className={cn("type-display-xl text-foreground", fontClass)}>
              {t("landingHowTitle")}
            </h2>
          </div>

          {/* Connected timeline */}
          <ol className="relative grid md:grid-cols-3 gap-12 md:gap-8">
            {/* Connecting line — desktop only */}
            <div
              className="hidden md:block absolute top-7 left-[16.66%] right-[16.66%] h-px bg-border"
              aria-hidden="true"
            />
            {steps.map(({ icon: Icon, title, body }, i) => (
              <li key={i} className="relative text-center md:px-4">
                {/* Numeral on the line */}
                <div className="relative z-10 mx-auto h-14 w-14 rounded-full bg-background border border-border flex items-center justify-center mb-6">
                  <span className={cn("font-display tabular-nums text-xl font-semibold text-foreground", fontClass)}>
                    {i + 1}
                  </span>
                </div>
                <Icon className="h-6 w-6 text-accent mx-auto mb-4" strokeWidth={1.75} />
                <h3 className={cn("type-display-sm text-foreground mb-3", fontClass)}>{title}</h3>
                <p className={cn("type-body text-muted-foreground max-w-xs mx-auto", fontClass)}>{body}</p>
              </li>
            ))}
          </ol>

          <div className="text-center mt-20">
            <Link to={ctaTo}>
              <Button variant="hero" size="xl" className="h-14 px-8 text-base rounded-full">
                {user ? t("landingSignedIn") : t("landingCtaPrimary")} <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <LandingServices />
      <LandingTrust />
      <LandingFinalCta />

      {/* FOOTER */}
      <footer className="border-t border-border bg-background text-foreground">
        <div className="container mx-auto px-6 max-w-6xl py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <p className={cn("font-display text-xl font-semibold tracking-tight text-foreground", fontClass)}>
                {t("appName")}
              </p>
              <p className={cn("type-body-sm text-muted-foreground mt-3 max-w-xs", fontClass)}>
                The work of the people — for Surat's villages and wards.
              </p>
            </div>

            {/* Directory column */}
            <div>
              <p className={cn("type-eyebrow text-foreground mb-4", fontClass)}>Ward Directory</p>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/directory" className={cn("type-body-sm text-muted-foreground hover:text-foreground transition-colors", fontClass)}>
                    All 30 SMC wards
                  </Link>
                </li>
                <li>
                  <Link to="/directory#ward-3" className={cn("type-body-sm text-muted-foreground hover:text-foreground transition-colors", fontClass)}>
                    Varaccha · Sarthana · Simada
                  </Link>
                </li>
                <li>
                  <Link to="/directory#ward-10" className={cn("type-body-sm text-muted-foreground hover:text-foreground transition-colors", fontClass)}>
                    Adajan · Pal · Ichhapor
                  </Link>
                </li>
                <li>
                  <Link to="/directory#ward-21" className={cn("type-body-sm text-muted-foreground hover:text-foreground transition-colors", fontClass)}>
                    Athwa · Piplod · Nanpura
                  </Link>
                </li>
                <li>
                  <Link to="/directory#ward-30" className={cn("type-body-sm text-muted-foreground hover:text-foreground transition-colors", fontClass)}>
                    Sachin · Unn · Kansad
                  </Link>
                </li>
                <li>
                  <Link to="/directory" className={cn("type-body-sm text-accent font-medium hover:underline", fontClass)}>
                    See all wards →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <p className={cn("type-eyebrow text-foreground mb-4", fontClass)}>Jan Kaam</p>
              <ul className="space-y-2.5">
                <li><Link to="/about" className={cn("type-body-sm text-muted-foreground hover:text-foreground transition-colors", fontClass)}>{t("navAbout")}</Link></li>
                <li><Link to="/help" className={cn("type-body-sm text-muted-foreground hover:text-foreground transition-colors", fontClass)}>{t("navHelp")}</Link></li>
                <li><Link to={ctaTo} className={cn("type-body-sm text-muted-foreground hover:text-foreground transition-colors", fontClass)}>{t("landingCtaPrimary")}</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className={cn("type-eyebrow text-foreground mb-4", fontClass)}>Get in touch</p>
              <ul className="space-y-2.5">
                <li className={cn("type-body-sm text-muted-foreground", fontClass)}>Surat District, Gujarat</li>
                <li><a href="tel:112" className={cn("type-body-sm text-muted-foreground hover:text-foreground transition-colors", fontClass)}>Emergency · 112</a></li>
                <li><a href="mailto:hello@jankaam.in" className={cn("type-body-sm text-muted-foreground hover:text-foreground transition-colors", fontClass)}>hello@jankaam.in</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className={cn("type-caption whitespace-pre-line", fontClass)}>{t("landingFooterTagline")}</p>
            <p className={cn("type-caption tabular-nums", fontClass)}>© {new Date().getFullYear()} Jan Kaam</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
