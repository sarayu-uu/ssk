import { Link } from 'react-router-dom'
import { Phone, MessageCircle, ArrowRight } from 'lucide-react'
import Button from '../components/Button'
import Section from '../components/Section'
import ServiceCard from '../components/ServiceCard'
import StatBand from '../components/StatBand'
import LicenceRegister, { type RegisterItem } from '../components/LicenceRegister'
import PhotoTile from '../components/PhotoTile'
import ClientsPanel from '../components/ClientsPanel'
import { company, services, stats } from '../data/company'
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

      <div className="rise-stagger mx-auto flex min-h-[32rem] max-w-6xl flex-col justify-center px-4 py-14 md:min-h-[36rem] md:py-20 lg:min-h-[40rem]">
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
          <Button variant="light" href={company.whatsapp} external className="w-full sm:w-auto">
            <MessageCircle aria-hidden className="h-5 w-5" />
            WhatsApp us
          </Button>
        </div>
      </div>
    </section>
  )
}

const homeLicences: RegisterItem[] = [
  { name: 'TGSPDCL', sub: 'Telangana', grade: 'Class‑I', number: 'A 8770' },
  { name: 'APEPDCL', sub: 'Andhra Pradesh', grade: 'Class‑I A Grade', number: '01521' },
  { name: 'TS Transco', sub: 'Telangana', grade: 'Class‑I', number: 'A8770' },
  { name: 'AP Transco', sub: 'Andhra Pradesh', grade: 'Class‑I A Grade', number: '01521' },
]

function Licences() {
  return (
    <section aria-labelledby="licences-heading" className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <LicenceRegister
          items={homeLicences}
          title="Licensed above 33 kV"
          titleId="licences-heading"
          action={
            <Link
              to="/credentials"
              className="inline-flex min-h-11 shrink-0 items-center gap-1 text-[11px] font-semibold text-amber hover:underline md:text-sm"
            >
              All licences
              <ArrowRight aria-hidden className="h-3.5 w-3.5" />
            </Link>
          }
        />
      </div>
    </section>
  )
}

const previewServices: { slug: string; image: string }[] = [
  { slug: 'substations', image: 'compact-substation-fenced' },
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
      {/* Swipe carousel below lg (next card peeks in), 3-col grid on desktop */}
      <ul
        tabIndex={0}
        aria-label="Services — swipe for more"
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {previewServices.map(({ slug, image }) => {
          const service = services.find((s) => s.slug === slug)
          return service ? (
            <li key={slug} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
              <ServiceCard service={service} image={getImage(image)} />
            </li>
          ) : null
        })}
      </ul>
      <p aria-hidden className="mt-2 text-center text-[11px] text-slate lg:hidden">
        Swipe to see more →
      </p>
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
      {/* Mosaic: mobile = wide lead + 2-col + wide closer; md+ = 2×2 lead with tiles around it */}
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:auto-rows-[200px] md:gap-4 lg:auto-rows-[240px]">
        {featuredImages.map((img, i) => {
          const lead = i === 0
          const closer = i === featuredImages.length - 1
          const shape = lead
            ? 'col-span-2 aspect-[16/10] md:row-span-2 md:aspect-auto'
            : closer
              ? 'col-span-2 aspect-[16/9] md:col-span-1 md:aspect-auto'
              : 'aspect-square md:aspect-auto'
          return (
            <li key={img.id} className={`overflow-hidden rounded-card bg-navy shadow-sm ${shape}`}>
              <PhotoTile image={img} to="/projects" large={lead} />
            </li>
          )
        })}
      </ul>
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
      intro="HT connections for industry, and new substations for the state utility."
    >
      <ClientsPanel />
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
      <StatBand stats={stats} />
      <Licences />
      <ServicesPreview />
      <FeaturedProjects />
      <Clients />
    </>
  )
}
