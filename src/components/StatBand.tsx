import type { Stat } from '../data/company'

interface StatBandProps {
  stats: Stat[]
  label?: string
}

/** Navy band of figures split by hairlines (no cards). Sits flush under a navy hero or between sections. */
export default function StatBand({ stats, label = 'Track record' }: StatBandProps) {
  return (
    <section aria-label={label} className="on-navy border-t border-white/10 bg-navy">
      <div className="mx-auto max-w-6xl px-4">
        <dl className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse bg-navy px-3 py-5 md:px-6 md:py-8">
              <dt className="mt-2 text-xs text-steel md:text-sm">{s.label}</dt>
              <dd className="font-heading text-2xl font-extrabold leading-none text-white min-[400px]:text-3xl md:text-4xl">
                {s.value}
                {s.unit && <span className="ml-1 text-base font-bold text-amber md:text-xl">{s.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
