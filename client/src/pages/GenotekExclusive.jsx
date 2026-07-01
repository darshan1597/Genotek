import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { FiFileText, FiMaximize2, FiX } from 'react-icons/fi'
import { Link, useSearchParams } from 'react-router-dom'
import Navabar from './components/Navabar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import GatedPdfModal from './components/GatedPdfModal'
import centerLogoUrl from '../assets/genotek 2.gif'
import circleImageUrl from '../assets/genotek 1.gif'


const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000'

function GenotekExclusive() {
    const [searchParams] = useSearchParams()
    const [category, setCategory] = useState(null)
    const [products, setProducts] = useState([])
    const [previewImage, setPreviewImage] = useState(null)
    const [pdfDocument, setPdfDocument] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchExclusiveProducts = async () => {
            try {
                const [categoriesResponse, productsResponse] = await Promise.all([
                    axios.get(`${serverUrl}/api/categories/fetch-category`),
                    axios.get(`${serverUrl}/api/products/fetch-products`),
                ])

                const categories = Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []
                const standaloneCategory = categories.find((item) => item.isStandalone)
                const allProducts = Array.isArray(productsResponse.data) ? productsResponse.data : []

                setCategory(standaloneCategory || null)
                setProducts(
                    standaloneCategory
                        ? allProducts.filter((product) => product.category === standaloneCategory.name)
                        : []
                )
            } catch (error) {
                console.error('Error loading Genotek Exclusive page:', error)
                setCategory(null)
                setProducts([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchExclusiveProducts()
    }, [])

    const getProductImageUrl = (product) =>
        product?.image?.name ? `${serverUrl}/productImages/${product.image.name}` : ''

    const getCategoryImageUrl = () =>
        category?.image?.name ? `${serverUrl}/categoryImages/${category.image.name}` : ''

    const selectedProductId = searchParams.get('product') || ''
    const orderedProducts = useMemo(() => {
        if (!selectedProductId) return products

        const selectedProduct = products.find((product) => product._id === selectedProductId)

        return selectedProduct ? [selectedProduct] : products
    }, [products, selectedProductId])

    const selectedProduct = selectedProductId
        ? products.find((product) => product._id === selectedProductId)
        : null

    useEffect(() => {
        if (!selectedProductId || !products.length) return

        window.requestAnimationFrame(() => {
            document.getElementById(`exclusive-product-${selectedProductId}`)?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        })
    }, [products, selectedProductId])

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />

            <main className="w-full px-4 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />

                    <div className="min-w-0 flex-1 px-1 md:px-8">
                        <header className="border-b border-[#d7e5ee] pb-7">
                            {getCategoryImageUrl() ? (
                                // <img
                                //     src={getCategoryImageUrl()}
                                //     alt={category.name}
                                //     className="h-[218px] w-[218px] object-contain sm:h-[260px] sm:w-[260px]"
                                // />
                                <>
                                    <div className="relative flex h-[220px] w-[220px] items-center justify-center">
                                        {/* Rotating outer ring */}
                                        <img
                                            src={centerLogoUrl}
                                            alt="Genotek Exclusive Ring"
                                            className="absolute inset-0 h-full w-full animate-[spin_20s_linear_infinite] object-contain"
                                        />

                                        {/* Fixed center logo */}
                                        <img
                                            src={circleImageUrl}
                                            alt={category.name}
                                            className="relative z-10 h-[105px] w-[105px] object-contain"
                                        />
                                    </div>
                                    
                                </>
                            ) : null}
                            {category?.name && selectedProduct ? (
                                <nav className="mt-4 flex flex-wrap items-center gap-2 text-[14px] text-[#526b80]" aria-label="Breadcrumb">
                                    <Link
                                        to="/genotek-exclusive"
                                        className="font-semibold text-[#214f86] transition hover:text-[#5790aa]"
                                    >
                                        {category.name}
                                    </Link>
                                    <span aria-hidden="true">&gt;</span>
                                    <span>{selectedProduct.name}</span>
                                </nav>
                            ) : null}
                            {category?.name ? (
                                <h1 className="mt-2 text-[34px] font-bold leading-tight text-[#1e487d] md:text-[42px]">
                                    {category.name}
                                </h1>
                            ) : null}
                            {category?.description ? (
                                <p className="mt-4 max-w-5xl text-[19px] leading-7 text-black/80">
                                    {category.description}
                                </p>
                            ) : null}
                        </header>

                        {isLoading ? (
                            <div className="mt-4 grid gap-x-6 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="h-[330px] animate-pulse rounded-[28px] bg-slate-100" />
                                ))}
                            </div>
                        ) : products.length ? (
                            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                                {orderedProducts.map((product) => {
                                    const imageUrl = getProductImageUrl(product)
                                    const isSelected = product._id === selectedProductId

                                    return (
                                        <article
                                            key={product._id || `${product.name}-${product.cas}`}
                                            id={product._id ? `exclusive-product-${product._id}` : undefined}
                                            className={`overflow-hidden rounded-[28px] border-2 bg-white transition ${
                                                isSelected
                                                    ? 'scale-[1.02] border-[#214f86] shadow-[0_10px_28px_rgba(33,79,134,0.28)]'
                                                    : 'border-[#5790aa]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between gap-2 bg-[#5790aa] px-2 py-2 text-[12px] font-bold text-white sm:px-5 sm:py-4 sm:text-[17px]">
                                                <span className="min-w-0 truncate text-left">CAS No: {product.cas}</span>
                                                {product.pdf?.name ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setPdfDocument({
                                                                title: product.name,
                                                                url: `${serverUrl}/productPdfs/${product.pdf.name}`,
                                                                productId: product._id,
                                                                context: product.cas,
                                                            })
                                                        }}
                                                        className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-[#214f86] transition hover:bg-[#eef5f9]"
                                                        aria-label={`Open ${product.name} PDF`}
                                                        title="Open PDF"
                                                    >
                                                        <FiFileText className="text-[17px]" />
                                                    </button>
                                                ) : null}
                                            </div>

                                            <p className="whitespace-pre-line px-2 py-2 text-center font-bold text-[13px] leading-4 text-[#526b80] sm:px-4 sm:py-3 sm:text-[16px] sm:leading-5">
                                                {product.description || 'Description not available.'}
                                            </p>

                                            <div className="flex h-[120px] sm:h-[150px] items-center justify-center overflow-hidden bg-white">
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
                                                            className="block h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] object-fill"
                                                        />
                                                        <span className="pointer-events-none absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#244f80] text-white opacity-0 shadow-md transition group-hover:opacity-100">
                                                            <FiMaximize2 className="text-[16px]" />
                                                        </span>
                                                    </button>
                                                ) : (
                                                    <span className="text-[14px] text-[#5790aa]">No image</span>
                                                )}
                                            </div>

                                            <div className="flex min-h-[48px] items-center justify-center px-2 pb-2 text-center font-semibold text-[13px] leading-4 text-[#3c82b0] sm:min-h-[58px] sm:px-4 sm:text-[17px] sm:leading-6">    
                                                <span>{product.name}</span>
                                            </div>
                                        </article>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="mt-8 border border-[#d7e5ee] bg-[#f8fbfd] px-5 py-10 text-center text-[15px] text-[#526b80]">
                                {category ? 'No matching exclusive products found.' : 'No Genotek Exclusive category has been configured.'}
                            </div>
                        )}

                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>

            {previewImage ? (
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 px-4 py-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Product image preview"
                    onClick={() => setPreviewImage(null)}
                >
                    <div
                        className="relative flex max-h-full max-w-[94vw] items-center justify-center"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setPreviewImage(null)}
                            className="absolute right-0 top-0 z-10 flex h-10 w-10 -translate-y-12 cursor-pointer items-center justify-center rounded-full bg-white text-[22px] text-[#1e487d] shadow-md"
                            aria-label="Close image preview"
                        >
                            <FiX />
                        </button>
                        <div className="inline-flex max-h-[86vh] max-w-[94vw] items-center justify-center rounded-[28px] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.3)] p-[6px]">
                            <div className="overflow-hidden rounded-[28px] border-2 border-[#5790aa] p-6">
                                <img
                                    src={previewImage.src}
                                    alt={previewImage.alt}
                                    className="block h-auto max-h-[calc(86vh-2rem)] w-auto max-w-[calc(94vw-2rem)] object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            <GatedPdfModal document={pdfDocument} onClose={() => setPdfDocument(null)} />
        </div>
    )
}

export default GenotekExclusive
