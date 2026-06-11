export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <span className="mb-4 inline-block rounded-full bg-pitch/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-pitch">
            {eyebrow}
          </span>
        )}
        <h1 className="text-4xl font-bold tracking-tighter text-white md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-white/55">{description}</p>
        )}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
}
