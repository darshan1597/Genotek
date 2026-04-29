import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiSend } from 'react-icons/fi'
import Navabar from './components/Navabar'
import Sidebar from './components/Sidebar'
import slide1 from '../assets/hero/slide1.jpg'
import slide2 from '../assets/hero/slide2.png'
import slide3 from '../assets/hero/slide3.png'
import slide4 from '../assets/hero/slide4.png'
import slide5 from '../assets/hero/slide5.png'
import Footer from './components/Footer'

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
        image: slide1,
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
    const [imagePhase, setImagePhase] = useState('center')
    const [isMobile, setIsMobile] = useState(false)

    const currentSlide = slides[activeSlide]
    const isSpecialSlide = currentSlide.variant === 'special'
    const braceDistance = isMobile ? 450 : 800
    const leftBraceDistance = braceDistance + (isMobile ? 35 : 100)
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
            x: braceDistance,
            y: isMobile ? 18 : 50,
            opacity: 0,
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        },
        center: {
            x: braceDistance,
            y: isMobile ? 18 : 50,
            opacity: 1,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            transition: {
                duration: 1.1,
                delay: 7.05,
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
        ? "M -200 160 L 900 160 C 940 196 970 262 970 330 C 970 386 950 452 930 480 L -200 480 C -260 454 -300 398 -305 338 C -310 272 -270 196 -230 166 C -215 162 -205 160 -200 160 Z"
        : "M -560 160 L 1260 160 C 1310 196 1350 262 1350 330 C 1350 386 1325 452 1300 480 L -560 480 C -600 441 -623 394 -623 326 C -621 254 -595 210 -560 160 Z"

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
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
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />

            <main className="w-full px-4 md:px-5 lg:px-0 lg:pr-6 xl:pr-10">
                <section className="mb-5 flex flex-col pt-3 lg:flex-row lg:items-start">
                    <Sidebar />

                    <div className="relative z-0 flex-1">
                        <div className="relative isolate flex flex-col gap-4 overflow-hidden lg:h-[520px] lg:flex-row lg:gap-0">
                            <div className="relative z-[2] h-[520px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[560px] md:h-[620px] lg:h-full lg:w-[68%] lg:[clip-path:polygon(0_0,100%_0,calc(100%-83px)_50%,100%_100%,0_100%)]">
                                <AnimatePresence mode="sync">
                                    <motion.img
                                        key={currentSlide.id}
                                        src={currentSlide.image}
                                        alt={`Genotek plant view ${activeSlide + 1}`}
                                        className="absolute inset-0 h-full w-full object-cover"
                                        variants={slideVariants}
                                        initial="enter"
                                        animate={imagePhase}
                                        exit="exit"
                                    />
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    {isSpecialSlide && specialPhase !== 'hidden' ? (
                                        <motion.div
                                            key={`special-slide-hero-banner-${currentSlide.id}`}
                                            className={`absolute inset-0 z-[4] flex items-start justify-center px-0 pt-[52px] sm:px-3 sm:pt-[72px] md:pt-[72px] ${
                                                specialPhase === 'closing' ? 'bg-transparent' : 'bg-white/55'
                                            }`}
                                            variants={firstSlideOverlayVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                        >
                                            <div className="relative h-[118px] w-[100%] max-w-none shrink-0 sm:h-[132px] sm:w-[125%] md:h-[142px] md:w-[150%] lg:w-[175%]">
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
                                                        d="M 485 174 C 342 288 379 445 440 527 C 446 536 443 542 431 530 C 357 438 340 277 476 169 C 492 160 495 166 485 174 Z"
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
                                                        d="M 485 174 C 342 288 379 445 440 527 C 446 536 443 542 431 530 C 357 438 340 277 476 169 C 492 160 495 166 485 174 Z"
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
                                                        d="M 360 526 C 512 412 475 255 395 173 C 391 168 382 152 403 170 C 497 262 514 423 369 530 C 345 548 340 540 360 526 Z"
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
                                                        d="M 360 526 C 512 412 475 255 395 173 C 391 168 382 152 403 170 C 497 262 514 423 369 530 C 345 548 340 540 360 526 Z"
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
                                                    <p className="text-[18px] font-semibold leading-[1.15] sm:text-[24px] md:text-[28px]">
                                                        <TypewriterText key={`title-${currentSlide.id}`} text={currentSlide.title} delay={4300} speed={38} />
                                                    </p>
                                                    <p className="mt-2 px-10 text-[10px] leading-[1.35] sm:text-[12px] md:text-[16px]">
                                                        <TypewriterText
                                                            key={`subtitle-${currentSlide.id}`}
                                                            text={currentSlide.subtitle}
                                                            delay={5300}
                                                            speed={24}
                                                        />
                                                    </p>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    ) : currentSlide.lines ? (
                                        <motion.div
                                            key={`caption-${activeSlide}`}
                                            className="absolute bottom-[22px] left-0 z-[4] max-w-[92%] bg-[#2b4f7c] px-6 py-3 pr-10 text-left text-white shadow-lg sm:bottom-[28px] sm:px-10 sm:pr-16 md:bottom-[60px] md:left-0 md:max-w-none md:px-12 md:pr-24"
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
                                                    className={`${index === 0 ? '' : 'ml-8 mt-2 sm:ml-14 md:ml-20 md:mt-3'} text-[18px] leading-[1.3] font-normal sm:text-[24px] md:text-[30px]`}
                                                >
                                                    {prefix}
                                                    <span className="font-semibold">{highlight}</span>
                                                </p>
                                            ))}
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>
                            </div>

                            <div className="relative z-[1] flex w-full shrink-0 flex-col gap-3 sm:gap-4 lg:-ml-[70px] lg:w-[calc(32%+70px)] lg:gap-[12px]">
                                {[0, 1, 2].map((item) => (
                                    <div
                                        key={item}
                                        className="h-[92px] bg-[#d7d4cb] sm:h-[110px] lg:h-auto lg:flex-1"
                                    />
                                ))}
                            </div>

                            <div className="pointer-events-none absolute left-[calc(69%-95px)] top-0 z-[3] hidden h-full w-[100px] lg:block">
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

                        <section className="mt-12 border-t border-[#d8e5ec] pt-10">
                            <div className="mx-auto max-w-[820px]">
                                <div className="mb-6 text-center">
                                    <p className="text-[14px] font-semibold uppercase tracking-[0.18em] text-[#5a92b6]">
                                        Contact Us
                                    </p>
                                    <h2 className="mt-2 text-[30px] font-semibold leading-tight text-[#214f86] sm:text-[36px]">
                                        Let's start a conversation.
                                    </h2>
                                    <p className="mx-auto mt-3 max-w-[620px] text-[16px] leading-[1.65] text-[#52677a]">
                                        Share your requirement and our team will get back to you with the right support for your chemistry, process, or manufacturing needs.
                                    </p>
                                </div>

                                <form className="grid gap-4 rounded-[8px] border border-[#d8e5ec] bg-white p-5 shadow-[0_16px_36px_rgba(33,79,134,0.08)] sm:p-6">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <label className="block">
                                            <span className="mb-1.5 block text-[14px] font-medium text-[#214f86]">Name</span>
                                            <input
                                                type="text"
                                                className="h-[46px] w-full rounded-[6px] border border-[#bdd4e2] bg-white px-4 text-[15px] text-[#214f86] outline-none transition focus:border-[#5a92b6] focus:ring-2 focus:ring-[#d7e8f1]"
                                            />
                                        </label>
                                        <label className="block">
                                            <span className="mb-1.5 block text-[14px] font-medium text-[#214f86]">Email</span>
                                            <input
                                                type="email"
                                                className="h-[46px] w-full rounded-[6px] border border-[#bdd4e2] bg-white px-4 text-[15px] text-[#214f86] outline-none transition focus:border-[#5a92b6] focus:ring-2 focus:ring-[#d7e8f1]"
                                            />
                                        </label>
                                    </div>

                                    <label className="block">
                                        <span className="mb-1.5 block text-[14px] font-medium text-[#214f86]">Subject</span>
                                        <input
                                            type="text"
                                            className="h-[46px] w-full rounded-[6px] border border-[#bdd4e2] bg-white px-4 text-[15px] text-[#214f86] outline-none transition focus:border-[#5a92b6] focus:ring-2 focus:ring-[#d7e8f1]"
                                        />
                                    </label>

                                    <label className="block">
                                        <span className="mb-1.5 block text-[14px] font-medium text-[#214f86]">Message</span>
                                        <textarea
                                            rows="5"
                                            className="w-full resize-none rounded-[6px] border border-[#bdd4e2] bg-white px-4 py-3 text-[15px] text-[#214f86] outline-none transition focus:border-[#5a92b6] focus:ring-2 focus:ring-[#d7e8f1]"
                                        />
                                    </label>

                                    <button
                                        type="button"
                                        className="mx-auto mt-1 inline-flex h-[48px] w-fit items-center gap-2 rounded-[6px] bg-[#214f86] px-6 text-[15px] font-semibold text-white transition hover:bg-[#173d69] cursor-pointer"
                                    >
                                        <FiSend className="text-[18px]" />
                                        Submit Enquiry
                                    </button>
                                </form>
                            </div>
                        </section>
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home
