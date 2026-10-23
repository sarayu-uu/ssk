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

// Stages use facts from CLAUDE.md only — no invented years beyond the founding date
const story = [
  {
    tag: String(company.established),
    title: 'Founded in Hyderabad',
    text: `${company.proprietor.name} starts the firm with a small crew and distribution works.`,
    image: 'distribution-substation-kiosk',
  },
  {
    tag: 'Growth',
    title: 'Into HT & substations',
    text: '11 kV and 33 kV substations, complete switchyards and transformer works.',
    image: 'outdoor-substation',
  },
  {
    tag: 'Scale',
    title: '10,000+ km of lines',
    text: 'Transmission lines across two states, plus 2,000+ km of XLPE underground cable.',
    image: 'transmission-tower',
  },
  {
    tag: 'Today',
    title: 'Class‑I, full scope',
    text: 'Licensed above 33 kV by TGSPDCL & APEPDCL. Now delivering solar plants and EV charging HT services.',
    image: 'rooftop-solar-plant',
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
        <div className="max-w-3xl">
          <p className="font-heading text-lg font-bold leading-snug text-navy md:text-2xl">
            Founded by {company.proprietor.name} in {company.established}. Every stage since has added voltage,
            scale and scope.
          </p>
          <p className="mt-4 inline-flex items-start gap-2 rounded-full bg-surface px-3 py-1.5 text-xs text-slate">
            <MapPin aria-hidden className="h-4 w-4 shrink-0 text-amber" />
            Kukatpally, Hyderabad · serving Telangana &amp; Andhra Pradesh
          </p>
        </div>

        {/* Timeline: vertical on mobile, horizontal track on md+ */}
        <ol className="ml-2 mt-10 border-l-2 border-steel/40 md:ml-0 md:grid md:grid-cols-4 md:gap-6 md:border-l-0 md:border-t-2">
          {story.map((st, i) => {
            const last = i === story.length - 1
            const photo = getImage(st.image)
            return (
              <li key={st.title} className="relative pb-8 pl-6 last:pb-0 md:pb-0 md:pl-0 md:pt-8">
                <span
                  aria-hidden
                  className={`absolute -left-[9px] top-0.5 h-4 w-4 rounded-full border-2 border-white md:-top-[9px] md:left-0 ${
                    last ? 'bg-amber ring-4 ring-amber/30' : 'bg-navy ring-2 ring-steel/50'
                  }`}
                />
                <p className={`text-xs font-bold uppercase tabular-nums tracking-wider ${last ? 'text-navy' : 'text-slate'}`}>
                  {st.tag}
                </p>
                <h3 className="mt-1 text-base md:text-lg">{st.title}</h3>
                <p className="mt-1 text-sm text-slate">{st.text}</p>
                {photo && (
                  <Picture image={photo} className="mt-3 aspect-[16/9] w-full rounded-card object-cover shadow-sm" />
                )}
              </li>
            )
          })}
        </ol>
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
                <span aria-hidden className="font-heading text-3xl font-extrabold text-steel/70 md:text-4xl">
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
                <BadgeCheck aria-hidden className="h-6 w-6 text-navy" />
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
