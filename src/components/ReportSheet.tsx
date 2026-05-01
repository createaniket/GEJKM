import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { categories, findCategory, toneClasses } from "@/data/categories";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth, tierRank } from "@/context/AuthContext";
import { useTickets } from "@/context/TicketsContext";
import { triage, priorityMeta } from "@/lib/triage";
import { ArrowLeft, ArrowRight, MapPin, Mic, Camera, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props { open: boolean; onOpenChange: (v: boolean) => void; initialCategoryId?: string; }

const ReportSheet = ({ open, onOpenChange, initialCategoryId }: Props) => {
  const { t, lang, fontClass } = useLanguage();
  const { user } = useAuth();
  const { createTicket } = useTickets();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [subcategoryEn, setSubcategoryEn] = useState<string | undefined>();
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | undefined>();
  const [area, setArea] = useState("");
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (open && initialCategoryId) {
      setCategoryId(initialCategoryId);
    }
    if (!open) {
      setTimeout(() => { setStep(1); setCategoryId(undefined); setSubcategoryEn(undefined); setDescription(""); setPhotos([]); setCoords(undefined); setArea(""); }, 300);
    }
  }, [open, initialCategoryId]);

  const cat = findCategory(categoryId);
  const triagePreview = useMemo(() => (cat && description.length > 5 ? triage(cat.id, description) : null), [cat, description]);

  const onPickCategory = (id: string) => {
    const c = findCategory(id)!;
    if (user && tierRank[user.tier] < tierRank[c.minTier]) {
      toast.error(c.minTier === "gold" ? t("errTierGold") : t("errTierLow"));
      return;
    }
    setCategoryId(id); setSubcategoryEn(undefined);
  };

  const handlePhotos = (files: FileList | null) => {
    if (!files) return;
    const slots = 3 - photos.length;
    Array.from(files).slice(0, slots).forEach((f) => {
      const r = new FileReader();
      r.onload = () => setPhotos((p) => [...p, r.result as string]);
      r.readAsDataURL(f);
    });
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setArea((a) => a || `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 8000 },
    );
  };

  const submit = () => {
    if (!user || !categoryId) return;
    if (description.trim().length < 10) { toast.error(t("errDesc")); return; }
    if (area.trim().length < 2) { toast.error(t("errVillage")); return; }
    const res = createTicket({ userId: user.phone, categoryId, subcategoryEn, description: description.trim(), area: area.trim(), coords, photos });
    if ("error" in res) { toast.error(t("errRateLimit")); return; }
    toast.success(t("reportSubmitted"), { description: `${res.ticket.id} · ${res.triage.priority}` });
    onOpenChange(false);
    navigate(`/tickets/${res.ticket.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto p-0">
        <div className="p-5 border-b-2 border-border sticky top-0 bg-card z-10 flex items-center gap-3">
          {step === 2 && (
            <button onClick={() => setStep(1)} aria-label="Back"><ArrowLeft className="h-5 w-5" /></button>
          )}
          <div>
            <p className="text-xs uppercase font-bold text-accent">Step {step}/2</p>
            <h2 className={cn("font-display text-xl font-black", fontClass)}>{step === 1 ? t("reportStep1") : t("reportStep2")}</h2>
          </div>
        </div>

        {step === 1 && (
          <div className="p-5 space-y-5">
            <p className={cn("text-sm text-muted-foreground", fontClass)}>{t("reportStep1Sub")}</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {categories.map((c) => {
                const Icon = c.icon;
                const tone = toneClasses[c.tone];
                const active = categoryId === c.id;
                return (
                  <button key={c.id} onClick={() => onPickCategory(c.id)}
                    className={cn("rounded-2xl border-2 p-3 text-left flex flex-col items-start gap-2 transition-all hover:-translate-y-0.5",
                      active ? "border-primary ring-4 ring-primary/20" : "border-border")}>
                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", tone.bg, tone.text)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={cn("text-xs font-bold leading-tight", fontClass)}>{c.label[lang]}</span>
                  </button>
                );
              })}
            </div>

            {cat && cat.subcategories.length > 0 && (
              <div>
                <Label className={cn("text-sm", fontClass)}>{t("reportSubcat")}</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {cat.subcategories.map((s) => (
                    <button key={s.en} onClick={() => setSubcategoryEn(s.en)}
                      className={cn("rounded-full border-2 px-3 py-1.5 text-sm font-semibold",
                        subcategoryEn === s.en ? "border-primary bg-primary/10" : "border-border")}>
                      {s[lang]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <Label className={cn("text-sm", fontClass)}>{t("reportDesc")}</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} maxLength={600} placeholder={t("reportDescPh")} className="mt-1 border-2" />
              <p className="text-xs text-muted-foreground text-right mt-1">{description.length}/600</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <label className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-border px-3 py-2 cursor-pointer hover:border-accent">
                <Camera className="h-4 w-4" />
                <span className={cn("text-sm font-semibold", fontClass)}>{t("reportPhotos")}</span>
                <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => handlePhotos(e.target.files)} />
              </label>
              <button disabled className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-border px-3 py-2 opacity-50">
                <Mic className="h-4 w-4" />
                <span className={cn("text-sm font-semibold", fontClass)}>{t("reportVoice")}</span>
              </button>
            </div>
            {photos.length > 0 && (
              <div className="flex gap-2">
                {photos.map((p, i) => <img key={i} src={p} alt="" className="h-16 w-16 rounded-lg object-cover border" />)}
              </div>
            )}

            <Button variant="hero" size="xl" className="w-full h-14" onClick={() => { if (!cat) { toast.error(t("errCategory")); return; } if (description.trim().length < 10) { toast.error(t("errDesc")); return; } setStep(2); }}>
              {t("reportNext")} <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="p-5 space-y-5">
            <p className={cn("text-sm text-muted-foreground", fontClass)}>{t("reportStep2Sub")}</p>

            <div className="rounded-2xl border-2 border-border overflow-hidden bg-secondary/30">
              <div className="aspect-video bg-[radial-gradient(circle_at_center,hsl(var(--primary)/.15),transparent_60%)] flex items-center justify-center relative">
                <MapPin className="h-12 w-12 text-primary" />
                {coords && <p className="absolute bottom-2 left-2 right-2 text-xs bg-card/80 rounded px-2 py-1">{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</p>}
              </div>
              <div className="p-3 flex gap-2">
                <Button variant="outline" size="sm" onClick={useMyLocation} disabled={locating} className="flex-1">
                  <MapPin className="h-4 w-4" /> {locating ? t("reportLocating") : t("reportUseGps")}
                </Button>
              </div>
            </div>

            <div>
              <Label className={cn("text-sm", fontClass)}>{t("onbVillage")}</Label>
              <Input value={area} onChange={(e) => setArea(e.target.value)} placeholder={user?.village} className="mt-1 h-12 border-2" />
            </div>

            {triagePreview && (
              <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className={cn("text-xs uppercase font-bold tracking-wide text-primary", fontClass)}>{t("reportTriagePreview")}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className={cn("px-2 py-1 rounded-full font-bold", priorityMeta[triagePreview.priority].classes)}>{priorityMeta[triagePreview.priority].label}</span>
                  <span className="px-2 py-1 rounded-full bg-card border-2 border-border font-semibold">{triagePreview.department}</span>
                  {triagePreview.secondaryDepartments.map((d) => (
                    <span key={d} className="px-2 py-1 rounded-full bg-card border border-dashed border-border text-muted-foreground">+ {d}</span>
                  ))}
                </div>
                <p className="text-xs text-foreground/80">{triagePreview.reason}</p>
              </div>
            )}

            <Button variant="hero" size="xl" className="w-full h-14" onClick={submit}>{t("reportSubmit")}</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReportSheet;
