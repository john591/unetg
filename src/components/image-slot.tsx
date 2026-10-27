export function ImageSlot({ placeholder, img, priority }: { placeholder: string; img?: string; priority?: boolean }) {
  if (img) {
    return (
      <picture>
        <source media="(max-width: 640px)" srcSet={`/images/${img}-sm.jpg`} />
        <img
          src={`/images/${img}-md.jpg`} alt={placeholder}
          loading={priority ? "eager" : "lazy"} decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
    );
  }
  return (
    <div
      role="img"
      aria-label={placeholder}
      className="absolute inset-0 flex items-start justify-end p-3 text-right text-xs tracking-wide text-[color-mix(in_srgb,var(--color-text)_45%,transparent)]"
      style={{ background: "linear-gradient(135deg, var(--color-surface), var(--color-accent-900))" }}
    >
      {placeholder}
    </div>
  );
}
