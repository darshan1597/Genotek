import { NavLink, useLocation } from 'react-router-dom'

import { FiChevronDown } from 'react-icons/fi'
import { aboutSubmenuItems, navItems } from './navConfig'

function Sidebar() {
  const location = useLocation()
  const isAboutRoute = location.pathname.startsWith('/about')

  return (
    <aside className="hidden shrink-0 self-start lg:sticky lg:top-[18px] lg:block lg:h-[calc(100vh-36px)] lg:w-[250px] lg:overflow-visible lg:pr-[14px]">
      <nav className="flex flex-col gap-[12px] lg:h-full lg:overflow-visible lg:pr-[6px]">
        {navItems.map((item) => (
          <div key={item.label} className="group relative">
            {item.label === 'About us' ? (
              <button
                type="button"
                aria-expanded={isAboutRoute}
                className={`relative flex h-[58px] w-full cursor-pointer items-center text-right text-[20px] font-normal text-white transition-colors duration-300 ${
                  isAboutRoute ? 'bg-[#4c7f99]' : 'bg-[#548BA6] hover:bg-[#5d90ae]'
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 68%, 95% 100%, 0 100%)',
                }}
              >
                <span
                  className="flex h-full flex-1 items-center justify-end pr-[18px] transition-[padding] duration-200 group-hover:pr-[50px] group-focus-within:pr-[50px]"
                >
                  <span>{item.label}</span>
                </span>

                <span
                  aria-hidden="true"
                  className="absolute right-[12px] top-1/2 flex h-[28px] w-[28px] -translate-y-1/2 items-center justify-center rounded-full text-white/90 opacity-0 transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                  <FiChevronDown className="rotate-[-90deg] text-[18px] transition-transform duration-300" />
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
              <div className="invisible absolute left-full top-0 z-30 ml-[12px] w-[230px] translate-x-[-8px] opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-x-0 group-focus-within:opacity-100">
                <div className="rounded-r-[14px] border-l-[5px] border-[#0f7d3c] bg-[#16a34a] px-[10px] py-[10px] shadow-[0_16px_32px_rgba(15,125,60,0.24)]">
                  <div className="flex flex-col gap-[8px]">
                    {aboutSubmenuItems.map((submenuItem) => (
                      <NavLink
                        key={submenuItem.href}
                        to={submenuItem.href}
                        className={({ isActive }) =>
                          `group/submenu relative block overflow-hidden rounded-r-[12px] px-4 py-3 text-[15px] font-medium transition-colors duration-200 ${
                            isActive
                              ? 'bg-white text-[#0f6b35]'
                              : 'bg-white/15 text-white hover:bg-white hover:text-[#0f6b35]'
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
                        <span className="absolute inset-y-0 left-0 w-[4px] bg-white/45" />
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
