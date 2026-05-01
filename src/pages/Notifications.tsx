import { useLanguage } from "@/context/LanguageContext";
import { useTickets } from "@/context/TicketsContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const Notifications = () => {
  const { t, fontClass } = useLanguage();
  const { notifications, markAllRead } = useTickets();

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className={cn("font-display text-2xl font-black", fontClass)}>{t("notifTitle")}</h1>
        <Button variant="ghost" size="sm" onClick={markAllRead}>{t("notifClear")}</Button>
      </div>
      {notifications.length === 0 ? (
        <p className={cn("text-sm text-muted-foreground bg-secondary/40 rounded-2xl p-5 text-center", fontClass)}>{t("notifNone")}</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n) => {
            const Wrapper = n.ticketId ? Link : "div";
            const props = n.ticketId ? { to: `/tickets/${n.ticketId}` as string } : {};
            return (
              <li key={n.id}>
                {/* @ts-expect-error union */}
                <Wrapper {...props} className={cn("block rounded-2xl bg-card p-4 border-l-4 border-2 border-border shadow-soft",
                  n.kind === "broadcast" ? "border-l-accent" : "border-l-primary",
                  !n.read && "ring-2 ring-primary/20")}>
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className={cn("font-bold text-sm", fontClass)}>{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </Wrapper>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
