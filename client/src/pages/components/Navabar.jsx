import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowRight, FiMenu, FiSearch, FiX } from 'react-icons/fi'
import logo from '../../assets/logo.jpeg'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { aboutSubmenuItems, navItems, productSubmenuItems } from './navConfig'
import { FiChevronDown } from 'react-icons/fi'
import { FaLinkedin } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import axios from 'axios'

const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000'

function Navabar() {
    const location = useLocation()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchError, setSearchError] = useState('')
    const [aboutOpen, setAboutOpen] = useState(location.pathname.startsWith('/about'))
    const [productsOpen, setProductsOpen] = useState(false)
    const [activeProductChild, setActiveProductChild] = useState(null)
    const [chemicalCategories, setChemicalCategories] = useState([])
    const [chromatographyCategories, setChromatographyCategories] = useState([])
    const chromatographyPaths = [
        '/products/chromatography-solutions',
        ...chromatographyCategories.map((category) => category.href),
    ]
    const isAboutRoute = location.pathname.startsWith('/about')
    const isChemicalRoute = location.pathname.startsWith('/products/chemical') || location.pathname === '/genotek-exclusive'
    const isChromatographyRoute = chromatographyPaths.includes(location.pathname)
    const isProductsRoute = isChemicalRoute || isChromatographyRoute
    const activeProductsChildLabel = isChemicalRoute
        ? 'Chemicals'
        : isChromatographyRoute
            ? 'Chromatography Solutions'
            : null

    
    
    useEffect(() => {
        setMenuOpen(false)
        setSearchOpen(false)
        setAboutOpen(isAboutRoute)
        setProductsOpen(isProductsRoute)
        setActiveProductChild(activeProductsChildLabel)
    }, [activeProductsChildLabel, isAboutRoute, isProductsRoute, location.pathname])

    const handleGlobalSearch = async (event) => {
        event.preventDefault()

        const query = searchQuery.trim()
        if (!query) return

        try {
            setSearchError('')
            const { data } = await axios.get(`${serverUrl}/api/products/fetch-products`)
            const products = Array.isArray(data) ? data : []
            const normalizedQuery = query.toLowerCase()

            const matchedProduct = products.find((product) => product.cas?.toLowerCase() === normalizedQuery)
                || products.find((product) => product.name?.toLowerCase() === normalizedQuery)
                || products.find((product) =>
                    [product.name, product.cas].filter(Boolean).some((value) => value.toLowerCase().includes(normalizedQuery))
                )

            if (!matchedProduct?.category) {
                setSearchError('No matching product found')
                return
            }

            const params = new URLSearchParams({ search: query })
            if (matchedProduct.subcategory) params.set('subcategory', matchedProduct.subcategory)

            setSearchOpen(false)
            navigate(`/products/chemical/${encodeURIComponent(matchedProduct.category)}?${params.toString()}`)
        } catch (error) {
            console.error('Error searching products:', error)
            setSearchError('Search failed. Please try again.')
        }
    }

    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleGlobalSearch(event)
        }
    }
useEffect(() => {
    const fetchChemicalCategories = async () => {
        try {
            const { data } = await axios.get(
                `${serverUrl}/api/categories/fetch-category`
            )

            const categories = Array.isArray(data) ? data : []

            setChemicalCategories(
                categories.map((category) => ({
                    href: category.isStandalone
                        ? '/genotek-exclusive'
                        : `/products/chemical/${encodeURIComponent(category.name)}`,
                    label: category.name,
                }))
            )
        } catch (error) {
            console.error('Error loading sidebar categories:', error)
            setChemicalCategories([])
        }
    }

    fetchChemicalCategories()
}, [])

