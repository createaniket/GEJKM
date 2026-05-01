import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage, type Lang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Phone, Languages, Award, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ApiError } from "@/lib/api";

type Step = "lang" | "phone" | "password" | "aadhaar";

const Onboarding = () => {
  const { t, lang, setLang, fontClass } = useLanguage();
  const { signInWithPassword, upgradeTier, user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>(user ? "aadhaar" : "lang");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [password, setPassword] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [dob, setDob] = useState("");
  const [name, setName] = useState(user?.name ?? "");
  const [village, setVillage] = useState(user?.village ?? "");
  const [err, setErr] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const choose = (l: Lang) => { setLang(l); setStep("phone"); };

  const goToPassword = () => {
    if (!/^[6-9]\d{9}$/.test(phone)) return setErr({ phone: t("errPhone") });
    setErr({}); setStep("password");
  };

  const submitPassword = async () => {
    const errs: Record<string, string> = {};
    if (password.length < 8) errs.password = t("errPassword");
    if (name.trim().length < 2) errs.name = t("errName");
    if (village.trim().length < 2) errs.village = t("errVillage");
    if (Object.keys(errs).length) return setErr(errs);

    setErr({}); setSubmitting(true);
    try {
      await signInWithPassword({
        phone,
        password,
        name: name.trim(),
        village: village.trim(),
        tier: "bronze",
      });
      setStep("aadhaar");
    } catch (e) {
      const msg =
        e instanceof ApiError
          ? typeof e.message === "string" && e.message
            ? e.message
            : t("errAuth")
          : t("errAuth");
      setErr({ password: msg });
    } finally {
      setSubmitting(false);
    }
  };

  const finishBronze = () => {
    // Already signed in via backend at password step; just go home.
    navigate("/");
  };

  const verifyAadhaar = () => {
    const errs: Record<string, string> = {};
    if (!/^\d{12}$/.test(aadhaar.replace(/\s/g, ""))) errs.aadhaar = t("errAadhaar");
    if (Object.keys(errs).length) return setErr(errs);
    setErr({});
    upgradeTier("silver", { aadhaarLast4: aadhaar.replace(/\s/g, "").slice(-4) });
    navigate("/");
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <div className="rounded-3xl bg-card border-2 border-border shadow-soft p-6 space-y-5">
        {step === "lang" && (
          <>
            <div className="text-center space-y-2">
              <Languages className="h-10 w-10 mx-auto text-primary" />
              <h1 className={cn("font-display text-2xl font-black", fontClass)}>{t("onbLangTitle")}</h1>
              <p className={cn("text-sm text-muted-foreground", fontClass)}>{t("onbLangSub")}</p>
            </div>
            <div className="grid gap-3">
              {(["en", "hi", "gu"] as Lang[]).map((l) => (
                <button key={l} onClick={() => choose(l)}
                  className={cn("rounded-2xl border-2 p-4 text-left text-lg font-bold hover:border-accent transition-colors",
                    lang === l ? "border-primary bg-primary/5" : "border-border")}>
                  {l === "en" ? "English" : l === "hi" ? "हिन्दी" : "ગુજરાતી"}
                </button>
              ))}
            </div>
          </>
        )}

        {step === "phone" && (
          <>
            <Phone className="h-10 w-10 mx-auto text-primary" />
            <h1 className={cn("font-display text-2xl font-black text-center", fontClass)}>{t("onbPhoneTitle")}</h1>
            <p className={cn("text-sm text-muted-foreground text-center", fontClass)}>{t("onbPhoneSub")}</p>
            <Input value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} maxLength={10} inputMode="numeric" placeholder="98XXXXXXXX" className="h-14 text-lg border-2" />
            {err.phone && <p className="text-sm text-destructive font-semibold">{err.phone}</p>}
            <Button variant="hero" size="xl" className="w-full h-14" onClick={goToPassword}>{t("onbSendOtp")}</Button>
          </>
        )}

        {step === "password" && (
          <>
            <ShieldCheck className="h-10 w-10 mx-auto text-primary" />
            <h1 className={cn("font-display text-2xl font-black text-center", fontClass)}>{t("onbPasswordTitle")}</h1>
            <p className={cn("text-sm text-muted-foreground text-center", fontClass)}>{t("onbPasswordSub")}</p>
            <div className="space-y-3">
              <div>
                <Label className={fontClass}>{t("onbName")}</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 h-12 border-2" />
                {err.name && <p className="text-sm text-destructive font-semibold mt-1">{err.name}</p>}
              </div>
              <div>
                <Label className={fontClass}>{t("onbVillage")}</Label>
                <Input value={village} onChange={(e) => setVillage(e.target.value)} className="mt-1 h-12 border-2" />
                {err.village && <p className="text-sm text-destructive font-semibold mt-1">{err.village}</p>}
              </div>
              <div>
                <Label className={fontClass}>{t("onbPasswordTitle")}</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("onbPasswordPlaceholder")}
                  className="mt-1 h-12 border-2"
                  autoComplete="current-password"
                />
                {err.password && <p className="text-sm text-destructive font-semibold mt-1">{err.password}</p>}
              </div>
            </div>
            <Button variant="hero" size="xl" className="w-full h-14" onClick={submitPassword} disabled={submitting}>
              {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : t("onbSignIn")}
            </Button>
          </>
        )}

        {step === "aadhaar" && (
          <>
            <Award className="h-10 w-10 mx-auto text-slate-500" />
            <h1 className={cn("font-display text-2xl font-black text-center", fontClass)}>{t("onbAadhaarTitle")}</h1>
            <p className={cn("text-sm text-muted-foreground", fontClass)}>{t("onbAadhaarSub")}</p>
            <div className="space-y-3">
              <div>
                <Label className={fontClass}>{t("onbAadhaarNumber")}</Label>
                <Input value={aadhaar} onChange={(e) => setAadhaar(e.target.value.replace(/[^\d ]/g, ""))} maxLength={14} inputMode="numeric" placeholder="XXXX XXXX XXXX" className="mt-1 h-12 border-2 tracking-wider" />
                {err.aadhaar && <p className="text-sm text-destructive font-semibold mt-1">{err.aadhaar}</p>}
              </div>
              <div>
                <Label className={fontClass}>{t("onbAadhaarDob")}</Label>
                <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="mt-1 h-12 border-2" />
              </div>
            </div>
            <Button variant="hero" size="xl" className="w-full h-14" onClick={verifyAadhaar}>{t("onbVerifyAadhaar")}</Button>
            <Button variant="ghost" size="lg" className="w-full" onClick={finishBronze}>{t("onbSkipAadhaar")}</Button>
          </>
        )}

      </div>
    </div>
  );
};

export default Onboarding;
