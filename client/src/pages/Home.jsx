import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navabar from './components/Navabar'
import Sidebar from './components/Sidebar'
import slide1 from '../assets/hero/slide1.png'
import slide2 from '../assets/hero/slide2.png'
import slide3 from '../assets/hero/slide3.png'
import slide4 from '../assets/hero/slide4.png'
import slide5 from '../assets/hero/slide5.png'

const slides = [
    {
        id: 'intro',
        image: slide2,
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
            ['  Always within ', 'Reach.'],
            ['From Experiment to Outcome.'],
        ],
    },
    {
        id: 'outro',
        image: slide4,
        variant: 'special',
        title: 'Excited to Partner with You!',
        subtitle: 'Precision Chemistry | Process Excellence | Scalable Manufacturing',
    },
]

const slideVariants = {
    enter: {
        opacity: 0,
        scale: 0.96,
        filter: 'blur(14px)',
        clipPath: 'ellipse(16% 22% at 50% 50%)',
    },
    center: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        clipPath: 'ellipse(86% 92% at 50% 50%)',
        transition: {
            duration: 1.15,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        scale: 1.08,
        filter: 'blur(12px)',
        clipPath: 'ellipse(18% 24% at 50% 50%)',
        transition: {
            duration: 0.8,
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
        clipPath: 'inset(0 50% 0 50%)',
    },
    center: {
        clipPath: 'inset(0 0% 0 0%)',
        transition: {
            duration: 1.6,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        clipPath: 'inset(0 10% 0 10%)',
        opacity: 0,
        transition: { duration: 0.4 },
    },
}

const firstSlideLeftBraceVariants = {
    enter: {
        x: 0,
        y: 0,
        opacity: 1,
    },
    center: {
        x: -800,
        y: -50,
        opacity: 1,
        transition: {
            duration: 1.6,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.2,
        },
    },
}

const firstSlideRightBraceVariants = {
    enter: {
        x: 0,
        y: 0,
        opacity: 1,
    },
    center: {
        x: 800,
        y: 50,
        opacity: 1,
        transition: {
            duration: 1.6,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.2,
        },
    },
}

const firstSlideTextVariants = {
    enter: {
        opacity: 1,
    },
    center: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.25,
        },
    },
}

