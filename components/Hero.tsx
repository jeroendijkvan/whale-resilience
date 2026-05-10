"use client";

import { useEffect, useRef, useState } from "react";
import { SPECIES } from "@/lib/species";
import { WhaleSilhouette } from "./WhaleSilhouette";

export default function Hero() {
  const [speciesIdx, setSpeciesIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const id = setInterval(
      () => setSpeciesIdx((i) => (i + 1) % SPECIES.length),
      4500
    );
    return () => clearInterval(id);
  }, []);

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

  const sp = SPECIES[speciesIdx];

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(78,205,196,0.12), transparent 60%), radial-gradient(40% 40% at 70% 80%, rgba(167,139,250,0.10), transparent 70%), radial-gradient(50% 60% at 20% 90%, rgba(248,113,113,0.06), transparent 70%)",
        }}
        aria-hidden
      />

      <div
        key={sp.id}
        className="absolute inset-0 flex items-center justify-center pointer-events-none animate-drift"
        aria-hidden
      >
        <div className="w-[80vw] max-w-[900px] opacity-[0.07]">
          <WhaleSilhouette kind={sp.kind} color={sp.color} />
        </div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="font-display text-[12px] uppercase tracking-[0.4em] text-ink-muted mb-6">
          Whale Resilience
        </div>
        <h1 className="font-display text-[clamp(2.4rem,6.5vw,5.2rem)] leading-[1.05] font-medium text-ink-primary mb-6">
          They were hunted to the edge.
          <br />
          <span
            className="italic transition-colors duration-700"
            style={{ color: sp.color }}
          >
            They came back.
          </span>
        </h1>
        <p className="text-[clamp(1rem,1.6vw,1.25rem)] text-ink-secondary max-w-2xl mx-auto leading-relaxed">
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ink-muted hover:text-ink-primary transition-colors text-[11px] tracking-[0.25em] uppercase flex flex-col items-center gap-2 group"
      >
        <span>Dive in</span>
        <span className="block w-px h-10 bg-gradient-to-b from-ink-muted to-transparent group-hover:from-ink-primary transition-colors" />
      </a>
    </section>
  );
}
