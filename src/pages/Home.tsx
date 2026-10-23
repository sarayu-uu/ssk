import { Phone, MessageCircle, BadgeCheck } from 'lucide-react'
import Button from '../components/Button'
import Section from '../components/Section'
import StatCard from '../components/StatCard'
import ServiceCard from '../components/ServiceCard'
import ImageGrid from '../components/ImageGrid'
import { company, services, privateClients, governmentWork, type Stat } from '../data/company'
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

const trustBadges = [
  { name: 'TGSPDCL', detail: 'Class‑I · A 8770' },
  { name: 'APEPDCL', detail: 'Class‑I A Grade · 01521' },
  { name: 'TS Transco', detail: 'Class‑I · A8770' },
  { name: 'AP Transco', detail: 'Class‑I A Grade · 01521' },
]

function TrustStrip() {
  return (
    <section aria-label="Licences" className="border-b border-steel/40 bg-surface py-6 md:py-8">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-slate">
          Licensed to work above 33 kV
        </p>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {trustBadges.map((b) => (
            <li
              key={b.name}
              className="flex min-w-0 flex-col items-start gap-2 rounded-card border border-steel/40 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:gap-3"
            >
              <BadgeCheck aria-hidden className="h-6 w-6 shrink-0 text-amber" />
              <div className="min-w-0">
                <p className="font-heading text-sm font-bold text-navy sm:text-base">{b.name}</p>
                <p className="text-xs text-slate">{b.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const homeStats: Stat[] = [
  { value: `Since ${company.established}`, label: 'Serving Telangana & AP' },
  { value: '10,000+ km', label: 'Transmission lines laid' },
  { value: '2,000+ km', label: 'XLPE UG cable laid' },
  { value: 'Class‑I', label: 'Licences in two states' },
]

function StatsRow() {
  return (
    <Section>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
        {homeStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </Section>
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
      <TrustStrip />
      <StatsRow />
      <ServicesPreview />
      <FeaturedProjects />
      <Clients />
    </>
  )
}
