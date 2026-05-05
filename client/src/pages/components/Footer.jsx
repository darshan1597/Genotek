import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.jpeg'
import { navItems } from './navConfig'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

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
                    <div className="mt-5 max-w-[430px] text-[15px] leading-[1.7] flex flex-col gap-6">
                        <div>
                            <p className="font-bold text-[#175C84] flex">
                                <FaLocationDot size={20} className='text-[#01A658]' /><span className="ml-1">Corporate Office & HQ</span>
                            </p>
                            <p className="text-[14px] text-[#607486] ml-6">
                                216, Vardhaman Complex, 10, LBS Marg, Vikhroli West, Mumbai 400 083, India
                            </p>
                            <a href="tel:+912225776007" className='flex gap-1 cursor-pointer mt-2 hover:underline'>
                                <FaPhoneAlt size={15} className='text-[#01A658] mt-1' />
                                <span>
                                    +91 22 2577 6007
                                </span>
                            </a>

                            <a href="tel:+919137724227" className='flex gap-1 cursor-pointer hover:underline'>
                                <FaPhoneAlt size={15} className='text-[#01A658] mt-1' />
                                <span>
                                    +91 91 3772 4227
                                </span>
                            </a>

                            <a href="mailto:info@genotekbio.com" className='flex gap-1 cursor-pointer hover:underline'>
                                <IoIosMail size={19} className='text-[#01A658] mt-1' />
                                <span>
                                    info@genotekbio.com
                                </span>
                            </a>
                        </div>

                        <div>
                            <p className="font-bold text-[#175C84] flex">
                                <FaLocationDot size={20} className='text-[#01A658]' /><span className="ml-1">Research & Development Centre</span>
                            </p>
                            <p className="text-[14px] text-[#607486] ml-6">
                                Sub Plot 12, Plot 40, Ramtekdi Industrial Area, TPS II, Hadapsar, Pune 411 013, INDIA.
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="overflow-hidden rounded-[8px] flex flex-col gap-7 mt-22">
                        <div className='border border-[#bdd4e2]'>
                            <iframe
                                title="Genotek Biochem map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15236.002410320687!2d72.9055664871582!3d19.1193852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7f070f7528b%3A0x15f864cbd0060ec!2sGenotek%20Biochem!5e1!3m2!1sen!2sus!4v1777899859246!5m2!1sen!2sus"
                                className="h-[150px] w-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        <div className='border border-[#bdd4e2]'>
                            <iframe
                                title="Genotek Biochem map"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d61169.78391285967!2d73.920251!3d18.497335!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c100117bbee9%3A0x11a723ea6939f83d!2sGenotek%20Biochem%20Research%20Centre!5e1!3m2!1sen!2sin!4v1777899961418!5m2!1sen!2sin"
                                className="h-[150px] w-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        
                    </div>
                </div>
                <div>
                    <h2 className="text-[16px] font-semibold text-[#214f86] mt-18">Quick Links</h2>
                    <div className='flex gap-5'>
                        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px]">
                            {navItems.filter((item) => item.label !== 'About us').map((item) => (
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
                        <div className='mt-3'>
                            <h2 className="text-[16px] font-semibold text-[#214f86]">
                                <a
                                    href="https://www.linkedin.com/company/genotek-biochem/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 transition-colors duration-200 hover:text-[#6a9ab1]"
                                >
                                    <FaLinkedin className="text-[26px] text-[#6a9ab1]" />
                                    <span>Follow us</span>
                                </a>
                            </h2>
                        </div>
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
