import type { ReactNode } from 'react'
import { ShieldCheck } from 'lucide-react'

export interface RegisterItem {
  name: string
  /** Region / scope line under the name */
  sub?: string
  number: string
  grade: string
}

interface LicenceRegisterProps {
  items: RegisterItem[]
  title: string
  titleId: string
  titleAs?: 'h2' | 'h3'
  /** Link or note shown on the right of the navy header bar */
  action?: ReactNode
  /** Literal Tailwind column classes, e.g. 'md:grid-cols-4' */
  columns?: string
}

/** Licences shown like an official register: authority left, licence number right (stacks into columns on md+). */
export default function LicenceRegister({
  items,
  title,
  titleId,
  titleAs: Heading = 'h2',
  action,
  columns = 'md:grid-cols-4',
}: LicenceRegisterProps) {
  return (
    <div className="overflow-hidden rounded-card border border-steel/50 bg-white shadow-sm">
      <div className="on-navy flex items-center justify-between gap-3 bg-navy px-4 py-3 md:px-6">
        <Heading
          id={titleId}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white md:text-sm"
        >
          <ShieldCheck aria-hidden className="h-4 w-4 shrink-0 text-amber md:h-5 md:w-5" />
          {title}
        </Heading>
        {action}
      </div>
      <ul className={`grid gap-px bg-steel/30 ${columns}`}>
        {items.map((l) => (
          <li
            key={`${l.name}-${l.number}`}
            className="flex items-center justify-between gap-3 bg-white px-4 py-3 md:block md:px-6 md:py-5"
          >
            <div className="min-w-0">
              <p className="font-heading text-sm font-bold leading-snug text-navy md:text-base">{l.name}</p>
              {l.sub && <p className="text-[11px] text-slate md:text-xs">{l.sub}</p>}
            </div>
            <div className="shrink-0 text-right md:mt-3 md:text-left">
              <p className="font-mono text-sm font-semibold tracking-tight text-ink">
                <span className="sr-only">Licence no. </span>
                {l.number}
              </p>
              <p className="text-[11px] text-slate md:text-xs">{l.grade}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
