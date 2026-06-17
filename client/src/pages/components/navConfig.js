export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: null },
  { label: 'Products', href: '/products' },
  { label: 'Industry', href: '/industry' },
  { label: 'Services', href: '/services' },
  { label: 'Get in touch', href: '/contact' },
]

export const aboutSubmenuItems = [
  { href: '/about/story', label: 'Genotek Story' },
  { href: '/about/team', label: 'Genotek Team' },
  { href: '/about/infra', label: 'Genotek Infra' },
  { href: '/about/why-genotek', label: 'Why Genotek' },
]

export const productSubmenuItems = [
  { href: '/products/chemical', label: 'Chemicals', children: [] },
  {
    href: '/products/chromatography-solutions',
    label: 'Chromatography Solutions',
    children: [
      { href: '/products/gc-columns', label: 'GC Columns' },
      { href: '/products/hplc-columns', label: 'HPLC Columns' },
      { href: '/products/hplc-pumps', label: 'HPLC Pumps' },
      { href: '/products/method-transfer-n-equivalency', label: 'Method Transfer & Equivalency' },
    ],
  },
]
