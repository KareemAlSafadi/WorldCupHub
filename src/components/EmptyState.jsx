import { Trophy } from '@phosphor-icons/react';

export default function EmptyState({ title, description, icon: Icon = Trophy }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-surface-raised/50 px-8 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
        <Icon size={28} weight="light" className="text-pitch" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">{description}</p>
    </div>
  );
}
