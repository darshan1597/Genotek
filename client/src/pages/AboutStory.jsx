import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navabar from './components/Navabar'
import Sidebar from './components/Sidebar'
import hero from '../assets/aboutStory/hero.png'
import whatWeDoImage from '../assets/aboutStory/what-we-do.jpg'
import WhoWeAreImage from '../assets/aboutStory/who-we-are.jpg'
import WhyChooseUsImage from '../assets/aboutStory/why-choose-us.jpg'
import { Link } from 'react-router-dom'

const detailVariants = {
    hidden: {
        opacity: 0,
        height: 0,
        y: -8,
    },
    visible: {
        opacity: 1,
        height: 'auto',
        y: 0,
        transition: {
            duration: 0.32,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        height: 0,
        y: -8,
        transition: {
            duration: 0.22,
            ease: [0.4, 0, 0.2, 1],
        },
    },
}

const desktopDetailVariants = {
    hidden: {
        opacity: 0,
        y: 14,
        filter: 'blur(4px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.42,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        filter: 'blur(4px)',
        transition: {
            duration: 0.2,
        },
    },
}

function AboutStory() {
    const [active, setActive] = useState(null) // default first open
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />

            <main className="w-full px-4 pb-6 md:px-5 lg:px-0 lg:pr-6">
                <section className="mb-10 flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />

                    <div className="flex-1">
                        <div className="relative flex flex-col gap-[10px] md:flex-row">
                            <div className="relative h-[280px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[360px] md:h-[450px]">
                                <img
                                    src={hero}
                                    alt="The Genotek Story"
                                    className="h-full w-full object-cover"
                                />

                                <div
                                    className="absolute bottom-[24px] left-0 z-[4] w-[min(92%,320px)] bg-[#2b4f7c] px-5 py-2.5 text-white shadow-lg sm:bottom-[38px] sm:w-[min(88%,420px)] sm:px-8 sm:py-3 md:bottom-[64px] md:w-auto md:px-15"
                                    style={{
                                        clipPath: 'polygon(0 0, 100% 0, 100% 55%, 90% 100%, 0 100%)',
                                    }}
                                >
                                    <p className="text-[22px] leading-[1.05] font-normal sm:text-[28px] md:text-[35px]">
                                        The Genotek
                                    </p>
                                    <p className="mt-1 text-right text-[34px] leading-[0.95] font-normal sm:text-[42px] md:text-[50px]">
                                        Story.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-[1320px] px-1 pb-8 pt-5 text-[16px] leading-[1.6] text-black sm:text-[18px] md:pb-10 md:text-[20px] md:leading-[1.45]">
                            <p>
                                At Genotek Biochem Private Limited, we believe that true progress in science comes from balancing scale with sensitivity. Guided by our mantra, "Big enough to deliver, small enough to care". We bring together capability and compassion in everything we do.
                            </p>
                        </div>

                        <div className="px-4 pb-12 pt-8">

                        {/* 3 Sections - Who we are, What we do, Why choose us */}
                        <div className="px-4 pb-12 pt-8">

                            {/* Images Grid */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-10">

                                {/* Who We Are */}
                                <div className="text-center">
                                    <div onClick={() => setActive(active === 1 ? null : 1)} className="group cursor-pointer">
                                        <div
                                            className={`relative mx-auto h-[220px] w-full max-w-[250px] overflow-hidden rounded-lg shadow-[0_8px_22px_rgba(35,79,118,0.12)] transition duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_18px_38px_rgba(35,79,118,0.22)] ${
                                                active === 1 ? "ring-4 ring-[#5a92b6] -translate-y-2 shadow-[0_18px_38px_rgba(35,79,118,0.22)]" : ""
                                            }`}
                                        >
                                            <img
                                                src={WhoWeAreImage}
                                                alt="Who We Are"
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-[#214f86]/0 transition duration-300 group-hover:bg-[#214f86]/18" />
                                        </div>
                                        <p className="mt-3 font-semibold text-[#5a92b6] text-[20px]">
                                            Who We Are
                                        </p>
                                    </div>

                                    {/* Mobile Text */}
                                    <AnimatePresence initial={false}>
                                        {active === 1 && (
                                        <motion.div
                                            className="mt-4 overflow-hidden text-left md:hidden"
                                            variants={detailVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <h2 className="text-[22px] font-semibold text-[#5a92b6]">
                                                Who we are
                                            </h2>
                                            <p className="mt-2 text-[16px] text-[#42556c]">
                                                We are a science-driven organization rooted in chemistry, committed to delivering reliable, high-quality solutions that support industries.
                                            </p>
                                            <Link to="/about/team">
                                                <p className="mt-2 text-[#5a92b6] underline">Our Team</p>
                                            </Link>
                                        </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* What We Do */}
                                <div className="text-center">
                                    <div onClick={() => setActive(active === 2 ? null : 2)} className="group cursor-pointer">
                                        <div
                                            className={`relative mx-auto h-[220px] w-full max-w-[250px] overflow-hidden rounded-lg shadow-[0_8px_22px_rgba(35,79,118,0.12)] transition duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_18px_38px_rgba(35,79,118,0.22)] ${
                                                active === 2 ? "ring-4 ring-[#5a92b6] -translate-y-2 shadow-[0_18px_38px_rgba(35,79,118,0.22)]" : ""
                                            }`}
                                        >
                                            <img
                                                src={whatWeDoImage}
                                                alt="What We Do"
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-[#214f86]/0 transition duration-300 group-hover:bg-[#214f86]/18" />
                                        </div>
                                        <p className="mt-3 font-semibold text-[#5a92b6] text-[20px]">
                                            What We Do
                                        </p>
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {active === 2 && (
                                        <motion.div
                                            className="mt-4 overflow-hidden text-left md:hidden"
                                            variants={detailVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <h2 className="text-[22px] font-semibold text-[#5a92b6]">
                                                What we do
                                            </h2>
                                            <p className="mt-2 text-[16px] text-[#42556c]">
                                                We provide innovative solutions with strong expertise, ensuring efficiency, flexibility, and industry excellence.
                                            </p>
                                        </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Why Choose Us */}
                                <div className="text-center">
                                    <div onClick={() => setActive(active === 3 ? null : 3)} className="group cursor-pointer">
                                        <div
                                            className={`relative mx-auto h-[220px] w-full max-w-[250px] overflow-hidden rounded-lg shadow-[0_8px_22px_rgba(35,79,118,0.12)] transition duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_18px_38px_rgba(35,79,118,0.22)] ${
                                                active === 3 ? "ring-4 ring-[#5a92b6] -translate-y-2 shadow-[0_18px_38px_rgba(35,79,118,0.22)]" : ""
                                            }`}
                                        >
                                            <img
                                                src={WhyChooseUsImage}
                                                alt="Why Choose Us"
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-[#214f86]/0 transition duration-300 group-hover:bg-[#214f86]/18" />
                                        </div>
                                        <p className="mt-3 font-semibold text-[#5a92b6] text-[20px]">
                                            Why Choose Us
                                        </p>
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {active === 3 && (
                                        <motion.div
                                            className="mt-4 overflow-hidden text-left md:hidden"
                                            variants={detailVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <h2 className="text-[22px] font-semibold text-[#5a92b6]">
                                                Why Choose Us
                                            </h2>
                                            <p className="mt-2 text-[16px] text-[#42556c]">
                                                We combine large-scale capability with personal attention, ensuring reliability and customer satisfaction.
                                            </p>
                                        </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                            </div>

                            {/* Desktop Full-Width Text */}
                            <div className="hidden md:block mt-12 max-w-[1000px] mx-auto text-center">
                                <AnimatePresence mode="wait">
                                    {active === 1 && (
                                        <motion.div
                                            key="who-we-are-detail"
                                            variants={desktopDetailVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <h2 className="text-[30px] font-semibold text-[#5a92b6]">
                                                Who we are
                                            </h2>
                                            <p className="mt-4 text-[18px] text-[#42556c] text-justify">
                                                We are a science-driven organization rooted in chemistry, committed to delivering reliable, high-quality solutions that support industries. Our strength lies in our ability to operate with the efficiency, infrastructure, and expertise of a large organization, while maintaining the responsiveness, flexibility, and personal attention of a close-knit team.
                                            </p>
                                            <Link to="/about/team">
                                                <p className="mt-4 inline-block text-[18px] font-semibold text-[#5a92b6] underline underline-offset-4 sm:text-[20px] md:text-[23px]" >
                                                    Our Team
                                                </p>
                                            </Link>
                                        </motion.div>
                                    )}

                                    {active === 2 && (
                                        <motion.div
                                            key="what-we-do-detail"
                                            variants={desktopDetailVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <h2 className="text-[30px] font-semibold text-[#5a92b6]">
                                                What we do
                                            </h2>
                                            <p className="mt-4 text-[18px] text-[#42556c] text-justify">
                                                We are a science-driven organization rooted in chemistry, committed to delivering reliable, high-quality solutions that support industries. Our strength lies in our ability to operate with the efficiency, infrastructure, and expertise of a large organization, while maintaining the responsiveness, flexibility, and personal attention that define our way of working.
                                            </p>
                                        </motion.div>
                                    )}

                                    {active === 3 && (
                                        <motion.div
                                            key="why-choose-us-detail"
                                            variants={desktopDetailVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <h2 className="text-[30px] font-semibold text-[#5a92b6]">
                                                Why Choose Us
                                            </h2>
                                            <p className="mt-4 text-[18px] text-[#42556c] text-justify">
                                                We are a science-driven organization rooted in chemistry, committed to delivering reliable, high-quality solutions that support industries. Our strength lies in our ability to operate with the efficiency, infrastructure, and expertise of a large organization, while maintaining the responsiveness flexibility and personal attention of a close-knit team.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>

                        </div>
                    
                    </div>
                    {/* 3 Sections - Who we are, What we do, Why choose us */}
                            
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AboutStory
