import type { SpeciesKind } from "@/lib/species";

export function WhaleImage({
  kind,
  className = "",
  ariaLabel,
  glowColor,
}: {
  kind: SpeciesKind;
  className?: string;
  ariaLabel?: string;
  glowColor?: string;
}) {
  return (
    <img
      src={`/whales/${kind}.png`}
      alt={ariaLabel ?? ""}
      role={ariaLabel ? "img" : "presentation"}
      className={className}
      style={
        glowColor
          ? { filter: `drop-shadow(0 8px 24px ${glowColor}33)` }
          : undefined
      }
      loading="lazy"
      decoding="async"
    />
  );
}
