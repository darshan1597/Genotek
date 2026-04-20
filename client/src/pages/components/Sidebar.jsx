import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'

import { FiChevronDown } from 'react-icons/fi'
import { aboutSubmenuItems, navItems } from './navConfig'

function Sidebar() {
  const location = useLocation()
  const isAboutRoute = location.pathname.startsWith('/about')
  const [aboutOpen, setAboutOpen] = useState(isAboutRoute)

  useEffect(() => {
    if (isAboutRoute) {
      setAboutOpen(true)
    }
  }, [isAboutRoute])

  return (
    <aside className="hidden shrink-0 self-start lg:sticky lg:top-[18px] lg:block lg:h-[calc(100vh-36px)] lg:w-[250px] lg:pr-[14px]">
      <nav className="flex flex-col gap-[12px] lg:h-full lg:overflow-y-auto lg:pr-[6px]">
        {navItems.map((item) => (
          <div key={item.label} className="group">
            {item.label === 'About us' ? (
              <button
                type="button"
                aria-expanded={aboutOpen}
                onClick={() => setAboutOpen((open) => !open)}
                className="relative flex h-[58px] w-full cursor-pointer items-center bg-[#548BA6] text-right text-[20px] font-normal text-white transition-colors duration-300 hover:bg-[#5d90ae]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 68%, 95% 100%, 0 100%)',
                }}
              >
                <span
                  className={`flex h-full flex-1 items-center justify-end transition-[padding] duration-200 ${
                    aboutOpen ? 'pr-[50px]' : 'pr-[18px] group-hover:pr-[50px]'
                  }`}
                >
                  <span>{item.label}</span>
                </span>

                <span
                  aria-hidden="true"
                  className={`absolute right-[12px] top-1/2 flex h-[28px] w-[28px] -translate-y-1/2 items-center justify-center rounded-full text-white/90 transition duration-200 hover:bg-white/15 ${
                    aboutOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <FiChevronDown
                    className={`text-[18px] transition-transform duration-300 ${
                      aboutOpen ? 'rotate-180' : ''
                    }`}
                  />
                </span>
              </button>
            ) : (
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `relative flex h-[58px] w-full cursor-pointer items-center text-right text-[20px] font-normal text-white transition-colors duration-300 ${
                    isActive ? 'bg-[#4c7f99]' : 'bg-[#548BA6] hover:bg-[#5d90ae]'
                  }`
                }
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 68%, 95% 100%, 0 100%)',
                }}
              >
                <span className="flex h-full flex-1 items-center justify-end pr-[18px]">
                  <span>{item.label}</span>
                </span>
              </NavLink>
            )}

            {item.label === 'About us' && (
              <AnimatePresence initial={false}>
                {aboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -6 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-[8px] ml-[18px] rounded-r-[14px] border-l-[5px] border-[#3f7693] bg-[linear-gradient(180deg,#eef6fa_0%,#dcebf2_100%)] px-[10px] py-[10px] shadow-[0_12px_28px_rgba(27,70,101,0.12)]"
                    >
                      <div className="flex flex-col gap-[8px]">
                        {aboutSubmenuItems.map((submenuItem, index) => (
                          <motion.div
                            key={submenuItem.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{
                              duration: 0.22,
                              delay: index * 0.05,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <NavLink
                              to={submenuItem.href}
                              className={({ isActive }) =>
                                `group/submenu relative block overflow-hidden rounded-r-[12px] px-4 py-3 text-[15px] font-medium transition-colors duration-200 ${
                                  isActive
                                    ? 'bg-white text-[#214f76]'
                                    : 'bg-white/70 text-[#2e627f] hover:bg-white'
                                }`
                              }
                              style={{
                                clipPath:
                                  'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)',
                              }}
                            >
                              <span className="relative z-[1] block transition-transform duration-200 group-hover/submenu:translate-x-1">
                                {submenuItem.label}
                              </span>
                              <span className="absolute inset-y-0 left-0 w-[4px] bg-[#77a6bf]" />
                            </NavLink>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