function TypewriterText({ text, delay = 0, speed = 36 }) {
    const [displayedText, setDisplayedText] = useState('')
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        let intervalId

        const timeoutId = window.setTimeout(() => {
            let currentIndex = 0

            setDisplayedText('')
            setIsTyping(true)

            intervalId = window.setInterval(() => {
                currentIndex += 1
                setDisplayedText(text.slice(0, currentIndex))

                if (currentIndex >= text.length) {
                    window.clearInterval(intervalId)
                    setIsTyping(false)
                }
            }, speed)
        }, delay)

        return () => {
            window.clearTimeout(timeoutId)
            window.clearInterval(intervalId)
        }
    }, [delay, speed, text])

    return (
        <span className="relative inline-block">
            <span className="invisible">{text}</span>
            <span className="absolute inset-0">
                {displayedText}
                <span
                    className={`ml-[2px] inline-block h-[0.9em] w-[2px] translate-y-[0.12em] bg-white ${
                        isTyping ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            </span>
        </span>
    )
}

function Home() {
    const [activeSlide, setActiveSlide] = useState(0)
    const [specialPhase, setSpecialPhase] = useState('opening')

    const currentSlide = slides[activeSlide]
    const isSpecialSlide = currentSlide.variant === 'special'

    useEffect(() => {
        const timers = []

        if (slides[activeSlide].variant === 'special') {
            setSpecialPhase('opening')

            timers.push(
                window.setTimeout(() => {
                    setSpecialPhase('closing')
                }, 6900)
            )

            timers.push(
                window.setTimeout(() => {
                    setSpecialPhase('hidden')
                }, 8500)
            )

            timers.push(
                window.setTimeout(() => {
                    setActiveSlide((current) => (current + 1) % slides.length)
                }, 9600)
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
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />

            <main className="w-full px-4 pb-6 md:px-5 lg:px-0 lg:pr-6 xl:pr-10">
                <section className="mb-10 flex flex-col pt-3 lg:flex-row lg:items-start">
                    <Sidebar />

                    <div className="relative z-0 flex-1">
                        <div className="relative isolate flex flex-col gap-4 overflow-hidden md:h-[520px] md:flex-row md:gap-0">
                            <div
                                className="relative z-[2] h-[300px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[360px] md:h-full md:w-[68%]"
                                style={{
                                    clipPath: "polygon(0 0, 100% 0, calc(100% - 83px) 50%, 100% 100%, 0 100%)",
                                }}
                            >
                                <AnimatePresence mode="sync">
                                    <motion.img
                                        key={currentSlide.id}
                                        src={currentSlide.image}
                                        alt={`Genotek plant view ${activeSlide + 1}`}
                                        className="absolute inset-0 h-full w-full object-cover"
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                    />
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    {isSpecialSlide && specialPhase !== 'hidden' ? (
                                        <motion.div
                                            key={`special-slide-hero-banner-${currentSlide.id}`}
                                            className={`absolute inset-0 z-[4] flex items-start justify-center px-3 pt-[52px] sm:pt-[72px] md:pt-[72px] ${
                                                specialPhase === 'closing' ? 'bg-transparent' : 'bg-white/55'
                                            }`}
                                            variants={firstSlideOverlayVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                        >
                                            <div className="relative h-[118px] w-[150%] max-w-none shrink-0 sm:h-[132px] md:h-[142px] md:w-[175%]">
                                                <svg
                                                    viewBox="0 100 760 450"
                                                    preserveAspectRatio="xMidYMid meet"
                                                    className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_14px_24px_rgba(18,54,91,0.2)]"
                                                    aria-hidden="true"
                                                >
                                                    <motion.path
                                                        d="M -560 160 L 1260 160 C 1310 196 1350 262 1350 330 C 1350 386 1325 452 1300 480 L -560 480 C -620 454 -660 398 -665 338 C -670 272 -630 196 -590 166 C -575 162 -565 160 -560 160 Z"
                                                        fill="#2b5b91"
                                                        variants={firstSlideBlueVariants}
                                                        initial="enter"
                                                        animate={specialPhase === 'closing' ? 'enter' : 'center'}
                                                        style={{
                                                            transformBox: 'view-box',
                                                            transformOrigin: 'center center',
                                                        }}
                                                    />
                                                    
                                                    <motion.path
                                                        d="M 313 127 C 191 180 150 420 350 480 C 385 492 386 486 377 482 C 156 424 200 193 317 131 C 322 128 323 124 313 127 Z"
                                                        fill="none"
                                                        stroke="#2b5b91"
                                                        strokeWidth="20"
                                                        strokeLinejoin="round"
                                                        variants={firstSlideLeftBraceVariants}
                                                        initial="enter"
                                                        animate={specialPhase === 'closing' ? 'hidden' : 'center'}
                                                    />

                                                    <motion.path
                                                        d="M 313 127 C 191 180 150 420 350 480 C 385 492 386 486 377 482 C 156 424 200 193 317 131 C 322 128 323 124 313 127 Z"
                                                        fill="white"
                                                        stroke="none"
                                                        variants={firstSlideLeftBraceVariants}
                                                        initial="enter"
                                                        animate={specialPhase === 'closing' ? 'hidden' : 'center'}
                                                    />

                                                    <motion.path
                                                        d="M 360 526 C 512 412 475 255 395 173 C 391 168 382 152 403 170 C 497 262 514 423 369 530 C 345 548 340 540 360 526 Z"
                                                        fill="none"
                                                        stroke="#2b5b91"
                                                        strokeWidth="20"
                                                        strokeLinejoin="round"
                                                        variants={firstSlideRightBraceVariants}
                                                        initial="enter"
                                                        animate={specialPhase === 'closing' ? 'hidden' : 'center'}
                                                    />

                                                    <motion.path
                                                        d="M 360 526 C 512 412 475 255 395 173 C 391 168 382 152 403 170 C 497 262 514 423 369 530 C 345 548 340 540 360 526 Z"
                                                        fill="white"
                                                        stroke="none"
                                                        variants={firstSlideRightBraceVariants}
                                                        initial="enter"
                                                        animate={specialPhase === 'closing' ? 'hidden' : 'center'}
                                                    />
                                                </svg>

                                                <motion.div
                                                    className="absolute inset-0 flex flex-col items-center justify-center px-[18%] text-center text-white"
                                                    variants={firstSlideTextVariants}
                                                    initial="enter"
                                                    animate={specialPhase === 'closing' ? 'exit' : 'center'}
                                                >
                                                    <p className="text-[18px] font-semibold italic leading-[1.15] sm:text-[24px] md:text-[28px]">
                                                        <TypewriterText key={`title-${currentSlide.id}`} text={currentSlide.title} delay={2050} speed={38} />
                                                    </p>
                                                    <p className="mt-2 text-[12px] leading-[1.35] sm:text-[16px] md:text-[18px]">
                                                        <TypewriterText
                                                            key={`subtitle-${currentSlide.id}`}
                                                            text={currentSlide.subtitle}
                                                            delay={3150}
                                                            speed={24}
                                                        />
                                                    </p>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    ) : currentSlide.lines ? (
                                        <motion.div
                                            key={`caption-${activeSlide}`}
                                            className="absolute bottom-[22px] left-0 z-[4] max-w-[92%] bg-[#2b4f7c] px-6 py-3 text-white shadow-lg sm:bottom-[28px] sm:px-10 md:bottom-[60px] md:left-0 md:max-w-none md:px-30"
                                            variants={captionVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            style={{
                                                clipPath: 'polygon(0 0, 100% 0, 100% 68%, 95% 100%, 0 100%)',
                                            }}
                                        >
                                            {currentSlide?.lines?.map(([prefix, highlight], index) => (
                                                <p
                                                    key={`${prefix}-${highlight}`}
                                                    className={`${index === 0 ? '' : 'mt-2 md:mt-3'} text-[18px] leading-[1.3] font-normal sm:text-[24px] md:text-[30px]`}
                                                >
                                                    {prefix}
                                                    <span className="font-semibold">{highlight}</span>
                                                </p>
                                            ))}
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>
                            </div>

                            <div className="relative z-[1] flex w-full shrink-0 flex-col gap-3 sm:gap-4 md:-ml-[70px] md:w-[calc(32%+70px)] md:gap-[12px]">
                                {[0, 1, 2].map((item) => (
                                    <div
                                        key={item}
                                        className="h-[92px] bg-[#d7d4cb] sm:h-[110px] md:h-auto md:flex-1"
                                    />
                                ))}
                            </div>

                            <div className="pointer-events-none absolute left-[calc(69%-95px)] top-0 z-[3] hidden h-full w-[100px] md:block">
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
