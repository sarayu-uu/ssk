import type { ReactNode } from 'react'
import { ShieldCheck, Award, Clock, BadgeCheck, MapPin, Quote } from 'lucide-react'
import PageHero from '../components/PageHero'
import Picture from '../components/Picture'
import { usePageMeta } from '../hooks/usePageMeta'
import Section from '../components/Section'
import StatBand from '../components/StatBand'
import ClientsPanel from '../components/ClientsPanel'
import { company, stats } from '../data/company'
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

/** Photo with an offset amber frame behind it (md+). */
function FramedPhoto({ image, className = '', children }: { image?: SiteImage; className?: string; children?: ReactNode }) {
  if (!image) return null
  return (
    <div className={`relative isolate ${className}`}>
      <div aria-hidden className="absolute inset-0 -z-10 hidden translate-x-3 translate-y-3 rounded-card border-2 border-amber md:block" />
      <Picture image={image} className="aspect-[4/3] w-full rounded-card object-cover shadow-md" />
      {children}
    </div>
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
      <StatBand stats={stats} />

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
            <p className="flex items-start gap-2 text-sm text-slate">
              <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
              {company.address.full}
            </p>
          </div>
          <FramedPhoto image={storyPhoto}>
            <div className="on-navy absolute bottom-3 left-3 rounded-lg bg-navy px-3 py-2 text-white shadow-md md:-bottom-5 md:-left-5 md:px-5 md:py-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber md:text-xs">Established</p>
              <p className="font-heading text-xl font-extrabold leading-none md:text-3xl">{company.established}</p>
            </div>
          </FramedPhoto>
        </div>
      </Section>

      <Section tone="surface" eyebrow="Proprietor" title="Owner-led, on every site">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <FramedPhoto image={cablePhoto} className="md:order-2" />
          <figure className="on-navy rounded-card bg-navy p-6 text-white shadow-sm md:p-8">
            <Quote aria-hidden className="h-8 w-8 text-amber" />
            <blockquote className="mt-3 space-y-3 text-sm text-white/90 md:text-base">
              <p className="font-heading text-lg font-bold leading-snug text-white md:text-2xl">
                Clients deal with the person accountable for the work, not a layer of intermediaries.
              </p>
              <p>
                Every tender, site plan and handover passes through the owner. That is how we keep quality high
                and commitments honest.
              </p>
            </blockquote>
            <figcaption className="mt-5 border-t border-white/15 pt-4">
              <p className="font-heading font-bold">{company.proprietor.name}</p>
              <p className="text-xs text-steel">
                Founder &amp; {company.proprietor.role}, since {company.established}
              </p>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section eyebrow="Our values" title="How we work">
        {/* Numbered columns with an amber rule — no boxes */}
        <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
          {values.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="border-t-2 border-amber pt-4">
              <div className="flex items-center justify-between">
                <span className="font-heading text-3xl font-extrabold text-steel/70 md:text-4xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Icon aria-hidden className="h-6 w-6 text-navy" />
              </div>
              <h3 className="mt-3 text-lg">{title}</h3>
              <p className="mt-1 text-sm text-slate md:text-base">{text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface" eyebrow="Why choose us" title="Four reasons clients stay with us">
        <div className="grid items-stretch gap-8 lg:grid-cols-5 lg:gap-12">
          <ul className="grid gap-px overflow-hidden rounded-card border border-steel/40 bg-steel/30 sm:grid-cols-2 lg:col-span-3">
            {whyUs.map((w) => (
              <li key={w.title} className="bg-white p-4 md:p-6">
                <BadgeCheck aria-hidden className="h-6 w-6 text-amber" />
                <h3 className="mt-2 text-base md:text-lg">{w.title}</h3>
                <p className="mt-1 text-sm text-slate">{w.text}</p>
              </li>
            ))}
          </ul>
          {sitePhoto && (
            <Picture
              image={sitePhoto}
              className="aspect-[4/3] w-full rounded-card object-cover shadow-sm lg:col-span-2 lg:aspect-auto lg:h-full"
            />
          )}
        </div>
      </Section>

      <Section
        eyebrow="Experience"
        title="Government and private clients"
        intro="We deliver for power utilities and for industry."
      >
        <ClientsPanel />
      </Section>
    </>
  )
}
