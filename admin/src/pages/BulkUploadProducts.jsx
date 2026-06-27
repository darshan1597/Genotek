import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiCheck, FiFileText, FiRefreshCw, FiTrash2, FiUpload } from 'react-icons/fi'
import { serverUrl } from '../App'
import Navabar from './components/Navabar'
import Toast from './components/Toast'

function BulkUploadProducts() {
    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedSubcategory, setSelectedSubcategory] = useState('')
    const [documentFile, setDocumentFile] = useState(null)
    const [previewToken, setPreviewToken] = useState('')
    const [products, setProducts] = useState([])
    const [result, setResult] = useState(null)
    const [isLoadingCategories, setIsLoadingCategories] = useState(true)
    const [isParsing, setIsParsing] = useState(false)
    const [isImporting, setIsImporting] = useState(false)
    const [toast, setToast] = useState(null)

    const selectedCategoryData = useMemo(
        () => categories.find((category) => category.name === selectedCategory),
        [categories, selectedCategory]
    )
    const includedProducts = products.filter((product) => product.included)

    useEffect(() => {
        axios.get(`${serverUrl}/api/categories/fetch-category`, { withCredentials: true })
            .then(({ data }) => {
                setCategories(Array.isArray(data) ? data.filter((category) => !category.isStandalone) : [])
            })
            .catch((error) => {
                setToast({ type: 'error', message: error.response?.data?.message || 'Unable to load categories.' })
            })
            .finally(() => setIsLoadingCategories(false))
    }, [])

    useEffect(() => {
        setSelectedSubcategory('')
        setSubcategories([])
        setPreviewToken('')
        setProducts([])
        setResult(null)

        if (!selectedCategoryData?.hasSubcategories) return

        axios.get(
            `${serverUrl}/api/subcategories/fetch-subcategories?category=${encodeURIComponent(selectedCategory)}`,
            { withCredentials: true }
        )
            .then(({ data }) => setSubcategories(Array.isArray(data) ? data : []))
            .catch((error) => {
                setToast({ type: 'error', message: error.response?.data?.message || 'Unable to load subcategories.' })
            })
    }, [selectedCategory, selectedCategoryData?.hasSubcategories])

    const resetImport = () => {
        setDocumentFile(null)
        setPreviewToken('')
        setProducts([])
        setResult(null)
        setToast(null)
    }

    const handleDocumentChange = (event) => {
        const file = event.target.files?.[0] || null
        if (file && !file.name.toLowerCase().endsWith('.docx')) {
            setToast({ type: 'error', message: 'Select a .docx Word document.' })
            event.target.value = ''
            setDocumentFile(null)
            return
        }

        setDocumentFile(file)
        setPreviewToken('')
        setProducts([])
        setResult(null)
    }

    const parseDocument = async (event) => {
        event.preventDefault()

        if (!selectedCategory) {
            setToast({ type: 'error', message: 'Select a category.' })
            return
        }
        if (selectedCategoryData?.hasSubcategories && !selectedSubcategory) {
            setToast({ type: 'error', message: 'Select a subcategory.' })
            return
        }
        if (!documentFile) {
            setToast({ type: 'error', message: 'Upload a DOCX document.' })
            return
        }

        setIsParsing(true)
        setToast(null)

        try {
            const formData = new FormData()
            formData.append('category', selectedCategory)
            formData.append('subcategory', selectedCategoryData?.hasSubcategories ? selectedSubcategory : '')
            formData.append('document', documentFile)

            const { data } = await axios.post(`${serverUrl}/api/products/bulk-preview`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            setPreviewToken(data.token)
            setProducts((data.products || []).map((product) => ({ ...product, included: true })))
            setResult(null)
            setToast({ type: 'success', message: data.message })
        } catch (error) {
            setToast({
                type: 'error',
                message: error.response?.data?.message || 'Unable to parse the DOCX document.',
            })
        } finally {
            setIsParsing(false)
        }
    }

    const updateProduct = (sourceIndex, updates) => {
        setProducts((current) => current.map((product) =>
            product.sourceIndex === sourceIndex ? { ...product, ...updates, errors: [] } : product
        ))
    }

    const confirmImport = async () => {
        if (!includedProducts.length) {
            setToast({ type: 'error', message: 'Keep at least one product for import.' })
            return
        }

        setIsImporting(true)
        setToast(null)

        try {
            const { data } = await axios.post(
                `${serverUrl}/api/products/bulk-confirm`,
                {
                    token: previewToken,
                    category: selectedCategory,
                    subcategory: selectedCategoryData?.hasSubcategories ? selectedSubcategory : '',
                    products: includedProducts.map(({ sourceIndex, name, cas }) => ({ sourceIndex, name, cas })),
                },
                { withCredentials: true }
            )

            setResult({
                imported: data.imported || [],
                skipped: data.skipped || [],
                failed: data.failed || [],
            })
            setPreviewToken('')
            setProducts([])
            setDocumentFile(null)
            setToast({ type: 'success', message: data.message })
        } catch (error) {
            setToast({ type: 'error', message: error.response?.data?.message || 'Unable to import products.' })
        } finally {
            setIsImporting(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#f8fbfd]">
            <Navabar />
            {toast ? <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null}

            <main className="px-4 pb-12 md:px-6 lg:px-10">
                <section className="mx-auto max-w-7xl py-8 lg:py-10">
                    <header className="flex flex-col gap-5 border-b border-[#d8e6ef] pb-7 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6a9ab1]">
                                Product Catalog
                            </p>
                            <h1 className="text-[32px] font-semibold leading-tight text-[#214f86] sm:text-[42px]">
                                Bulk Upload Products
                            </h1>
                        </div>
                        <Link
                            to="/admin-panel"
                            className="inline-flex h-11 items-center justify-center gap-2 border border-[#d7e5ee] bg-white px-4 text-[14px] font-semibold text-[#214f86] hover:bg-[#eef5f9]"
                        >
                            <FiArrowLeft /> Dashboard
                        </Link>
                    </header>

                    <form onSubmit={parseDocument} className="mt-7 grid gap-5 border border-[#d7e5ee] bg-white p-5 shadow-[0_18px_45px_rgba(33,79,134,0.1)] sm:p-7 md:grid-cols-3">
                        <label className="block">
                            <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">Category</span>
                            <select
                                value={selectedCategory}
                                onChange={(event) => setSelectedCategory(event.target.value)}
                                disabled={isLoadingCategories || isParsing || isImporting}
                                className="h-12 w-full border-2 border-[#d6e4ed] bg-[#f8fbfd] px-3 text-[15px] text-[#23384d] outline-none focus:border-[#214f86]"
                            >
                                <option value="">{isLoadingCategories ? 'Loading categories...' : 'Select category'}</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">Subcategory</span>
                            <select
                                value={selectedSubcategory}
                                onChange={(event) => {
                                    setSelectedSubcategory(event.target.value)
                                    setPreviewToken('')
                                    setProducts([])
                                    setResult(null)
                                }}
                                disabled={!selectedCategoryData?.hasSubcategories || isParsing || isImporting}
                                className="h-12 w-full border-2 border-[#d6e4ed] bg-[#f8fbfd] px-3 text-[15px] text-[#23384d] outline-none focus:border-[#214f86] disabled:text-[#98aab8]"
                            >
                                <option value="">
                                    {selectedCategoryData?.hasSubcategories ? 'Select subcategory' : 'Not required'}
                                </option>
                                {subcategories.map((subcategory) => (
                                    <option key={subcategory._id} value={subcategory.name}>{subcategory.name}</option>
                                ))}
                            </select>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">Word document</span>
                            <span className="flex h-12 items-center border-2 border-[#d6e4ed] bg-[#f8fbfd] px-3">
                                <FiFileText className="mr-2 shrink-0 text-[#6a9ab1]" />
                                <input
                                    type="file"
                                    accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    onChange={handleDocumentChange}
                                    disabled={isParsing || isImporting}
                                    className="min-w-0 text-[13px] text-[#526b80]"
                                />
                            </span>
                        </label>

                        <div className="flex flex-wrap gap-3 md:col-span-3">
                            <button
                                type="submit"
                                disabled={isParsing || isImporting}
                                className="inline-flex h-11 cursor-pointer items-center gap-2 bg-[#214f86] px-5 text-[14px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <FiUpload /> {isParsing ? 'Reading document...' : 'Preview products'}
                            </button>
                            <button
                                type="button"
                                onClick={resetImport}
                                disabled={isParsing || isImporting}
                                className="inline-flex h-11 cursor-pointer items-center gap-2 border border-[#d7e5ee] bg-white px-5 text-[14px] font-semibold text-[#214f86]"
                            >
                                <FiRefreshCw /> Reset
                            </button>
                        </div>
                    </form>

                    {previewToken ? (
                        <section className="mt-8">
                            <div className="flex flex-col gap-4 border-b border-[#d8e6ef] pb-5 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <h2 className="text-[25px] font-semibold text-[#214f86]">Review detected products</h2>
                                    <p className="mt-1 text-[14px] text-[#526b80]">
                                        {includedProducts.length} of {products.length} products selected
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={confirmImport}
                                    disabled={isImporting || !includedProducts.length}
                                    className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 bg-[#0f6b35] px-5 text-[14px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <FiCheck /> {isImporting ? 'Importing...' : `Import ${includedProducts.length} products`}
                                </button>
                            </div>

                            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {products.map((product) => (
                                    <article
                                        key={product.sourceIndex}
                                        className={`border bg-white p-4 shadow-[0_10px_24px_rgba(33,79,134,0.07)] ${
                                            product.included ? 'border-[#d7e5ee]' : 'border-red-200 opacity-60'
                                        }`}
                                    >
                                        <div className="flex gap-4">
                                            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden border border-[#d7e5ee] bg-white">
                                                {product.imageUrl ? (
                                                    <img
                                                        src={`${serverUrl}${product.imageUrl}`}
                                                        alt=""
                                                        className="h-full w-full object-contain"
                                                    />
                                                ) : (
                                                    <FiFileText className="text-[28px] text-[#98aab8]" />
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <label className="block">
                                                    <span className="mb-1 block text-[12px] font-semibold text-[#526b80]">Product name</span>
                                                    <textarea
                                                        value={product.name}
                                                        onChange={(event) => updateProduct(product.sourceIndex, { name: event.target.value })}
                                                        disabled={!product.included}
                                                        rows="3"
                                                        className="w-full resize-none border border-[#bdd4e2] px-2 py-2 text-[13px] leading-5 text-[#23384d] outline-none focus:border-[#214f86]"
                                                    />
                                                </label>
                                                <label className="mt-2 block">
                                                    <span className="mb-1 block text-[12px] font-semibold text-[#526b80]">CAS number</span>
                                                    <input
                                                        value={product.cas}
                                                        onChange={(event) => updateProduct(product.sourceIndex, { cas: event.target.value })}
                                                        disabled={!product.included}
                                                        className="h-10 w-full border border-[#bdd4e2] px-2 text-[13px] text-[#23384d] outline-none focus:border-[#214f86]"
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        {product.errors?.length ? (
                                            <p className="mt-3 text-[12px] font-semibold text-red-600">
                                                {product.errors.join(', ')}
                                            </p>
                                        ) : null}

                                        <button
                                            type="button"
                                            onClick={() => updateProduct(product.sourceIndex, { included: !product.included })}
                                            className={`mt-4 inline-flex h-9 cursor-pointer items-center gap-2 px-3 text-[13px] font-semibold ${
                                                product.included ? 'bg-red-50 text-red-600' : 'bg-[#eef5f9] text-[#214f86]'
                                            }`}
                                        >
                                            {product.included ? <><FiTrash2 /> Remove</> : <><FiCheck /> Restore</>}
                                        </button>
                                    </article>
                                ))}
                            </div>
                        </section>
                    ) : null}

                    {result ? (
                        <section className="mt-8 border border-[#d7e5ee] bg-white p-5 sm:p-7">
                            <h2 className="text-[25px] font-semibold text-[#214f86]">Import result</h2>
                            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                                {[
                                    ['Imported', result.imported, 'text-[#0f6b35]'],
                                    ['Skipped duplicates', result.skipped, 'text-[#9a6700]'],
                                    ['Failed', result.failed, 'text-red-600'],
                                ].map(([label, items, color]) => (
                                    <div key={label} className="border border-[#d7e5ee] p-4">
                                        <p className={`text-[18px] font-semibold ${color}`}>{label}: {items.length}</p>
                                        <div className="mt-3 space-y-2 text-[13px] text-[#526b80]">
                                            {items.map((item, index) => (
                                                <p key={`${item.cas}-${index}`}>
                                                    {item.name || 'Unnamed product'} ({item.cas || 'No CAS'})
                                                    {item.reason ? ` - ${item.reason}` : ''}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ) : null}
                </section>
            </main>
        </div>
    )
}

export default BulkUploadProducts
