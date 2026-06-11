import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiImage, FiSave } from 'react-icons/fi'
import Navabar from './components/Navabar'
import Toast from './components/Toast'
import { serverUrl } from '../App'
import slide1 from '../../../client/src/assets/hero/slide1.jpeg'
import slide2 from '../../../client/src/assets/hero/slide2.jpg'
import slide3 from '../../../client/src/assets/hero/slide3.jpeg'
import slide4 from '../../../client/src/assets/hero/slide4.png'
import slide5 from '../../../client/src/assets/hero/slide5.png'
import heroSidebar1 from '../../../client/src/assets/heroSidebars/1.jpeg'
import heroSidebar2 from '../../../client/src/assets/heroSidebars/2.jpeg'
import heroSidebar3 from '../../../client/src/assets/heroSidebars/3.jpeg'

const defaultSlides = [
    {
        slideId: 'intro',
        label: 'Slide 1',
        image: slide1,
        variant: 'special',
        title: 'Your Trusted CRDMO Partner',
        subtitle: 'Precision Chemistry | Process Excellence | Scalable Manufacturing',
        lines: [],
    },
    {
        slideId: 'deliver',
        label: 'Slide 2',
        image: slide2,
        variant: 'normal',
        title: '',
        subtitle: '',
        lines: [['Big enough to ', 'Deliver.'], ['Small enough to ', 'Care.']],
    },
    {
        slideId: 'innovation',
        label: 'Slide 3',
        image: slide3,
        variant: 'normal',
        title: '',
        subtitle: '',
        lines: [['Driven by ', 'Innovation.'], ['Defined by ', 'Quality.']],
    },
    {
        slideId: 'reach',
        label: 'Slide 4',
        image: slide4,
        variant: 'normal',
        title: '',
        subtitle: '',
        lines: [['Always within ', 'Reach.'], ['From Experiment to Outcome.', '']],
    },
    {
        slideId: 'outro',
        label: 'Slide 5',
        image: slide5,
        variant: 'special',
        title: 'Excited to Partner with You!',
        subtitle: 'Precision Chemistry | Process Excellence | Scalable Manufacturing',
        lines: [],
    },
]

const defaultSidebarItems = [
    { itemId: 'sidebar-1', label: 'Our Infrastructure', href: '/about/infra', image: heroSidebar1 },
    { itemId: 'sidebar-2', label: 'Our Services', href: '/services', image: heroSidebar2 },
    { itemId: 'sidebar-3', label: 'Our HPLC Columns', href: '/products', image: heroSidebar3 },
]

