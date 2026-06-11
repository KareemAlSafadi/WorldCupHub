export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/8 ${className}`}
      aria-hidden="true"
    />
  );
}

export function PageSkeleton() {
  return (
    <div className="animate-fade-up space-y-8" aria-busy="true" aria-label="Loading page">
      <Skeleton className="h-4 w-32" />
      <div className="space-y-3">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function TournamentDetailSkeleton() {
  return (
    <div className="animate-fade-up space-y-8" aria-busy="true" aria-label="Loading tournament">
      <Skeleton className="h-4 w-36" />
      <div className="flex flex-col gap-6 md:flex-row md:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-5 w-56" />
        </div>
        <Skeleton className="h-20 w-48 rounded-2xl" />
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-full" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-48 rounded-2xl lg:col-span-2" />
        <div className="space-y-4">
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function TournamentTabSkeleton({ type = 'fixtures' }) {
  if (type === 'standings') {
    return (
      <div className="grid gap-8 md:grid-cols-2" aria-busy="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl ring-1 ring-white/8">
            <Skeleton className="h-10 rounded-none" />
            {Array.from({ length: 4 }).map((_, j) => (
              <Skeleton key={j} className="mx-4 my-2 h-8 rounded-md" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (type === 'bracket') {
    return (
      <div className="flex gap-8 overflow-hidden" aria-busy="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <Skeleton className="mx-auto h-4 w-20" />
            {Array.from({ length: Math.max(1, 4 - i) }).map((_, j) => (
              <Skeleton key={j} className="h-20 w-48 rounded-xl" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8" aria-busy="true">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="mb-4 h-4 w-24" />
          <div className="space-y-2 overflow-hidden rounded-2xl ring-1 ring-white/8">
            {Array.from({ length: 4 }).map((_, j) => (
              <Skeleton key={j} className="h-14 rounded-none" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function TeamDetailSkeleton() {
  return (
    <div className="animate-fade-up space-y-8" aria-busy="true" aria-label="Loading team">
      <Skeleton className="h-4 w-28" />
      <div className="flex items-center gap-6">
        <Skeleton className="h-14 w-20 rounded" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
        ))}
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
