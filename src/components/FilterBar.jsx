import { MagnifyingGlass, X } from '@phosphor-icons/react';

export default function FilterBar({
  search,
  onSearchChange,
  placeholder = 'Search...',
  chips = [],
  activeChip,
  onChipChange,
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative max-w-md flex-1">
        <MagnifyingGlass
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-full border border-white/10 bg-surface-raised py-3 pl-11 pr-10 text-sm text-white placeholder:text-white/35 outline-none transition-premium focus:border-pitch/50 focus:ring-2 focus:ring-pitch/20"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/40 transition-premium hover:text-white active:scale-95"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onChipChange(null)}
            className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-premium active:scale-95 ${
              activeChip === null
                ? 'bg-pitch text-white'
                : 'bg-white/5 text-white/60 ring-1 ring-white/10 hover:text-white'
            }`}
          >
            All
          </button>
          {chips.map((chip) => (
            <button
              key={chip.value}
              type="button"
              onClick={() => onChipChange(chip.value)}
              className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-premium active:scale-95 ${
                activeChip === chip.value
                  ? 'bg-pitch text-white'
                  : 'bg-white/5 text-white/60 ring-1 ring-white/10 hover:text-white'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
