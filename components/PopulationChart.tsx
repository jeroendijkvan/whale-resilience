"use client";

import { useEffect, useRef, useState } from "react";
import { SPECIES, YEARS, type Species, type SpeciesKind } from "@/lib/species";

const W = 720;
const H = 600;
const PL = 60;
const PR = 96;
const PT = 92;
const PB = 100;
const CW = W - PL - PR;
const CH = H - PT - PB;
const MAX_VAL = 1150;

function xOf(i: number) {
  return PL + (i / (YEARS.length - 1)) * CW;
}
function yOf(v: number) {
  return PT + CH - (v / MAX_VAL) * CH;
}
function hexRgb(h: string): [number, number, number] {
  return [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
}

function whalePath(
  ctx: CanvasRenderingContext2D,
  kind: SpeciesKind,
  cx: number,
  cy: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.translate(cx, cy);
  if (kind === "sperm") {
    ctx.beginPath();
    ctx.moveTo(-w * 0.5, h * 0.05);
    ctx.bezierCurveTo(-w * 0.35, -h * 0.35, w * 0.2, -h * 0.42, w * 0.38, -h * 0.18);
    ctx.bezierCurveTo(w * 0.48, -h * 0.04, w * 0.48, h * 0.04, w * 0.38, h * 0.18);
    ctx.bezierCurveTo(w * 0.2, h * 0.42, -w * 0.35, h * 0.35, -w * 0.5, h * 0.05);
    ctx.closePath();
    ctx.moveTo(w * 0.3, -h * 0.14);
    ctx.lineTo(w * 0.55, -h * 0.42);
    ctx.lineTo(w * 0.42, -h * 0.06);
    ctx.moveTo(w * 0.3, h * 0.14);
    ctx.lineTo(w * 0.55, h * 0.42);
    ctx.lineTo(w * 0.42, h * 0.06);
  } else if (kind === "fin") {
    ctx.beginPath();
    ctx.moveTo(-w * 0.52, h * 0.08);
    ctx.bezierCurveTo(-w * 0.38, -h * 0.38, w * 0.22, -h * 0.44, w * 0.4, -h * 0.16);
    ctx.bezierCurveTo(w * 0.5, -h * 0.03, w * 0.5, h * 0.03, w * 0.4, h * 0.16);
    ctx.bezierCurveTo(w * 0.22, h * 0.44, -w * 0.38, h * 0.38, -w * 0.52, h * 0.08);
    ctx.closePath();
    ctx.moveTo(w * 0.32, -h * 0.14);
    ctx.lineTo(w * 0.58, -h * 0.44);
    ctx.lineTo(w * 0.44, -h * 0.08);
    ctx.moveTo(w * 0.32, h * 0.14);
    ctx.lineTo(w * 0.58, h * 0.44);
    ctx.lineTo(w * 0.44, h * 0.08);
    ctx.moveTo(-w * 0.05, -h * 0.42);
    ctx.lineTo(w * 0.1, -h * 0.06);
    ctx.lineTo(w * 0.25, -h * 0.42);
  } else if (kind === "right") {
    ctx.beginPath();
    ctx.moveTo(-w * 0.5, 0);
    ctx.bezierCurveTo(-w * 0.32, -h * 0.5, w * 0.15, -h * 0.6, w * 0.38, -h * 0.2);
    ctx.bezierCurveTo(w * 0.5, -h * 0.05, w * 0.5, h * 0.05, w * 0.38, h * 0.2);
    ctx.bezierCurveTo(w * 0.15, h * 0.6, -w * 0.32, h * 0.5, -w * 0.5, 0);
    ctx.closePath();
    ctx.moveTo(w * 0.28, -h * 0.16);
    ctx.lineTo(w * 0.55, -h * 0.52);
    ctx.lineTo(w * 0.4, -h * 0.08);
    ctx.moveTo(w * 0.28, h * 0.16);
    ctx.lineTo(w * 0.55, h * 0.52);
    ctx.lineTo(w * 0.4, h * 0.08);
    ctx.moveTo(-w * 0.18, -h * 0.58);
    ctx.bezierCurveTo(-w * 0.08, -h * 0.92, w * 0.06, -h * 0.92, w * 0.14, -h * 0.58);
    ctx.closePath();
  } else if (kind === "humpback") {
    ctx.beginPath();
    ctx.moveTo(-w * 0.48, 0);
    ctx.bezierCurveTo(-w * 0.32, -h * 0.46, w * 0.18, -h * 0.5, w * 0.38, -h * 0.18);
    ctx.bezierCurveTo(w * 0.5, -h * 0.04, w * 0.5, h * 0.04, w * 0.38, h * 0.18);
    ctx.bezierCurveTo(w * 0.18, h * 0.5, -w * 0.32, h * 0.46, -w * 0.48, 0);
    ctx.closePath();
    ctx.moveTo(w * 0.3, -h * 0.14);
    ctx.lineTo(w * 0.56, -h * 0.48);
    ctx.lineTo(w * 0.42, -h * 0.08);
    ctx.moveTo(w * 0.3, h * 0.14);
    ctx.lineTo(w * 0.56, h * 0.48);
    ctx.lineTo(w * 0.42, h * 0.08);
    ctx.moveTo(-w * 0.02, -h * 0.48);
    ctx.lineTo(w * 0.12, -h * 0.92);
    ctx.lineTo(w * 0.26, -h * 0.48);
    ctx.closePath();
    ctx.moveTo(-w * 0.38, -h * 0.28);
    ctx.bezierCurveTo(-w * 0.28, -h * 0.52, -w * 0.08, -h * 0.48, w * 0.02, -h * 0.28);
  } else if (kind === "blue") {
    ctx.beginPath();
    ctx.moveTo(-w * 0.58, h * 0.06);
    ctx.bezierCurveTo(-w * 0.4, -h * 0.36, w * 0.28, -h * 0.42, w * 0.46, -h * 0.14);
    ctx.bezierCurveTo(w * 0.56, -h * 0.02, w * 0.56, h * 0.02, w * 0.46, h * 0.14);
    ctx.bezierCurveTo(w * 0.28, h * 0.42, -w * 0.4, h * 0.36, -w * 0.58, h * 0.06);
    ctx.closePath();
    ctx.moveTo(w * 0.36, -h * 0.12);
    ctx.lineTo(w * 0.64, -h * 0.44);
    ctx.lineTo(w * 0.5, 0);
    ctx.lineTo(w * 0.64, h * 0.44);
    ctx.lineTo(w * 0.36, h * 0.12);
  } else {
    ctx.beginPath();
    ctx.moveTo(-w * 0.44, h * 0.04);
    ctx.bezierCurveTo(-w * 0.28, -h * 0.38, w * 0.2, -h * 0.42, w * 0.38, -h * 0.16);
    ctx.bezierCurveTo(w * 0.48, -h * 0.03, w * 0.48, h * 0.03, w * 0.38, h * 0.16);
    ctx.bezierCurveTo(w * 0.2, h * 0.42, -w * 0.28, h * 0.38, -w * 0.44, h * 0.04);
    ctx.closePath();
    ctx.moveTo(w * 0.28, -h * 0.14);
    ctx.lineTo(w * 0.52, -h * 0.46);
    ctx.lineTo(w * 0.4, -h * 0.08);
    ctx.moveTo(w * 0.28, h * 0.14);
    ctx.lineTo(w * 0.52, h * 0.46);
    ctx.lineTo(w * 0.4, h * 0.08);
    ctx.moveTo(-w * 0.06, -h * 0.42);
    ctx.lineTo(w * 0.08, -h * 0.92);
    ctx.lineTo(w * 0.24, -h * 0.42);
    ctx.closePath();
  }
  ctx.restore();
}

function drawSpline(
  c: CanvasRenderingContext2D,
  pts: [number, number][],
  t = 0.38
) {
  if (pts.length < 2) return;
  c.moveTo(pts[0][0], pts[0][1]);
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    c.bezierCurveTo(
      p1[0] + (p2[0] - p0[0]) * t,
      p1[1] + (p2[1] - p0[1]) * t,
      p2[0] - (p3[0] - p1[0]) * t,
      p2[1] - (p3[1] - p1[1]) * t,
      p2[0],
      p2[1]
    );
  }
}

