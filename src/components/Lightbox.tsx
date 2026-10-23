import YARL from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import type { SiteImage } from '../data/images'

interface LightboxProps {
  images: SiteImage[]
  /** Index of the open image, or -1 when closed. */
  index: number
  onClose: () => void
}

export default function Lightbox({ images, index, onClose }: LightboxProps) {
  return (
    <YARL
      open={index >= 0}
      close={onClose}
      index={Math.max(index, 0)}
      slides={images.map((i) => ({ src: i.src, alt: i.alt, title: i.alt, width: i.width, height: i.height }))}
      carousel={{ finite: images.length <= 1 }}
      plugins={[Zoom]}
      zoom={{ maxZoomPixelRatio: 4, scrollToZoom: true }}
    />
  )
}
