"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type { FeatureCollection } from "geojson";
import { HOTSPOTS, SPECIES_COLOR } from "@/lib/species";

const W = 960;
const H = 480;

const PHOTO: Record<string, string> = {
  "Azores, Portugal":
    "https://images.unsplash.com/photo-1499591934245-40b55745b905?w=480&h=300&fit=crop&q=70",
  "Húsavík, Iceland":
    "https://images.unsplash.com/photo-1500039436846-25ae2f11882e?w=480&h=300&fit=crop&q=70",
  "Tromsø, Norway":
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=480&h=300&fit=crop&q=70",
  "Gulf of Alaska":
    "https://images.unsplash.com/photo-1516708354817-3a52f0c1f6dc?w=480&h=300&fit=crop&q=70",
  "Monterey Bay, USA":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=480&h=300&fit=crop&q=70",
  "Baja California, Mexico":
    "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=480&h=300&fit=crop&q=70",
  "Dominica, Caribbean":
    "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=480&h=300&fit=crop&q=70",
  "Peninsula Valdés, Argentina":
    "https://images.unsplash.com/photo-1551405780-03882d5a2ba7?w=480&h=300&fit=crop&q=70",
  "Hermanus, South Africa":
    "https://images.unsplash.com/photo-1580674684089-5c8b7eb2bb6b?w=480&h=300&fit=crop&q=70",
  "Mirissa, Sri Lanka":
    "https://images.unsplash.com/photo-1546484958-a947ed1b3afb?w=480&h=300&fit=crop&q=70",
  "Kaikoura, New Zealand":
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=480&h=300&fit=crop&q=70",
  "Tonga, Pacific":
    "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=480&h=300&fit=crop&q=70",
  Antarctica:
    "https://images.unsplash.com/photo-1551655510-555dc3be8633?w=480&h=300&fit=crop&q=70",
  "Vancouver Island, Canada":
    "https://images.unsplash.com/photo-1502780402662-acc01917cf6f?w=480&h=300&fit=crop&q=70",
  "Newfoundland, Canada":
    "https://images.unsplash.com/photo-1505765050516-f72dcac9c60b?w=480&h=300&fit=crop&q=70",
  "Svalbard, Norway":
    "https://images.unsplash.com/photo-1531176175280-33e81d4a7a48?w=480&h=300&fit=crop&q=70",
  "Ogasawara, Japan":
    "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=480&h=300&fit=crop&q=70",
  "Andenes, Norway":
    "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=480&h=300&fit=crop&q=70",
};

type ProjectedHotspot = {
  name: string;
  lat: number;
  lon: number;
  species: readonly string[];
  x: number;
  y: number;
};

