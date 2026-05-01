import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { MapPin, ArrowRight, Building2 } from "lucide-react";

interface Ward {
  number: number;
  /** Pipe-separated locality string from official SMC ward map */
  localities: string;
}

const WARDS: Ward[] = [
  { number: 1,  localities: "Jahagirpura · Variyav · Chhaprabhatha · Kosad" },
  { number: 2,  localities: "Amroli · Mota Varachha · Kathor" },
  { number: 3,  localities: "Varaccha · Sarthana · Simada · Laskana" },
  { number: 4,  localities: "Kapodra" },
  { number: 5,  localities: "Fulpada · Ashwanikumar" },
  { number: 6,  localities: "Katargam" },
  { number: 7,  localities: "Katargam · Ved" },
  { number: 8,  localities: "Dabholi · Siganpor" },
  { number: 9,  localities: "Rander · Jahagirabad · Palanpur" },
  { number: 10, localities: "Adajan · Pal · Ichhapor" },
  { number: 11, localities: "Adajan · Gorat" },
  { number: 12, localities: "Nanavat · Saiyadpura · Kubernagar · Mahidharpura" },
  { number: 13, localities: "Wadifaliya · Navapura · Begampura · Salabatpura" },
  { number: 14, localities: "Umarwada · Matawadi" },
  { number: 15, localities: "Karanj · Magob" },
  { number: 16, localities: "Puna (West)" },
  { number: 17, localities: "Puna (East)" },
  { number: 18, localities: "Limbayat · Parvat · Kumbhariya" },
  { number: 19, localities: "Anjana · Dumbhal" },
  { number: 20, localities: "Khatodara · Majura · Sagrampura" },
  { number: 21, localities: "Sonifaliya · Nanpura · Athwa · Piplod" },
  { number: 22, localities: "Bhatar · Vesu · Dumas" },
  { number: 23, localities: "Bamroli · Udhana (North)" },
  { number: 24, localities: "Udhana (South)" },
  { number: 25, localities: "Limbayat · Udhana Yard" },
  { number: 26, localities: "Godadra · Dindoli (North)" },
  { number: 27, localities: "Dindoli (South)" },
  { number: 28, localities: "Pandesara · Bhestan" },
  { number: 29, localities: "Althan · Bamroli · Vadod" },
  { number: 30, localities: "Kansad · Sachin · Unn · Abhava" },
];

const Directory = () => {
  const { fontClass } = useLanguage();

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container mx-auto max-w-5xl px-6 py-20 sm:py-24 text-center">
          <p className={cn("type-eyebrow text-accent mb-4", fontClass)}>Directory</p>
          <h1 className={cn("type-display-xl text-foreground", fontClass)}>
            Surat Municipal Corporation
          </h1>
          <p className={cn("type-body-lg text-muted-foreground mt-5 max-w-2xl mx-auto", fontClass)}>
            All 30 official SMC wards and the localities they cover. Find your ward to route complaints to the right office.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-background border border-border px-4 py-2">
            <Building2 className="h-4 w-4 text-accent" strokeWidth={1.75} />
            <span className={cn("text-sm font-medium tabular-nums", fontClass)}>30 wards · 100+ localities</span>
          </div>
        </div>
      </section>

      {/* Wards list */}
      <section>
        <div className="container mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-px border-y border-border">
            {WARDS.map((w) => (
              <li
                key={w.number}
                className="group flex items-start gap-5 py-5 border-b border-border sm:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <span
                  className={cn(
                    "shrink-0 w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center",
                    "font-display font-semibold text-foreground tabular-nums text-lg",
                    "group-hover:bg-accent group-hover:text-accent-foreground transition-colors",
                    fontClass,
                  )}
                  aria-label={`Ward ${w.number}`}
                >
                  {String(w.number).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0 pt-1">
                  <p className={cn("type-eyebrow text-muted-foreground mb-1", fontClass)}>Ward {w.number}</p>
                  <p className={cn("type-body text-foreground leading-snug", fontClass)}>
                    {w.localities}
                  </p>
                </div>
                <MapPin className="h-4 w-4 text-muted-foreground/60 shrink-0 mt-2 group-hover:text-accent transition-colors" strokeWidth={1.75} />
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-16 rounded-3xl bg-secondary/60 border border-border p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className={cn("type-display-sm text-foreground", fontClass)}>
                Don't see your locality?
              </h2>
              <p className={cn("type-body text-muted-foreground mt-2", fontClass)}>
                Report it anyway — Jan Kaam will auto-route to the nearest ward office and notify you when it's assigned.
              </p>
            </div>
            <Link
              to="/onboarding"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 h-11 text-sm font-medium hover:bg-foreground/85 transition-colors"
            >
              Report an issue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Directory;
