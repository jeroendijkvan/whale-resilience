import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import SpeciesCards from "@/components/SpeciesCards";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const PopulationChart = dynamic(
  () => import("@/components/PopulationChart"),
  { ssr: false }
);
const WhaleMap = dynamic(() => import("@/components/WhaleMap"), {
  ssr: false,
});

export default function Page() {
  return (
    <main className="relative">
      <Hero />

      <section id="trends" className="relative py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <div className="text-[11px] uppercase tracking-[0.35em] text-ink-muted mb-4">
                1900 – 2024
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-ink-primary mb-5">
                The shape of a recovery
              </h2>
              <p className="max-w-2xl mx-auto text-ink-secondary leading-relaxed">
                Solid lines are survey-based. Dashed lines are modelled from
                whaling catch records. Hover any year to feel the moment.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-white/5 bg-ocean-deep/60 backdrop-blur-sm p-2 md:p-4">
              <PopulationChart />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-6 max-w-3xl mx-auto text-center text-[11px] text-ink-muted leading-relaxed">
              Pre-1970 values are modelled from whaling catch records, not
              direct surveys. Confidence intervals are wide — treat these as
              best estimates, not precise counts. Sources: IWC Scientific
              Committee, Whitehead et al. (2022), IUCN Red List.
            </div>
          </Reveal>
        </div>
      </section>

      <Timeline />
      <SpeciesCards />

      <section id="map" className="relative py-28 md:py-36 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <div className="text-[11px] uppercase tracking-[0.35em] text-ink-muted mb-4">
                Where to see them
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-ink-primary mb-5">
                Whale watching, today
              </h2>
              <p className="max-w-2xl mx-auto text-ink-secondary leading-relaxed">
                Eighteen places where the great whales return — to feed, to
                breed, to be seen by anyone willing to look.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <WhaleMap />
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
