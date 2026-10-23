import { MessageCircle, Phone } from 'lucide-react'
import { company } from '../data/company'

export default function CTABand() {
  return (
    <section className="on-navy bg-navy py-14 text-white md:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="font-heading text-2xl font-extrabold !text-white md:text-4xl">
          Planning a substation or HT connection? Talk to us
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-steel">
          A Grade Class‑1 licensed contractor. Call or message us for a quick discussion.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a
            href={`tel:${company.phones[0].tel}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-btn bg-amber px-6 font-semibold text-navy hover:brightness-95"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {company.phones[0].display}
          </a>
          <a
            href={company.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-btn border-2 border-white px-6 font-semibold text-white hover:bg-white hover:text-navy"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
