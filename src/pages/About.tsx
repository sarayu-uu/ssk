import { ShieldCheck, Award, Clock, BadgeCheck, MapPin, Building2, Landmark } from 'lucide-react'
import PageHero from '../components/PageHero'
import Picture from '../components/Picture'
import { usePageMeta } from '../hooks/usePageMeta'
import Section from '../components/Section'
import StatCard from '../components/StatCard'
import { company, stats, privateClients, governmentWork } from '../data/company'
import { getImage, type SiteImage } from '../data/images'

const values = [
  {
    icon: ShieldCheck,
    title: 'Safety',
    text: 'Every job follows utility safety practice. Crews, clients and the public go home safe.',
  },
  {
    icon: Award,
    title: 'Quality',
    text: 'Work built to TGSPDCL and APEPDCL standards, with proper materials and clean finishing.',
  },
  {
    icon: Clock,
    title: 'On-time delivery',
    text: 'Clear schedules and a dedicated crew, so power is charged when we said it would be.',
  },
]

const whyUs = [
  {
    title: 'Licensed in two states',
    text: `${company.grade}, certified by TGSPDCL (Telangana) and APEPDCL (Andhra Pradesh), cleared for voltages above 33 kV.`,
  },
  {
    title: 'Proven scale',
    text: '10,000+ km of transmission lines and 2,000+ km of XLPE underground cable laid.',
  },
  {
    title: 'One contractor, full scope',
    text: 'Substations, HT and LT works, cabling, transformers, solar and EV charging under one roof.',
  },
  {
    title: 'Hands-on leadership',
    text: `Led by ${company.proprietor.name} since ${company.established}, with a direct line to the owner on every project.`,
  },
]

function Photo({ image, className = '' }: { image?: SiteImage; className?: string }) {
  if (!image) return null
  return (
    <Picture image={image} className={`aspect-[4/3] w-full rounded-card object-cover shadow-sm ${className}`} />
  )
}

export default function About() {
  usePageMeta(
    `About us | ${company.shortName}`,
    `${company.name}: A Grade Class-1 electrical contractor in Hyderabad since ${company.established}. Substations, HT/LT works and XLPE cabling.`,
  )

  const storyPhoto = getImage('outdoor-substation')
  const cablePhoto = getImage('ug-cable-laying-trench')
  const sitePhoto = getImage('transformer-apartment-complex')

  return (
    <>
      <PageHero
        eyebrow="About us"
        title={`Building power infrastructure since ${company.established}`}
        intro={`${company.name} is a licensed electrical contractor based in Kukatpally, Hyderabad.`}
      />

      <Section eyebrow="Our story" title="From a small crew to a Class‑I contractor">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="space-y-4 text-ink">
            <p>
              Sri Sai Krupa Constructions &amp; Electrical Works was established in {company.established} by{' '}
              {company.proprietor.name}. We started with distribution works and grew into a full-scope
              contractor for HT and LT electrical infrastructure.
            </p>
            <p>
              Today we hold {company.grade} status with TGSPDCL and APEPDCL, and we work on voltages above 33 kV
              in both Telangana and Andhra Pradesh.
            </p>
            <p>
              We have laid over 10,000 km of transmission lines and 2,000+ km of XLPE underground cable. We
              build substations, install and service transformers, and deliver on-grid solar and EV charging
              connections.
            </p>
            <p className="flex items-start gap-2 text-slate">
              <MapPin aria-hidden className="mt-1 h-5 w-5 shrink-0 text-amber" />
              {company.address.full}
            </p>
          </div>
          <Photo image={storyPhoto} />
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Proprietor" title={company.proprietor.name}>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <Photo image={cablePhoto} className="md:order-2" />
          <div className="space-y-4 text-ink">
            <p>
              {company.proprietor.name} founded the firm and still leads it as {company.proprietor.role}.
              Every tender, site plan and handover passes through the owner.
            </p>
            <p>
              Clients deal with the person accountable for the work, not a layer of intermediaries. That is
              how we keep quality high and commitments honest.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="surface" eyebrow="Our values" title="How we work">
        <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-card border border-steel/40 bg-white p-5 shadow-sm">
              <Icon aria-hidden className="h-8 w-8 text-amber" />
              <h3 className="mt-3 text-lg">{title}</h3>
              <p className="mt-2 text-slate">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Why choose us" title="Four reasons clients stay with us">
        <div className="grid items-start gap-8 lg:grid-cols-5 lg:gap-12">
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {whyUs.map((w) => (
              <li key={w.title} className="rounded-card border border-steel/40 bg-white p-5 shadow-sm">
                <BadgeCheck aria-hidden className="h-6 w-6 text-amber" />
                <h3 className="mt-2 text-lg">{w.title}</h3>
                <p className="mt-1 text-slate">{w.text}</p>
              </li>
            ))}
          </ul>
          <Photo image={sitePhoto} className="lg:col-span-2" />
        </div>
      </Section>

      <Section
        tone="surface"
        eyebrow="Experience"
        title="Government and private clients"
        intro="We deliver for power utilities and for industry."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-card border border-steel/40 bg-white p-5 shadow-sm">
            <Landmark aria-hidden className="h-8 w-8 text-amber" />
            <h3 className="mt-3 text-lg">Government</h3>
            <p className="mt-2 text-slate">{governmentWork.summary}</p>
            <p className="mt-2 text-slate">{governmentWork.workOrders}</p>
          </div>
          <div className="rounded-card border border-steel/40 bg-white p-5 shadow-sm">
            <Building2 aria-hidden className="h-8 w-8 text-amber" />
            <h3 className="mt-3 text-lg">Private sector</h3>
            <ul className="mt-2 space-y-1 text-slate">
              {privateClients.map((c) => (
                <li key={c.name}>
                  <span className="font-medium text-ink">{c.name}</span> — {c.detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  )
}
