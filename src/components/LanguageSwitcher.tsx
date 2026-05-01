import { useLanguage, type Lang } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const labels: Record<Lang, { short: string; long: string; font: string }> = {
  gu: { short: "ગુ", long: "ગુજરાતી",  font: "font-gujarati" },
  hi: { short: "हि", long: "हिन्दी",   font: "font-hindi" },
  en: { short: "En", long: "English",   font: "" },
};

const order: Lang[] = ["gu", "hi", "en"];

interface Props {
  size?: "sm" | "md";
  showLong?: boolean;
  className?: string;
}

/**
 * Apple-style segmented language switcher.
 * Three always-visible options — one tap to change, no menus.
 */
const LanguageSwitcher = ({ size = "md", showLong = false, className }: Props) => {
  const { lang, setLang } = useLanguage();

  const padX = size === "sm" ? "px-2.5" : "px-3.5";
  const height = size === "sm" ? "h-8" : "h-9";
  const fs = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div
      role="radiogroup"
      aria-label="Language"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full bg-secondary p-1 border border-border",
        className,
      )}
    >
      {order.map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            role="radio"
            aria-checked={active}
            onClick={() => setLang(l)}
            className={cn(
              "inline-flex items-center justify-center rounded-full transition-all font-medium tabular-nums",
              height, padX, fs, labels[l].font,
              active
                ? "bg-background text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {showLong ? labels[l].long : labels[l].short}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
