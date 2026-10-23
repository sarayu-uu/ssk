import { Link } from 'react-router-dom'
import { Phone, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react'
import Button from '../components/Button'
import Section from '../components/Section'
import ServiceCard from '../components/ServiceCard'
import ImageGrid from '../components/ImageGrid'
import { company, services, privateClients, governmentWork } from '../data/company'
import { getImage, type SiteImage } from '../data/images'
import Picture from '../components/Picture'
import { usePageMeta } from '../hooks/usePageMeta'

const hero = getImage('hero-substation-crew')

function Hero() {
  return (
    <section className="on-navy relative isolate overflow-hidden bg-navy text-white">
      {hero && (
        <Picture
          image={hero}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/90 via-navy/80 to-navy/95 md:bg-gradient-to-r md:from-navy/95 md:via-navy/80 md:to-navy/40" />

      <div className="mx-auto flex min-h-[32rem] max-w-6xl flex-col justify-center px-4 py-14 md:min-h-[36rem] md:py-20 lg:min-h-[40rem]">
        <p className="mb-4 inline-flex w-fit items-center rounded-full border border-amber/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber sm:text-sm">
          {company.grade}
        </p>
        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          Licensed HT/LT &amp; substation contractor since {company.established}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">
          Certified by TGSPDCL and APEPDCL. We build substations, lay XLPE cable and erect
          transmission lines across Telangana &amp; Andhra Pradesh.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={`tel:${company.phones[0].tel}`} className="w-full sm:w-auto">
            <Phone aria-hidden className="h-5 w-5" />
            Call {company.phones[0].display}
          </Button>
          <Button
            variant="secondary"
            href={company.whatsapp}
            external
            className="w-full border-white! text-white! hover:bg-white! hover:text-navy! sm:w-auto"
          >
            <MessageCircle aria-hidden className="h-5 w-5" />
            WhatsApp us
          </Button>
        </div>
      </div>
    </section>
  )
}

const homeStats = [
  { value: String(company.established), unit: '', label: 'Established, Hyderabad' },
  { value: '10,000+', unit: 'km', label: 'Transmission lines laid' },
  { value: '2,000+', unit: 'km', label: 'XLPE UG cable laid' },
  { value: '1', unit: 'MVA', label: 'Transformer installs, up to' },
]

// Navy band continuing the hero — hairline dividers instead of cards
function StatsBand() {
  return (
    <section aria-label="Track record" className="on-navy border-t border-white/10 bg-navy">
      <div className="mx-auto max-w-6xl px-4">
        <dl className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
          {homeStats.map((s) => (
            <div key={s.label} className="bg-navy px-3 py-5 md:px-6 md:py-8">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-heading text-2xl font-extrabold leading-none text-white min-[400px]:text-3xl md:text-4xl">
                {s.value}
                {s.unit && <span className="ml-1 text-base font-bold text-amber md:text-xl">{s.unit}</span>}
              </dd>
              <dd aria-hidden className="mt-2 text-xs text-steel md:text-sm">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

const licences = [
  { authority: 'TGSPDCL', region: 'Telangana', grade: 'Class‑I', no: 'A 8770' },
  { authority: 'APEPDCL', region: 'Andhra Pradesh', grade: 'Class‑I A Grade', no: '01521' },
  { authority: 'TS Transco', region: 'Telangana', grade: 'Class‑I', no: 'A8770' },
  { authority: 'AP Transco', region: 'Andhra Pradesh', grade: 'Class‑I A Grade', no: '01521' },
]

// Reads like an official register: authority on the left, licence number on the right
function LicenceRegister() {
  return (
    <section aria-labelledby="licences-heading" className="bg-surface py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="overflow-hidden rounded-card border border-steel/50 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-steel/40 bg-navy px-4 py-3 md:px-6">
            <h2 id="licences-heading" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white md:text-sm">
              <ShieldCheck aria-hidden className="h-4 w-4 shrink-0 text-amber md:h-5 md:w-5" />
              Licensed above 33 kV
            </h2>
            <Link
              to="/credentials"
              className="inline-flex min-h-11 shrink-0 items-center gap-1 text-[11px] font-semibold text-amber hover:underline md:text-sm"
            >
              All licences
              <ArrowRight aria-hidden className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="divide-y divide-steel/30 md:grid md:grid-cols-4 md:divide-x md:divide-y-0">
            {licences.map((l) => (
              <li key={l.authority} className="flex items-center justify-between gap-3 px-4 py-3 md:block md:px-6 md:py-5">
                <div className="min-w-0">
                  <p className="font-heading text-sm font-bold text-navy md:text-base">{l.authority}</p>
                  <p className="text-[11px] text-slate md:text-xs">{l.region}</p>
                </div>
                <div className="text-right md:mt-3 md:text-left">
                  <p className="font-mono text-sm font-semibold tracking-tight text-ink">
                    <span className="sr-only">Licence no. </span>
                    {l.no}
                  </p>
                  <p className="text-[11px] text-slate md:text-xs">{l.grade}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

const previewServices: { slug: string; image: string }[] = [
  { slug: 'substations', image: 'distribution-substation-kiosk' },
  { slug: 'ht-lt-works', image: '33kv-switchyard-structure' },
  { slug: 'cabling', image: 'ug-cable-laying-trench' },
  { slug: 'transmission-lines', image: 'transmission-tower' },
  { slug: 'transformers', image: 'power-transformer-yard' },
  { slug: 'solar', image: 'rooftop-solar-plant' },
]

function ServicesPreview() {
  return (
    <Section
      tone="surface"
      eyebrow="What we do"
      title="Electrical works, end to end"
      intro="From 11 kV substations to XLPE cabling and solar plants."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {previewServices.map(({ slug, image }) => {
          const service = services.find((s) => s.slug === slug)
          return service ? <ServiceCard key={slug} service={service} image={getImage(image)} /> : null
        })}
      </div>
      <div className="mt-8 text-center">
        <Button variant="secondary" href="/services">
          View all services
        </Button>
      </div>
    </Section>
  )
}

const featuredIds = [
  'outdoor-substation',
  'transformer-apartment-complex',
  'lt-panel-room-cable-trays-1',
  'solar-panel-structure',
  'oltc-repair-1',
  'ev-station-ht-kiosk',
]
const featuredImages = featuredIds.map(getImage).filter((i): i is SiteImage => !!i)

function FeaturedProjects() {
  return (
    <Section eyebrow="Our work" title="Featured projects" intro="Substations, transformers, panels, solar and EV sites we have delivered.">
      <ImageGrid images={featuredImages} showCaptions />
      <div className="mt-8 text-center">
        <Button variant="secondary" href="/projects">
          See all projects
        </Button>
      </div>
    </Section>
  )
}

function Clients() {
  return (
    <Section
      tone="surface"
      eyebrow="Clients"
      title="Trusted by industry and utilities"
      intro={`${governmentWork.summary} ${governmentWork.workOrders}`}
    >
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {privateClients.map((c) => (
          <li key={c.name} className="rounded-card border border-steel/40 bg-white p-4 shadow-sm">
            <p className="font-heading font-bold text-navy">{c.name}</p>
            <p className="mt-1 text-sm text-slate">{c.detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'ElectricalContractor',
  name: company.name,
  alternateName: company.shortName,
  description: `${company.grade} certified by TGSPDCL and APEPDCL. Substations, HT/LT works, XLPE cabling and transmission lines.`,
  foundingDate: String(company.established),
  founder: { '@type': 'Person', name: company.proprietor.name },
  image: '/images/hero/hero-substation-crew.jpg',
  telephone: company.phones.map((p) => p.tel),
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.lines.join(', '),
    addressLocality: company.address.city,
    addressRegion: 'Telangana',
    postalCode: company.address.pincode.replace(' ', ''),
    addressCountry: 'IN',
  },
  areaServed: ['Telangana', 'Andhra Pradesh'],
  taxID: company.gstin,
}

export default function Home() {
  usePageMeta(
    'SSK Electricals — A Grade Class‑1 Electrical Contractor, Hyderabad',
    'Sri Sai Krupa Constructions & Electrical Works — licensed Class‑I electrical contractor since 2009. Substations, HT/LT works, XLPE cabling and transmission lines in Telangana & Andhra Pradesh.',
  )
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Hero />
      <StatsBand />
      <LicenceRegister />
      <ServicesPreview />
      <FeaturedProjects />
      <Clients />
    </>
  )
}
