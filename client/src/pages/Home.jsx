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

const firstSlideOverlayVariants = {
    enter: {
        opacity: 0,
    },
    center: {
        opacity: 1,
        transition: {
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.35,
        },
    },
}

const firstSlideBlueVariants = {
    enter: {
        opacity: 1,
        clipPath: 'inset(0 50% 0 50%)', // closed at center
    },
    center: {
        opacity: 1,
        clipPath: 'inset(0 0% 0 0%)', // opens fully
        transition: {
            duration: 1.9,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        opacity: 0,
        clipPath: 'inset(0 50% 0 50%)',
        transition: { duration: 0.4 },
    },
}

const firstSlideLeftBraceVariants = {
    enter: {
        x: 180,
        opacity: 1,
    },
    center: {
        x: 0,
        transition: {
            duration: 1.9,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        x: 180,
        opacity: 0,
        transition: { duration: 0.4 },
    },
}

const firstSlideRightBraceVariants = {
    enter: {
        x: -180,
        opacity: 1,
    },
    center: {
        x: 0,
        transition: {
            duration: 1.9,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        x: -180,
        opacity: 0,
        transition: { duration: 0.4 },
    },
}

const firstSlideTextVariants = {
    enter: {
        opacity: 0,
        y: 14,
        filter: 'blur(6px)',
    },
    center: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.75,
            delay: 2.05,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -8,
        filter: 'blur(4px)',
        transition: {
            duration: 0.25,
        },
    },
}

function Home() {
    const [activeSlide, setActiveSlide] = useState(0)

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveSlide((current) => (current + 1) % slides.length)
        }, 5200)

        return () => window.clearInterval(timer)
    }, [])

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />

            <main className="w-full px-4 pb-6 md:px-5 lg:px-0 lg:pr-6">
                <section className="mb-10 flex flex-col pt-3 lg:flex-row lg:items-start">
                    <Sidebar />

                    <div className="flex-1">
                        <div className="relative isolate flex flex-col gap-4 overflow-hidden md:h-[520px] md:flex-row md:gap-0">
                            <div
                                className="relative z-[2] h-[300px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[360px] md:h-full md:w-[68%]"
                                style={{
                                    clipPath: "polygon(0 0, 100% 0, calc(100% - 85px) 50%, 100% 100%, 0 100%)",
                                }}
                            >
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

                                <AnimatePresence mode="wait">
                                    {activeSlide === 0 ? (
                                        <motion.div
                                            key="first-slide-hero-banner"
                                            className="absolute inset-0 z-[4] flex items-start justify-center bg-white/55 px-3 pt-[52px] sm:pt-[72px] md:pt-[72px]"
                                            variants={firstSlideOverlayVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                        >
                                            <div className="relative h-[118px] w-full max-w-[720px] sm:h-[132px] md:h-[142px]">
                                                <svg
                                                    viewBox="120 100 440 450"
                                                    preserveAspectRatio="xMidYMid meet"
                                                    className="absolute inset-0 h-full w-full drop-shadow-[0_14px_24px_rgba(18,54,91,0.2)]"
                                                    aria-hidden="true"
                                                >
                                                    <motion.path
                                                        d="M260 165 L405 165 C470 165 515 220 515 320 C515 420 470 485 405 485 L260 485 Z"
                                                        fill="#2b5b91"
                                                        variants={firstSlideBlueVariants}
                                                        style={{
                                                            transformBox: 'fill-box',
                                                            transformOrigin: 'center center',
                                                        }}
                                                    />
                                                    <motion.path
                                                        d="M312 131 C193 180 150 420 352 480 C412 496 399 474 385 470 C190 425 190 190 352 131 C378 115 326 125 312 131 Z"
                                                        fill="white"
                                                        variants={firstSlideLeftBraceVariants}
                                                    />
                                                    <motion.path
                                                        d="M355 504 C488 405 453 247 382 185 C361 168 382 152 405 170 C497 262 525 407 384 524 C362 539 332 530 355 504 Z"
                                                        fill="white"
                                                        variants={firstSlideRightBraceVariants}
                                                    />
                                                </svg>

                                                <motion.div
                                                    className="absolute inset-0 flex flex-col items-center justify-center px-[18%] text-center text-white"
                                                    variants={firstSlideTextVariants}
                                                >
                                                    <p className="text-[18px] font-semibold italic leading-[1.15] sm:text-[24px] md:text-[28px]">
                                                        Your Trusted CRDMO Partner
                                                    </p>
                                                    <p className="mt-2 text-[12px] leading-[1.35] sm:text-[16px] md:text-[18px]">
                                                        Precision Chemistry | Process Excellence | Scalable Manufacturing
                                                    </p>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key={`caption-${activeSlide}`}
                                            className="absolute bottom-[22px] left-0 z-[4] max-w-[92%] bg-[#2b4f7c] px-6 py-3 text-white shadow-lg sm:bottom-[28px] sm:px-10 md:bottom-[60px] md:left-0 md:max-w-none md:px-30"
                                            variants={captionVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                        >
                                            {slideContent[activeSlide].lines.map(([prefix, highlight], index) => (
                                                <p
                                                    key={`${prefix}-${highlight}`}
                                                    className={`${index === 0 ? '' : 'mt-2 md:mt-3'} text-[18px] leading-[1.3] font-normal sm:text-[24px] md:text-[30px]`}
                                                >
                                                    {prefix}
                                                    <span className="font-semibold">{highlight}</span>
                                                </p>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="relative z-[1] flex w-full shrink-0 flex-col gap-3 sm:gap-4 md:-ml-[70px] md:w-[calc(32%+70px)] md:gap-[25px]">
                                {[0, 1, 2].map((item) => (
                                    <div
                                        key={item}
                                        className="h-[92px] bg-[#d7d4cb] sm:h-[110px] md:h-auto md:flex-1"
                                    />
                                ))}
                            </div>

                            <div className="pointer-events-none absolute left-[calc(69%-99px)] top-0 z-[3] hidden h-full w-[100px] md:block">
                                <svg
                                    viewBox="-20 0 140 520"
                                    preserveAspectRatio="none"
                                    className="h-full w-full"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M 120 0 C 38 120 8 200 8 260 C 8 320 38 400 120 520 L 92 520 C 10 400 -20 320 -20 260 C -20 200 10 120 92 0 Z"
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