function rng(s: number) {
  let v = s;
  return () => {
    v = (v * 16807) % 2147483647;
    return (v - 1) / 2147483646;
  };
}

type HoverState = { idx: number; x: number; y: number } | null;

export default function PopulationChart() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLCanvasElement>(null);
  const artRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<HoverState>(null);

  useEffect(() => {
    const bg = bgRef.current;
    const art = artRef.current;
    if (!bg || !art) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    bg.width = W * dpr;
    bg.height = H * dpr;
    art.width = W * dpr;
    art.height = H * dpr;
    const bgx = bg.getContext("2d")!;
    const ctx = art.getContext("2d")!;
    bgx.scale(dpr, dpr);
    ctx.scale(dpr, dpr);

    const r1 = rng(42);
    const stars = Array.from({ length: 90 }, () => ({
      x: r1() * W,
      y: r1() * H * 0.6,
      r: r1() * 1.0 + 0.2,
      a: r1() * 0.45 + 0.1,
    }));
    const r2 = rng(77);
    const fish = Array.from({ length: 28 }, () => ({
      x: r2() * W,
      y: r2() * (CH * 0.85) + PT * 0.4,
      sz: r2() * 2.8 + 2,
      col: ["#4ecdc4", "#a78bfa", "#86efac", "#7ec8e3"][
        Math.floor(r2() * 4)
      ],
      flip: r2() > 0.5,
      sp: r2() * 0.14 + 0.04,
      ph: r2() * Math.PI * 2,
      wr: r2() * 0.25 + 0.07,
    }));
    const r3 = rng(13);
    const wShadows = SPECIES.flatMap((sp: Species) =>
      Array.from({ length: 3 }, () => {
        const xi = Math.floor(r3() * (YEARS.length - 2));
        const fr = r3() * 0.6 + 0.2;
        const rx = xOf(xi) + fr * (xOf(xi + 1) - xOf(xi));
        const v0 = sp.pts[xi][0];
        const v1 = sp.pts[xi + 1][0];
        const ry = yOf(v0 + fr * (v1 - v0));
        const depth = (v0 + fr * (v1 - v0)) / MAX_VAL;
        return {
          x: rx,
          y: ry + r3() * 18 - 9 + (1 - depth) * 18,
          sz: depth * 11 + 4,
          col: sp.color,
          flip: r3() > 0.5,
          kind: sp.kind,
          dr: r3() * 0.3 - 0.15,
          ph: r3() * Math.PI * 2,
        };
      })
    );

    function drawBg() {
      bgx.clearRect(0, 0, W, H);
      bgx.fillStyle = "#03091a";
      bgx.fillRect(0, 0, W, H);
      for (let row = 0; row < H; row++) {
        bgx.fillStyle = `rgba(0,40,80,${0.02 + (row / H) * 0.036})`;
        bgx.fillRect(0, row, W, 1);
      }
      stars.forEach((s) => {
        bgx.beginPath();
        bgx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        bgx.fillStyle = `rgba(180,220,255,${s.a})`;
        bgx.fill();
      });
    }
    drawBg();

    let ft = 0;
    let frameId = 0;

    function drawFrame(hxIdx: number | null) {
      ctx.clearRect(0, 0, W, H);
      ft += 0.011;

      fish.forEach((f) => {
        f.x += f.flip ? -f.sp * 0.5 : f.sp * 0.5;
        if (f.x > W + 30) f.x = -30;
        if (f.x < -30) f.x = W + 30;
        ctx.save();
        ctx.translate(f.x, f.y + Math.sin(ft * f.sp * 8 + f.ph) * f.wr * 10);
        if (f.flip) ctx.scale(-1, 1);
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = f.col;
        ctx.beginPath();
        ctx.ellipse(0, 0, f.sz * 1.4, f.sz * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(f.sz * 1.1, 0);
        ctx.lineTo(f.sz * 1.85, -f.sz * 0.55);
        ctx.lineTo(f.sz * 1.85, f.sz * 0.55);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      wShadows.forEach((ws) => {
        ctx.save();
        ctx.translate(
          ws.x + Math.sin(ft * 0.38 + ws.ph) * 16,
          ws.y + Math.sin(ft * 0.22 + ws.ph * 1.3) * ws.dr * 8
        );
        if (ws.flip) ctx.scale(-1, 1);
        ctx.globalAlpha = 0.09;
        ctx.fillStyle = ws.col;
        ctx.strokeStyle = ws.col;
        ctx.lineWidth = 0.5;
        whalePath(ctx, ws.kind, 0, 0, ws.sz * 2, ws.sz);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      const firstObsX = xOf(SPECIES[0].obs.findIndex((o) => o));
      ctx.fillStyle = "rgba(255,255,255,.012)";
      ctx.fillRect(firstObsX, PT - 10, PL + CW - firstObsX, CH + 10);
      ctx.beginPath();
      ctx.moveTo(firstObsX, PT - 16);
      ctx.lineTo(firstObsX, PT + CH + 4);
      ctx.strokeStyle = "rgba(255,255,255,.08)";
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = "400 9px Inter,system-ui,sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(200,200,200,.22)";
      // Upper row of axis annotations — anchored to the firstObs dashed line.
      ctx.fillText("← modelled", firstObsX - 42, PT - 22);
      ctx.fillText("survey-based →", firstObsX + 52, PT - 22);

      SPECIES.forEach((sp) => {
        const [r, g, b] = hexRgb(sp.color);
        const bp: [number, number][] = sp.pts.map((p, i) => [xOf(i), yOf(p[0])]);
        const lp: [number, number][] = sp.pts.map((p, i) => [xOf(i), yOf(p[1])]);
        const hp: [number, number][] = sp.pts.map((p, i) => [xOf(i), yOf(p[2])]);
        const os = sp.obs.findIndex((o) => o);

        ctx.beginPath();
        drawSpline(ctx, hp.slice(0, os + 1));
        drawSpline(ctx, [...lp.slice(0, os + 1)].reverse());
        ctx.closePath();
        ctx.fillStyle = `rgba(${r},${g},${b},.06)`;
        ctx.fill();

        ctx.beginPath();
        drawSpline(ctx, hp.slice(os));
        drawSpline(ctx, [...lp.slice(os)].reverse());
        ctx.closePath();
        ctx.fillStyle = `rgba(${r},${g},${b},.12)`;
        ctx.fill();

        ctx.beginPath();
        drawSpline(ctx, lp);
        ctx.strokeStyle = `rgba(${r},${g},${b},.2)`;
        ctx.lineWidth = 0.6;
        ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        drawSpline(ctx, hp);
        ctx.strokeStyle = `rgba(${r},${g},${b},.2)`;
        ctx.lineWidth = 0.6;
        ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        drawSpline(ctx, bp.slice(0, os + 1));
        ctx.strokeStyle = `rgba(${r},${g},${b},.5)`;
        ctx.lineWidth = 1.4;
        ctx.setLineDash([5, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        drawSpline(ctx, bp.slice(os));
        ctx.strokeStyle = `rgba(${r},${g},${b},.9)`;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        sp.pts.forEach((p, i) => {
          const px = xOf(i);
          const py = yOf(p[0]);
          if (sp.obs[i]) {
            ctx.beginPath();
            ctx.arc(px, py, 2.3, 0, Math.PI * 2);
            ctx.fillStyle = sp.color;
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(px, py, 2.1, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${r},${g},${b},.45)`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      [0, 250, 500, 750, 1000].forEach((v) => {
        const gy = yOf(v);
        ctx.beginPath();
        ctx.moveTo(PL, gy);
        ctx.lineTo(PL + CW, gy);
        ctx.strokeStyle = v === 0 ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.04)";
        ctx.lineWidth = 0.5;
        ctx.setLineDash(v === 0 ? [] : [3, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
        if (v > 0) {
          ctx.font = "400 10px Inter,system-ui,sans-serif";
          ctx.fillStyle = "rgba(130,180,215,.4)";
          ctx.textAlign = "right";
          ctx.fillText((v / 1000).toFixed(2) + "M", PL - 7, gy + 4);
        }
      });

      const morX = xOf(YEARS.indexOf(1986));
      // Line starts just below the moratorium label so the dashes never run
      // through the text.
      ctx.beginPath();
      ctx.moveTo(morX, PT - 4);
      ctx.lineTo(morX, PT + CH);
      ctx.strokeStyle = "rgba(255,225,80,.22)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = "400 9px Inter,system-ui,sans-serif";
      ctx.fillStyle = "rgba(255,225,80,.65)";
      ctx.textAlign = "center";
      // Lower annotation row, sits below the modelled/survey labels with a
      // ~14px vertical gap so the two never collide regardless of how close
      // 1986 sits to the survey-data boundary.
      ctx.fillText("IWC moratorium 1986", morX, PT - 8);

      [1900, 1920, 1940, 1960, 1980, 2000, 2020, 2024].forEach((y) => {
        const i = YEARS.indexOf(y);
        if (i < 0) return;
        const gx = xOf(i);
        ctx.beginPath();
        ctx.moveTo(gx, PT + CH);
        ctx.lineTo(gx, PT + CH + 7);
        ctx.strokeStyle = "rgba(255,255,255,.12)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.font = "400 10px Inter,system-ui,sans-serif";
        ctx.fillStyle = "rgba(130,180,215,.4)";
        ctx.textAlign = "center";
        ctx.fillText(String(y), gx, PT + CH + 18);
      });

      const sorted = [...SPECIES].sort(
        (a, b) => b.pts[YEARS.length - 1][0] - a.pts[YEARS.length - 1][0]
      );
      const usedY: number[] = [];
      sorted.forEach((sp) => {
        let ly = yOf(sp.pts[YEARS.length - 1][0]);
        usedY.forEach((uy) => {
          if (Math.abs(ly - uy) < 13) ly = uy + 13;
        });
        usedY.push(ly);
        ctx.font = "500 10px Inter,system-ui,sans-serif";
        ctx.fillStyle = sp.color;
        ctx.textAlign = "left";
        ctx.fillText(sp.name, PL + CW + 8, ly + 4);
      });

      ctx.font = "500 18px Fraunces,ui-serif,serif";
      ctx.fillStyle = "rgba(208,232,244,.92)";
      ctx.textAlign = "left";
      ctx.fillText("Whale populations · 1900–2024", PL, 36);
      ctx.font = "400 11px Inter,system-ui,sans-serif";
      ctx.fillStyle = "rgba(130,180,215,.6)";
      ctx.fillText(
        "Six species · global best estimates with 95% confidence intervals",
        PL,
        54
      );

      if (hxIdx !== null) {
        const hx = xOf(hxIdx);
        ctx.beginPath();
        ctx.moveTo(hx, PT - 10);
        ctx.lineTo(hx, PT + CH);
        ctx.strokeStyle = "rgba(255,255,255,.18)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    function loop() {
      drawFrame(null);
      frameId = requestAnimationFrame(loop);
    }
    loop();

    return () => cancelAnimationFrame(frameId);
  }, []);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) * W) / rect.width;
    if (mx < PL || mx > PL + CW) {
      setHover(null);
      return;
    }
    const idx = Math.max(
      0,
      Math.min(
        YEARS.length - 1,
        Math.round(((mx - PL) / CW) * (YEARS.length - 1))
      )
    );
    setHover({ idx, x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  const fmt = (v: number) => (v >= 10 ? Math.round(v) + "k" : v.toFixed(1) + "k");

  return (
    <div className="relative w-full">
      <div
        ref={wrapRef}
        className="relative w-full"
        style={{ aspectRatio: `${W} / ${H}` }}
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
      >
        <canvas
          ref={bgRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
        <canvas
          ref={artRef}
          className="absolute inset-0 w-full h-full"
          aria-label="Whale population trends 1900-2024 for six species with uncertainty bands and animated ocean life"
          role="img"
        />
        {hover && (
          <div
            className="pointer-events-none absolute z-10 rounded-xl border border-white/10 bg-ocean-deep/95 backdrop-blur-sm px-3.5 py-2.5 text-[11px] min-w-[210px] shadow-2xl"
            style={{
              left:
                hover.x + 14 + 220 > (wrapRef.current?.clientWidth ?? 0)
                  ? hover.x - 230
                  : hover.x + 14,
              top: Math.max(8, hover.y - 20),
            }}
          >
            <div className="text-[10px] tracking-[0.07em] text-[#4a7a9b] mb-1.5">
              {YEARS[hover.idx]}
            </div>
            {[...SPECIES]
              .sort((a, b) => b.pts[hover.idx][0] - a.pts[hover.idx][0])
              .map((sp) => {
                const [best, lo, hi] = sp.pts[hover.idx];
                return (
                  <div
                    key={sp.id}
                    className="flex items-center gap-1.5 my-[3px]"
                  >
                    <span
                      className="w-[7px] h-[7px] rounded-full shrink-0"
                      style={{ background: sp.color }}
                    />
                    <span className="flex-1 text-[#8bbdd4] truncate">
                      {sp.name}
                    </span>
                    <span style={{ color: sp.color, fontWeight: 500 }}>
                      {fmt(best)}
                    </span>
                    <span className="text-[9px] text-[#3a6a8a] ml-1">
                      {sp.obs[hover.idx] ? "surveyed" : "modelled"} ·{" "}
                      {fmt(lo)}–{fmt(hi)}
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <div ref={overlayRef} />
    </div>
  );
}
