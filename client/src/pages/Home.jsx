import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiSend } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import axios from 'axios'
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
import circleImageUrl from '../assets/genotek 1.gif'
import centerLogoUrl from '../assets/genotek 2.gif'


const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000'

const defaultHeroSidebarItems = [
    { itemId: 'sidebar-1', image: heroSidebar1, label: 'Our Infrastructure', href: '/about/infra' },
    { itemId: 'sidebar-2', image: heroSidebar2, label: 'Our Services', href: '/services' },
    { itemId: 'sidebar-3', image: heroSidebar3, label: 'Our HPLC Columns', href: '/products' },
]

const defaultSlides = [
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

const specialLeftBraceDelay = 3350
const specialLeftBraceDuration = 1.8
const specialTitleDelay = 5400
const specialTitleDuration = 1.15
const specialTitleTypeSpeed = 86
const specialSubtitleDelay = 7950
const specialSubtitleStepDelay = 900
const specialSubtitleCompleteDelay = specialSubtitleDelay / 1000 + specialSubtitleStepDelay / 1000 * 4
const specialRightBraceDelay = specialSubtitleCompleteDelay + 1
const specialBraceCloseDelay = 16500
const specialBlueCloseDuration = 3000
const specialOverlayHiddenDelay = specialBraceCloseDelay + specialBlueCloseDuration
const introSlideAdvanceDelay = specialOverlayHiddenDelay + 1000
const outroSlideAdvanceDelay = specialOverlayHiddenDelay
const normalSlideAdvanceDelay = 5200
const firstSlideGlowDelay = specialRightBraceDelay + 1.9

const slideVariants = {
    enter: {
        opacity: 0,
        filter: 'brightness(1) saturate(1)',
    },
    center: ({ shouldGlow, targetOpacity = 1 }) => ({
        opacity: targetOpacity,
        filter: shouldGlow
            ? [
                  'brightness(1) saturate(1)',
                  'brightness(1.14) saturate(1.12)',
                  'brightness(1.06) saturate(1.05)',
              ]
            : 'brightness(1) saturate(1)',
        transition: {
            opacity: {
                duration: 2.8,
                ease: [0.45, 0, 0.2, 1],
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
            opacity: {
                duration: 2.8,
                ease: [0.45, 0, 0.2, 1],
            },
            filter: {
                duration: 0.2,
            },
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
            duration: 1.25,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        opacity: 0,
        clipPath: 'polygon(0 0, 0 0, 0 68%, 0 100%, 0 100%)',
        transition: {
            duration: 0.65,
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
            duration: 3,
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
            duration: 0.45,
            delay: 4.05,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 1.2,
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
            duration: specialTitleDuration,
            delay: specialTitleDelay / 1000,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        x: 28,
        transition: {
            duration: 1,
        },
    },
}

function TypewriterLine({ text, delay = 0, speed = 58, className = '' }) {
    const [displayedText, setDisplayedText] = useState('')
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        let intervalId

        setDisplayedText('')
        setIsTyping(false)

        const timeoutId = window.setTimeout(() => {
            let currentIndex = 0

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
        <span className={`relative inline-block font-special-elite font-normal tracking-[0.06em] ${className}`}>
            <span>{displayedText}</span>
            <span
                className={`ml-[2px] inline-block h-[0.9em] w-[2px] translate-y-[0.12em] bg-white ${
                    isTyping ? 'opacity-100' : 'opacity-0'
                }`}
            />
            <span className="invisible">{text.slice(displayedText.length)}</span>
        </span>
    )
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
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {part}
                </motion.span>
            ))}
        </span>
    )
}

function MobileSequentialPhraseText({ text, stepDelay = 520 }) {
    const parts = text.split('|').map((part) => part.trim())
    const [visibleCount, setVisibleCount] = useState(0)

    useEffect(() => {
        const timers = []

        setVisibleCount(0)
        setVisibleCount(1)

        parts.slice(1).forEach((_, index) => {
            timers.push(
                window.setTimeout(() => {
                    setVisibleCount(index + 2)
                }, (index + 1) * stepDelay)
            )
        })

        return () => {
            timers.forEach((timer) => window.clearTimeout(timer))
        }
    }, [parts.length, stepDelay, text])

    return (
        <span className="flex flex-col items-center justify-center text-center text-[#2f5688]">
            {parts.map((part, index) => (
                <span key={`${part}-${index}`} className="flex flex-col items-center">
                    <motion.span
                        className="text-[14px] font-bold leading-[1.15] tracking-[-0.01em]"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{
                            opacity: index < visibleCount ? 1 : 0,
                            y: index < visibleCount ? 0 : 6,
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {part}
                    </motion.span>
                    {index < parts.length - 1 ? (
                        <motion.span
                            className="my-[3px] h-[2px] w-[72px] bg-[#2f5688]"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{
                                opacity: index < visibleCount ? 1 : 0,
                                scaleX: index < visibleCount ? 1 : 0,
                            }}
                            transition={{
                                duration: 0.45,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        />
                    ) : null}
                </span>
            ))}
        </span>
    )
}

function GenotekExclusiveStrip() {
    const [category, setCategory] = useState(null)
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchExclusiveProducts = async () => {
            try {
                const [categoriesResponse, productsResponse] = await Promise.all([
                    axios.get(`${serverUrl}/api/categories/fetch-category`),
                    axios.get(`${serverUrl}/api/products/fetch-products`),
                ])

                const categories = Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []
                const exclusiveCategory = categories.find((item) => item.isStandalone)
                const allProducts = Array.isArray(productsResponse.data) ? productsResponse.data : []

                setCategory(exclusiveCategory || null)
                setProducts(
                    exclusiveCategory
                        ? allProducts.filter((product) => product.category === exclusiveCategory.name)
                        : []
                )
            } catch (error) {
                console.error('Error loading Genotek Exclusive home strip:', error)
                setCategory(null)
                setProducts([])
            }
        }

        fetchExclusiveProducts()
    }, [])

    if (!category || !products.length) return null

    const categoryImageUrl = category.image?.name
        ? `${serverUrl}/categoryImages/${category.image.name}`
        : ''
    const showcaseProducts = Array.from(
        { length: Math.max(1, Math.ceil(6 / products.length)) },
        () => products
    ).flat()

    const renderProductGroup = (groupKey) => (
        <div className="flex shrink-0 gap-4 pr-4" aria-hidden={groupKey !== 'primary'}>
            {showcaseProducts.map((product, index) => {
                const imageUrl = product.image?.name
                    ? `${serverUrl}/productImages/${product.image.name}`
                    : ''

                return (
                    <Link
                        key={`${groupKey}-${product._id || `${product.name}-${product.cas}`}-${index}`}
                        to={`/genotek-exclusive?product=${encodeURIComponent(product._id || '')}`}
                        className="block w-[120px] shrink-0 overflow-hidden rounded-[12px] border-2 border-[#5790aa] bg-white transition hover:-translate-y-1 hover:shadow-lg sm:w-[210px] sm:rounded-[20px]"
                        aria-label={`View ${product.name} on Genotek Exclusive page`}
                    >
                        <div className="truncate bg-[#5790aa] px-2 py-2 text-center text-[11px] font-bold text-white sm:px-3 sm:text-[13px]">
                            CAS No: {product.cas}
                        </div>
                        <p className="line-clamp-2 min-h-[40px] whitespace-pre-line px-2 py-1 text-center text-[8px] font-semibold leading-[12px] text-[#526b80] sm:min-h-[48px] sm:px-3 sm:py-2 sm:text-[12px] sm:leading-4">
                        {product.description || 'Description not available.'}

                        </p>
                        <div className="flex h-[60px] items-center justify-center overflow-hidden bg-white sm:h-[112px]">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className="block h-[calc(100%-1rem)] w-[calc(100%-1rem)] object-fill"
                                />
                            ) : (
                                <span className="text-[12px] text-[#5790aa]">No image</span>
                            )}
                            
                        </div>
                        <div className="flex min-h-[36px] items-center justify-center px-2 pb-1 text-center text-[10px] leading-[15px] text-[#3c82b0] sm:min-h-[46px] sm:px-3 sm:pb-2 sm:text-[12px] sm:leading-[18px]">
                            <span className="line-clamp-2">{product.name}</span>
                        </div>
                    </Link>
                )
            })}
        </div>
    )

    return (
        <section className="exclusive-showcase relative mt-5 flex min-h-[170px] w-full items-center overflow-hidden bg-white py-2 sm:min-h-[190px] sm:py-3">
            <div className="exclusive-product-track flex w-max">
                {renderProductGroup('duplicate')}
                {renderProductGroup('primary')}
            </div>

            <div className="absolute inset-y-0 left-0 z-10 flex w-[145px] items-center justify-center bg-white roundedf sm:w-[220px]">
                
                {categoryImageUrl ? (
                    <Link
                        to="/genotek-exclusive"
                        className="flex h-full w-full cursor-pointer items-center justify-center"
                        aria-label={`View ${category.name}`}
                    >
                        {/* Spinning outer ring */}
                        <img
                            src={centerLogoUrl}
                            alt="Genotek Exclusive Ring"
                            className="absolute h-[110px] w-[110px] animate-[spin_20s_linear_infinite] object-contain sm:h-[160px] sm:w-[160px]"
                        />

                        {/* Static center logo */}
                        
                        <img
                            src={circleImageUrl}
                            alt={category.name}
                            className="relative z-10 h-[50px] w-[50px] object-contain sm:h-[70px] sm:w-[70px]"
                            
                        />
                    </Link>
                ) : (
                    <Link to="/genotek-exclusive" className="px-3 text-center text-[16px] font-bold text-[#214f86]">
                        {category.name}
                    </Link>
                )}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-[145px] z-10 w-8 bg-gradient-to-r from-white to-transparent sm:left-[220px] sm:w-14" />
        </section>
        
    )
}