export default function WhaleMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSpecies, setActiveSpecies] = useState<string | null>(null);
  const [worldReady, setWorldReady] = useState(false);
  const projectionRef = useRef<d3.GeoProjection | null>(null);
  const projectedRef = useRef<ProjectedHotspot[]>([]);
  const landRef = useRef<FeatureCollection | null>(null);
  const [hover, setHover] = useState<ProjectedHotspot | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [photoFailed, setPhotoFailed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);

      const world: any = await d3.json(
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
      );
      if (cancelled || !world) return;
      const land = topojson.feature(
        world,
        world.objects.countries
      ) as unknown as FeatureCollection;
      landRef.current = land;
      const projection = d3.geoNaturalEarth1().fitSize([W, H], land);
      projectionRef.current = projection;

      const projected: ProjectedHotspot[] = HOTSPOTS.map((h) => {
        const p = projection([h.lon, h.lat]);
        return {
          ...h,
          x: p ? p[0] : 0,
          y: p ? p[1] : 0,
        };
      });
      projectedRef.current = projected;

      drawMap(ctx, land, projection);
      setWorldReady(true);
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!worldReady) return;
    const canvas = canvasRef.current;
    const land = landRef.current;
    const projection = projectionRef.current;
    if (!canvas || !land || !projection) return;
    const ctx = canvas.getContext("2d")!;
    drawMap(ctx, land, projection);
  }, [activeSpecies, worldReady]);

  function drawMap(
    ctx: CanvasRenderingContext2D,
    land: FeatureCollection,
    projection: d3.GeoProjection
  ) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#040d1e";
    ctx.fillRect(0, 0, W, H);

    const path = d3.geoPath(projection, ctx);
    ctx.beginPath();
    path(land);
    ctx.fillStyle = "#0e2240";
    ctx.strokeStyle = "rgba(100,150,200,0.18)";
    ctx.lineWidth = 0.5;
    ctx.fill();
    ctx.stroke();

    projectedRef.current.forEach((hs) => {
      const show = !activeSpecies || hs.species.includes(activeSpecies);
      const cols = activeSpecies
        ? [SPECIES_COLOR[activeSpecies] ?? "#888"]
        : hs.species.slice(0, 4).map((s) => SPECIES_COLOR[s] ?? "#888");
      const r = 5 + cols.length;
      const alpha = show ? 1 : 0.12;
      cols.forEach((c, i) => {
        const ang = -Math.PI / 2 + (i / cols.length) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(hs.x, hs.y, r, ang, ang + (1 / cols.length) * Math.PI * 2);
        ctx.lineTo(hs.x, hs.y);
        ctx.closePath();
        ctx.fillStyle = c;
        ctx.globalAlpha = 0.85 * alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      ctx.beginPath();
      ctx.arc(hs.x, hs.y, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.35 * alpha})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();
    });
  }

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) * W) / rect.width;
    const my = ((e.clientY - rect.top) * H) / rect.height;
    let closest: ProjectedHotspot | null = null;
    let minD = Infinity;
    projectedRef.current.forEach((hs) => {
      if (activeSpecies && !hs.species.includes(activeSpecies)) return;
      const d = Math.hypot(mx - hs.x, my - hs.y);
      if (d < 28 && d < minD) {
        minD = d;
        closest = hs;
      }
    });
    setHover(closest);
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function handleClick() {
    if (!hover) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${hover.lat},${hover.lon}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-4">
      <div
        ref={wrapRef}
        className="relative w-full rounded-xl overflow-hidden border border-white/5"
        style={{ aspectRatio: `${W} / ${H}`, cursor: hover ? "pointer" : "default" }}
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
        onClick={handleClick}
      >
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          aria-label="World map showing best whale watching locations per species"
          role="img"
        />
        {hover && (
          <div
            className="pointer-events-none absolute z-20 w-[260px] rounded-xl border border-white/10 bg-ocean-deep/95 backdrop-blur shadow-2xl overflow-hidden"
            style={{
              left: pos.x + 280 > (wrapRef.current?.clientWidth ?? 0) ? pos.x - 270 : pos.x + 14,
              top: Math.max(8, pos.y - 60),
            }}
          >
            {!photoFailed[hover.name] ? (
              <img
                src={PHOTO[hover.name]}
                alt=""
                className="w-full h-[140px] object-cover"
                loading="lazy"
                onError={() =>
                  setPhotoFailed((m) => ({ ...m, [hover.name]: true }))
                }
              />
            ) : (
              <div
                className="w-full h-[140px] flex items-center justify-center text-[10px] tracking-[0.25em] uppercase text-ink-muted"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(78,205,196,0.18), rgba(167,139,250,0.12), rgba(248,113,113,0.10))",
                }}
              >
                {hover.name}
              </div>
            )}
            <div className="p-3">
              <div className="text-[13px] font-medium text-ink-primary mb-1.5">
                {hover.name}
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {hover.species.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] px-1.5 py-0.5 rounded-full border"
                    style={{
                      color: SPECIES_COLOR[s],
                      borderColor: SPECIES_COLOR[s] + "55",
                      background: SPECIES_COLOR[s] + "1a",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="text-[10px] text-ink-secondary">
                Click to open in Google Maps →
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 justify-center pt-2">
        {Object.entries(SPECIES_COLOR).map(([name, color]) => (
          <button
            key={name}
            onClick={() =>
              setActiveSpecies((cur) => (cur === name ? null : name))
            }
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] border transition ${
              activeSpecies === name
                ? "border-white/25 bg-white/10 text-ink-primary"
                : "border-white/5 bg-white/[0.02] text-ink-secondary hover:bg-white/5"
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: color }}
            />
            {name}
          </button>
        ))}
        {activeSpecies && (
          <button
            onClick={() => setActiveSpecies(null)}
            className="text-[11px] text-ink-muted hover:text-ink-primary px-3 py-1.5"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
