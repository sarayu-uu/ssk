import type { SiteImage } from '../data/images'

interface PictureProps {
  image: SiteImage
  className?: string
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
}

const toWebp = (src: string) => src.replace(/\.(jpe?g|png)$/i, '.webp')

/** WebP with the original file as fallback. Run `node scripts/optimize-images.mjs` to generate the .webp files. */
export default function Picture({ image, className, loading = 'lazy', fetchPriority }: PictureProps) {
  return (
    <picture>
      <source srcSet={toWebp(image.src)} type="image/webp" />
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={loading}
        {...{ fetchpriority: fetchPriority }}
        className={className}
      />
    </picture>
  )
}
