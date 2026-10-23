import manifest from '../../public/images/manifest.json'

export type Category =
  | 'Substations'
  | 'Transformers'
  | 'Cabling'
  | 'Panels'
  | 'Solar'
  | 'EV'
  | 'Lines'

export const categories: Category[] = ['Substations', 'Transformers', 'Cabling', 'Panels', 'Solar', 'EV', 'Lines']

export type ImageGroup = 'hero' | 'brand' | 'gallery' | 'projects' | 'documents'

interface ManifestEntry {
  file: string
  alt: string
  note: string
  source_page: number
  w: number
  h: number
}

export interface SiteImage {
  /** Public URL, e.g. /images/gallery/outdoor-substation.jpg */
  src: string
  /** File name without extension */
  id: string
  alt: string
  note: string
  width: number
  height: number
  group: ImageGroup
  /** Only set for gallery/projects photos shown under filter chips */
  category?: Category
  /** Burned-in caption text is visible in the photo */
  hasCaption: boolean
}

/** Category per image id (file name without extension). */
const categoryById: Record<string, Category> = {
  // gallery
  'distribution-substation-kiosk': 'Substations',
  'power-transformer-yard': 'Transformers',
  'control-panel-room': 'Panels',
  '33kv-switchyard-structure': 'Substations',
  'transformer-apartment-complex': 'Transformers',
  'outdoor-substation': 'Substations',
  'power-transformer-red-structure': 'Transformers',
  'street-lighting-road': 'Lines',
  'ug-cable-laying-trench': 'Cabling',
  'transmission-tower': 'Lines',
  'solar-panel-structure': 'Solar',
  'rooftop-solar-plant': 'Solar',
  // projects
  'lt-panel-room-cable-trays-1': 'Panels',
  'lt-panel-room-400sqmm-feeders': 'Panels',
  'lt-panel-room-fire-safety': 'Panels',
  'lt-panel-room-cable-trays-2': 'Panels',
  'pcc-panel-1': 'Panels',
  'pcc-panel-2': 'Panels',
  'panel-room-lineup': 'Panels',
  '250kva-substation-charged': 'Substations',
  '250kva-substation-2': 'Substations',
  '630kva-11kv-substation-1': 'Substations',
  '630kva-11kv-substation-2': 'Substations',
  '630kva-11kv-substation-3': 'Substations',
  '630kva-11kv-kiosk': 'Substations',
  'compact-substation-fenced': 'Substations',
  'compact-substation-industrial': 'Substations',
  '33kv-structure-erection': 'Substations',
  'oltc-repair-1': 'Transformers',
  'oltc-repair-2': 'Transformers',
  'oltc-repair-3': 'Transformers',
  '2500kva-33kv-oltc-replacement': 'Transformers',
  'ct-oil-leakage-arresting-1': 'Transformers',
  'ct-oil-leakage-arresting-2': 'Transformers',
  '33kv-ct-oil-leakage-arresting': 'Transformers',
  '33kv-ct-oil-leakage-team': 'Transformers',
  'transformer-conservator-tank': 'Transformers',
  'transformer-crane-lift': 'Transformers',
  '63kva-dtr-commercial': 'Transformers',
  'cable-joint-kits-1': 'Cabling',
  'cable-joint-kits-2': 'Cabling',
  'ev-station-ht-panel': 'EV',
  'ev-station-ht-pole': 'EV',
  'ev-station-ht-kiosk': 'EV',
  'ev-chargers-ather': 'EV',
}

export const images: SiteImage[] = (manifest as ManifestEntry[]).map((m) => {
  const [, group, filename] = m.file.split('/')
  const id = filename.replace(/\.[^.]+$/, '')
  return {
    src: `/${m.file}`,
    id,
    alt: m.alt,
    note: m.note,
    width: m.w,
    height: m.h,
    group: group as ImageGroup,
    category: categoryById[id],
    hasCaption: /caption overlay/i.test(m.note),
  }
})

export const imagesByGroup = (group: ImageGroup): SiteImage[] =>
  images.filter((i) => i.group === group)

export const getImage = (id: string): SiteImage | undefined =>
  images.find((i) => i.id === id)

/** Photos for the /projects gallery (gallery + projects folders, categorised). */
export const galleryImages: SiteImage[] = images.filter((i) => i.category)

export const documentImages: SiteImage[] = imagesByGroup('documents')
