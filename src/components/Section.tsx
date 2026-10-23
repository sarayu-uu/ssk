import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  title?: string
  eyebrow?: string
  intro?: string
  tone?: 'white' | 'surface'
  children: ReactNode
}

export default function Section({ id, title, eyebrow, intro, tone = 'white', children }: SectionProps) {
  return (
    <section id={id} className={`py-14 md:py-20 ${tone === 'surface' ? 'bg-surface' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-4">
        {(title || eyebrow) && (
          <header className="mb-8 max-w-2xl md:mb-12">
            {eyebrow && (
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate">{eyebrow}</p>
            )}
            {title && <h2 className="text-2xl md:text-4xl">{title}</h2>}
            {intro && <p className="mt-3 text-slate">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
