import { useState } from 'react'
import { ZoomIn } from 'lucide-react'
import PageHero from '../components/PageHero'
import Picture from '../components/Picture'
import { usePageMeta } from '../hooks/usePageMeta'
import { company, licences } from '../data/company'
import { documentImages } from '../data/images'
import Lightbox from '../components/Lightbox'
import LicenceRegister, { type RegisterItem } from '../components/LicenceRegister'

// 'TGSPDCL, Telangana' -> name 'TGSPDCL', sub 'Telangana · All voltages exceeding 33 kV'
const registerItems: RegisterItem[] = licences.map((l) => {
  const [name, region] = l.authority.split(', ')
  return { name, sub: [region, l.scope].filter(Boolean).join(' · '), number: l.number, grade: l.class }
})

export default function Credentials() {
  const [openIndex, setOpenIndex] = useState(-1)

  usePageMeta(
    'Credentials & Licences | SSK Electricals',
    'A Grade Class-1 electrical contractor licensed by TGSPDCL, APEPDCL, Transmission Corporations and the Telangana Electrical Licensing Board. View licences and work orders.',
  )

  return (
    <>
      <PageHero
        eyebrow="Credentials"
        title="Licensed in Telangana and Andhra Pradesh"
        intro={`${company.grade}, certified by ${company.certifiedBy.join(' and ')}.`}
      />

      <section aria-labelledby="licences-heading" className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="licences-heading" className="text-2xl md:text-4xl">Licences</h2>
          <p className="mt-2 text-sm text-slate">
            Two states · Vendor No. <span className="font-mono text-ink">{company.vendorNo}</span>
          </p>

          <div className="mt-6 md:mt-8">
            <LicenceRegister
              items={registerItems}
              title="Licensed above 33 kV"
              titleId="register-heading"
              titleAs="h3"
              columns="md:grid-cols-3"
              action={<span className="text-[11px] font-semibold text-steel md:text-xs">{licences.length} licences</span>}
            />
          </div>
        </div>
      </section>

      {documentImages.length > 0 && (
      <section className="bg-surface py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-4xl">Licence &amp; work order documents</h2>
          <p className="mt-2 max-w-2xl text-slate">Tap a document to view it full screen. Pinch or double-tap to zoom.</p>

          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {documentImages.map((d, i) => (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`View full size: ${d.alt}`}
                  className="group relative block min-h-11 w-full overflow-hidden rounded-card border border-steel/40 bg-white shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                  <Picture image={d} className="aspect-[3/4] w-full bg-surface object-contain" />
                  <span className="absolute bottom-2 right-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy/85 text-white">
                    <ZoomIn className="h-5 w-5" aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      )}

      <Lightbox images={documentImages} index={openIndex} onClose={() => setOpenIndex(-1)} />
    </>
  )
}
