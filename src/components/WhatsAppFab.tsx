import { MessageCircle } from 'lucide-react'
import { company } from '../data/company'

export default function WhatsAppFab() {
  return (
    <a
      href={company.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#128C7E] text-white shadow-lg hover:brightness-110 md:hidden"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  )
}
