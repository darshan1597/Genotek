import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.jpeg'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

const quickLinkColumns = [
    [
        { label: 'Home', href: '/' },
        { label: 'Chemicals', href: '/products/chemical' },
        { label: 'Chromatography Solutions', href: '/products/chromatography-solutions' },
        { label: 'Genotek Exclusives', href: '/genotek-exclusive' },
    ],
    [
        { label: 'Services', href: '/services' },
        { label: 'Industry', href: '/industry' },
        { label: 'Get in Touch', href: '/contact' },
    ],
]

function Footer({ insetForSidebar = true }) {
    const layoutClass = insetForSidebar
        ? 'lg:ml-[274px] lg:w-[calc(100%_-_274px)] xl:ml-[278px] xl:w-[calc(100%_-_278px)]'
        : ''
    const locations = [
        {
            title: 'Corporate Office & HQ',
            address: '216, Vardhaman Complex, 10, LBS Marg, Vikhroli West',
            capital: 'Mumbai - 400 083, India',
            mapTitle: 'Genotek Biochem corporate office map',
            mapSrc:
                'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15078.930238770154!2d72.924621!3d19.119385000000005!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7f070f7528b%3A0x15f864cbd0060ec!2sGenotek%20Biochem!5e0!3m2!1sen!2sin!4v1777985610967!5m2!1sen!2sin',
            contacts: (
                <>
                    <a href="tel:+912225776007" className="flex gap-1 hover:underline">
                        <FaPhoneAlt size={15} className="mt-1 shrink-0 text-[#01A658]" />
                        <span>+91 22 2577 6007</span>
                    </a>
                    <a href="tel:+919137724227" className="flex gap-1 hover:underline">
                        <FaPhoneAlt size={15} className="mt-1 shrink-0 text-[#01A658]" />
                        <span>+91 91 3772 4227</span>
                    </a>
                    <a href="mailto:info@genotekbio.com" className="flex gap-1 hover:underline">
                        <IoIosMail size={19} className="mt-1 shrink-0 text-[#01A658]" />
                        <span>info@genotekbio.com</span>
                    </a>
                </>
            ),
        },
        {
            title: 'Research & Development Centre',
            address: 'Sub Plot 12, Plot 40, Ramtekdi Industrial Area, TPS II, Hadapsar',
            capital: 'Pune - 411 013, India',
            mapTitle: 'Genotek Biochem research centre map',
            mapSrc:
                'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d35997.17891691088!2d73.9165347770946!3d18.495553105931165!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c100117bbee9%3A0x11a723ea6939f83d!2sGenotek%20Biochem%20Research%20Centre!5e0!3m2!1sen!2sin!4v1777985817734!5m2!1sen!2sin',
        },
    ]

    return (
        <footer className={`clear-both mt-10 w-full border-t border-[#d6e4ed] bg-white text-[#42556c] ${layoutClass}`}>
            <div className="grid gap-8 px-4 py-8 md:px-8 lg:grid-cols-[minmax(0,1fr)_max-content] lg:gap-10 lg:px-6 xl:px-10">
                <div className="min-w-0">
                    <Link to="/" className="inline-flex">
                        <img
                            src={logo}
                            alt="Genotek Biochem"
                            className="h-auto w-[210px] object-contain sm:w-[230px]"
                        />
                    </Link>
                    <p className="mt-3 text-[17px] font-bold text-[#214f86] sm:text-[18px]">
                        Genotek Biochem Private Limited
                    </p>

                    <div className="mt-6 flex flex-col gap-7 text-[15px] leading-[1.7]">
                        {locations.map((location) => (
                            <div
                                key={location.title}
                                className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] md:items-start md:gap-6"
                            >
                                <div>
                                    <p className="flex font-bold text-[#175C84]">
                                        <FaLocationDot size={20} className="shrink-0 text-[#01A658]" />
                                        <span className="ml-1">{location.title}</span>
                                    </p>
                                    <p className="ml-6 text-[14px] text-[#607486]">
                                        {location.address}
                                    </p>
                                    <p className="ml-6 text-[14px] text-[#607486]">
                                        {location.capital}
                                    </p>
                                    {location.contacts && (
                                        <div className="ml-0 mt-2 flex flex-col gap-0.5 text-[14px] text-[#42556c] sm:text-[15px]">
                                            {location.contacts}
                                        </div>
                                    )}
                                </div>

                                <div className="w-full overflow-hidden rounded-[8px] border border-[#bdd4e2] md:justify-self-end">
                                    <iframe
                                        title={location.mapTitle}
                                        src={location.mapSrc}
                                        className="h-[180px] w-full border-0 md:h-[150px]"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="min-w-0 lg:justify-self-end lg:pr-2">
                    <h2 className="text-[16px] font-semibold text-[#214f86] lg:mt-16">Quick Links</h2>
                    <div className="mt-4 flex flex-col items-start gap-5">
                        <div className="grid grid-cols-[max-content_max-content] gap-x-6 text-[15px]">
                            {quickLinkColumns.map((column, columnIndex) => (
                                <div key={columnIndex} className="flex flex-col gap-2">
                                    {column.map((item) => (
                                    <NavLink
                                        key={item.label}
                                        to={item.href}
                                        className="whitespace-nowrap transition-colors duration-200 hover:text-[#214f86]"
                                    >
                                        {item.label}
                                    </NavLink>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <a
                            href="https://www.linkedin.com/company/genotek-biochem/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[16px] font-semibold text-[#214f86] transition-colors duration-200 hover:text-[#6a9ab1]"
                        >
                            <FaLinkedin className="text-[26px] text-[#6a9ab1]" />
                            <span>Follow us</span>
                        </a>
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
