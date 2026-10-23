export interface Licence {
  authority: string
  class: string
  number: string
  scope: string
}

export interface Service {
  slug: string
  title: string
  summary: string
  points: string[]
}

export interface Client {
  name: string
  detail: string
}

export interface Stat {
  value: string
  label: string
}

export const company = {
  name: 'Sri Sai Krupa Constructions & Electrical Works',
  shortName: 'SSK Electricals',
  established: 2009,
  proprietor: { name: 'Mr. T.V. Srinivas', role: 'Proprietor' },
  grade: 'A Grade Class‑1 Electrical Contractor',
  certifiedBy: ['TGSPDCL (Telangana)', 'APEPDCL (Andhra Pradesh)'],
  extra: 'Solar power plant consultancy',
  address: {
    lines: ['#260, Western Hills, Jal Vayu Vihar', 'KPHB Colony, Kukatpally'],
    city: 'Hyderabad',
    pincode: '500 085',
    full: '#260, Western Hills, Jal Vayu Vihar, KPHB Colony, Kukatpally, Hyderabad – 500 085',
  },
  phones: [
    { display: '+91 63058 42556', tel: '+916305842556' },
    { display: '+91 63037 17284', tel: '+916303717284' },
  ],
  email: 'sskconstructions9999@gmail.com',
  whatsapp: 'https://wa.me/916305842556',
  gstin: '36ATNPT1785D2Z8',
  vendorNo: '314552',
} as const

export const stats: Stat[] = [
  { value: '2009', label: 'Established' },
  { value: '10,000+ km', label: 'Transmission lines laid' },
  { value: '2,000+ km', label: 'XLPE UG cable (400 & 300 sq.mm)' },
  { value: '1 MVA', label: 'Transformer installs; 2500 kVA OLTC servicing' },
]

export const licences: Licence[] = [
  { authority: 'TGSPDCL, Telangana', class: 'Class‑I', number: 'A 8770', scope: 'All voltages exceeding 33 kV' },
  { authority: 'APEPDCL, Andhra Pradesh', class: 'Class‑I A Grade', number: '01521', scope: 'All voltages exceeding 33 kV' },
  { authority: 'Transmission Corp. of Telangana Ltd', class: 'Class‑I', number: 'A8770', scope: 'Exceeding 33 kV' },
  { authority: 'Transmission Corp. of A.P.', class: 'Class‑I A Grade', number: '01521', scope: 'Exceeding 33 kV' },
  { authority: 'Irrigation Division, Bhadrachalam', class: 'Class AB A‑2 Grade', number: '21‑22', scope: 'Civil works > 33 kV' },
  { authority: 'Telangana Electrical Licensing Board', class: 'Grade A', number: 'T‑8770', scope: 'Exceeding 33 kV, all voltages' },
]

export const services: Service[] = [
  {
    slug: 'substations',
    title: 'Substation construction',
    summary: 'Complete substations and switchyards from 11 kV to 33 kV and above.',
    points: ['11 kV and 33 kV substations', '33/11 kV substations', 'Complete switchyards'],
  },
  {
    slug: 'ht-lt-works',
    title: 'HT & LT electrical works',
    summary: 'High-tension and low-tension electrical works, delivered to utility standards.',
    points: ['HT works', 'LT works', 'Work to TGSPDCL and APEPDCL standards'],
  },
  {
    slug: 'cabling',
    title: 'Cabling',
    summary: 'XLPE underground cable laying with jointing and terminations.',
    points: ['XLPE UG cable laying', 'Cable joints', 'End terminations'],
  },
  {
    slug: 'transmission-lines',
    title: 'Transmission lines',
    summary: 'Line construction at 33 kV, 11 kV and LT on multiple tower types.',
    points: ['33 kV lines', '11 kV lines', 'LT lines', 'M+11, M+9 and M+6 towers'],
  },
  {
    slug: 'transformers',
    title: 'Transformer installation & servicing',
    summary: 'Erection, installation and servicing of power and distribution transformers.',
    points: ['Transformer installation and erection', 'OLTC repair', 'CT oil-leak arresting'],
  },
  {
    slug: 'overhead-underground',
    title: 'Overhead & underground transmission',
    summary: 'Pole erection and excavation for overhead and underground routes.',
    points: ['Pole erection', 'Excavation', 'Overhead and underground routes'],
  },
  {
    slug: 'solar',
    title: 'On-grid solar power plants',
    summary: 'On-grid solar plants, backed by solar power plant consultancy.',
    points: ['On-grid solar plants', 'Rooftop and ground-mounted systems', 'Solar power plant consultancy'],
  },
  {
    slug: 'ev-charging',
    title: 'EV charging station HT services',
    summary: 'HT service connections for EV charging stations.',
    points: ['HT service panels', 'HT kiosks and poles', 'HT connections for EV charging stations'],
  },
  {
    slug: 'buildings-industrial',
    title: 'Apartments, industrial & commercial complexes',
    summary: 'Internal electrical, panel boards and layouts for buildings and developments.',
    points: ['Panel boards (PCC/LT)', 'Land layouts', 'Internal electrical works'],
  },
]

export const privateClients: Client[] = [
  { name: 'Anitha Food Products', detail: '500 kVA, 11 kV' },
  { name: 'Anitha Dairy Products', detail: '500 kVA, 11 kV' },
  { name: 'Amul Dairy Products', detail: '750 kVA, 11 kV' },
  { name: 'Tirupathi Plastic', detail: '500 kVA, 11 kV' },
  { name: 'Suguna Poultry Food Products', detail: '2 × 1 MVA, 33 kV, Kalvakurthy' },
  { name: 'Vertex Home Pvt. Ltd', detail: '500 kVA, 11 kV' },
  { name: 'Modi Builders', detail: '2 × 500 kVA, 11 kV' },
  { name: 'Varuna Developers Layouts', detail: '11 kV & 33 kV' },
]

export const governmentWork = {
  summary: '33/11 kV new substations and lines across multiple districts.',
  workOrders: 'TSSPDCL work orders: Medak circle, Siddipet, Sangareddy.',
}
