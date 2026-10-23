import { Check } from 'lucide-react'
import PageHero from '../components/PageHero'
import Picture from '../components/Picture'
import { usePageMeta } from '../hooks/usePageMeta'
import { services } from '../data/company'
import { getImage } from '../data/images'

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

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Nine services, one licensed contractor"
        intro="From 11 kV substations to XLPE cabling, transformers and solar plants."
      />

      {/* Sticky jump bar under the header — swipe on mobile */}
      <nav aria-label="Jump to service" className="sticky top-16 z-30 border-b border-steel/40 bg-white/95 backdrop-blur">
        <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {services.map((s, i) => (
            <li key={s.slug} className="shrink-0">
              <a
                href={`#${s.slug}`}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-steel/60 px-3 text-xs font-semibold text-navy hover:border-navy hover:bg-surface"
              >
                <span className="font-mono text-[11px] text-amber">{num(i)}</span>
                {s.title}
              </a>
            </li>
          ))}
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
                <div className={`relative overflow-hidden rounded-card shadow-sm ${i % 2 ? 'md:order-2' : ''}`}>
                  <Picture image={image} className="aspect-[16/10] w-full object-cover md:aspect-[4/3]" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                  <span
                    aria-hidden
                    className="absolute bottom-2 left-4 font-heading text-5xl font-extrabold leading-none text-amber md:bottom-4 md:left-6 md:text-7xl"
                  >
                    {num(i)}
                  </span>
                </div>
              )}
              <div>
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
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
