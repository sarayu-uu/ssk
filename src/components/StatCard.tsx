import type { Stat } from '../data/company'

export default function StatCard({ value, label }: Stat) {
  return (
    <div className="min-w-0 rounded-card border border-steel/40 bg-white p-4 text-center shadow-sm sm:p-5">
      <p className="font-heading text-xl font-extrabold leading-tight text-navy min-[400px]:text-2xl sm:text-3xl md:text-4xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate sm:text-sm">{label}</p>
    </div>
  )
}
