import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.jpeg'
import { navItems } from './navConfig'

function Footer({ insetForSidebar = true }) {
    const layoutClass = insetForSidebar
        ? 'lg:ml-[274px] lg:w-[calc(100%_-_274px)] xl:ml-[278px] xl:w-[calc(100%_-_278px)]'
        : ''

    return (
        <footer className={`clear-both mt-10 w-full border-t border-[#d6e4ed] bg-white text-[#42556c] ${layoutClass}`}>
            <div className="grid gap-8 px-4 py-8 md:px-8 lg:grid-cols-[1.15fr_0.85fr_1fr] lg:px-6 xl:px-10">
                <div>
                    <Link to="/" className="inline-flex">
                        <img
                            src={logo}
                            alt="Genotek Biochem"
                            className="h-auto w-[230px] object-contain"
                        />
                    </Link>
                    <p className="mt-4 max-w-[430px] text-[15px] leading-[1.7]">
                        Science-driven chemistry solutions built with scale, reliability, and personal attention.
                    </p>
                </div>

                <div>
                    <h2 className="text-[16px] font-semibold text-[#214f86]">Quick Links</h2>
                    <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px]">
                        {navItems.map((item) => (
                            item.href ? (
                                <NavLink
                                    key={item.label}
                                    to={item.href}
                                    className="transition-colors duration-200 hover:text-[#214f86]"
                                >
                                    {item.label}
                                </NavLink>
                            ) : (
                                <span key={item.label}>{item.label}</span>
                            )
                        ))}
                    </div>
                </div>

                <div>
                    <div className="overflow-hidden rounded-[8px] border border-[#bdd4e2]">
                        <iframe
                            title="Genotek Biochem map"
                            src="https://www.google.com/maps?q=216%2C%20Vardhaman%20Complex%2C%2010%2C%20LBS%20Marg%2C%20Vikhroli%20West%2C%20Mumbai%20400083%2C%20India&output=embed"
                            className="h-[220px] w-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-[#d6e4ed] px-4 pt-4 text-[13px] text-[#607486] md:px-8 lg:px-6 xl:px-10">
                <p>Copyright 2026 Genotek Biochem Private Limited. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
