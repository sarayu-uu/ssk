import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { company, licences } from '../data/company'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/credentials', label: 'Credentials' },
  { to: '/contact', label: 'Contact' },
]

const footerLicences = [licences[0], licences[1], licences[5]]

export default function Footer() {
  return (
    <footer className="bg-navy pb-20 text-steel md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-lg font-extrabold text-white">{company.shortName}</p>
          <p className="mt-1 text-sm">{company.name}</p>
          <p className="mt-3 text-sm">
            {company.grade}. Est. {company.established}.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-base !text-white">Contact</h2>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
              <address className="not-italic">{company.address.full}</address>
            </li>
            {company.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="inline-flex min-h-11 items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${company.email}`} className="inline-flex min-h-11 items-center gap-2 break-all hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                {company.email}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-heading text-base !text-white">Quick links</h2>
          <ul className="mt-3 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="inline-flex min-h-11 items-center hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-base !text-white">Licences</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {footerLicences.map((l) => (
              <li key={l.authority}>
                <span className="text-white">{l.authority}</span>
                <br />
                {l.class} · Lic. No. {l.number}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 text-xs sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}
          </p>
          <p>
            GSTIN: {company.gstin} · Vendor No. {company.vendorNo}
          </p>
        </div>
      </div>
    </footer>
  )
}
