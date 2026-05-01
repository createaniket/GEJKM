import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api, tokenStore, type ApiUser } from "@/lib/api";

export type Tier = "bronze" | "silver" | "gold";

export interface VerifiedUser {
  id?: string;                  // backend user id
  name: string;
  phone: string;
  village: string;
  tier: Tier;
  aadhaarLast4?: string;
  verifiedAt: string;
  role?: "user" | "admin";
}

interface Ctx {
  user: VerifiedUser | null;
  /** Legacy local sign-in (used by the Aadhaar step which has no backend route yet). */
  signIn: (u: VerifiedUser) => void;
  /** Authenticate against the backend. Tries login, falls back to signup. */
  signInWithPassword: (input: {
    phone: string;
    password: string;
    name?: string;
    village?: string;
    tier?: Tier;
  }) => Promise<VerifiedUser>;
  upgradeTier: (tier: Tier, extra?: Partial<VerifiedUser>) => void;
  signOut: () => void;
}

const AuthContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "gramsewa.user";

const fromApi = (u: ApiUser, fallback?: Partial<VerifiedUser>): VerifiedUser => ({
  id: u.id,
  name: u.name ?? fallback?.name ?? "",
  phone: u.phone,
  village: u.village ?? fallback?.village ?? "",
  tier: (u.tier as Tier | undefined) ?? fallback?.tier ?? "bronze",
  role: u.role,
  verifiedAt: new Date().toISOString(),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<VerifiedUser | null>(() => {
    if (typeof window === "undefined") return null;
    try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) as VerifiedUser : null; }
    catch { return null; }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
  }, [user]);

  const signIn = (u: VerifiedUser) => setUser(u);

  const signInWithPassword: Ctx["signInWithPassword"] = async (input) => {
    const res = await api.loginOrSignup({
      phone: input.phone,
      password: input.password,
      name: input.name,
      village: input.village,
      tier: input.tier ?? "bronze",
    });
    tokenStore.set(res.token);
    const next = fromApi(res.user, {
      name: input.name,
      village: input.village,
      tier: input.tier ?? "bronze",
    });
    setUser(next);
    return next;
  };

  const upgradeTier = (tier: Tier, extra: Partial<VerifiedUser> = {}) =>
    setUser((u) => (u ? { ...u, tier, ...extra } : u));

  const signOut = () => { tokenStore.clear(); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, signIn, signInWithPassword, upgradeTier, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const tierRank: Record<Tier, number> = { bronze: 0, silver: 1, gold: 2 };