function HeroSection() {
    const [slides, setSlides] = useState(defaultSlides)
    const [sidebarItems, setSidebarItems] = useState(defaultSidebarItems)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [toast, setToast] = useState(null)

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const [slidesResponse, sidebarResponse] = await Promise.all([
                    axios.get(`${serverUrl}/api/hero-slides`),
                    axios.get(`${serverUrl}/api/hero-slides/sidebar`),
                ])
                const savedSlides = Array.isArray(slidesResponse.data) ? slidesResponse.data : []
                const savedSidebarItems = Array.isArray(sidebarResponse.data) ? sidebarResponse.data : []

                setSlides(defaultSlides.map((fallback) => {
                    const saved = savedSlides.find((slide) => slide.slideId === fallback.slideId)
                    if (!saved) return fallback

                    return {
                        ...fallback,
                        ...saved,
                        image: saved.image?.name ? `${serverUrl}/heroImages/${saved.image.name}` : fallback.image,
                        lines: saved.lines?.length ? saved.lines : fallback.lines,
                    }
                }))
                setSidebarItems(defaultSidebarItems.map((fallback) => {
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
                console.error('Error loading hero slides:', error)
                setToast({ type: 'error', message: 'Could not load saved hero banners. Showing current defaults.' })
            } finally {
                setIsLoading(false)
            }
        }

        fetchSlides()
    }, [])

    const updateSlide = (index, field, value) => {
        setSlides((current) => current.map((slide, slideIndex) =>
            slideIndex === index ? { ...slide, [field]: value } : slide
        ))
    }

    const updateLine = (slideIndex, lineIndex, partIndex, value) => {
        setSlides((current) => current.map((slide, currentSlideIndex) => {
            if (currentSlideIndex !== slideIndex) return slide

            const lines = slide.lines.map((line, currentLineIndex) =>
                currentLineIndex === lineIndex
                    ? line.map((part, currentPartIndex) => currentPartIndex === partIndex ? value : part)
                    : line
            )

            return { ...slide, lines }
        }))
    }

    const handleImageChange = (index, file) => {
        if (!file) return

        setSlides((current) => current.map((slide, slideIndex) =>
            slideIndex === index
                ? { ...slide, imageFile: file, image: URL.createObjectURL(file) }
                : slide
        ))
    }

    const updateSidebarItem = (index, field, value) => {
        setSidebarItems((current) => current.map((item, itemIndex) =>
            itemIndex === index ? { ...item, [field]: value } : item
        ))
    }

    const handleSidebarImageChange = (index, file) => {
        if (!file) return

        setSidebarItems((current) => current.map((item, itemIndex) =>
            itemIndex === index
                ? { ...item, imageFile: file, image: URL.createObjectURL(file) }
                : item
        ))
    }

    const handleSave = async () => {
        setIsSaving(true)

        try {
            await Promise.all(slides.map((slide) => {
                const formData = new FormData()
                formData.append('variant', slide.variant)
                formData.append('title', slide.title || '')
                formData.append('subtitle', slide.subtitle || '')
                formData.append('lines', JSON.stringify(slide.lines || []))
                if (slide.imageFile) formData.append('image', slide.imageFile)

                return axios.put(`${serverUrl}/api/hero-slides/${slide.slideId}`, formData)
            }))
            await Promise.all(sidebarItems.map((item) => {
                const formData = new FormData()
                formData.append('label', item.label)
                formData.append('href', item.href)
                if (item.imageFile) formData.append('image', item.imageFile)

                return axios.put(`${serverUrl}/api/hero-slides/sidebar/${item.itemId}`, formData)
            }))

            setToast({ type: 'success', message: 'Hero banners saved successfully.' })
        } catch (error) {
            console.error('Error saving hero slides:', error)
            setToast({ type: 'error', message: error.response?.data?.message || 'Could not save hero banners.' })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#f8fbfd]">
            <Navabar />
            <main className="px-4 pb-12 md:px-6 lg:px-10">
                <section className="mx-auto max-w-6xl py-8 lg:py-10">
                    <div className="mb-8 flex flex-col gap-5 border-b border-[#d8e6ef] pb-7 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6a9ab1]">Hero Banners</p>
                            <h1 className="text-[32px] font-semibold leading-tight text-[#214f86] sm:text-[42px]">Change Hero Banners</h1>
                            <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[#526b80]">
                                Replace images and edit the text shown on each homepage slide.
                            </p>
                        </div>
                        <Link to="/admin-panel" className="inline-flex h-11 items-center justify-center gap-2 border border-[#d7e5ee] bg-white px-4 text-[14px] font-semibold text-[#214f86] hover:bg-[#eef5f9]">
                            <FiArrowLeft /> Dashboard
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="h-72 animate-pulse bg-white" />
                    ) : (
                        <div className="space-y-6">
                            {slides.map((slide, index) => (
                                <article key={slide.slideId} className="border border-[#d7e5ee] bg-white p-5 shadow-sm">
                                    <h2 className="mb-5 text-[20px] font-semibold text-[#214f86]">{slide.label}</h2>
                                    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
                                        <div>
                                            <div className="aspect-[16/9] overflow-hidden bg-[#eef5f9]">
                                                <img src={slide.image} alt={`${slide.label} preview`} className="h-full w-full object-cover" />
                                            </div>
                                            <label className="mt-3 inline-flex h-11 cursor-pointer items-center gap-2 bg-[#214f86] px-4 text-[14px] font-semibold text-white hover:bg-[#173d68]">
                                                <FiImage /> Change image
                                                <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(event) => handleImageChange(index, event.target.files?.[0])} />
                                            </label>
                                        </div>

                                        <div>
                                            {slide.variant === 'special' ? (
                                                <div className="space-y-4">
                                                    <label className="block text-[14px] font-medium text-[#526b80]">
                                                        Title
                                                        <input value={slide.title} onChange={(event) => updateSlide(index, 'title', event.target.value)} className="mt-2 w-full border border-[#d7e5ee] p-3 outline-none focus:border-[#214f86]" />
                                                    </label>
                                                    <label className="block text-[14px] font-medium text-[#526b80]">
                                                        Subtitle
                                                        <textarea rows="3" value={slide.subtitle} onChange={(event) => updateSlide(index, 'subtitle', event.target.value)} className="mt-2 w-full border border-[#d7e5ee] p-3 outline-none focus:border-[#214f86]" />
                                                    </label>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {slide.lines.map((line, lineIndex) => (
                                                        <div key={lineIndex} className="grid gap-3 sm:grid-cols-2">
                                                            <label className="text-[14px] font-medium text-[#526b80]">
                                                                Line {lineIndex + 1} text
                                                                <input value={line[0] || ''} onChange={(event) => updateLine(index, lineIndex, 0, event.target.value)} className="mt-2 w-full border border-[#d7e5ee] p-3 outline-none focus:border-[#214f86]" />
                                                            </label>
                                                            <label className="text-[14px] font-medium text-[#526b80]">
                                                                Highlight text
                                                                <input value={line[1] || ''} onChange={(event) => updateLine(index, lineIndex, 1, event.target.value)} className="mt-2 w-full border border-[#d7e5ee] p-3 outline-none focus:border-[#214f86]" />
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}

                            <div className="border-t border-[#d7e5ee] pt-8">
                                <h2 className="text-[26px] font-semibold text-[#214f86]">Right-side sections</h2>
                                <p className="mt-2 text-[15px] text-[#526b80]">
                                    Edit the three sections displayed beside the homepage slides.
                                </p>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-3">
                                {sidebarItems.map((item, index) => (
                                    <article key={item.itemId} className="border border-[#d7e5ee] bg-white p-5 shadow-sm">
                                        <div className="aspect-[16/9] overflow-hidden bg-[#eef5f9]">
                                            <img src={item.image} alt={`${item.label} preview`} className="h-full w-full object-cover" />
                                        </div>
                                        <label className="mt-3 inline-flex h-10 cursor-pointer items-center gap-2 bg-[#214f86] px-4 text-[13px] font-semibold text-white hover:bg-[#173d68]">
                                            <FiImage /> Change image
                                            <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(event) => handleSidebarImageChange(index, event.target.files?.[0])} />
                                        </label>
                                        <label className="mt-4 block text-[14px] font-medium text-[#526b80]">
                                            Display text
                                            <input value={item.label} onChange={(event) => updateSidebarItem(index, 'label', event.target.value)} className="mt-2 w-full border border-[#d7e5ee] p-3 outline-none focus:border-[#214f86]" />
                                        </label>
                                        <label className="mt-4 block text-[14px] font-medium text-[#526b80]">
                                            Destination URL
                                            <input value={item.href} onChange={(event) => updateSidebarItem(index, 'href', event.target.value)} placeholder="/about/infra" className="mt-2 w-full border border-[#d7e5ee] p-3 outline-none focus:border-[#214f86]" />
                                        </label>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex justify-end">
                        <button type="button" onClick={handleSave} disabled={isLoading || isSaving} className="inline-flex h-12 cursor-pointer items-center gap-2 bg-[#214f86] px-6 text-[14px] font-semibold text-white hover:bg-[#173d68] disabled:cursor-not-allowed disabled:opacity-60">
                            <FiSave /> {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </section>
            </main>
            {toast ? (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            ) : null}
        </div>
    )
}

export default HeroSection
