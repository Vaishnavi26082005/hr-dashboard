'use client';

export default function SkeletonCard() {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 animate-pulse">
      <div className="flex flex-col h-full">
        {/* Avatar and Name Section */}
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-slate-600 rounded-full flex-shrink-0"></div>
          <div className="ml-3 flex-1">
            <div className="h-5 bg-slate-600 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-slate-700 rounded w-full"></div>
          </div>
        </div>

        {/* Department Badge */}
        <div className="mb-4">
          <div className="h-6 bg-slate-600 rounded-full w-24"></div>
        </div>

        {/* Performance Rating Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 bg-slate-600 rounded w-20"></div>
            <div className="h-4 bg-slate-700 rounded w-8"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-slate-600 rounded"></div>
              ))}
            </div>
            <div className="h-3 bg-slate-700 rounded w-16"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <div className="h-10 bg-slate-600 rounded-lg"></div>
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-slate-600 rounded-lg"></div>
            <div className="flex-1 h-10 bg-slate-600 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
