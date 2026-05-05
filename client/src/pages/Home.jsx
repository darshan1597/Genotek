import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiSend } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Navabar from './components/Navabar'
import Sidebar from './components/Sidebar'
import slide1 from '../assets/hero/slide1.jpeg'
import slide2 from '../assets/hero/slide2.jpg'
import slide3 from '../assets/hero/slide3.jpeg'
import slide4 from '../assets/hero/slide4.png'
import slide5 from '../assets/hero/slide5.png'
import heroSidebar1 from '../assets/heroSidebars/1.jpeg'
import heroSidebar2 from '../assets/heroSidebars/2.jpeg'
import heroSidebar3 from '../assets/heroSidebars/3.jpeg'
import Footer from './components/Footer'

const heroSidebarItems = [
    { image: heroSidebar1, label: 'Our Infrastructure', href: '/about/infra' },
    { image: heroSidebar2, label: 'Our Services', href: '/services' },
    { image: heroSidebar3, label: 'Our HPLC Columns', href: '/products' },
]

const slides = [
    {
        id: 'intro',
        image: slide1,
        variant: 'special',
        title: 'Your Trusted CRDMO Partner',
        subtitle: 'Precision Chemistry | Process Excellence | Scalable Manufacturing',
    },
    {
        id: 'deliver',
        image: slide2,
        variant: 'normal',
        lines: [
            ['Big enough to ', 'Deliver.'],
            ['Small enough to ', 'Care.'],
        ],
    },
    {
        id: 'innovation',
        image: slide3,
        variant: 'normal',
        lines: [
            ['Driven by ', 'Innovation.'],
            ['Defined by ', 'Quality.'],
        ],
    },
    {
        id: 'reach',
        image: slide4,
        variant: 'normal',
        lines: [
            ['Always within ', 'Reach.'],
            ['From Experiment to Outcome.'],
        ],
    },
    {
        id: 'outro',
        image: slide5,
        variant: 'special',
        title: 'Excited to Partner with You!',
        subtitle: 'Precision Chemistry | Process Excellence | Scalable Manufacturing',
    },
]

const specialSubtitleDelay = 5300
const specialSubtitleStepDelay = 520
const specialSubtitleCompleteDelay = specialSubtitleDelay / 1000 + specialSubtitleStepDelay / 1000 * 4
const specialRightBraceDelay = specialSubtitleCompleteDelay + 0.65
const firstSlideGlowDelay = specialRightBraceDelay + 1.1

const slideVariants = {
    enter: {
        opacity: 0,
        filter: 'brightness(1) saturate(1)',
    },
    center: ({ shouldGlow }) => ({
        opacity: 1,
        filter: shouldGlow
            ? [
                  'brightness(1) saturate(1)',
                  'brightness(1.14) saturate(1.12)',
                  'brightness(1.06) saturate(1.05)',
              ]
            : 'brightness(1) saturate(1)',
        transition: {
            opacity: {
                duration: 1.6,
                ease: [0.4, 0, 0.2, 1],
            },
            filter: shouldGlow
                ? {
                      duration: 1.4,
                      delay: firstSlideGlowDelay,
                      times: [0, 0.48, 1],
                      ease: [0.22, 1, 0.36, 1],
                  }
                : {
                      duration: 0.01,
                  },
        },
    }),
    exit: {
        opacity: 0,
        filter: 'brightness(1) saturate(1)',
        transition: {
            duration: 1.6,
            ease: [0.4, 0, 0.2, 1],
        },
    },
}

const captionVariants = {
    enter: {
        opacity: 0,
        clipPath: 'polygon(0 0, 0 0, 0 68%, 0 100%, 0 100%)',
    },
    center: {
        opacity: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 68%, 95% 100%, 0 100%)',
        transition: {
            duration: 0.85,
            delay: 1.65,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        opacity: 0,
        clipPath: 'polygon(0 0, 0 0, 0 68%, 0 100%, 0 100%)',
        transition: {
            duration: 0.35,
            ease: [0.4, 0, 0.2, 1],
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
        scaleX: 0.01,
        scaleY: 0.027,
    },
    center: {
        opacity: 1,
        scaleX: [0.01, 0.01, 1, 1],
        scaleY: [0.027, 0.027, 0.027, 1],
        transition: {
            duration: 3.25,
            times: [0, 0.18, 0.62, 1],
            ease: [0.16, 1, 0.3, 1],
        },
    },
    closing: {
        opacity: [1, 1, 0],
        scaleX: [1, 1, 0.018],
        scaleY: [1, 0.027, 0.027],
        transition: {
            duration: 2.1,
            times: [0, 0.45, 1],
            ease: [0.4, 0, 0.2, 1],
        },
    },
    exit: {
        opacity: 0,
        scaleX: 0.01,
        scaleY: 0.027,
        transition: { duration: 0.25 },
    },
}

const firstSlideTextVariants = {
    enter: {
        opacity: 0,
    },
    center: {
        opacity: 1,
        transition: {
            duration: 0.22,
            delay: 4.05,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.75,
        },
    },
}

const specialTitleVariants = {
    enter: {
        opacity: 0,
        x: -80,
    },
    center: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            delay: 4.25,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        x: 28,
        transition: {
            duration: 0.35,
        },
    },
}

