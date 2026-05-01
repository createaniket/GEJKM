import { Link, NavLink, Outlet } from "react-router-dom";
import { Home, Inbox, Calendar, Bell, LogOut } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useTickets } from "@/context/TicketsContext";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";

const AppShell = () => {
  const { t, fontClass } = useLanguage();
  const { user, signOut } = useAuth();
  const { unreadCount } = useTickets();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Apple-style top nav: thin, quiet, hairline border */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-12 items-center justify-between px-6 gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className={cn("font-display font-semibold text-lg tracking-tight text-foreground", fontClass)}>
              {t("appName")}
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-7">
            {user && (
              <>
                <NavLink to="/tickets" className={({ isActive }) => cn("text-xs font-medium transition-colors", isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                  {t("tabTickets")}
                </NavLink>
                <NavLink to="/schedules" className={({ isActive }) => cn("text-xs font-medium transition-colors", isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                  {t("tabSchedules")}
                </NavLink>
                <NavLink to="/notifications" className={({ isActive }) => cn("text-xs font-medium transition-colors relative", isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                  {t("tabNotifications")}
                  {!!unreadCount && (
                    <span className="absolute -top-1 -right-3 h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                </NavLink>
              </>
            )}
            <NavLink to="/about" className={({ isActive }) => cn("text-xs font-medium transition-colors", isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {t("navAbout")}
            </NavLink>
            <NavLink to="/help" className={({ isActive }) => cn("text-xs font-medium transition-colors", isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {t("navHelp")}
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher size="sm" />
            {!user && (
              <Link to="/onboarding">
                <Button size="sm" className="rounded-full font-medium h-8 px-4 text-xs bg-foreground text-background hover:bg-foreground/85">
                  Join Today
                </Button>
              </Link>
            )}
            {user && (
              <button onClick={signOut} aria-label={t("signOut")} className="text-muted-foreground hover:text-foreground transition-colors">
                <LogOut className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className={cn("flex-1", user ? "pb-20 sm:pb-0" : "")}>
        <Outlet />
      </main>

      {/* Mobile-only bottom tab bar — quiet, frosted */}
      {user && (
        <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/85 backdrop-blur-xl">
          <div className="container mx-auto grid grid-cols-4">
            {[
              { to: "/", icon: Home, key: "tabHome" as const },
              { to: "/tickets", icon: Inbox, key: "tabTickets" as const },
              { to: "/schedules", icon: Calendar, key: "tabSchedules" as const },
              { to: "/notifications", icon: Bell, key: "tabNotifications" as const, badge: unreadCount },
            ].map(({ to, icon: Icon, key, badge }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  cn("flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium relative transition-colors",
                     isActive ? "text-foreground" : "text-muted-foreground")
                }
              >
                <span className="relative">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                  {!!badge && (
                    <span className="absolute -top-1 -right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                </span>
                <span className={fontClass}>{t(key)}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};

export default AppShell;
