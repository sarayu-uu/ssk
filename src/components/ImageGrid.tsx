import type { SiteImage } from '../data/images'
import Picture from './Picture'

interface ImageGridProps {
  images: SiteImage[]
  onSelect?: (index: number) => void
  className?: string
  /** Show the image description under each photo (same as the Projects page). */
  showCaptions?: boolean
}

export default function ImageGrid({ images, onSelect, className = '', showCaptions = false }: ImageGridProps) {
  return (
    <ul className={`grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 ${className}`}>
      {images.map((img, i) => {
        const pic = (
          <Picture
            image={img}
            className={`aspect-[4/3] w-full object-cover ${img.hasCaption ? 'object-top' : 'object-center'}`}
          />
        )
        const caption = showCaptions && (
          <span className="block p-2.5 text-xs leading-snug text-slate sm:text-sm">{img.alt}</span>
        )
        return (
          <li key={img.id} className="overflow-hidden rounded-card bg-surface shadow-sm transition-shadow hover:shadow-md">
            {onSelect ? (
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`View larger: ${img.alt}`}
                className="block w-full text-left"
              >
                {pic}
                {caption}
              </button>
            ) : (
              <>
                {pic}
                {caption}
              </>
            )}
          </li>
        )
      })}
    </ul>
  )
}
