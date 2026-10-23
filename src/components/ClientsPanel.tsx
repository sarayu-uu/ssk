import { Landmark } from 'lucide-react'
import { privateClients, governmentWork } from '../data/company'

const workOrderAreas = ['Medak circle', 'Siddipet', 'Sangareddy']

const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

/** Government work as a navy panel, then private clients as a divided list with initials badges. */
export default function ClientsPanel() {
  return (
    <>
      {/* Utility work first — government orders are the strongest reference */}
      <div className="on-navy rounded-card bg-navy p-5 text-white shadow-sm md:flex md:items-center md:justify-between md:gap-8 md:p-8">
        <div className="flex items-start gap-3">
          <Landmark aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-amber md:h-8 md:w-8" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber md:text-xs">Government · TSSPDCL</p>
            <p className="mt-1 font-heading text-base font-bold leading-snug md:text-xl">{governmentWork.summary}</p>
          </div>
        </div>
        <ul aria-label="Work order circles" className="mt-4 flex flex-wrap gap-2 md:mt-0 md:shrink-0">
          {workOrderAreas.map((a) => (
            <li key={a} className="rounded-full border border-white/25 px-3 py-1 text-xs text-white/90">
              {a}
            </li>
          ))}
        </ul>
      </div>

      <p className="mb-3 mt-8 text-[11px] font-bold uppercase tracking-wider text-slate md:text-xs">Private sector</p>
      <ul className="grid gap-px overflow-hidden rounded-card border border-steel/40 bg-steel/30 sm:grid-cols-2 lg:grid-cols-4">
        {privateClients.map((c) => (
          <li key={c.name} className="flex items-center gap-3 bg-white p-3 md:p-4">
            <span
              aria-hidden
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface font-heading text-sm font-extrabold text-navy ring-1 ring-steel/50"
            >
              {initials(c.name)}
            </span>
            <div className="min-w-0">
              <p className="font-heading text-sm font-bold leading-snug text-navy">{c.name}</p>
              <p className="mt-0.5 font-mono text-[11px] text-slate">{c.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
