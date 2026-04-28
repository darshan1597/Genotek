import { Link, NavLink } from 'react-router-dom'
import { FiMail, FiMapPin } from 'react-icons/fi'
import { FaLinkedin } from 'react-icons/fa'
import logo from '../../assets/logo.jpeg'
import { navItems } from './navConfig'

function Footer() {
    return (
        <footer className="clear-both mt-10 w-full border-t border-[#d6e4ed] bg-[#f5f9fc] text-[#42556c] lg:ml-[274px] lg:w-[calc(100%_-_274px)] xl:ml-[278px] xl:w-[calc(100%_-_278px)]">
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
                    <h2 className="text-[16px] font-semibold text-[#214f86]">Get In Touch</h2>
                    <div className="mt-4 flex flex-col gap-3 text-[15px]">
                        <a
                            href="mailto:info@genotekbio.com"
                            className="flex items-center gap-3 transition-colors duration-200 hover:text-[#214f86]"
                        >
                            <FiMail className="shrink-0 text-[19px] text-[#5a92b6]" />
                            <span>info@genotekbio.com</span>
                        </a>
                        <a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 transition-colors duration-200 hover:text-[#214f86]"
                        >
                            <FaLinkedin className="shrink-0 text-[19px] text-[#0877ad]" />
                            <span>Follow us</span>
                        </a>
                        <div className="flex items-start gap-3">
                            <FiMapPin className="mt-1 shrink-0 text-[19px] text-[#5a92b6]" />
                            <span>216, Vardhaman Complex, LBS Marg, Vikhroli West, Mumbai 400083, India</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#d6e4ed] px-4 py-4 text-[13px] text-[#607486] md:px-8 lg:px-6 xl:px-10">
                <p>Copyright 2026 Genotek Biochem Private Limited. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
