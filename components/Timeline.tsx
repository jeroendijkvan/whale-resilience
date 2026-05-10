import { TIMELINE } from "@/lib/species";
import Reveal from "./Reveal";

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="text-[11px] uppercase tracking-[0.35em] text-ink-muted mb-4">
              A century of decisions
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-ink-primary">
              Key moments
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          <div
            className="absolute left-[18px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
            aria-hidden
          />
          <ol className="space-y-10 md:space-y-16">
            {TIMELINE.map((m, i) => (
              <Reveal key={String(m.year)} delay={i * 60}>
                <li className="relative md:grid md:grid-cols-2 md:gap-12 items-start">
                  <div
                    className={`pl-12 md:pl-0 ${
                      i % 2 === 0
                        ? "md:text-right md:pr-12"
                        : "md:col-start-2 md:pl-12"
                    }`}
                  >
                    <div className="font-display text-3xl md:text-4xl text-ink-primary mb-2">
                      {m.year}
                    </div>
                    <div className="text-base md:text-lg text-ink-primary/90 mb-2 font-medium">
                      {m.title}
                    </div>
                    <div className="text-sm text-ink-secondary leading-relaxed max-w-md md:max-w-none md:inline-block">
                      {m.desc}
                    </div>
                  </div>
                  <div
                    className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 top-3 w-3 h-3 rounded-full bg-species-humpback shadow-[0_0_0_4px_rgba(251,191,36,0.18)]"
                    aria-hidden
                  />
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
