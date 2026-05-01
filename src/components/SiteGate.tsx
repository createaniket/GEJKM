import { useState, FormEvent } from "react";
import { Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const GATE_USER = "jankaam";
const GATE_PASS = "surat2026";

export default function SiteGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === GATE_USER && password === GATE_PASS) {
      setError(null);
      setUnlocked(true);
    } else {
      setError("Incorrect username or password.");
    }
  };

  return (
    <>
      {/* Site content — blurred & non-interactive while gated */}
      <div
        aria-hidden={!unlocked}
        className={cn(
          "transition-all duration-500",
          !unlocked && "blur-xl scale-[1.02] pointer-events-none select-none overflow-hidden h-screen"
        )}
        // prevent scroll while gated
        style={!unlocked ? { maxHeight: "100vh", overflow: "hidden" } : undefined}
      >
        {children}
      </div>

      {!unlocked && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-title"
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/70 backdrop-blur-md" />

          {/* Card */}
          <div className="relative w-full max-w-md rounded-3xl bg-card border border-border shadow-elegant p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center">
                <Lock className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                  Phase 1 · Private preview
                </p>
                <h2 id="gate-title" className="font-display text-xl font-semibold tracking-tight mt-0.5">
                  Jan Kaam — early access
                </h2>
              </div>
            </div>

            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              This site is currently in a private preview. Enter your access credentials to continue.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="gate-user" className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Username
                </Label>
                <Input
                  id="gate-user"
                  type="text"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="gate-pass" className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="gate-pass"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-11"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" className="w-full h-12 mt-2">
                Unlock site
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-muted-foreground/70 text-center">
              Surat · Jan Kaam · Invite only
            </p>
          </div>
        </div>
      )}
    </>
  );
}