useEffect(() => {
    const fetchChromatographyCategories = async () => {
        try {
            const { data } = await axios.get(`${serverUrl}/api/chromatography-categories`)
            const categories = Array.isArray(data) ? data : []

            setChromatographyCategories(
                categories.map((category) => ({
                    href: `/products/${category.slug}`,
                    label: category.name,
                }))
            )
        } catch (error) {
            console.error('Error loading chromatography categories:', error)
            setChromatographyCategories([])
        }
    }

    fetchChromatographyCategories()
}, [])

    const dynamicProductSubmenuItems = productSubmenuItems.map((item) =>
        item.label === 'Chemicals'
            ? { ...item, children: chemicalCategories }
            : item.label === 'Chromatography Solutions'
                ? { ...item, children: chromatographyCategories }
            : item
    )

    return (
        <header className="bg-white">
            <div className="w-full border-t-[6px] border-[#6d9eb7] pt-[2px]">
                <div className="h-[2px] w-full bg-[#6d9eb7]" />
            </div>

            <div className="flex w-full items-center justify-between gap-2 px-3 pb-4 pt-4 sm:gap-4 sm:px-4 md:px-6 min-[1117px]:gap-6 min-[1117px]:pl-6 min-[1117px]:pr-6 min-[1117px]:pb-7 min-[1117px]:pt-10 xl:pl-10 xl:pr-10">
                <Link to="/" className="shrink-0 sm:ml-3">
                    <div className="relative w-[clamp(178px,54vw,260px)] md:w-[330px] min-[1117px]:w-[360px] xl:w-[430px]">
                        <img
                            src={logo}
                            alt="Genotek Biochem"
                            className="h-auto w-full object-contain"
                        />

                        <svg
                            className="pointer-events-none absolute inset-0 h-full w-full"
                            viewBox="0 0 1514 403"
                            preserveAspectRatio="xMidYMid meet"
                            aria-hidden="true"
                        >
                            <defs>
                                <filter id="logo-circle-glow" x="-320%" y="-300%" width="700%" height="700%">
                                    
                                    {/* Soft outer glow */}
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1">
                                    <animate
                                        attributeName="stdDeviation"
                                        values="4;10;4"
                                        dur="3s"
                                        repeatCount="indefinite"
                                    />
                                    </feGaussianBlur>

                                    {/* Strong inner glow */}
                                    <feGaussianBlur stdDeviation="2" result="blur2" />

                                    <feMerge>
                                        <feMergeNode in="blur1" />
                                        <feMergeNode in="blur2" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            <circle
                                r="12"
                                fill="#00A75A"
                                filter="url(#logo-circle-glow)"
                                transform="translate(14 0)"
                            >
                            {/* Movement */}
                            <animateMotion
                                dur="6s"
                                repeatCount="indefinite"
                                path="M 167.978 354.016 M 168 354 C 72.319 338.442 3.764 302.33 16.006 139.519 C 29.472 70.355 47.834 48.32 137 18 M 168.135 66.114 C 209.42 99.735 228.662 192.114 220.438 255.201 C 206.36 316.408 194.731 348.848 151.109 383.799"
                            />

                            {/* Subtle brightness pulse */}
                            <animate
                                attributeName="opacity"
                                values="0.7;1;0.7"
                                dur="3s"
                                repeatCount="indefinite"
                            />
                            </circle>
                        </svg>
                    </div>
                </Link>

                <div className="relative hidden min-w-0 flex-1 min-[1117px]:flex">
                    <form onSubmit={handleGlobalSearch} className="flex h-[48px] w-full min-w-[260px] max-w-[560px] items-center rounded-[8px] border-3 border-[#0f4b8a] bg-white px-2 transition-all duration-200 xl:h-[50px] xl:max-w-[600px]">

                        <button
                            type="submit"
                            aria-label="Search products"
                            className="mr-2 shrink-0 text-[#0f4b8a]"
                        >
                            <FiSearch className="text-[30px] xl:text-[32px]" />
                        </button>

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            placeholder="Please Enter CAS No. or Product Name"
                            className="min-w-0 w-full border-none bg-transparent text-[15px] font-normal tracking-[0.1px] text-[#0f4b8a] outline-none placeholder:text-[#bab7b1] xl:text-[16px]"
                        />

                    </form>
                    {searchError ? (
                        <p className="absolute left-0 top-[56px] text-[14px] font-medium text-red-600">
                            {searchError}
                        </p>
                    ) : null}
                </div>

                <div className="hidden shrink-0 items-center gap-4 text-[14px] font-normal tracking-[0.1px] text-[#0f4b8a] xl:flex 2xl:gap-5 2xl:text-[15px]">
                    <a
                        href="mailto:info@genotekbio.com"
                        className="flex items-center gap-2 transition-colors duration-200 hover:text-[#6a9ab1]"
                    >
                        <IoIosMail className="text-[28px] text-[#6a9ab1]" />
                        <span>info@genotekbio.com</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/company/genotek-biochem/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 transition-colors duration-200 hover:text-[#6a9ab1]"
                    >
                        <FaLinkedin className="text-[26px] text-[#6a9ab1]" />
                        <span>Follow us</span>
                    </a>
                </div>

                <div className="flex shrink-0 items-center gap-2 min-[1117px]:hidden">
                    <button
                        type="button"
                        aria-label="Open search"
                        onClick={() => setSearchOpen(true)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#70A0D2] text-[#0f4b8a] transition-colors duration-200 hover:bg-[#eef5fb] sm:h-11 sm:w-11"
                    >
                        <FiSearch className="text-[22px]" />
                    </button>
                    <button
                        type="button"
                        aria-label="Open menu"
                        onClick={() => {
                            setAboutOpen(isAboutRoute)
                            setProductsOpen(isProductsRoute)
                            setActiveProductChild(activeProductsChildLabel)
                            setMenuOpen(true)
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#70A0D2] text-[#0f4b8a] transition-colors duration-200 hover:bg-[#eef5fb] sm:h-11 sm:w-11"
                    >
                        <FiMenu className="text-[24px]" />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[rgba(10,27,43,0.45)] p-4 min-[1117px]:hidden"
                    >
                        <motion.div
                            initial={{ y: -18, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -18, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className="mx-auto mt-6 max-w-xl rounded-[20px] bg-white p-4 shadow-[0_20px_60px_rgba(16,44,68,0.22)]"
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <p className="text-[18px] font-semibold text-[#214f86]">Search</p>
                                <button
                                    type="button"
                                    aria-label="Close search"
                                    onClick={() => setSearchOpen(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full text-[#214f86] transition-colors duration-200 hover:bg-[#eef5fb]"
                                >
                                    <FiX className="text-[22px]" />
                                </button>
                            </div>
                            <form onSubmit={handleGlobalSearch} className="flex h-[52px] items-center rounded-[12px] border-2 border-[#70A0D2] bg-white px-4">
                                <button
                                    type="submit"
                                    aria-label="Search products"
                                    className="mr-3 text-[#0f4b8a]"
                                >
                                    <FiSearch className="text-[24px]" />
                                </button>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    onKeyDown={handleSearchKeyDown}
                                    autoFocus
                                    // placeholder="Please Enter Cat No., CAS No., Product Name"
                                    placeholder="Please Enter CAS No. or Product Name"
                                    className="w-full border-none bg-transparent text-[15px] text-[#7e8590] outline-none placeholder:text-[#bab7b1]"
                                />
                            </form>
                            {searchError ? (
                                <p className="mt-3 text-[14px] text-red-600">{searchError}</p>
                            ) : null}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[rgba(10,27,43,0.45)] min-[1117px]:hidden"
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                            className="ml-auto flex h-full w-[88%] max-w-[360px] flex-col overflow-y-auto bg-white px-5 pb-6 pt-5 shadow-[-16px_0_40px_rgba(17,48,74,0.18)]"
                        >
                            <div className="mb-6 flex w-full">
                                <button
                                    type="button"
                                    aria-label="Close menu"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex ml-auto h-10 w-10 justify-center rounded-full text-[#214f86] transition-colors duration-200 hover:bg-[#eef5fb]"
                                >
                                    <FiX className="text-[22px]" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-3">
                                {navItems.map((item) =>
                                    item.label === 'About us' ? (
                                        <div
                                            key={item.label}
                                            className="overflow-hidden rounded-[18px] border border-[#d6e4ed] bg-white"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setAboutOpen((open) => !open)}
                                                className={`flex w-full items-center justify-between px-4 py-4 text-left text-[18px] font-medium transition-colors duration-200 ${
                                                    isAboutRoute ? 'bg-[#e7f1f7] text-[#214f86]' : 'text-[#214f86]'
                                                }`}
                                            >
                                                <span>About us</span>
                                                <FiChevronDown
                                                    className={`text-[20px] transition-transform duration-300 ${
                                                        aboutOpen ? 'rotate-180' : ''
                                                    }`}
                                                />
                                            </button>

                                            {aboutOpen && (
                                                <div className="border-t border-[#d6e4ed] bg-[#f7fbfd]">
                                                    {aboutSubmenuItems.map((submenuItem) => (
                                                        <NavLink
                                                            key={submenuItem.href}
                                                            to={submenuItem.href}
                                                            className={({ isActive }) =>
                                                                `block px-5 py-3 text-[15px] transition-colors duration-200 ${
                                                                    isActive
                                                                        ? 'bg-[#e7f1f7] font-medium text-[#214f86]'
                                                                        : 'text-[#48657c] hover:bg-[#edf5fa]'
                                                                }`
                                                            }
                                                        >
                                                            {submenuItem.label}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : item.label === 'Products' ? (
                                        <div
                                            key={item.label}
                                            className="overflow-hidden rounded-[18px] border border-[#d6e4ed] bg-white"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setProductsOpen(!productsOpen)}
                                                className={`flex w-full items-center justify-between px-4 py-4 text-left text-[18px] font-medium transition-colors duration-200 ${
                                                    isProductsRoute ? 'bg-[#e7f1f7] text-[#214f86]' : 'text-[#214f86]'
                                                }`}
                                            >
                                                <span>Products</span>

                                                <FiChevronDown
                                                    className={`text-[20px] transition-transform duration-300 ${
                                                        productsOpen ? 'rotate-180' : ''
                                                    }`}
                                                />
                                            </button>

                                            {productsOpen && (
                                                <div className="border-t border-[#d6e4ed] bg-[#f7fbfd]">
                                                    {dynamicProductSubmenuItems.map((submenu) => (
                                                        <div key={submenu.href}>
                                                            {submenu.label === 'Chemicals' || submenu.children?.length > 0 ? (
                                                                <>
                                                                    <button
                                                                        type="button"
                                                                        aria-expanded={activeProductChild === submenu.label}
                                                                        onClick={() =>
                                                                            setActiveProductChild(
                                                                                activeProductChild === submenu.label
                                                                                    ? null
                                                                                    : submenu.label
                                                                            )
                                                                        }
                                                                        className={`flex w-full items-center justify-between px-5 py-3 text-left text-[15px] transition-colors duration-200 ${
                                                                            activeProductChild === submenu.label
                                                                                ? 'bg-[#e7f1f7] font-medium text-[#214f86]'
                                                                                : 'text-[#48657c] hover:bg-[#edf5fa]'
                                                                        }`}
                                                                    >
                                                                        <span>{submenu.label}</span>

                                                                        <FiChevronDown
                                                                            className={`transition-transform duration-300 ${
                                                                                activeProductChild === submenu.label
                                                                                    ? 'rotate-180'
                                                                                    : ''
                                                                            }`}
                                                                        />
                                                                    </button>

                                                                    {activeProductChild === submenu.label && (
                                                                        <div className="border-t border-[#e3edf3] bg-white">
                                                                            <NavLink
                                                                                to={submenu.href}
                                                                                className={({ isActive }) =>
                                                                                    `flex items-center justify-between px-8 py-3 text-[14px] font-semibold transition-colors duration-200 ${
                                                                                        isActive
                                                                                            ? 'bg-[#e7f1f7] text-[#214f86]'
                                                                                            : 'text-[#0f6b35] hover:bg-[#edf5fa]'
                                                                                    }`
                                                                                }
                                                                            >
                                                                                <span>{submenu.label}</span>
                                                                                <FiArrowRight aria-hidden="true" className="shrink-0 text-[16px]" />
                                                                            </NavLink>
                                                                            {submenu.children.map((child) => (
                                                                                <NavLink
                                                                                    key={child.href}
                                                                                    to={child.href}
                                                                                    className={({ isActive }) =>
                                                                                        `block border-t border-[#eef4f7] px-8 py-2.5 text-[14px] transition-colors duration-200 ${
                                                                                            isActive
                                                                                                ? 'bg-[#e7f1f7] font-medium text-[#214f86]'
                                                                                                : 'text-[#214f86] hover:bg-[#edf5fa]'
                                                                                        }`
                                                                                    }
                                                                                >
                                                                                    {child.label}
                                                                                </NavLink>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <NavLink
                                                                    to={submenu.href}
                                                                    className="block px-5 py-3 text-[15px] text-[#48657c] hover:bg-[#edf5fa]"
                                                                >
                                                                    {submenu.label}
                                                                </NavLink>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <NavLink
                                            key={item.label}
                                            to={item.href}
                                            className={({ isActive }) =>
                                                `rounded-[18px] border px-4 py-4 text-[18px] font-medium transition-colors duration-200 ${
                                                    isActive
                                                        ? 'border-[#8db0c8] bg-[#e7f1f7] text-[#214f86]'
                                                        : 'border-[#d6e4ed] bg-white text-[#214f86] hover:bg-[#f3f8fb]'
                                                }`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    )
                                )}
                            </div>

                            <div className="mt-6 rounded-[16px] bg-[#f3f8fb] p-4 text-[#5a768f]">
                                <div className="flex flex-col gap-3 text-[14px]">
                                    <a
                                        href="mailto:info@genotekbio.com"
                                        className="flex items-center gap-3 transition-colors duration-200 hover:text-[#214f86]"
                                    >
                                        <IoIosMail className="text-[22px] text-[#6a9ab1]" />
                                        <span>info@genotekbio.com</span>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 transition-colors duration-200 hover:text-[#214f86]"
                                    >
                                        <FaLinkedin className="text-[21px] text-[#6a9ab1]" />
                                        <span>Follow us</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Navabar
