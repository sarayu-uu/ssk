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

      {services.map((s, i) => {
        const image = getImage(serviceImages[s.slug])
        return (
          <section key={s.slug} id={s.slug} className={`py-14 md:py-20 ${i % 2 ? 'bg-surface' : 'bg-white'}`}>
            <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2 md:gap-12">
              {image && (
                <div className={i % 2 ? 'md:order-2' : ''}>
                  <Picture image={image} className="aspect-[4/3] w-full rounded-card object-cover shadow-sm" />
                </div>
              )}
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate">
                  Service {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="text-2xl md:text-4xl">{s.title}</h2>
                <p className="mt-3 text-slate">{s.summary}</p>
                <ul className="mt-5 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check aria-hidden className="mt-1 h-5 w-5 shrink-0 text-amber" />
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
