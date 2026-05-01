import type { Lang } from "@/context/LanguageContext";

export type Tri = { en: string; hi: string; gu: string };

export const tri = (lang: Lang, en: string, hi: string, gu: string) =>
  lang === "en" ? en : lang === "hi" ? hi : gu;

export const pick = (lang: Lang, t: Tri) => t[lang];
