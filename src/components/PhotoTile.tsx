import { Link } from 'react-router-dom'
import type { SiteImage } from '../data/images'
import Picture from './Picture'

interface PhotoTileProps {
  image: SiteImage
  /** Navigate on click… */
  to?: string
  /** …or run an action (e.g. open lightbox) */
  onClick?: () => void
  /** Bigger caption for lead tiles */
  large?: boolean
}

/** Photo filling its parent, with navy gradient, amber category chip and white caption on top. Parent sets size. */
export default function PhotoTile({ image, to, onClick, large = false }: PhotoTileProps) {
  const body = (
    <>
      <Picture
        image={image}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${image.hasCaption ? 'object-top' : 'object-center'}`}
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3 text-left md:p-4">
        {image.category && (
          <span className="mb-1.5 inline-block rounded-full bg-amber px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy md:text-[11px]">
            {image.category}
          </span>
        )}
        <p className={`line-clamp-2 font-medium leading-snug text-white ${large ? 'text-sm md:text-lg' : 'text-[11px] md:text-sm'}`}>
          {image.alt}
        </p>
      </div>
    </>
  )
  const cls =
    'group relative block h-full w-full overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-amber'

  if (to)
    return (
      <Link to={to} className={cls} aria-label={`${image.alt} — see all projects`}>
        {body}
      </Link>
    )
  if (onClick)
    return (
      <button type="button" onClick={onClick} className={cls} aria-label={`View larger: ${image.alt}`}>
        {body}
      </button>
    )
  return <div className={cls}>{body}</div>
}