function Home() {
    const [heroSlides, setHeroSlides] = useState(defaultSlides)
    const [heroSidebarItems, setHeroSidebarItems] = useState(defaultHeroSidebarItems)
    const [activeSlide, setActiveSlide] = useState(0)
    const [specialPhase, setSpecialPhase] = useState('opening')
    const [imagePhase, setImagePhase] = useState('center')
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') {
            return false
        }

        return window.innerWidth < 1024
    })

    const currentSlide = heroSlides[activeSlide]
    const slideCount = heroSlides.length
    const isSpecialSlide = currentSlide.variant === 'special'
    const braceDistance = isMobile ? 350 : 830
    const leftBraceDistance = isMobile ? 535 : braceDistance + 100
    const rightBraceDistance = isMobile ? 1285 : braceDistance + 830
    const mobileRightBraceDelay = specialSubtitleDelay / 1000 + specialSubtitleStepDelay / 1000 * 2 + 0.65
    const firstSlideLeftBraceVariants = {
        enter: {
            x: -leftBraceDistance,
            y: isMobile ? -90 : -100,
            rotate: isMobile ? 25 : 0,
            opacity: 0,
            clipPath: 'inset(100% 0 0 0)',
        },
        center: {
            x: -leftBraceDistance,
            y: isMobile ? -90 : -100,
            rotate: isMobile ? 25 : 0,
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            transition: {
                duration: specialLeftBraceDuration,
                delay: specialLeftBraceDelay / 1000,
                ease: [0.16, 1, 0.3, 1],
            },
        },
        hidden: {
            opacity: 0,
            clipPath: 'inset(100% 0 0 0)',
            transition: {
                duration: 1.15,
            },
        },
    }
    const firstSlideRightBraceVariants = {
        enter: {
            x: rightBraceDistance,
            y: isMobile ? 15 : 50,
            rotate: isMobile ? 15 : 0,
            opacity: 0,
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        },
        center: {
            x: rightBraceDistance,
            y: isMobile ? 15 : 50,
            rotate: isMobile ? 15 : 0,
            opacity: 1,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            transition: {
                duration: specialLeftBraceDuration,
                delay: isMobile ? mobileRightBraceDelay : specialRightBraceDelay,
                ease: [0.16, 1, 0.3, 1],
            },
        },
        hidden: {
            opacity: 0,
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            transition: {
                duration: 1.15,
            },
        },
    }
    const isDesktop = !isMobile
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [showMobileText, setShowMobileText] = useState(false)
    useEffect(() => {
    if (isSpecialSlide && specialPhase !== 'hidden') {
        setShowSubtitle(false)

        const timer = setTimeout(() => {
            setShowSubtitle(true)
        }, specialBraceCloseDelay + 300) // after band animation ends

        return () => clearTimeout(timer)
    } else {
        setShowSubtitle(false)
    }
}, [activeSlide, specialPhase])


