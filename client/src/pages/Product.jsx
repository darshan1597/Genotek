import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams, NavLink} from 'react-router-dom'
import axios from 'axios'
import { FiChevronDown, FiMaximize2, FiSearch, FiX } from 'react-icons/fi'
import Navabar from './components/Navabar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000'

function Product() {
    const { categoryName } = useParams()
    const [searchParams] = useSearchParams()
    const decodedCategoryName = decodeURIComponent(categoryName || '')
    const [category, setCategory] = useState(null)
    const [products, setProducts] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const [activeSubcategory, setActiveSubcategory] = useState('')
    const [isSubcategoryPanelOpen, setIsSubcategoryPanelOpen] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [previewImage, setPreviewImage] = useState(null)

    useEffect(() => {
        const fetchProductPageData = async () => {
            setIsLoading(true)

            try {
                const [categoriesResponse, productsResponse] = await Promise.all([
                    axios.get(`${serverUrl}/api/categories/fetch-category`),
                    axios.get(`${serverUrl}/api/products/fetch-products`),
                ])

                const categories = Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []
                const matchedCategory = categories.find(
                    (item) => item.name?.toLowerCase() === decodedCategoryName.toLowerCase()
                )

                setCategory(matchedCategory || null)
                    setProducts(Array.isArray(productsResponse.data) ? productsResponse.data : [])
                    setSearchTerm(searchParams.get('search') || '')

                if (matchedCategory?.hasSubcategories) {
                    const { data } = await axios.get(
                        `${serverUrl}/api/subcategories/fetch-subcategories?category=${encodeURIComponent(matchedCategory.name)}`
                    )
                    setSubcategories(Array.isArray(data) ? data : [])
                    const subcategoryFromSearch = searchParams.get('subcategory') || ''
                    setActiveSubcategory(subcategoryFromSearch)
                    setIsSubcategoryPanelOpen(!subcategoryFromSearch)
                } else {
                    setSubcategories([])
                    setActiveSubcategory('')
                    setIsSubcategoryPanelOpen(true)
                }
            } catch (error) {
                console.error('Error loading product page:', error)
                setCategory(null)
                setProducts([])
                setSubcategories([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchProductPageData()
    }, [decodedCategoryName, searchParams])

    const scopedProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory = product.category?.toLowerCase() === decodedCategoryName.toLowerCase()
            const matchesSubcategory = category?.hasSubcategories
                ? activeSubcategory && product.subcategory === activeSubcategory
                : true

            return matchesCategory && matchesSubcategory
        })
    }, [activeSubcategory, category?.hasSubcategories, decodedCategoryName, products])

    const visibleProducts = useMemo(() => {
        const query = searchTerm.trim().toLowerCase()

        if (!query) return scopedProducts

        return scopedProducts.filter((product) =>
            [product.name, product.cas].filter(Boolean).some((value) => value.toLowerCase().includes(query))
        )
    }, [scopedProducts, searchTerm])

    const getProductImageUrl = (product) => {
        if (!product?.image?.name) return ''

        return `${serverUrl}/productImages/${product.image.name}`
    }

    const getSubcategoryImageUrl = (subcategory) => {
        if (!subcategory?.image?.name) return ''

        return `${serverUrl}/subcategoryImages/${subcategory.image.name}`
    }

    const orderedSubcategories = useMemo(() => {
        if (!activeSubcategory || isSubcategoryPanelOpen) return subcategories

        const selectedSubcategory = subcategories.find((subcategory) => subcategory.name === activeSubcategory)
        const remainingSubcategories = subcategories.filter((subcategory) => subcategory.name !== activeSubcategory)

        return selectedSubcategory ? [selectedSubcategory, ...remainingSubcategories] : subcategories
    }, [activeSubcategory, isSubcategoryPanelOpen, subcategories])

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />
            <main className="w-full px-4 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />

                    <div className="flex-1 px-2 md:px-8">
                        {isLoading ? (
                            <div className="space-y-5">
                                <div className="h-10 w-72 animate-pulse bg-slate-100" />
                                <div className="h-16 max-w-4xl animate-pulse bg-slate-100" />
                                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div key={item} className="h-[255px] animate-pulse rounded-[26px] bg-slate-100" />
                                    ))}
                                </div>
                            </div>
                        ) : category ? (
                            <>
                                <div className="mb-3 flex items-center gap-2 text-[14px] text-gray-500">
                                    <NavLink to="/products/chemical">Chemicals</NavLink>
                                    <span>&gt;</span>

                                    <span className="font-semibold text-[#214f86]">
                                        {category.name}
                                    </span>
                                </div>
                                <h1 className="text-[34px] font-bold leading-tight text-[#1e487d] md:text-[40px]">
                                    {category.name}
                                </h1>
                                <p className="mt-4 max-w-5xl text-[17px] leading-6 text-black">
                                    {category.description}
                                </p>

                                {category.hasSubcategories ? (
                                    <div className="mt-5 max-w-[1040px]">
                                        <div
                                            className={`grid grid-cols-1 gap-2.5 overflow-hidden transition-all duration-500 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 ${
                                                activeSubcategory && !isSubcategoryPanelOpen
                                                    ? 'max-h-[95px]'
                                                    : 'max-h-[900px]'
                                            }`}
                                        >
                                            {orderedSubcategories.map((subcategory) => {
                                                const imageUrl = getSubcategoryImageUrl(subcategory)
                                                const isActive = activeSubcategory === subcategory.name
                                                const shouldFade = activeSubcategory && !isSubcategoryPanelOpen && !isActive
                                                const shouldDim = activeSubcategory && isSubcategoryPanelOpen && !isActive

                                                return (
                                                    <button
                                                        key={subcategory._id || subcategory.name}
                                                        type="button"
                                                        onClick={() => {
                                                            setActiveSubcategory(subcategory.name)
                                                            setSearchTerm('')
                                                            setIsSubcategoryPanelOpen(false)
                                                        }}
                                                        className={`group relative flex h-[74px] items-center overflow-hidden rounded-[8px] border-2 bg-white px-3 text-left transition duration-300 cursor-pointer ${
                                                            isActive
                                                                ? 'border-[#214f86] shadow-[0_8px_20px_rgba(33,79,134,0.18)]'
                                                                : 'border-[#5790aa] hover:border-[#214f86] hover:shadow-[0_8px_18px_rgba(33,79,134,0.12)]'
                                                        } ${
                                                            shouldFade
                                                                ? 'pointer-events-none scale-95 opacity-0'
                                                                : shouldDim
                                                                    ? 'scale-100 opacity-55'
                                                                    : isActive
                                                                        ? 'opacity-100'
                                                                        : 'scale-100 opacity-100'
                                                        }`}
                                                        aria-pressed={isActive}
                                                    >
                                                        <span className="mr-3 flex h-[50px] w-[58px] shrink-0 items-center justify-center overflow-hidden bg-white">
                                                            {imageUrl ? (
                                                                <img
                                                                    src={imageUrl}
                                                                    alt=""
                                                                    aria-hidden="true"
                                                                    className="h-full w-full object-contain"
                                                                />
                                                            ) : (
                                                                <span className="h-9 w-9 rounded-full border-2 border-[#5790aa]" />
                                                            )}
                                                        </span>
                                                        <span className="min-w-0 flex-1 text-right text-[14px] font-bold uppercase leading-[17px] text-[#244f80]">
                                                            {subcategory.name}
                                                        </span>
                                                    </button>
                                                )
                                            })}
                                        </div>

                                        {activeSubcategory ? (
                                            <div className="mt-3 flex justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsSubcategoryPanelOpen((open) => !open)}
                                                    className="inline-flex h-9 items-center gap-2 rounded-full border border-[#5790aa] bg-white px-4 text-[13px] font-semibold text-[#214f86] shadow-sm transition hover:bg-[#eef5f9] cursor-pointer"
                                                    aria-expanded={isSubcategoryPanelOpen}
                                                >
                                                    {isSubcategoryPanelOpen ? 'Hide Fine Chemcials Portfolio' : 'Expand Fine Chemcials Portfolio'}
                                                    <FiChevronDown
                                                        className={`text-[17px] transition-transform duration-300 ${
                                                            isSubcategoryPanelOpen ? 'rotate-180' : ''
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                ) : null}

                                {category.hasSubcategories && !activeSubcategory ? (
                                    <p className="mt-8 text-[15px] text-black/70">
                                        Select a subcategory to view products.
                                    </p>
                                ) : (
                                    <div className="mt-5 w-full max-w-[1040px] overflow-x-auto">
                                        <div className="min-w-[560px] md:min-w-[760px]">
                                            <div className="grid grid-cols-[90px_minmax(190px,1fr)_180px] items-center gap-3 bg-[#244f80] px-4 py-4 text-[13px] font-bold text-white md:grid-cols-[120px_minmax(320px,1fr)_390px] md:gap-6 md:px-11 md:py-5 md:text-[15px]">
                                                <span className="pl-2 md:pl-5">CAS No.</span>
                                                <span>Product</span>
                                                <div className="flex items-center rounded-[7px] bg-white px-3 py-2 text-slate-900 shadow-sm">
                                                    <FiSearch className="mr-2 shrink-0 text-[18px] text-[#0f568f]" />
                                                    <input
                                                        type="text"
                                                        value={searchTerm}
                                                        onChange={(event) => setSearchTerm(event.target.value)}
                                                        className="w-full text-[14px] outline-none placeholder:text-slate-400"
                                                        placeholder="Search CAS or name"
                                                    />
                                                </div>
                                            </div>

                                            {visibleProducts.length ? (
                                                visibleProducts.map((product) => {
                                                    const imageUrl = getProductImageUrl(product)

                                                    return (
                                                        <article
                                                            key={product._id || `${product.name}-${product.cas}`}
                                                            className="grid min-h-[84px] grid-cols-[90px_minmax(190px,1fr)_180px] items-center gap-3 border-b border-dotted border-[#5790aa] px-4 py-3 text-black md:grid-cols-[120px_minmax(320px,1fr)_260px] md:gap-6 md:px-11 md:py-4"
                                                        >
                                                            <div className="text-center text-[13px] leading-5 md:text-[16px] md:leading-6">
                                                                {product.cas}
                                                            </div>
                                                            <div className="text-[14px] leading-5 md:text-[16px] md:leading-6">
                                                                {product.name}
                                                            </div>
                                                            <div className="flex h-[105px] items-center justify-center overflow-hidden md:h-[120px]">
                                                                {imageUrl ? (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setPreviewImage({ src: imageUrl, alt: product.name })}
                                                                        className="group relative flex h-full w-full cursor-pointer items-center justify-center"
                                                                        aria-label={`Open ${product.name} image`}
                                                                    >
                                                                        <img
                                                                            src={imageUrl}
                                                                            alt={product.name}
                                                                            className="block h-full w-[calc(100%-1.5rem)] object-fill"
                                                                        />
                                                                        <span className="pointer-events-none absolute bottom-1 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#244f80] text-white opacity-0 shadow-md transition group-hover:opacity-100">
                                                                            <FiMaximize2 className="text-[15px]" />
                                                                        </span>
                                                                    </button>
                                                                ) : null}
                                                            </div>
                                                        </article>
                                                    )
                                                })
                                            ) : (
                                                <p className="px-11 py-6 text-[15px] text-black/70">
                                                    No products found.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div>
                                <h1 className="text-[34px] font-bold text-[#1e487d]">Category not found</h1>
                                <p className="mt-3 text-[15px] text-black/70">
                                    The selected category is not available.
                                </p>
                            </div>
                        )}

                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
            {previewImage ? (
                <div
                    className="fixed inset-0 z-999 flex items-center justify-center bg-black/75 px-4 py-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Product image preview"
                    onClick={() => setPreviewImage(null)}
                >
                    <div
                        className="relative flex max-h-full w-full max-w-5xl items-center justify-center"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setPreviewImage(null)}
                            className="absolute right-0 top-0 z-10 flex h-10 w-10 -translate-y-12 items-center justify-center rounded-full bg-white text-[22px] text-[#1e487d] shadow-md transition hover:bg-slate-100 cursor-pointer"
                            aria-label="Close image preview"
                        >
                            <FiX />
                        </button>
                        <div className="flex max-h-[86vh] w-full items-center justify-center bg-white p-4">
                            <img
                                src={previewImage.src}
                                alt={previewImage.alt}
                                className="max-h-[calc(86vh-2rem)] w-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Product
