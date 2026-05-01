import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useTickets } from "@/context/TicketsContext";
import { ArrowRight, Phone } from "lucide-react";
import { categories, findCategory } from "@/data/categories";
import { priorityMeta } from "@/lib/triage";
import ReportSheet from "@/components/ReportSheet";
import EventsWidget from "@/components/EventsWidget";
import { cn } from "@/lib/utils";

// Six everyday categories shown on the home tile grid
const FEATURED_IDS = ["roads", "water", "electricity", "drainage", "waste", "safety"];

const Home = () => {
  const { t, lang, fontClass } = useLanguage();
  const { user } = useAuth();
  const { tickets } = useTickets();
  const [open, setOpen] = useState(false);
  const [seedCategory, setSeedCategory] = useState<string | undefined>();

  const myTickets = useMemo(() => tickets.filter((tk) => tk.userId === user?.phone), [tickets, user]);
  const stats = {
    open: myTickets.filter((t) => t.status === "submitted" || t.status === "acknowledged").length,
    inProg: myTickets.filter((t) => t.status === "in-progress").length,
    done: myTickets.filter((t) => t.status === "resolved").length,
  };
  const recent = myTickets.slice(0, 3);

  const featured = categories
    .filter((c) => FEATURED_IDS.includes(c.id))
    .sort((a, b) => FEATURED_IDS.indexOf(a.id) - FEATURED_IDS.indexOf(b.id));

  const startReport = (id?: string) => { setSeedCategory(id); setOpen(true); };

  return (
    <div className="bg-background">
      {/* HERO — Apple-style oversized headline */}
      <section className="container mx-auto max-w-5xl px-6 pt-20 pb-24 text-center">
        <p className={cn("text-sm font-medium text-accent mb-5 tracking-tight", fontClass)}>
          Hello, Aniket.
        </p>
        <h1 className={cn("font-display text-foreground text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-balance", fontClass)}>
          Your village.<br />
          <span className="text-muted-foreground">Heard.</span>
        </h1>
        <p className={cn("mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-snug", fontClass)}>
          Report an issue in under a minute. Track it through to resolution.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6 gap-y-3 flex-wrap">
          <button
            onClick={() => startReport()}
            className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-7 h-12 text-base font-medium hover:bg-accent/90 transition-colors"
          >
            {t("reportFab")}
            <ArrowRight className="h-4 w-4" />
          </button>
          <Link to="/tickets" className={cn("text-accent font-medium hover:underline text-base", fontClass)}>
            View your tickets <span aria-hidden>›</span>
          </Link>
        </div>
      </section>

      {/* STATS — minimal three-up, only shown when there's data */}
      {(stats.open + stats.inProg + stats.done) > 0 && (
        <section className="border-t border-border">
          <div className="container mx-auto max-w-5xl px-6 py-16 grid grid-cols-3 gap-6 text-center">
            {[
              { v: stats.open, label: t("statOpen") },
              { v: stats.inProg, label: t("statInProgress") },
              { v: stats.done, label: t("statResolved") },
            ].map((s) => (
              <Link key={s.label} to="/tickets" className="group">
                <p className="font-display text-5xl sm:text-6xl font-semibold tracking-tight text-foreground tabular-nums">{s.v}</p>
                <p className={cn("mt-2 text-sm text-muted-foreground group-hover:text-accent transition-colors", fontClass)}>{s.label}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CATEGORY GRID — large product tiles */}
      <section className="border-t border-border bg-secondary/40">
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <div className="text-center mb-12">
            <h2 className={cn("font-display text-3xl sm:text-4xl font-semibold tracking-tight text-foreground", fontClass)}>
              {t("homePickProblem")}
            </h2>
            <p className={cn("mt-3 text-base text-muted-foreground", fontClass)}>{t("homePickSub")}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {featured.map((c) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => startReport(c.id)}
                  className="group text-left rounded-3xl bg-card p-7 sm:p-8 hover:shadow-elegant transition-all duration-300 flex flex-col gap-6 min-h-[200px]"
                >
                  <Icon className="h-9 w-9 text-foreground/80 group-hover:text-accent transition-colors" strokeWidth={1.5} />
                  <div className="mt-auto">
                    <p className={cn("font-display font-semibold text-xl tracking-tight text-foreground", fontClass)}>
                      {c.label[lang]}
                    </p>
                    <p className={cn("mt-1 text-sm text-muted-foreground", fontClass)}>
                      {t("reportFab")} <span aria-hidden className="text-accent">›</span>
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* EVENTS — culture, meetings & community drives */}
      <EventsWidget />

      {/* ALL SERVICES — full list of issues a villager can report */}
      <section id="services" className="border-t border-border bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className={cn("type-eyebrow text-accent mb-4", fontClass)}>All services</p>
            <h2 className={cn("type-display-lg text-foreground", fontClass)}>
              Everything your village can report.
            </h2>
            <p className={cn("type-body-lg text-muted-foreground mt-4", fontClass)}>
              {categories.length} departments. One app. Routed to the right officer, automatically.
            </p>
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <li key={c.id}>
                  <button
                    onClick={() => startReport(c.id)}
                    className="w-full text-left flex items-center gap-5 sm:gap-6 py-5 sm:py-6 group hover:bg-secondary/40 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl transition-colors"
                  >
                    <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-foreground/80 group-hover:text-accent transition-colors" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("type-display-sm text-foreground", fontClass)}>
                        {c.label[lang]}
                      </p>
                      <p className={cn("type-body-sm text-muted-foreground mt-1 line-clamp-1", fontClass)}>
                        {c.description[lang]}
                      </p>
                      <p className={cn("type-caption mt-1.5 hidden sm:block", fontClass)}>
                        {c.department} · Helpline {c.helpline}
                      </p>
                    </div>
                    <span className="hidden md:inline-flex items-center text-accent type-body-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      Report <ArrowRight className="ml-1.5 h-4 w-4" />
                    </span>
                    <ArrowRight className="md:hidden h-5 w-5 text-muted-foreground shrink-0" />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 text-center">
            <button
              onClick={() => startReport()}
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 h-12 text-base font-medium hover:bg-foreground/90 transition-colors"
            >
              Report any issue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* RECENT TICKETS */}
      {recent.length > 0 && (
        <section className="border-t border-border">
          <div className="container mx-auto max-w-3xl px-6 py-20">
            <h2 className={cn("font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-8 text-foreground", fontClass)}>
              {t("recentTickets")}
            </h2>
            <ul className="divide-y divide-border">
              {recent.map((tk) => {
                const cat = findCategory(tk.categoryId);
                const Icon = cat?.icon;
                const pm = priorityMeta[tk.priority];
                return (
                  <li key={tk.id}>
                    <Link to={`/tickets/${tk.id}`} className="flex items-center gap-4 py-5 hover:opacity-70 transition-opacity">
                      {Icon && <Icon className="h-6 w-6 text-foreground/70 shrink-0" strokeWidth={1.5} />}
                      <div className="flex-1 min-w-0">
                        <p className={cn("font-medium text-foreground truncate", fontClass)}>{cat?.label[lang]}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">{tk.id} · {tk.area}</p>
                      </div>
                      <span className={cn("text-[10px] font-semibold px-2.5 py-1 rounded-full", pm.classes)}>{tk.priority}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* EMERGENCY — small, restrained, at the bottom like an Apple safety footnote */}
      <section className="border-t border-border bg-background">
        <div className="container mx-auto max-w-3xl px-6 py-14 text-center">
          <p className={cn("text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium mb-3", fontClass)}>
            In an emergency
          </p>
          <a
            href="tel:112"
            className="inline-flex items-center gap-3 text-foreground hover:text-destructive transition-colors"
          >
            <Phone className="h-5 w-5" strokeWidth={1.75} />
            <span className="font-display text-3xl font-semibold tracking-tight">Call 112</span>
          </a>
          <p className={cn("mt-3 text-sm text-muted-foreground", fontClass)}>Fire · Police · Ambulance</p>
        </div>
      </section>

      <ReportSheet open={open} onOpenChange={setOpen} initialCategoryId={seedCategory} />
    </div>
  );
};

export default Home;