function SequentialPhraseText({ text, delay = 0, stepDelay = 520 }) {
    const parts = text.split('|').map((part) => part.trim())
    const sequence = parts.flatMap((part, index) => (index === 0 ? [part] : ['|', part]))
    const [visibleCount, setVisibleCount] = useState(0)

    useEffect(() => {
        const timers = []

        setVisibleCount(0)

        const timeoutId = window.setTimeout(() => {
            setVisibleCount(1)

            sequence.slice(1).forEach((_, index) => {
                timers.push(
                    window.setTimeout(() => {
                        setVisibleCount(index + 2)
                    }, (index + 1) * stepDelay)
                )
            })
        }, delay)

        return () => {
            window.clearTimeout(timeoutId)
            timers.forEach((timer) => window.clearTimeout(timer))
        }
    }, [delay, sequence.length, stepDelay, text])

    return (
        <span className="inline-flex items-center justify-center gap-x-1 whitespace-nowrap sm:gap-x-2">
            {sequence.map((part, index) => (
                <motion.span
                    key={`${part}-${index}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{
                        opacity: index < visibleCount ? 1 : 0,
                        y: index < visibleCount ? 0 : 6,
                    }}
                    transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {part}
                </motion.span>
            ))}
        </span>
    )
}

function Home() {
    const [activeSlide, setActiveSlide] = useState(0)
    const [specialPhase, setSpecialPhase] = useState('opening')
    const [imagePhase, setImagePhase] = useState('center')
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') {
            return false
        }

        return window.innerWidth < 1024
    })

    const currentSlide = slides[activeSlide]
    const isSpecialSlide = currentSlide.variant === 'special'
    const braceDistance = isMobile ? 450 : 830
    const leftBraceDistance = isMobile ? 600 : braceDistance + 100
    const rightBraceDistance = isMobile ? 1350 : braceDistance + 830
    const firstSlideLeftBraceVariants = {
        enter: {
            x: -leftBraceDistance,
            y: isMobile ? -18 : -100,
            opacity: 0,
            clipPath: 'inset(100% 0 0 0)',
        },
        center: {
            x: -leftBraceDistance,
            y: isMobile ? -18 : -100,
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            transition: {
                duration: 1.1,
                delay: 3.35,
                ease: [0.16, 1, 0.3, 1],
            },
        },
        hidden: {
            opacity: 0,
            clipPath: 'inset(100% 0 0 0)',
            transition: {
                duration: 0.55,
            },
        },
    }
    const firstSlideRightBraceVariants = {
        enter: {
            x: rightBraceDistance,
            y: isMobile ? 18 : 50,
            opacity: 0,
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        },
        center: {
            x: rightBraceDistance,
            y: isMobile ? 18 : 50,
            opacity: 1,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            transition: {
                duration: 1.1,
                delay: specialRightBraceDelay,
                ease: [0.16, 1, 0.3, 1],
            },
        },
        hidden: {
            opacity: 0,
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            transition: {
                duration: 0.55,
            },
        },
    }
    const bluePath = isMobile
        ? "M -220 160 L 980 160 C 1020 196 1050 262 1050 330 C 1050 386 1030 452 1010 480 L -220 480 C -280 454 -320 398 -325 338 C -330 272 -290 196 -250 166 C -235 162 -225 160 -220 160 Z"
        : "M -560 160 L 1257 160 C 1307 195 1342 246 1357 306 C 1363 379 1337 422 1295 452 L -514 463 C -577 402 -592 377 -610 319 C -621 254 -610 209 -576 160 Z"

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const timers = []

        setImagePhase('center')

        if (slides[activeSlide].variant === 'special') {
            setSpecialPhase('opening')

            timers.push(
                window.setTimeout(() => {
                    setSpecialPhase('closing')
                }, 10200)
            )

            timers.push(
                window.setTimeout(() => {
                    setSpecialPhase('hidden')
                }, 12600)
            )

            timers.push(
                window.setTimeout(() => {
                    setActiveSlide((current) => (current + 1) % slides.length)
                }, 13800)
            )
        } else {
            setSpecialPhase('hidden')

            timers.push(
                window.setTimeout(() => {
                    setActiveSlide((current) => (current + 1) % slides.length)
                }, 3900)
            )
        }

        return () => timers.forEach((timer) => window.clearTimeout(timer))
    }, [activeSlide])

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Navabar />

            <main className="w-full px-4 pb-6 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="mb-5 flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />

                    <div className="relative z-0 min-w-0 flex-1">
                        <div className="relative isolate flex flex-col gap-4 overflow-hidden lg:h-[520px] lg:flex-row lg:gap-0">
                            <div className="relative z-[2] h-[360px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[440px] md:h-[520px] lg:h-full lg:w-[76%] lg:[clip-path:polygon(0_0,100%_0,calc(100%-83px)_50%,100%_100%,0_100%)]">
                                <AnimatePresence mode="sync">
                                    <motion.img
                                        key={currentSlide.id}
                                        src={currentSlide.image}
                                        alt={`Genotek plant view ${activeSlide + 1}`}
                                        className="absolute inset-0 h-full w-full transform-gpu object-cover will-change-[opacity,transform,filter]"
                                        variants={slideVariants}
                                        custom={{ shouldGlow: activeSlide === 0 }}
                                        initial="enter"
                                        animate={imagePhase}
                                        exit="exit"
                                    />
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    {isSpecialSlide && specialPhase !== 'hidden' ? (
                                        <motion.div
                                            key={`special-slide-hero-banner-${currentSlide.id}`}
                                            className={`absolute inset-0 z-[4] flex items-start justify-center px-0 pt-[38px] sm:px-3 sm:pt-[52px] md:pt-[64px] lg:pt-[72px] ${
                                                specialPhase === 'closing' ? 'bg-transparent' : 'bg-white/55'
                                            }`}
                                            variants={firstSlideOverlayVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                        >
                                            <div className="relative h-[126px] w-[150%] max-w-none shrink-0 sm:h-[142px] sm:w-[155%] md:h-[168px] md:w-[185%] lg:h-[142px] lg:w-[175%]">
                                                <svg
                                                    viewBox="0 100 760 450"
                                                    preserveAspectRatio="xMidYMid meet"
                                                    className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_14px_24px_rgba(18,54,91,0.2)]"
                                                    aria-hidden="true"
                                                >
                                                    <motion.path
                                                        d={bluePath}
                                                        fill="#2b5b91"
                                                        variants={firstSlideBlueVariants}
                                                        initial="enter"
                                                        animate={specialPhase === 'closing' ? 'closing' : 'center'}
                                                        style={{
                                                            transformBox: 'view-box',
                                                            transformOrigin: 'center center',
                                                        }}
                                                    />
                                                    <motion.path
                                                        d="M 450 166 C 347 274 379 445 473 500 C 486 509 476 511 469 508 C 361 430 342 278 442 161 C 450 154 454 157 453 161 Z"
                                                        fill="none"
                                                        stroke="#2b5b91"
                                                        strokeWidth="20"
                                                        strokeLinejoin="round"
                                                        variants={firstSlideLeftBraceVariants}
                                                        initial="enter"
                                                        animate={specialPhase === 'closing' ? 'hidden' : 'center'}
                                                        style={{
                                                            transformBox: 'fill-box',
                                                        }}
                                                    />

                                                    <motion.path
                                                        d="M 450 166 C 347 274 379 445 473 500 C 486 509 476 511 469 508 C 361 430 342 278 442 161 C 450 154 454 157 453 161 Z"
                                                        fill="white"
                                                        stroke="none"
                                                        variants={firstSlideLeftBraceVariants}
                                                        initial="enter"
                                                        animate={specialPhase === 'closing' ? 'hidden' : 'center'}
                                                        style={{
                                                            transformBox: 'fill-box',
                                                        }}
                                                    />

                                                    <motion.path
                                                        d="M -450 166 C -347 274 -379 445 -473 500 C -486 509 -476 511 -469 508 C -361 430 -342 278 -442 161 C -450 154 -454 157 -453 161 Z"
                                                        fill="none"
                                                        stroke="#2b5b91"
                                                        strokeWidth="20"
                                                        strokeLinejoin="round"
                                                        variants={firstSlideRightBraceVariants}
                                                        initial="enter"
                                                        animate={specialPhase === 'closing' ? 'hidden' : 'center'}
                                                        style={{
                                                            transformBox: 'fill-box',
                                                        }}
                                                    />

                                                    <motion.path
                                                        d="M -450 166 C -347 274 -379 445 -473 500 C -486 509 -476 511 -469 508 C -361 430 -342 278 -442 161 C -450 154 -454 157 -453 161 Z"
                                                        fill="white"
                                                        stroke="none"
                                                        variants={firstSlideRightBraceVariants}
                                                        initial="enter"
                                                        animate={specialPhase === 'closing' ? 'hidden' : 'center'}
                                                        style={{
                                                            transformBox: 'fill-box',
                                                        }}
                                                    />
                                                </svg>

                                                <motion.div
                                                    className="absolute inset-0 flex flex-col items-center justify-center px-[18%] text-center text-white"
                                                    variants={firstSlideTextVariants}
                                                    initial="enter"
                                                    animate={specialPhase === 'closing' ? 'exit' : 'center'}
                                                >
                                                    <p className="text-[16px] font-semibold leading-[1.15] sm:text-[22px] md:text-[28px]">
                                                        <motion.span
                                                            key={`title-${currentSlide.id}`}
                                                            className="inline-block"
                                                            variants={specialTitleVariants}
                                                            initial="enter"
                                                            animate={specialPhase === 'closing' ? 'exit' : 'center'}
                                                        >
                                                            {currentSlide.title}
                                                        </motion.span>
                                                    </p>
                                                    <p className="mt-2 w-full px-3 text-[7px] leading-[1.35] sm:px-8 sm:text-[11px] md:px-10 md:text-[16px]">
                                                        <SequentialPhraseText
                                                            key={`subtitle-${currentSlide.id}`}
                                                            text={currentSlide.subtitle}
                                                            delay={specialSubtitleDelay}
                                                            stepDelay={specialSubtitleStepDelay}
                                                        />
                                                    </p>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    ) : currentSlide.lines ? (
                                        <motion.div
                                            key={`caption-${activeSlide}`}
                                            className="absolute bottom-[24px] left-0 z-[4] max-w-[82%] bg-[#2b4f7c] px-5 py-2 pr-8 text-left text-white shadow-lg sm:bottom-[30px] sm:max-w-[74%] sm:px-7 sm:pr-11 md:bottom-[60px] md:left-0 md:max-w-[68%] md:px-9 md:pr-14"
                                            variants={captionVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                        >
                                            {currentSlide?.lines?.map(([prefix, highlight], index) => (
                                                <p
                                                    key={`${prefix}-${highlight}`}
                                                    className={`${index === 0 ? '' : 'ml-6 mt-1.5 sm:ml-10 md:ml-14 md:mt-2'} text-[16px] leading-[1.25] font-normal sm:text-[20px] md:text-[24px]`}
                                                >
                                                    {prefix}
                                                    <span className="font-semibold">{highlight}</span>
                                                </p>
                                            ))}
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>
                            </div>

                            <div className="relative z-[1] grid w-full shrink-0 grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:-ml-[70px] lg:flex lg:w-[calc(24%+70px)] lg:flex-col lg:gap-[12px]">
                                {heroSidebarItems.map(({ image, label, href }, index) => (
                                    <Link
                                        key={image}
                                        to={href}
                                        className="group relative h-[112px] cursor-pointer overflow-hidden bg-[#d7d4cb] sm:h-[132px] lg:h-auto lg:flex-1"
                                    >
                                        <img
                                            src={image}
                                            alt={`Genotek sidebar highlight ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 ease-out group-hover:opacity-35" />
                                        <p className="pointer-events-none absolute inset-x-0 bottom-2 px-3 text-center text-[15px] font-bold leading-tight bg-[#122E64] text-white transition-all duration-500 ease-out group-hover:bottom-1/2 group-hover:translate-y-1/2 group-hover:text-[18px] sm:bottom-2.5 sm:text-[15px] sm:group-hover:text-[20px] lg:text-[16px] lg:group-hover:text-[22px]">
                                            {label}
                                        </p>
                                    </Link>
                                ))}
                            </div>

                            <div className="pointer-events-none absolute left-[calc(77%-95px)] top-0 z-[3] hidden h-full w-[100px] lg:block">
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
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home
