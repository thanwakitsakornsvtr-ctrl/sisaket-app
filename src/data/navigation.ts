import {
  House,
  MapPinned,
  Map as MapIconLucide,
  UtensilsCrossed,
  Route,
  Info,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react'

export interface NavLink {
  label: string
  href: string
  icon: LucideIcon
}

export const navLinks: NavLink[] = [
  { label: 'หน้าแรก', href: '#home', icon: House },
  { label: 'สถานที่ท่องเที่ยว', href: '#attractions', icon: MapPinned },
  { label: 'ของดีศรีสะเกษ', href: '#flavors', icon: UtensilsCrossed },
  { label: 'แผนที่', href: '#map', icon: MapIconLucide },
  { label: 'แผนเที่ยว', href: '#itinerary', icon: Route },
  { label: 'เคล็ดลับ', href: '#about', icon: Info },
  { label: 'ถาม-ตอบ', href: '#faq', icon: HelpCircle },
]
