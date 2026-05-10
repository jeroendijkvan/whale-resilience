import { SPECIES } from "@/lib/species";
import { WhaleImage } from "./WhaleImage";
import Reveal from "./Reveal";

const TREND_LABEL = {
  recovering: { sym: "↑", label: "Recovering" },
  stable: { sym: "→", label: "Stable" },
  declining: { sym: "↓", label: "Declining" },
} as const;

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return Math.round(n / 1_000) + "k";
  return String(n);
}

export default function SpeciesCards() {
  return (
    <section id="species" className="relative py-28 md:py-36 px-6 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="text-[11px] uppercase tracking-[0.35em] text-ink-muted mb-4">
              Six species, one arc
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-ink-primary mb-4">
              The survivors
            </h2>
            <p className="max-w-2xl mx-auto text-ink-secondary">
              Each one nearly erased. Each one — in its own halting way — finding a way back.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIES.map((sp, i) => {
            const t = TREND_LABEL[sp.trend];
            return (
              <Reveal key={sp.id} delay={i * 60}>
                <article
                  className="group relative rounded-2xl border border-white/5 bg-white/[0.015] overflow-hidden transition-colors hover:border-white/15 hover:bg-white/[0.03]"
                >
                  <div
                    className="h-1.5"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${sp.color}, transparent)`,
                    }}
                  />
                  <div className="p-6 pb-7">
                    <div
                      className="h-32 -mt-2 mb-4 flex items-center justify-center"
                      aria-hidden
                    >
                      <WhaleImage
                        kind={sp.kind}
                        className="max-h-32 w-auto transition-transform duration-700 group-hover:scale-[1.06]"
                        glowColor={sp.color}
                      />
                    </div>

                    <div className="mb-5">
                      <div
                        className="font-display text-2xl"
                        style={{ color: sp.color }}
                      >
                        {sp.name}
                      </div>
                      <div className="text-[12px] italic text-ink-muted mt-0.5">
                        {sp.latinName}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-5 text-[11px]">
                      <Stat label="Pre-whaling" value={fmt(sp.preWhaling)} />
                      <Stat
                        label={`Low (${sp.populationLow.year})`}
                        value={fmt(sp.populationLow.value)}
                      />
                      <Stat
                        label="Today"
                        value={fmt(sp.current)}
                        accent={sp.color}
                      />
                    </div>

                    <p className="text-[13px] leading-relaxed text-ink-secondary mb-5">
                      {sp.narrative}
                    </p>

                    <div className="flex items-center justify-between text-[11px]">
                      <span
                        className="px-2 py-1 rounded-full border"
                        style={{
                          color: sp.color,
                          borderColor: sp.color + "55",
                          background: sp.color + "12",
                        }}
                      >
                        IUCN · {sp.iucnStatus}
                      </span>
                      <span
                        className="flex items-center gap-1.5"
                        style={{ color: sp.color }}
                      >
                        <span className="text-base leading-none">{t.sym}</span>
                        <span>{t.label}</span>
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div>
      <div className="text-ink-muted uppercase tracking-wider text-[9.5px] mb-1">
        {label}
      </div>
      <div
        className="font-display text-lg"
        style={{ color: accent ?? "rgba(208,232,244,.92)" }}
      >
        {value}
      </div>
    </div>
  );
}