useEffect(() => {
    if (isSpecialSlide && specialPhase !== 'hidden') {
        setShowMobileText(false)

        const showTimer = setTimeout(() => {
            setShowMobileText(true)
        }, specialSubtitleDelay)

        const hideTimer = setTimeout(() => {
            setShowMobileText(false)
        }, specialBraceCloseDelay)

        return () => {
            clearTimeout(showTimer)
            clearTimeout(hideTimer)
        }
    } else {
        setShowMobileText(false)
    }
}, [activeSlide, specialPhase])
    
    // const bluePath = isMobile
    //     ? "M -140 160 L 860 160 C 895 195 920 246 930 306 C 936 379 912 422 880 452 L -115 463 C -150 402 -162 377 -172 319 C -180 254 -170 209 -144 160 Z"
    //     : "M -560 160 L 1257 160 C 1307 195 1342 246 1357 306 C 1363 379 1337 422 1295 452 L -514 463 C -577 402 -592 377 -610 319 C -621 254 -610 209 -576 160 Z"
        const bluePath = isMobile
        ? "M -140 99 L 860 99 C 887 120 905 153 913 190 C 918 230 902 257 880 280 L -115 287 C -150 249 -162 234 -172 198 C -180 157 -170 130 -144 99 Z"
        : "M -560 160 L 1257 160 C 1307 195 1342 246 1357 306 C 1363 379 1337 422 1295 452 L -514 463 C -577 402 -592 377 -610 319 C -621 254 -610 209 -576 160 Z"
        
        const leftBrace = isMobile
        ?"M 446 150 C 385 198 404 272 468 296 C 479 301 469 302 461 300 C 392 268 381 200 440 147 C 448 143 452 147 449 151 Z"
        :"M 450 166 C 347 274 379 445 473 500 C 486 509 476 511 469 508 C 361 430 342 278 442 161 C 450 154 454 157 453 161 Z"
        const rightBrace = isMobile
        ?"M -446 150 C -385 198 -404 272 -468 296 C -479 301 -469 302 -461 300 C -392 268 -381 200 -440 147 C -448 143 -452 147 -449 151 Z"
        :"M -450 166 C -347 274 -379 445 -473 500 C -486 509 -476 511 -469 508 C -361 430 -342 278 -442 161 C -450 154 -454 157 -453 161 Z"

        const whiteLeftBrace = isMobile
        ?"M 446 150 C 385 198 404 272 468 296 C 479 301 469 302 461 300 C 392 268 381 200 440 147 C 448 143 452 147 449 151 Z"
        :"M 450 166 C 347 274 379 445 473 500 C 486 509 476 511 469 508 C 361 430 342 278 442 161 C 450 154 454 157 453 161 Z"
        const whiteRightBrace = isMobile
        ?"M -446 150 C -385 198 -404 272 -468 296 C -479 301 -469 302 -461 300 C -392 268 -381 200 -440 147 C -448 143 -452 147 -449 151 Z"
        :"M -450 166 C -347 274 -379 445 -473 500 C -486 509 -476 511 -469 508 C -361 430 -342 278 -442 161 C -450 154 -454 157 -453 161 Z"
        // const leftBrace = isMobile
        // ?"M 450 166 C 347 274 379 445 473 500 C 486 509 476 511 469 508 C 361 430 342 278 442 161 C 450 154 454 157 453 161 Z"
        // :"M 450 166 C 347 274 379 445 473 500 C 486 509 476 511 469 508 C 361 430 342 278 442 161 C 450 154 454 157 453 161 Z"
        // const rightBrace = isMobile
        // ?"M -450 166 C -347 274 -379 445 -473 500 C -486 509 -476 511 -469 508 C -361 430 -342 278 -442 161 C -450 154 -454 157 -453 161 Z"
        // :"M -450 166 C -347 274 -379 445 -473 500 C -486 509 -476 511 -469 508 C -361 430 -342 278 -442 161 C -450 154 -454 157 -453 161 Z"

        // const whiteLeftBrace = isMobile
        // ?"M 450 166 C 347 274 379 445 473 500 C 486 509 476 511 469 508 C 361 430 342 278 442 161 C 450 154 454 157 453 161 Z"
        // :"M 450 166 C 347 274 379 445 473 500 C 486 509 476 511 469 508 C 361 430 342 278 442 161 C 450 154 454 157 453 161 Z"
        // const whiteRightBrace = isMobile
        // ?"M -450 166 C -347 274 -379 445 -473 500 C -486 509 -476 511 -469 508 C -361 430 -342 278 -442 161 C -450 154 -454 157 -453 161 Z"
        // :"M -450 166 C -347 274 -379 445 -473 500 C -486 509 -476 511 -469 508 C -361 430 -342 278 -442 161 C -450 154 -454 157 -453 161 Z"

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 630)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const fetchHeroSlides = async () => {
            try {
                const [slidesResponse, sidebarResponse] = await Promise.all([
                    axios.get(`${serverUrl}/api/hero-slides`),
                    axios.get(`${serverUrl}/api/hero-slides/sidebar`),
                ])
                const savedSlides = Array.isArray(slidesResponse.data) ? slidesResponse.data : []
                const savedSidebarItems = Array.isArray(sidebarResponse.data) ? sidebarResponse.data : []

                setHeroSlides(defaultSlides.map((fallback) => {
                    const saved = savedSlides.find((slide) => slide.slideId === fallback.id)
                    if (!saved) return fallback

                    return {
                        ...fallback,
                        ...saved,
                        id: fallback.id,
                        image: saved.image?.name
                            ? `${serverUrl}/heroImages/${saved.image.name}`
                            : fallback.image,
                        lines: saved.lines?.length ? saved.lines : fallback.lines,
                    }
                }))
                setHeroSidebarItems(defaultHeroSidebarItems.map((fallback) => {
                    const saved = savedSidebarItems.find((item) => item.itemId === fallback.itemId)
                    if (!saved) return fallback

                    return {
                        ...fallback,
                        ...saved,
                        image: saved.image?.name
                            ? `${serverUrl}/heroSidebarImages/${saved.image.name}`
                            : fallback.image,
                    }
                }))
            } catch (error) {
                console.error('Error loading managed hero slides:', error)
                setHeroSlides(defaultSlides)
                setHeroSidebarItems(defaultHeroSidebarItems)
            }
        }

        fetchHeroSlides()
    }, [])

    useEffect(() => {
        const timers = []

        setImagePhase('center')

        if (currentSlide.variant === 'special') {
            const currentSpecialSlideId = currentSlide.id
            const slideAdvanceDelay = currentSpecialSlideId === 'outro' ? outroSlideAdvanceDelay : introSlideAdvanceDelay

            setSpecialPhase('opening')

            timers.push(
                window.setTimeout(() => {
                    setSpecialPhase('closing')
                }, specialBraceCloseDelay)
            )

            if (currentSpecialSlideId !== 'outro') {
                timers.push(
                    window.setTimeout(() => {
                        setSpecialPhase('hidden')
                    }, specialOverlayHiddenDelay)
                )
            }

            timers.push(
                window.setTimeout(() => {
                    setActiveSlide((current) => (current + 1) % slideCount)
                }, slideAdvanceDelay)
            )
        } else {
            setSpecialPhase('hidden')

            timers.push(
                window.setTimeout(() => {
                    setActiveSlide((current) => (current + 1) % slideCount)
                }, normalSlideAdvanceDelay)
            )
        }

        return () => timers.forEach((timer) => window.clearTimeout(timer))
    }, [activeSlide, currentSlide.id, currentSlide.variant, slideCount])

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Navabar />

            <main className="w-full px-4 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />

                    <div className="relative z-0 min-w-0 flex-1">
                        <div className="relative isolate flex flex-col gap-4 overflow-hidden lg:h-[520px] lg:flex-row lg:gap-0">
                            <div className="relative z-[2] h-[360px] w-full overflow-hidden bg-white sm:h-[440px] md:h-[520px] lg:h-full lg:w-[76%] lg:[clip-path:polygon(0_0,100%_0,calc(100%-83px)_50%,100%_100%,0_100%)]">
                                <AnimatePresence mode="sync">
                                    <motion.img
                                        key={currentSlide.id}
                                        src={currentSlide.image}
                                        alt={`Genotek plant view ${activeSlide + 1}`}
                                        className="absolute inset-0 h-full w-full transform-gpu object-cover will-change-[opacity,transform,filter]"
                                        variants={slideVariants}
                                        custom={{
                                            shouldGlow: activeSlide === 0,
                                            targetOpacity: currentSlide.id === 'outro' ? 0.55 : 1,
                                        }}
                                        initial="enter"
                                        animate={imagePhase}
                                        exit="exit"
                                    />
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    {isSpecialSlide && specialPhase !== 'hidden' ? (
                                        <motion.div
                                            key={`special-slide-hero-banner-${currentSlide.id}`}
                                            className="absolute inset-0 z-[4] flex items-start justify-center bg-white/55 px-0 pt-[38px] sm:px-3 sm:pt-[52px] md:pt-[64px] lg:pt-[72px]"
                                            variants={firstSlideOverlayVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                        >
                                            <div className="relative h-[126px] w-[150%] max-w-none shrink-0 sm:h-[142px] sm:w-[155%] md:h-[168px] md:w-[185%] lg:h-[142px] lg:w-[175%]">
                                                <svg
                                                    viewBox="0 100 760 450"
                                                    preserveAspectRatio="xMidYMid meet"
                                                    className={`absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_14px_24px_rgba(18,54,91,0.2)] ${
                                                        isMobile ? 'top-8' : ''
                                                    }`}
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
                                                        d={leftBrace}
                                                        fill="none"
                                                        stroke="#2b5b91"
                                                        strokeWidth={isMobile ? 10 : 20}
                                                        strokeLinejoin="round"
                                                        variants={firstSlideLeftBraceVariants}
                                                        initial="enter"
                                                        animate={specialPhase === 'closing' ? 'hidden' : 'center'}
                                                        style={{
                                                            transformBox: 'fill-box',
                                                        }}
                                                    />

                                                    <motion.path
                                                        d={whiteLeftBrace}
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
                                                        d={rightBrace}
                                                        fill="none"
                                                        stroke="#2b5b91"
                                                        strokeWidth={isMobile ? 10 : 20}
                                                        strokeLinejoin="round"
                                                        variants={firstSlideRightBraceVariants}
                                                        initial="enter"
                                                        animate={specialPhase === 'closing' ? 'hidden' : 'center'}
                                                        style={{
                                                            transformBox: 'fill-box',
                                                        }}
                                                    />

                                                    <motion.path
                                                        d={whiteRightBrace}
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
                                                    className="absolute inset-0 flex flex-col px-[18%] pt-[50px] text-center text-white sm:pt-10 lg:pt-8"
                                                    variants={firstSlideTextVariants}
                                                    initial="enter"
                                                    animate={specialPhase === 'closing' ? 'exit' : 'center'}
                                                >
                                                    <p className={`font-semibold leading-[1] ${['intro', 'outro'].includes(currentSlide.id) ? 'text-[16px] sm:text-[23px] md:text-[27px]' : 'text-[17px] sm:text-[22px] md:text-[28px]'}`}>
                                                        {['intro', 'outro'].includes(currentSlide.id) ? (
                                                            <TypewriterLine
                                                                key={`title-typewriter-${currentSlide.id}`}
                                                                text={currentSlide.title}
                                                                delay={specialTitleDelay}
                                                                speed={specialTitleTypeSpeed}
                                                                className="-translate-y-[0.08em]"
                                                            />
                                                        ) : (
                                                            <motion.span
                                                                key={`title-${currentSlide.id}`}
                                                                className="inline-block"
                                                                variants={specialTitleVariants}
                                                                initial="enter"
                                                                animate={specialPhase === 'closing' ? 'exit' : 'center'}
                                                            >
                                                                {currentSlide.title}
                                                            </motion.span>
                                                        )}
                                                    </p>
                                                    {isDesktop && (
                                                    <p className={`mt-1 w-full px-3 leading-[1.35] sm:mt-2 sm:px-8 md:mt-2 md:px-10 ${['intro', 'outro'].includes(currentSlide.id) ? 'text-[8px] sm:text-[13px] md:text-[15px]' : 'text-[7px] sm:text-[11px] md:text-[16px]'}`}>
                                                        <SequentialPhraseText
                                                            key={`subtitle-${currentSlide.id}`}
                                                            text={currentSlide.subtitle}
                                                            delay={specialSubtitleDelay}
                                                            stepDelay={specialSubtitleStepDelay}
                                                        />
                                                    </p>
                                                    )}
                                                    {isMobile && showMobileText ? (
                                                        <div className="mt-[180px]">
                                                            <MobileSequentialPhraseText
                                                                key={`mobile-subtitle-${currentSlide.id}`}
                                                                text={currentSlide.subtitle}
                                                                stepDelay={specialSubtitleStepDelay}
                                                            />
                                                        </div>
                                                    ) : null}
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
                                                    className={`${index === 0 ? '' : 'ml-6 mt-1.5 sm:ml-10 md:ml-14 md:mt-2'} whitespace-nowrap text-[14px] leading-[1.25] font-normal sm:text-[20px] md:text-[24px]`}
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
                                {heroSidebarItems.map(({ itemId, image, label, href }, index) => {
                                    const isExternal = /^https?:\/\//i.test(href)
                                    const SectionLink = isExternal ? 'a' : Link
                                    const linkProps = isExternal
                                        ? { href, target: '_blank', rel: 'noreferrer' }
                                        : { to: href }

                                    return (
                                    <SectionLink
                                        key={itemId}
                                        {...linkProps}
                                        className="group relative h-[112px] cursor-pointer overflow-hidden bg-[#d7d4cb] sm:h-[132px] lg:h-auto lg:flex-1"
                                    >
                                        <img
                                            src={image}
                                            alt={`Genotek sidebar highlight ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 ease-out group-hover:opacity-35" />
                                        <p className="pointer-events-none absolute inset-x-0 bottom-2 px-3 py-1.5 text-center text-[15px] font-bold leading-tight bg-[#2b5b91] text-white transition-all duration-500 ease-out group-hover:bottom-1/4 group-hover:translate-y-1/4 group-hover:text-[18px] sm:bottom-2.5 sm:text-[15px] sm:group-hover:text-[20px] lg:text-[16px] lg:group-hover:text-[22px]">
                                            {label}
                                        </p>
                                    </SectionLink>
                                    )
                                })} 
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
                        <GenotekExclusiveStrip />
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home
