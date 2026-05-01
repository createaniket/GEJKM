import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useTickets } from "@/context/TicketsContext";
import { findCategory } from "@/data/categories";
import { priorityMeta } from "@/lib/triage";
import { cn } from "@/lib/utils";

const Tickets = () => {
  const { t, lang, fontClass } = useLanguage();
  const { user } = useAuth();
  const { tickets } = useTickets();
  const mine = tickets.filter((tk) => tk.userId === user?.phone);

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className={cn("font-display text-2xl font-black mb-4", fontClass)}>{t("tabTickets")}</h1>
      {mine.length === 0 ? (
        <p className={cn("text-sm text-muted-foreground bg-secondary/40 rounded-2xl p-5", fontClass)}>{t("noTickets")}</p>
      ) : (
        <ul className="space-y-3">
          {mine.map((tk) => {
            const cat = findCategory(tk.categoryId);
            const Icon = cat?.icon;
            const pm = priorityMeta[tk.priority];
            return (
              <li key={tk.id}>
                <Link to={`/tickets/${tk.id}`} className="flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-4 hover:border-accent transition-colors shadow-soft">
                  {Icon && <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0"><Icon className="h-6 w-6" /></div>}
                  <div className="flex-1 min-w-0">
                    <p className={cn("font-bold truncate", fontClass)}>{cat?.label[lang]}</p>
                    <p className="text-xs text-muted-foreground truncate">{tk.id} · {tk.area} · {tk.status}</p>
                  </div>
                  <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full shrink-0", pm.classes)}>{tk.priority}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Tickets;
