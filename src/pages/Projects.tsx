import { useMemo, useState } from 'react'
import { categories, galleryImages, type Category, type SiteImage } from '../data/images'
import Lightbox from '../components/Lightbox'
import PageHero from '../components/PageHero'
import PhotoTile from '../components/PhotoTile'
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
                  className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
                    active
                      ? 'border-navy bg-navy text-white shadow-sm'
                      : 'border-steel bg-white text-navy hover:bg-surface'
                  }`}
                >
                  {f}{' '}
                  <span className={`ml-1 rounded-full px-1.5 py-0.5 font-mono text-[11px] ${active ? 'bg-amber text-navy' : 'bg-surface text-slate'}`}>
                    {countFor(f)}
                  </span>
                </button>
              )
            })}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 -right-4 w-10 bg-gradient-to-l from-white to-transparent md:hidden" />
          </div>

          {/* Mosaic: every 7th photo is a large feature tile; dense flow fills the gaps */}
          <ul className="mt-6 grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-3 md:auto-rows-[180px] md:gap-4 lg:grid-cols-4 lg:auto-rows-[200px]">
            {visible.map((img, i) => {
              const feature = i % 7 === 0
              return (
                <li
                  key={img.id}
                  className={`overflow-hidden rounded-card bg-navy shadow-sm transition-shadow hover:shadow-md ${
                    feature ? 'col-span-2 aspect-[16/10] md:row-span-2 md:aspect-auto' : 'aspect-square md:aspect-auto'
                  }`}
                >
                  <PhotoTile image={img} onClick={() => setOpenIndex(i)} large={feature} />
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <Lightbox images={visible} index={openIndex} onClose={() => setOpenIndex(-1)} />
    </>
  )
}
