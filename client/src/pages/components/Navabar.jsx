import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiSearch, FiX } from 'react-icons/fi'
import logo from '../../assets/logo.jpeg'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { aboutSubmenuItems, navItems } from './navConfig'
import { FiChevronDown } from 'react-icons/fi'
import { FaLinkedin } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

function Navabar() {
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [aboutOpen, setAboutOpen] = useState(location.pathname.startsWith('/about'))

    useEffect(() => {
        setMenuOpen(false)
        setSearchOpen(false)
        setAboutOpen(location.pathname.startsWith('/about'))
    }, [location.pathname])

    return (
        <header className="bg-white">
            <div className="w-full border-t-[6px] border-[#6d9eb7] pt-[2px]">
                <div className="h-[2px] w-full bg-[#6d9eb7]" />
            </div>

            <div className="flex w-full items-center justify-between gap-4 px-4 pb-4 pt-4 md:px-8 lg:justify-between lg:pl-6 lg:pr-10 lg:pb-7 lg:pt-10 xl:pl-10 xl:pr-15">
                <Link to="/">
                    <div className="relative shrink-0">
                        <img
                            src={logo}
                            alt="Genotek Biochem"
                            className="h-auto w-[260px] object-contain md:w-[330px] lg:w-[430px] ml-3"
                        />

                        <svg
                            className="pointer-events-none absolute inset-0 h-full w-full"
                            viewBox="0 0 1514 403"
                            preserveAspectRatio="xMidYMid meet"
                            aria-hidden="true"
                        >
                            <defs>
                                <filter id="logo-circle-glow" x="-300%" y="-300%" width="700%" height="700%">
                                    
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
                            >
                            {/* Movement */}
                            <animateMotion
                                dur="6s"
                                repeatCount="indefinite"
                                path="M 168 353 M 168 354 C 77 335 19 303 24 140 C 36 72 52 53 137 18 M 169 64 C 221 97 236 192 226 254 C 216 318 198 353 155 386"
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

                <div className="hidden lg:flex">
                    <div className="flex h-[50px] w-[600px] items-center rounded-[8px] border-3 border-[#0f4b8a] bg-white px-1 transition-all duration-200">

                        <FiSearch className="mr-2 text-[35px] text-[#0f4b8a]" />

                        <input
                            type="text"
                            placeholder="Please Enter Cat No., CAS No., Product Name"
                            className="w-full border-none bg-transparent text-[16px] font-normal tracking-[0.1px] text-[#0f4b8a] outline-none placeholder:text-[#bab7b1]"
                        />

                    </div>
                </div>

                <div className="hidden items-center gap-5 text-[15px] font-normal tracking-[0.1px] text-[#0f4b8a] md:flex">
                    <a
                        href="mailto:info@genotekbio.com"
                        className="flex items-center gap-2 transition-colors duration-200 hover:text-[#6a9ab1]"
                    >
                        <IoIosMail className="text-[28px] text-[#6a9ab1]" />
                        <span>info@genotekbio.com</span>
                    </a>
                    <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 transition-colors duration-200 hover:text-[#6a9ab1]"
                    >
                        <FaLinkedin className="text-[26px] text-[#6a9ab1]" />
                        <span>Follow us</span>
                    </a>
                </div>

                <div className="flex items-center gap-2 lg:hidden">
                    <button
                        type="button"
                        aria-label="Open search"
                        onClick={() => setSearchOpen(true)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#70A0D2] text-[#0f4b8a] transition-colors duration-200 hover:bg-[#eef5fb]"
                    >
                        <FiSearch className="text-[22px]" />
                    </button>
                    <button
                        type="button"
                        aria-label="Open menu"
                        onClick={() => setMenuOpen(true)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#70A0D2] text-[#0f4b8a] transition-colors duration-200 hover:bg-[#eef5fb]"
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
                        className="fixed inset-0 z-50 bg-[rgba(10,27,43,0.45)] p-4 lg:hidden"
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
                            <div className="flex h-[52px] items-center rounded-[12px] border-2 border-[#70A0D2] bg-white px-4">
                                <FiSearch className="mr-3 text-[24px] text-[#0f4b8a]" />
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="Please Enter Cat No., CAS No., Product Name"
                                    className="w-full border-none bg-transparent text-[15px] text-[#7e8590] outline-none placeholder:text-[#bab7b1]"
                                />
                            </div>
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
                        className="fixed inset-0 z-50 bg-[rgba(10,27,43,0.45)] lg:hidden"
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
                                {navItems.map((item) => (
                                    item.label === 'About us' ? (
                                        <div key={item.label} className="overflow-hidden rounded-[18px] border border-[#d6e4ed] bg-white">
                                            <button
                                                type="button"
                                                onClick={() => setAboutOpen((open) => !open)}
                                                className="flex w-full items-center justify-between px-4 py-4 text-left text-[18px] font-medium text-[#214f86]"
                                            >
                                                <span>About us</span>
                                                <FiChevronDown className={`text-[20px] transition-transform duration-300 ${aboutOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            <AnimatePresence initial={false}>
                                                {aboutOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.22 }}
                                                        className="overflow-hidden border-t border-[#d6e4ed] bg-[#f7fbfd]"
                                                    >
                                                        {aboutSubmenuItems.map((submenuItem) => (
                                                            <NavLink
                                                                key={submenuItem.href}
                                                                to={submenuItem.href}
                                                                className={({ isActive }) =>
                                                                    `block px-5 py-3 text-[15px] transition-colors duration-200 ${
                                                                        isActive ? 'bg-[#e7f1f7] text-[#214f86]' : 'text-[#48657c] hover:bg-[#edf5fa]'
                                                                    }`
                                                                }
                                                            >
                                                                {submenuItem.label}
                                                            </NavLink>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
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
                                ))}
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
