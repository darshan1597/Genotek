import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navabar from './components/Navabar'
import Sidebar from './components/Sidebar'
import RushabGohilImage from '../assets/aboutTeam/rushab-gohil.jpg'
import HiteshGandhiImage from '../assets/aboutTeam/hitesh-gandhi.jpg'
import hero from '../assets/aboutTeam/hero.png'
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


function AboutTeam() {
    const [active, setActive] = useState(1) // default first open

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />
        
            <main className="w-full px-4 pb-6 md:px-5 lg:px-0 lg:pr-6">
                <section className="mb-10 flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />
             
                    <div className="flex-1">
                        <div className="relative flex flex-col gap-[10px] md:flex-row">
                            <div className="relative h-[280px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[360px] md:h-[500px]">
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
                                        Team.
                                    </p>
                                </div>
                            </div>
                        </div>
             
                        <div className="px-4 pb-12 pt-8">
{/* Team members */}
    {/* Images Grid */}
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-10">

        {/* Rushab Gohil */}
        <div className="text-center">
            <div onClick={() => setActive(active === 1 ? null : 1)} className="cursor-pointer">
                <div 
                     className="overflow-hidden"
                     style={{
                     clipPath: 'polygon(0 0, 100% 0, 100% 72%, 86% 100%, 0 100%)',
                    }}
                 >
                <img
                    src={RushabGohilImage}
                    alt='Rushab Gohil'
                    className={`h-[220px] w-full max-w-[250px] object-cover mx-auto transition duration-300 
                    ${active === 1 ? "ring-4 ring-[#5a92b6] scale-105" : ""}`}
                />
                </div>
                <p className="mt-3 font-semibold text-[#5a92b6] text-[20px]">
                    <strong>Rushab Gohil </strong><br /> CEO
                </p>
            </div>

            {/* Mobile Text */}
            <AnimatePresence initial={false}>
                {active === 1 && (
                    <motion.div
                        className="mt-4 text-left md:hidden"
                        variants={detailVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <h2 className="text-[22px] font-semibold text-[#5a92b6]">
                            Rushab Gohil -  CEO
                        </h2>
                    <p className="mt-2 text-[16px] text-[#42556c]">
                        Rushabh Gohil is an emerging leader known for his strategic thinking and execution-driven approach. With a strong focus on building relationships and driving business outcomes, he brings a balanced perspective of operational discipline and growth ambition. He plays a key role in enabling customerfocused solutions, contributing to scalable success and long-term value creation in dynamic and competitive environments.
                    </p>
                    <Link to="/about/team">
                        <p className="mt-2 text-[#5a92b6] underline">Our Team</p>
                    </Link>
                    </motion.div>
            )}
            </AnimatePresence>
        </div>
        

        {/* Hitesh Gandhi*/}
        <div className="text-center">
            <div onClick={() => setActive(active === 2 ? null : 2)} className="cursor-pointer">
                <div 
                    className="overflow-hidden"
                    style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 72%, 86% 100%, 0 100%)',
                    }}
                >
                <img
                    src={HiteshGandhiImage}
                    alt="Hitesh Gandhi"
                    className={`h-[220px] w-full max-w-[250px] object-cover mx-auto transition duration-300 
                    ${active === 2 ? "ring-4 ring-[#5a92b6] scale-105" : ""}`}
                />
                </div>
                <p className="mt-3 font-semibold text-[#5a92b6] text-[20px]">
                    <strong>Hitesh Gandhi</strong> <br /> President - Marketing & Projects
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
                <div className="mt-4 text-left md:hidden">
                    <h2 className="text-[22px] font-semibold text-[#5a92b6]">
                        Hitesh Gandhi - President - Marketing & Projects
                    </h2>
                    <p className="mt-2 text-[16px] text-[#42556c]">
                         Hitesh is a results-driven leader in the pharmaceutical and CDMO sector, recognized for shaping growth strategies and building strong global partnerships. Combining commercial acumen with industry expertise, he drives execution-focused teams to deliver customer-centric solutions. His leadership emphasizes innovation, agility, and long-term value creation, enabling organizations to scale effectively and succeed in competitive, evolving markets.
                    </p>
                </div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>

        {/* abc */}
        <div className="text-center">
            <div onClick={() => setActive(active === 3 ? null : 3)} className="cursor-pointer">
                <div 
                    className="overflow-hidden"
                    style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 72%, 86% 100%, 0 100%)',
                    }}
                >
                <img
                    src={RushabGohilImage}
                    className={`h-[220px] w-full max-w-[250px] object-cover mx-auto  transition duration-300 
                    ${active === 3 ? "ring-4 ring-[#5a92b6] scale-105" : ""}`}
                />
                </div>
                <p className="mt-3 font-semibold text-[#5a92b6] text-[20px]">
                    ABC
                </p>
            </div>

        <AnimatePresence initial={false}>
            {active === 3 && (
                <motion.div
                    className="mt-4 overflow-hidden text-left md:hidden"
                    variants={detailVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit">
                <div className="mt-4 text-left md:hidden">
                    <h2 className="text-[22px] font-semibold text-[#5a92b6]">
                        Why Choose Us
                    </h2>
                    <p className="mt-2 text-[16px] text-[#42556c]">
                        We combine large-scale capability with personal attention, ensuring reliability and customer satisfaction.
                    </p>
                </div>
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
            <div>
                <h2 className="text-[30px] font-semibold text-[#5a92b6]">
                    <strong>Rushab Gohil</strong> <br /> CEO
                </h2>
                <p className="mt-4 text-[18px] text-[#42556c] text-justify">
                    Rushabh Gohil is an emerging leader known for his strategic thinking and execution-driven approach. With a strong focus on building relationships and driving business outcomes, he brings a balanced perspective of operational discipline and growth ambition. He plays a key role in enabling customerfocused solutions, contributing to scalable success and long-term value creation in dynamic and competitive environments.
                </p>
            </div>
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
            <div>
                <h2 className="text-[30px] font-semibold text-[#5a92b6]">
                    <strong>Hitesh Gandhi</strong> <br /> President - Marketing & Projects
                </h2>
                <p className="mt-4 text-[18px] text-[#42556c] text-justify">
                     Hitesh is a results-driven leader in the pharmaceutical and CDMO sector, recognized for shaping growth strategies and building strong global partnerships. Combining commercial acumen with industry expertise, he drives execution-focused teams to deliver customer-centric solutions. His leadership emphasizes innovation, agility, and long-term value creation, enabling organizations to scale effectively and succeed in competitive, evolving markets.
                </p>
            </div>
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
            <div>
                <h2 className="text-[30px] font-semibold text-[#5a92b6]">
                    abc
                    </h2>
                    <p className="mt-4 text-[18px] text-[#42556c] text-justify">
                        We combine large-scale capability with personal attention, ensuring reliability, performance, and customer satisfaction.
                    </p>
                    </div>
                        </motion.div>
                    )}
                    </AnimatePresence>

                         </div>
                     </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AboutTeam
