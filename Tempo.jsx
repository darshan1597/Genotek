import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navabar from './components/Navabar'
import Sidebar from './components/Sidebar'
import slide1 from '../assets/hero/slide1.jpg'
import slide2 from '../assets/hero/slide2.jpg'
import slide3 from '../assets/hero/slide3.png'

const slides = [slide1, slide2, slide3]
const slideContent = [
    {
        lines: [
            ['Big enough to ', 'Deliver.'],
            ['Small enough to ', 'Care...'],
        ],
    },
    {
        lines: [
            ['Driven by ', 'Innovation.'],
            ['Defined by ', 'Quality.'],
        ],
    },
    {
        lines: [['Committed to ', 'Your Success.']],
    },
]

const slideVariants = {
    enter: {
            opacity: 0,
            scale: 1.12,
            filter: 'blur(10px)',
            clipPath: 'inset(0 0 100% 0)',
    },
    center: {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            clipPath: 'inset(0 0 0% 0)',
            transition: {
            duration: 1.35,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
            opacity: 0,
            scale: 1.05,
            filter: 'blur(6px)',
            clipPath: 'inset(100% 0 0 0)',
            transition: {
            duration: 0.9,
            ease: [0.4, 0, 0.2, 1],
        },
    },
}

const captionVariants = {
    enter: {
        opacity: 0,
        x: -32,
        y: 12,
    },
    center: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration: 0.8,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        x: -24,
        transition: {
            duration: 0.3,
        },
    },
}

function Home() {
    const [activeSlide, setActiveSlide] = useState(0)

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveSlide((current) => (current + 1) % slides.length)
        }, 3200)

        return () => window.clearInterval(timer)
    }, [])

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />

            <main className="w-full pr-6">
                <section className="flex flex-col pt-3 lg:flex-row lg:items-start mb-10">
                    <Sidebar />

                    <div className="flex-1">
                        <div className="relative flex h-[520px] flex-col md:flex-row">
                            <div className="relative h-[260px] w-full md:w-[67.5%] overflow-hidden bg-[#e8e3d9] md:h-full">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={slides[activeSlide]}
                                        src={slides[activeSlide]}
                                        alt={`Genotek plant view ${activeSlide + 1}`}
                                        className="absolute inset-0 h-full w-full object-cover"
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                    />
                                </AnimatePresence>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`caption-${activeSlide}`}
                                    className="absolute bottom-[60px] left-[-6px] z-[4] bg-[#2b4f7c] px-30 py-3 text-white shadow-lg"
                                    style={{
                                        clipPath: "polygon(0 0, 100% 0, 100% 55%, 90% 100%, 0 100%)",
                                    }}
                                    variants={captionVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                >
                                    {slideContent[activeSlide].lines.map(([prefix, highlight], index) => (
                                        <p
                                            key={`${prefix}-${highlight}`}
                                            className={`${index === 0 ? '' : 'mt-3'} text-[30px] leading-[1.3] font-normal`}
                                        >
                                            {prefix}
                                            <span className="font-semibold">{highlight}</span>
                                        </p>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            <div className="relative z-[1] flex w-full shrink-0 flex-col gap-[25px] md:w-[32%]">
                                {[0, 1, 2].map((item) => (
                                    <div
                                        key={item}
                                        className="flex-1 bg-[#d7d4cb]"
                                    />
                                ))}
                            </div>

                            <div className="pointer-events-none absolute right-[364px] top-0 z-[3] hidden h-full w-[110px] md:block">
                                <svg
                                    viewBox="0 0 92 800"
                                    preserveAspectRatio="none"
                                    className="h-full w-full"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M 50 0 C 41 97 30 245 30 400 C 30 555 41 703 47 800 H 68 C 68 699 57 552 57 400 C 57 248 68 101 86 0 Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home
