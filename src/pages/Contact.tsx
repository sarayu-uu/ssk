import { useState } from 'react'
import type { FormEvent } from 'react'
import { ChevronRight, Loader2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import PageHero from '../components/PageHero'
import Button from '../components/Button'
import { usePageMeta } from '../hooks/usePageMeta'
import { company, services } from '../data/company'
import Reveal from '../components/Reveal'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Errors = Partial<Record<'name' | 'phone' | 'message', string>>

const inputCls =
  'mt-1 block min-h-12 w-full rounded-btn border border-slate bg-white px-3 py-2 text-ink placeholder:text-slate/70'

const mapSrc = 'https://www.google.com/maps?q=Western+Hills,+Jal+Vayu+Vihar,+KPHB+Colony,+Kukatpally,+Hyderabad,+Telangana+500085&output=embed'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})

  usePageMeta(
    'Contact | SSK Electricals',
    'Call, WhatsApp or email SSK Electricals, Kukatpally, Hyderabad, for substations, HT connections, cabling and transformer works.',
  )

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const next: Errors = {}
    if (name.length < 2) next.name = 'Please enter your name.'
    if (!/^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(phone)) next.phone = 'Enter a valid 10-digit mobile number.'
    if (message.length < 10) next.message = 'Please add a few details (at least 10 characters).'
    setErrors(next)
    const firstInvalid = (['name', 'phone', 'message'] as const).find((k) => next[k])
    if (firstInvalid) {
      ;(form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus()
      return
    }

    const id = import.meta.env.VITE_FORMSPREE_ID
    if (!id) {
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${id}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!res.ok) throw new Error('Request failed')
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1 text-sm font-medium text-red-700">
        {errors[k]}
      </p>
    ) : null

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to us about your project"
        intro="Fastest way: call or WhatsApp. Or send an enquiry and we will get back to you."
      />

      <section className="bg-white py-14 md:py-20">
        {/* Mobile order: call/WhatsApp → form → address & map. lg: form spans the right column */}
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-6">
          {/* Direct contact */}
          <Reveal stagger>
            <h2 className="text-2xl md:text-4xl">Call or message</h2>
            <p className="mt-2 text-slate">Tap to reach us directly. We usually reply the same day.</p>
            <ul className="mt-5 space-y-2">
              {company.phones.map((p, i) => (
                <li key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    className={`group flex min-h-12 items-center gap-2.5 rounded-card px-2.5 py-2 shadow-sm transition hover:shadow-md ${
                      i === 0 ? 'bg-amber text-navy' : 'border border-steel/50 bg-white text-navy hover:border-navy'
                    }`}
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${i === 0 ? 'bg-navy text-amber' : 'bg-navy/10 text-navy'}`}>
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[11px] font-semibold uppercase tracking-wide ${i === 0 ? 'text-navy/80' : 'text-slate'}`}>
                        {i === 0 ? 'Call now' : 'Alternate number'}
                      </span>
                      <span className="block text-sm font-bold sm:text-base">{p.display}</span>
                    </span>
                    <ChevronRight className="h-5 w-5 shrink-0 opacity-60 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={company.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-12 items-center gap-2.5 rounded-card border border-steel/50 bg-white px-2.5 py-2 text-navy shadow-sm transition hover:border-navy hover:shadow-md"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy/10 text-navy">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate">WhatsApp</span>
                    <span className="block text-sm font-bold sm:text-base">Chat with us</span>
                  </span>
                  <ChevronRight className="h-5 w-5 shrink-0 opacity-60 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="group flex min-h-12 items-center gap-2.5 rounded-card border border-steel/50 bg-white px-2.5 py-2 text-navy shadow-sm transition hover:border-navy hover:shadow-md"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy/10 text-navy">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate">Email</span>
                    <span className="block break-all text-xs font-bold leading-snug sm:text-sm">{company.email}</span>
                  </span>
                  <ChevronRight className="h-5 w-5 shrink-0 opacity-60 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </Reveal>

          {/* Form */}
          <Reveal stagger delay={100} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <h2 className="text-2xl md:text-4xl">Send an enquiry</h2>

            {status === 'success' ? (
              <div role="status" className="mt-6 rounded-card border border-green-700/30 bg-green-50 p-5 text-green-900">
                <p className="font-bold">Thank you. Your enquiry has been sent.</p>
                <p className="mt-1">We will call you back shortly. For urgent work, call {company.phones[0].display}.</p>
                <Button variant="secondary" size="sm" onClick={() => setStatus('idle')} className="mt-4">
                  Send another enquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="font-medium">Name <span aria-hidden="true">*</span></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={inputCls}
                  />
                  {err('name')}
                </div>
                <div>
                  <label htmlFor="phone" className="font-medium">Phone <span aria-hidden="true">*</span></label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-hint phone-error' : 'phone-hint'}
                    className={inputCls}
                  />
                  <p id="phone-hint" className="mt-1 text-xs text-slate">10-digit mobile number, e.g. 98765 43210</p>
                  {err('phone')}
                </div>
                <div>
                  <label htmlFor="company" className="font-medium">Company <span className="text-slate">(optional)</span></label>
                  <input id="company" name="company" type="text" autoComplete="organization" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="service" className="font-medium">Service <span className="text-slate">(optional)</span></label>
                  <select id="service" name="service" defaultValue="" className={inputCls}>
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="font-medium">Message <span aria-hidden="true">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={inputCls}
                  />
                  {err('message')}
                </div>

                {status === 'error' && (
                  <p role="alert" className="rounded-btn border border-red-700/30 bg-red-50 p-3 text-red-900">
                    Sorry, we could not send your enquiry. Please call {company.phones[0].display} or WhatsApp us instead.
                  </p>
                )}

                <Button type="submit" disabled={status === 'sending'} className="w-full sm:w-auto">
                  {status === 'sending' && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
                  {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                </Button>
              </form>
            )}
          </Reveal>

          {/* Address & map */}
          <Reveal className="lg:col-start-1">
            <address className="flex gap-2.5 rounded-card bg-surface p-3 not-italic text-ink">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 text-xs">
                <strong className="block text-sm text-navy">{company.name}</strong>
                {company.address.full}
              </span>
            </address>

            <div className="mt-6 overflow-hidden rounded-card border border-steel/40 shadow-sm">
              <iframe
                title="Map of SSK Electricals, Kukatpally, Hyderabad"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block aspect-[4/3] w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
