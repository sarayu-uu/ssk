import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import PageHero from '../components/PageHero'
import Picture from '../components/Picture'
import { usePageMeta } from '../hooks/usePageMeta'
import { services } from '../data/company'
import { getImage } from '../data/images'
import Reveal from '../components/Reveal'

const serviceImages: Record<string, string> = {
  substations: 'outdoor-substation',
  'ht-lt-works': '33kv-switchyard-structure',
  cabling: 'ug-cable-laying-trench',
  'transmission-lines': 'transmission-tower',
  transformers: 'power-transformer-yard',
  'overhead-underground': '33kv-structure-erection',
  solar: 'rooftop-solar-plant',
  'ev-charging': 'ev-station-ht-kiosk',
  'buildings-industrial': 'lt-panel-room-400sqmm-feeders',
}

const num = (i: number) => String(i + 1).padStart(2, '0')

export default function Services() {
  usePageMeta(
    'Services | SSK Electricals',
    'Substations, HT & LT works, XLPE cabling, transmission lines, transformers, solar and EV charging HT services in Telangana and Andhra Pradesh.',
  )

  const [active, setActive] = useState<string>()
  const barRef = useRef<HTMLUListElement>(null)

  // Active = the service section crossing the band just below the sticky header + jump bar
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-140px 0px -55% 0px' },
    )
    services.forEach((s) => {
      const el = document.getElementById(s.slug)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // Keep the active chip visible in the horizontally scrolling bar
  useEffect(() => {
    const bar = barRef.current
    const chip = bar?.querySelector<HTMLElement>(`[data-slug="${active}"]`)
    if (!bar || !chip) return
    bar.scrollTo({ left: chip.offsetLeft - 16, behavior: 'smooth' })
  }, [active])

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Nine services, one licensed contractor"
        intro="From 11 kV substations to XLPE cabling, transformers and solar plants."
      />

      {/* Sticky jump bar under the header — swipe on mobile; highlights the section in view */}
      <nav aria-label="Jump to service" className="sticky top-16 z-30 border-b border-steel/40 bg-white/95 backdrop-blur">
        <ul
          ref={barRef}
          className="relative mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((s, i) => {
            const isActive = s.slug === active
            return (
              <li key={s.slug} className="shrink-0">
                <a
                  href={`#${s.slug}`}
                  data-slug={s.slug}
                  aria-current={isActive ? 'location' : undefined}
                  className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'border-navy bg-navy text-white'
                      : 'border-steel/60 text-navy hover:border-navy hover:bg-surface'
                  }`}
                >
                  <span className={`text-[11px] tabular-nums ${isActive ? 'text-amber' : 'text-slate'}`}>{num(i)}</span>
                  {s.title}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {services.map((s, i) => {
        const image = getImage(serviceImages[s.slug])
        return (
          <section
            key={s.slug}
            id={s.slug}
            aria-labelledby={`${s.slug}-title`}
            className={`scroll-mt-32 py-10 md:py-16 ${i % 2 ? 'bg-surface' : 'bg-white'}`}
          >
            <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 md:grid-cols-2 md:gap-12">
              {image && (
                <Reveal className={`relative overflow-hidden rounded-card shadow-sm ${i % 2 ? 'md:order-2' : ''}`}>
                  <Picture image={image} className="aspect-[16/10] w-full object-cover md:aspect-[4/3]" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                  <span
                    aria-hidden
                    className="absolute bottom-2 left-4 font-heading text-5xl font-extrabold leading-none text-amber md:bottom-4 md:left-6 md:text-7xl"
                  >
                    {num(i)}
                  </span>
                </Reveal>
              )}
              <Reveal stagger delay={100}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate">
                  Service {num(i)} / {num(services.length - 1)}
                </p>
                <h2 id={`${s.slug}-title`} className="text-2xl md:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-3 text-sm text-slate md:text-base">{s.summary}</p>
                <ul className="mt-5 divide-y divide-steel/30 overflow-hidden rounded-card border border-steel/40 bg-white">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 px-4 py-3 text-sm">
                      <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber">
                        <Check className="h-3 w-3 text-navy" strokeWidth={3} />
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        )
      })}
    </>
  )
}
