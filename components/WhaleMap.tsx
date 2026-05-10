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
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/View_of_the_northwest_coast_of_S%C3%A3o_Miguel_%28Azores%29_2011.jpg/480px-View_of_the_northwest_coast_of_S%C3%A3o_Miguel_%28Azores%29_2011.jpg",
  "Húsavík, Iceland":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/1_h%C3%BAsav%C3%ADk_aerial_panorama_2017.jpg/480px-1_h%C3%BAsav%C3%ADk_aerial_panorama_2017.jpg",
  "Tromsø, Norway":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Troms%C3%B8_sentrum_%285835702754%29.jpg/480px-Troms%C3%B8_sentrum_%285835702754%29.jpg",
  "Gulf of Alaska":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/A_lonely_cloud_over_Prince_William_Sound.jpg/480px-A_lonely_cloud_over_Prince_William_Sound.jpg",
  "Monterey Bay, USA":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Monterey_Bay_Coast_%287161010684%29.jpg/480px-Monterey_Bay_Coast_%287161010684%29.jpg",
  "Baja California, Mexico":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Mexico_spongy_red_cliffs_on_the_blue_sea_of_cortez%2C_Baja_California_Sur%2C_Mexico.jpg/480px-Mexico_spongy_red_cliffs_on_the_blue_sea_of_cortez%2C_Baja_California_Sur%2C_Mexico.jpg",
  "Dominica, Caribbean":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Batalie_Bay%2C_Dominica_002.jpg/480px-Batalie_Bay%2C_Dominica_002.jpg",
  "Peninsula Valdés, Argentina":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Pen%C3%ADnsula_Vald%C3%A9s%2C_panor%C3%A1micas_%281994%29_01.jpg/480px-Pen%C3%ADnsula_Vald%C3%A9s%2C_panor%C3%A1micas_%281994%29_01.jpg",
  "Hermanus, South Africa":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Hermanus_coast%2C_Western_Cape%2C_South_Africa_%286253247740%29.jpg/480px-Hermanus_coast%2C_Western_Cape%2C_South_Africa_%286253247740%29.jpg",
  "Mirissa, Sri Lanka":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Mirissa_beach_Sri_Lanka_%2829959458812%29.jpg/480px-Mirissa_beach_Sri_Lanka_%2829959458812%29.jpg",
  "Kaikoura, New Zealand":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/A_rugged_coastline_Kaikoura_NZ_%2834362897020%29.jpg/480px-A_rugged_coastline_Kaikoura_NZ_%2834362897020%29.jpg",
  "Tonga, Pacific":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Vava%27u_banner.jpg/480px-Vava%27u_banner.jpg",
  Antarctica:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Hope_Bay-2016-Trinity_Peninsula%E2%80%93Iceberg.jpg/480px-Hope_Bay-2016-Trinity_Peninsula%E2%80%93Iceberg.jpg",
  "Vancouver Island, Canada":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Long_beach_-_Tofino_-_Vancouver_Island_01.jpg/480px-Long_beach_-_Tofino_-_Vancouver_Island_01.jpg",
  "Newfoundland, Canada":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Coastline_St_John_Newfoundland_%2841321604662%29.jpg/480px-Coastline_St_John_Newfoundland_%2841321604662%29.jpg",
  "Svalbard, Norway":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Panorama_Svalbard_Isfjorden.jpg/480px-Panorama_Svalbard_Isfjorden.jpg",
  "Ogasawara, Japan":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Ogasawara_Islands_banner.jpg/480px-Ogasawara_Islands_banner.jpg",
  "Andenes, Norway":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/And%C3%B8ya_Lighthouse%2C_Vester%C3%A5len_Northern_Norway.jpg/480px-And%C3%B8ya_Lighthouse%2C_Vester%C3%A5len_Northern_Norway.jpg",
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
