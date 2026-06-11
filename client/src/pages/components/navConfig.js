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
    href: '/products/hpcl',
    label: 'Chromatography Solutions',
    children: [
      { href: '/chiral-gc-columns', label: 'Chiral GC Columns' },
      { href: '/chiral-hplc-columns', label: 'Chiral HPLC Columns' },
      { href: '/hplc-pumps', label: 'HPLC Pumps' },
    ],
  },
]
