import { NavLink, useLocation } from 'react-router-dom'
import { FiChevronDown } from 'react-icons/fi'
import { aboutSubmenuItems, navItems } from './navConfig'

function Sidebar() {
    const location = useLocation()
    const isAboutRoute = location.pathname.startsWith('/about')

    return (
        <aside className="relative z-[80] hidden shrink-0 self-start min-[1117px]:sticky min-[1117px]:top-[18px] min-[1117px]:ml-6 min-[1117px]:block min-[1117px]:h-[calc(100vh-65px)] min-[1117px]:w-[250px] min-[1117px]:overflow-visible min-[1117px]:pr-[12px] xl:ml-7">
            <nav className="flex flex-col gap-[9px] min-[1117px]:h-full min-[1117px]:overflow-visible">
                {navItems.map((item) => (
                    <div key={item.label} className="group relative z-[80]">
                        {item.label === 'About us' ? (
                            <button
                                type="button"
                                aria-expanded={isAboutRoute}
                                className={`relative flex h-[58px] w-full cursor-pointer items-center text-right text-[20px] font-normal text-white transition-colors duration-300 ${ isAboutRoute ? 'bg-[#2B5B91]' : 'bg-[#548BA6] hover:bg-[#5d90ae]' }`}
                                style={{
                                    clipPath: 'polygon(0 0, 100% 0, 100% 68%, 95% 100%, 0 100%)',
                                }}
                            >
                                <span className="flex h-full flex-1 items-center justify-end pr-[18px] transition-[padding] duration-200 group-hover:pr-[50px] group-focus-within:pr-[50px]" >
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
                                    isActive ? 'bg-[#2B5B91]' : 'bg-[#548BA6] hover:bg-[#5d90ae]'
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
                            <div className="invisible absolute left-full top-0 z-[1000] ml-[12px] w-[230px] translate-x-[-8px] opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-x-0 group-focus-within:opacity-100">
                                <div className="relative z-[1000] border-l-[5px] border-white bg-white px-[10px] py-[10px] shadow-[0_16px_32px_rgba(33,79,134,0.22)]">
                                    <div className="flex flex-col gap-[8px]">
                                        {aboutSubmenuItems.map((submenuItem) => (
                                            <NavLink
                                                key={submenuItem.href}
                                                to={submenuItem.href}
                                                className={({ isActive }) =>
                                                    `group/submenu relative z-[1000] block overflow-hidden px-4 py-3 text-[15px] font-medium transition-colors duration-200 ${
                                                        isActive
                                                        ? 'bg-[#00A759] text-[#fff]'
                                                        : 'bg-[#f4f8fb] text-[#214f86] hover:bg-[#e9f5ee] hover:text-[#0f6b35]'
                                                    }`
                                                }
                                                style={{
                                                    clipPath: 'polygon(0 0, 100% 0, 100% 68%, 95% 100%, 0 100%)',
                                                }}
                                            >
                                                <span className="ml-15 relative z-[1] block transition-transform duration-200 group-hover/submenu:translate-x-1">
                                                    {submenuItem.label}
                                                </span>
                                                <span className="absolute inset-y-0 left-0 w-[4px] bg-[#01A658]" />
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
