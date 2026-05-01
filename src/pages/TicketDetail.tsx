import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTickets } from "@/context/TicketsContext";
import { findCategory } from "@/data/categories";
import { priorityMeta } from "@/lib/triage";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Star, Sparkles, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const TicketDetail = () => {
  const { id } = useParams();
  const { t, lang, fontClass } = useLanguage();
  const { tickets, advanceStatus, rateTicket } = useTickets();
  const tk = tickets.find((x) => x.id === id);
  const [hover, setHover] = useState(0);

  if (!tk) return <div className="p-6 text-center"><Link to="/tickets" className="text-primary underline">← Back</Link></div>;

  const cat = findCategory(tk.categoryId);
  const pm = priorityMeta[tk.priority];

  const steps = [
    { key: "submitted", label: t("stSubmitted"), at: tk.createdAt },
    { key: "acknowledged", label: t("stAcknowledged"), at: tk.acknowledgedAt },
    { key: "in-progress", label: t("stInProgress"), at: tk.inProgressAt },
    { key: "resolved", label: t("stResolved"), at: tk.resolvedAt },
  ] as const;
  const idx = steps.findIndex((s) => s.key === tk.status);

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <Link to="/tickets" className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground"><ArrowLeft className="h-4 w-4" /> {t("reportBack")}</Link>

      <div className="rounded-2xl border-2 border-border bg-card p-5 shadow-soft mb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-xs text-muted-foreground">{tk.id}</p>
            <h1 className={cn("font-display text-2xl font-black", fontClass)}>{cat?.label[lang]}</h1>
            {tk.subcategoryEn && <p className="text-sm text-muted-foreground">{tk.subcategoryEn}</p>}
          </div>
          <span className={cn("text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap", pm.classes)}>{pm.label}</span>
        </div>
        <p className={cn("text-sm text-foreground/80 mb-3", fontClass)}>{tk.description}</p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div><p className="text-muted-foreground">{t("department")}</p><p className="font-semibold">{tk.department}</p></div>
          <div><p className="text-muted-foreground">{t("assignedOfficer")}</p><p className="font-semibold">{tk.officer}</p></div>
          <div><p className="text-muted-foreground">{t("slaResponse")}</p><p className="font-semibold">{tk.slaHours === 0 ? t("immediate") : `${tk.slaHours}${t("hours")}`}</p></div>
          <div><p className="text-muted-foreground">📍</p><p className="font-semibold truncate">{tk.area}</p></div>
        </div>
        {tk.secondaryDepartments.length > 0 && (
          <p className="mt-3 text-xs text-muted-foreground">{t("alsoNotified")}: {tk.secondaryDepartments.join(", ")}</p>
        )}
      </div>

      <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-4 mb-4 flex gap-3">
        <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <p className={cn("text-sm text-foreground/80", fontClass)}>{tk.firstResponse}</p>
      </div>

      <div className="rounded-2xl border-2 border-border bg-card p-5 mb-4">
        <h2 className={cn("font-display text-lg font-black mb-3", fontClass)}>{t("timeline")}</h2>
        <ol className="space-y-3">
          {steps.map((s, i) => {
            const done = i < idx;
            const current = i === idx;
            return (
              <li key={s.key} className="flex items-start gap-3">
                {done ? <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" /> :
                 current ? <Loader2 className="h-5 w-5 text-primary shrink-0 mt-0.5 animate-spin" /> :
                 <Circle className="h-5 w-5 text-muted-foreground/50 shrink-0 mt-0.5" />}
                <div>
                  <p className={cn("font-semibold text-sm", current ? "text-primary" : done ? "text-foreground" : "text-muted-foreground", fontClass)}>{s.label}</p>
                  {s.at && <p className="text-xs text-muted-foreground">{new Date(s.at).toLocaleString()}</p>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button variant="outline" size="sm" asChild><a href={`tel:${cat?.helpline}`}><Phone className="h-4 w-4" /> {t("callDept")}</a></Button>
        {tk.status !== "resolved" && (
          <Button variant="secondary" size="sm" onClick={() => advanceStatus(tk.id, "resolved")}>{t("demoResolve")}</Button>
        )}
      </div>

      {tk.status === "resolved" && (
        <div className="rounded-2xl border-2 border-success/30 bg-success/5 p-5 text-center">
          <p className={cn("font-bold mb-3", fontClass)}>{tk.rating ? t("thanksFeedback") : t("rateExperience")}</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => rateTicket(tk.id, n)}>
                <Star className={cn("h-8 w-8", (tk.rating ?? hover) >= n ? "fill-warning text-warning" : "text-muted-foreground")} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetail;
