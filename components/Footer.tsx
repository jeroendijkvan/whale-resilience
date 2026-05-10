export default function Footer() {
  return (
    <footer className="relative px-6 py-24 md:py-32 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-display text-2xl md:text-3xl text-ink-primary leading-snug mb-10">
          Whales are not just survivors —
          <br />
          they are ecosystem engineers, carbon sinks,
          <br />
          <span className="italic text-species-sperm">
            and a reminder that with protection, nature finds a way back.
          </span>
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-10 text-[12px]">
          <a
            href="https://iwc.int"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-secondary hover:text-ink-primary transition"
          >
            IWC →
          </a>
          <a
            href="https://www.iucnredlist.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-secondary hover:text-ink-primary transition"
          >
            IUCN Red List →
          </a>
          <a
            href="https://www.worldwildlife.org/species/whale"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-secondary hover:text-ink-primary transition"
          >
            WWF Whales →
          </a>
        </div>

        <div className="text-[10.5px] text-ink-muted leading-relaxed max-w-2xl mx-auto space-y-1">
          <p>
            Sources: IWC Scientific Committee · Whitehead et al. (2022) ·
            Branch et al. (2008) · Brandão et al. (2018) · IUCN Red List
            assessments
          </p>
          <p>
            Built with publicly available IWC and IUCN data. Pre-1970 figures
            modelled from whaling catch records — uncertainty bands are wide.
          </p>
          <p className="pt-4 opacity-60">
            Designed and built as a showcase of what's possible with AI-assisted
            development.
          </p>
        </div>
      </div>
    </footer>
  );
}
