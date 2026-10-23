import { Check } from 'lucide-react'
import type { Service } from '../data/company'
import type { SiteImage } from '../data/images'
import Picture from './Picture'

interface ServiceCardProps {
  service: Service
  image?: SiteImage
  /** Show the bullet list (Services page) instead of just the summary (Home). */
  showPoints?: boolean
}

export default function ServiceCard({ service, image, showPoints = false }: ServiceCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-steel/40 bg-white shadow-sm transition-shadow hover:shadow-md">
      {image && <Picture image={image} className="aspect-[4/3] w-full object-cover" />}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg">{service.title}</h3>
        <p className="mt-2 text-sm text-slate">{service.summary}</p>
        {showPoints && (
          <ul className="mt-4 space-y-2 text-sm">
            {service.points.map((p) => (
              <li key={p} className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber">
                  <Check className="h-3 w-3 text-navy" strokeWidth={3} />
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
