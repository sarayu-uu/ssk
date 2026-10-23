import { useMemo, useState } from 'react'
import { categories, galleryImages, type Category, type SiteImage } from '../data/images'
import Lightbox from '../components/Lightbox'
import PageHero from '../components/PageHero'
import Picture from '../components/Picture'
import { usePageMeta } from '../hooks/usePageMeta'

type Filter = 'All' | Category

const filters: Filter[] = ['All', ...categories]

/** Near-duplicate family, e.g. oltc-repair-1/2/3 -> oltc-repair. */
const familyOf = (img: SiteImage) => img.id.replace(/-\d+$/, '')

/** Reorder so images of the same family stay at least `gap` positions apart. */
function spreadDuplicates(list: SiteImage[], gap = 4): SiteImage[] {
  const rest = [...list]
  const out: SiteImage[] = []
  while (rest.length) {
    const recent = out.slice(-gap).map(familyOf)
    const at = rest.findIndex((img) => !recent.includes(familyOf(img)))
    out.push(rest.splice(at === -1 ? 0 : at, 1)[0])
  }
  return out
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const [openIndex, setOpenIndex] = useState(-1)

  usePageMeta(
    'Projects | SSK Electricals',
    'Photos of 11 kV and 33 kV substations, transformer servicing, XLPE cabling, LT panels, solar and EV charging HT works by SSK Electricals.',
  )

  const visible = useMemo(
    () => spreadDuplicates(filter === 'All' ? galleryImages : galleryImages.filter((i) => i.category === filter)),
    [filter],
  )

  const countFor = (f: Filter) =>
    f === 'All' ? galleryImages.length : galleryImages.filter((i) => i.category === f).length

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work from the field"
        intro="Substations, transformers, cabling, panels, solar and EV charging — tap any photo to enlarge."
      />

      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative">
          <div role="group" aria-label="Filter projects by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
            {filters.map((f) => {
              const active = f === filter
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={`min-h-11 shrink-0 rounded-lg border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
                    active
                      ? 'border-navy bg-navy text-white'
                      : 'border-steel bg-white text-navy hover:bg-surface'
                  }`}
                >
                  {f} <span className={active ? 'text-white/80' : 'text-slate'}>({countFor(f)})</span>
                </button>
              )
            })}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 -right-4 w-10 bg-gradient-to-l from-white to-transparent md:hidden" />
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {visible.map((img, i) => (
              <li
                key={img.id}
                className="overflow-hidden rounded-card bg-surface shadow-sm transition-shadow hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`View larger: ${img.alt}`}
                  className="block w-full text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy"
                >
                  <Picture
                    image={img}
                    className={`aspect-[4/3] w-full object-cover ${img.hasCaption ? 'object-top' : 'object-center'}`}
                  />
                  <span className="block p-2.5 text-xs leading-snug text-slate sm:text-sm">{img.alt}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Lightbox images={visible} index={openIndex} onClose={() => setOpenIndex(-1)} />
    </>
  )
}
