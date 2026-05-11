"use client";

import { useEffect, useRef, useState } from "react";
import { SPECIES } from "@/lib/species";

const CLIPS = [
  { src: "/videos/img_2670.mp4", poster: "/videos/img_2670.jpg" },
  { src: "/videos/img_2681.mp4", poster: "/videos/img_2681.jpg" },
  { src: "/videos/img_2685.mp4", poster: "/videos/img_2685.jpg" },
] as const;

type Clip = (typeof CLIPS)[number];

const FADE_MS = 1400;

function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Slots = { a: Clip; b: Clip; active: "a" | "b" };

export default function Hero() {
  const [speciesIdx, setSpeciesIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Videos are client-only: shuffled order would mismatch SSR, and we don't need
  // them in the initial HTML. The dark section background stands in until mount.
  const orderRef = useRef<readonly Clip[]>(CLIPS);
  const cursor = useRef(0);
  const [slots, setSlots] = useState<Slots | null>(null);
  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const shuffled = shuffle(CLIPS);
    orderRef.current = shuffled;
    setSlots({
      a: shuffled[0],
      b: shuffled[1 % shuffled.length],
      active: "a",
    });
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setSpeciesIdx((i) => (i + 1) % SPECIES.length),
      4500
    );
    return () => clearInterval(id);
  }, []);

  // Load effects must come BEFORE the play effect so initial-mount ordering is
  // load → play. If play ran first the subsequent load() would reset the element
  // and cancel playback.
  useEffect(() => {
    refA.current?.load();
  }, [slots?.a.src]);
  useEffect(() => {
    refB.current?.load();
  }, [slots?.b.src]);

  // Start the active video. Depending on the active src (not just `active`) lets
  // the effect refire on initial mount when slots go from null → defined.
  const activeSrc = slots
    ? slots.active === "a"
      ? slots.a.src
      : slots.b.src
    : undefined;
  useEffect(() => {
    if (!slots || !activeSrc) return;
    const el = slots.active === "a" ? refA.current : refB.current;
    if (!el) return;
    const attemptPlay = () => {
      el.play().catch(() => {
        /* autoplay may be blocked — poster still shows */
      });
    };
    // load() is async — wait for enough data before play() so the browser
    // doesn't drop the play call on a not-yet-ready element.
    if (el.readyState >= 2 /* HAVE_CURRENT_DATA */) {
      attemptPlay();
    } else {
      const onReady = () => {
        el.removeEventListener("loadeddata", onReady);
        attemptPlay();
      };
      el.addEventListener("loadeddata", onReady);
      return () => el.removeEventListener("loadeddata", onReady);
    }
  }, [activeSrc]);

  // Ambient particles, drifting across the surface.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    const ctx = canvas.getContext("2d")!;

    const N = 60;
    const dots = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.00015,
      vy: (Math.random() - 0.5) * 0.0001,
      ph: Math.random() * Math.PI * 2,
      sp: Math.random() * 0.012 + 0.004,
      hue: Math.random() < 0.3 ? "#9be7ff" : "#cffaff",
    }));

    let raf = 0;
    let t = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      t += 0.016;
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x += 1;
        if (d.x > 1) d.x -= 1;
        if (d.y < 0) d.y += 1;
        if (d.y > 1) d.y -= 1;
        const a = 0.18 + 0.55 * (0.5 + 0.5 * Math.sin(t * d.sp * 60 + d.ph));
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r * dpr, 0, Math.PI * 2);
        ctx.fillStyle = d.hue;
        ctx.globalAlpha = a;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleEnded = (which: "a" | "b") => {
    // Crossfade only triggers from the currently-active video.
    setSlots((prev) => {
      if (!prev || prev.active !== which) return prev;
      return { ...prev, active: which === "a" ? "b" : "a" };
    });
    // After the fade-out finishes, swap the just-finished slot to the next-up clip
    // so it's ready to play when its turn comes again. Reloading mid-fade would
    // cut the visible fade-out short.
    window.setTimeout(() => {
      const order = orderRef.current;
      cursor.current = (cursor.current + 1) % order.length;
      const follow = order[(cursor.current + 1) % order.length];
      setSlots((prev) => {
        if (!prev) return prev;
        return which === "a" ? { ...prev, a: follow } : { ...prev, b: follow };
      });
    }, FADE_MS + 100);
  };

  const sp = SPECIES[speciesIdx];

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#03091a]">
      {slots && (
        <>
          <video
            ref={refA}
            src={slots.a.src}
            poster={slots.a.poster}
            muted
            playsInline
            preload="auto"
            onEnded={() => handleEnded("a")}
            style={{ transitionDuration: `${FADE_MS}ms` }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out ${
              slots.active === "a" ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden
          />
          <video
            ref={refB}
            src={slots.b.src}
            poster={slots.b.poster}
            muted
            playsInline
            preload="auto"
            onEnded={() => handleEnded("b")}
            style={{ transitionDuration: `${FADE_MS}ms` }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out ${
              slots.active === "b" ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden
          />
        </>
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(3,9,26,0.45) 0%, rgba(3,9,26,0.55) 55%, rgba(3,9,26,0.85) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(78,205,196,0.10), transparent 60%), radial-gradient(40% 40% at 70% 80%, rgba(167,139,250,0.08), transparent 70%), radial-gradient(50% 60% at 20% 90%, rgba(248,113,113,0.05), transparent 70%)",
        }}
        aria-hidden
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="font-display text-[12px] uppercase tracking-[0.4em] text-ink-muted mb-6">
          Whale Resilience
        </div>
        <h1 className="font-display text-[clamp(2.4rem,6.5vw,5.2rem)] leading-[1.05] font-medium text-ink-primary mb-6 [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
          They were hunted to the edge.
          <br />
          <span
            className="italic transition-colors duration-700"
            style={{ color: sp.color }}
          >
            They came back.
          </span>
        </h1>
        <p className="text-[clamp(1rem,1.6vw,1.25rem)] text-ink-secondary max-w-2xl mx-auto leading-relaxed [text-shadow:0_1px_18px_rgba(0,0,0,0.55)]">
          Explore 120 years of whale population data — a story of destruction,
          protection, and slow, stubborn resilience.
        </p>

        <div className="mt-12 flex items-center justify-center gap-3 text-[11px] text-ink-muted tracking-wider">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full transition-colors duration-700"
            style={{ background: sp.color }}
          />
          <span style={{ color: sp.color }} className="transition-colors duration-700">
            {sp.name}
          </span>
          <span className="opacity-60">— {sp.latinName}</span>
        </div>
      </div>

      <a
        href="#trends"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ink-muted hover:text-ink-primary transition-colors text-[11px] tracking-[0.25em] uppercase flex flex-col items-center gap-2 group z-10"
      >
        <span>Dive in</span>
        <span className="block w-px h-10 bg-gradient-to-b from-ink-muted to-transparent group-hover:from-ink-primary transition-colors" />
      </a>
    </section>
  );
}
