import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    FiArrowLeft,
    FiChevronDown,
    FiCheckCircle,
    FiFileText,
    FiHash,
    FiImage,
    FiPackage,
    FiRefreshCw,
    FiTag,
    FiUpload,
} from 'react-icons/fi'
import axios from 'axios'
import Navabar from './components/Navabar'
import Toast from './components/Toast'
import { serverUrl } from '../App'

function AddProduct() {
    const categoryDropdownRef = useRef(null)
    const subcategoryDropdownRef = useRef(null)
    const productImageInputRef = useRef(null)
    const [productName, setProductName] = useState('')
    const [casNumber, setCasNumber] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const [selectedSubcategory, setSelectedSubcategory] = useState('')
    const [isLoadingCategories, setIsLoadingCategories] = useState(true)
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
    const [isSubcategoryDropdownOpen, setIsSubcategoryDropdownOpen] = useState(false)
    const [productImage, setProductImage] = useState(null)
    const [imagePreview, setImagePreview] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toast, setToast] = useState(null)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`${serverUrl}/api/categories/fetch-category`, {
                    withCredentials: true,
                })

                setCategories(Array.isArray(data) ? data : [])
            } catch (error) {
                setToast({
                    message: error?.response?.data?.message || 'Unable to load categories.',
                    type: 'error',
                })
            } finally {
                setIsLoadingCategories(false)
            }
        }

        fetchCategories()
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
                setIsCategoryDropdownOpen(false)
            }
            if (subcategoryDropdownRef.current && !subcategoryDropdownRef.current.contains(event.target)) {
                setIsSubcategoryDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const selectedCategoryData = categories.find((category) => category.name === selectedCategory)

    useEffect(() => {
        const fetchSubcategories = async () => {
            if (!selectedCategoryData?.hasSubcategories) {
                setSubcategories([])
                setSelectedSubcategory('')
                return
            }

            try {
                const { data } = await axios.get(
                    `${serverUrl}/api/subcategories/fetch-subcategories?category=${encodeURIComponent(selectedCategory)}`,
                    { withCredentials: true }
                )

                setSubcategories(Array.isArray(data) ? data : [])
            } catch (error) {
                setToast({
                    message: error?.response?.data?.message || 'Unable to load subcategories.',
                    type: 'error',
                })
            }
        }

        fetchSubcategories()
    }, [selectedCategory, selectedCategoryData?.hasSubcategories])

    useEffect(() => {
        if (!productImage) {
            setImagePreview('')
            return undefined
        }

        const previewUrl = URL.createObjectURL(productImage)
        setImagePreview(previewUrl)

        return () => URL.revokeObjectURL(previewUrl)
    }, [productImage])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsSubmitting(true)
        const name = productName.trim()
        const cas = casNumber.trim()

        if (!name) {
            setToast({ message: 'Enter product name.', type: 'error' })
            setIsSubmitting(false)
            return
        }

        if (!cas) {
            setToast({ message: 'Enter CAS number.', type: 'error' })
            setIsSubmitting(false)
            return
        }

        if (!selectedCategory) {
            setToast({ message: 'Select a category.', type: 'error' })
            setIsSubmitting(false)
            return
        }

        if (selectedCategoryData?.hasSubcategories && !selectedSubcategory) {
            setToast({ message: 'Select a subcategory.', type: 'error' })
            setIsSubmitting(false)
            return
        }

        if (selectedCategoryData?.isStandalone && !productDescription.trim()) {
            setToast({ message: 'Enter product description.', type: 'error' })
            setIsSubmitting(false)
            return
        }

        if (!productImage) {
            setToast({ message: 'Upload product image.', type: 'error' })
            setIsSubmitting(false)
            return
        }

        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('cas', cas)
            formData.append('category', selectedCategory)
            formData.append('subcategory', selectedCategoryData?.hasSubcategories ? selectedSubcategory : '')
            formData.append('description', selectedCategoryData?.isStandalone ? productDescription.trim() : '')
            formData.append('image', productImage)

            await axios.post(`${serverUrl}/api/products/add-product`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            })

            setToast({ message: "Product added successfully!", type: "success" });
            setProductName('')
            setCasNumber('')
            setSelectedCategory('')
            setSelectedSubcategory('')
            setProductDescription('')
            setProductImage(null)
        } catch (error) {
            setToast({
                message: error?.response?.data?.message || "Failed to add product. Please try again.",
                type: "error",
            });
        } finally{
            setIsSubmitting(false)
        }
    }

    const handleReset = () => {
        setProductName('')
        setCasNumber('')
        setSelectedCategory('')
        setSelectedSubcategory('')
        setProductDescription('')
        setProductImage(null)
        setToast(null)
        setIsCategoryDropdownOpen(false)
        setIsSubcategoryDropdownOpen(false)

        if (productImageInputRef.current) {
            productImageInputRef.current.value = ''
        }
    }

    const handleProductImageChange = (event) => {
        const file = event.target.files?.[0]

        if (!file) {
            setProductImage(null)
            return
        }

        if (!file.type.startsWith('image/')) {
            setToast({ message: 'Please upload a valid image file.', type: 'error' })
            event.target.value = ''
            setProductImage(null)
            return
        }

        setProductImage(file)
    }

    return (
        <div className="min-h-screen bg-[#f8fbfd]">
            <Navabar />
            <main className="px-4 pb-12 md:px-6 lg:px-10">
                <section className="mx-auto max-w-6xl py-8 lg:py-10">
                    <div className="mb-8 flex flex-col gap-5 border-b border-[#d8e6ef] pb-7 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6a9ab1]">
                                Product Catalog
                            </p>
                            <h1 className="text-[32px] font-semibold leading-tight text-[#214f86] sm:text-[42px]">
                                Add Product
                            </h1>
                        </div>

                        <Link
                            to="/admin-panel"
                            className="inline-flex h-11 items-center justify-center gap-2 border border-[#d7e5ee] bg-white px-4 text-[14px] font-semibold text-[#214f86] transition-colors duration-200 hover:bg-[#eef5f9]"
                        >
                            <FiArrowLeft className="text-[17px]" />
                            Dashboard
                        </Link>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                        <form
                            onSubmit={handleSubmit}
                            className="border border-[#d7e5ee] bg-white p-6 shadow-[0_18px_45px_rgba(33,79,134,0.13)] sm:p-8"
                        >
                            <div className="mb-7">
                                <h2 className="text-[24px] font-semibold text-[#214f86]">Product Details</h2>
                            </div>

                            <label className="mb-5 block">
                                <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                    Product Name
                                </span>
                                <span className="flex h-13 items-center border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 transition-colors duration-200 focus-within:border-[#214f86]">
                                    <FiPackage className="mr-3 shrink-0 text-[20px] text-[#6a9ab1]" />
                                    <input
                                        type="text"
                                        name="productName"
                                        value={productName}
                                        onChange={(event) => setProductName(event.target.value)}
                                        className="w-full bg-transparent text-[15px] text-[#23384d] outline-none placeholder:text-[#98aab8]"
                                        placeholder="Example: Tetrabutylammonium Tetrafluoroborate"
                                    />
                                </span>
                            </label>

                            <label className="mb-5 block">
                                <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                    CAS Number
                                </span>
                                <span className="flex h-13 items-center border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 transition-colors duration-200 focus-within:border-[#214f86]">
                                    <FiHash className="mr-3 shrink-0 text-[20px] text-[#6a9ab1]" />
                                    <input
                                        type="text"
                                        name="casNumber"
                                        value={casNumber}
                                        onChange={(event) => setCasNumber(event.target.value)}
                                        className="w-full bg-transparent text-[15px] text-[#23384d] outline-none placeholder:text-[#98aab8]"
                                        placeholder="Example: 880084-63-9"
                                    />
                                </span>
                            </label>

                            <div className="mb-5 block" ref={categoryDropdownRef}>
                                <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                    Category
                                </span>
                                <div className="relative">
                                    <button
                                        type="button"
                                        disabled={isLoadingCategories}
                                        aria-haspopup="listbox"
                                        aria-expanded={isCategoryDropdownOpen}
                                        onClick={() => setIsCategoryDropdownOpen((current) => !current)}
                                        className="flex h-13 w-full items-center border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 text-left transition-colors duration-200 hover:border-[#214f86] disabled:cursor-not-allowed disabled:text-[#8aa7be]"
                                    >
                                    <FiTag className="mr-3 shrink-0 text-[20px] text-[#6a9ab1]" />
                                        <span
                                            className={`min-w-0 flex-1 truncate text-[15px] ${
                                                selectedCategory ? 'text-[#23384d]' : 'text-[#98aab8]'
                                            }`}
                                        >
                                            {isLoadingCategories
                                                ? 'Loading categories...'
                                                : selectedCategory || 'Select category'}
                                        </span>
                                        <FiChevronDown
                                            className={`ml-3 shrink-0 text-[20px] text-[#6a9ab1] transition-transform duration-200 ${
                                                isCategoryDropdownOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>

                                    <div
                                        className={`absolute left-0 right-0 top-full z-40 mt-2 max-h-64 overflow-y-auto border border-[#d7e5ee] bg-white shadow-[0_18px_45px_rgba(33,79,134,0.16)] transition-all duration-200 ${
                                            isCategoryDropdownOpen
                                                ? 'pointer-events-auto translate-y-0 opacity-100'
                                                : 'pointer-events-none -translate-y-2 opacity-0'
                                        }`}
                                        role="listbox"
                                    >
                                        {categories.length ? (
                                            categories.map((category) => (
                                                <button
                                                    key={category._id || category.name}
                                                    type="button"
                                                    role="option"
                                                    aria-selected={selectedCategory === category.name}
                                                    onClick={() => {
                                                        setSelectedCategory(category.name)
                                                        setSelectedSubcategory('')
                                                        setIsCategoryDropdownOpen(false)
                                                    }}
                                                    className={`flex w-full items-center gap-3 border-b border-[#eef3f6] px-4 py-3 text-left text-[15px] font-semibold transition-colors duration-200 last:border-b-0 cursor-pointer ${
                                                        selectedCategory === category.name
                                                            ? 'bg-[#eef5f9] text-[#214f86]'
                                                            : 'text-[#526b80] hover:bg-[#f8fbfd] hover:text-[#214f86]'
                                                    }`}
                                                >
                                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#214f86] text-white">
                                                        <FiTag className="text-[16px]" />
                                                    </span>
                                                    <span className="min-w-0 truncate">{category.name}</span>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-4 text-[14px] leading-6 text-[#526b80]">
                                                No categories available.
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {!isLoadingCategories && !categories.length ? (
                                    <span className="mt-2 block text-[13px] text-[#526b80]">
                                        No categories found. Add a category before creating products.
                                    </span>
                                ) : null}
                            </div>

                            {selectedCategoryData?.hasSubcategories ? (
                                <div className="mb-5 block" ref={subcategoryDropdownRef}>
                                    <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                        Subcategory
                                    </span>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            aria-haspopup="listbox"
                                            aria-expanded={isSubcategoryDropdownOpen}
                                            onClick={() => setIsSubcategoryDropdownOpen((current) => !current)}
                                            className="flex h-13 w-full items-center border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 text-left transition-colors duration-200 hover:border-[#214f86]"
                                        >
                                            <FiTag className="mr-3 shrink-0 text-[20px] text-[#6a9ab1]" />
                                            <span className={`min-w-0 flex-1 truncate text-[15px] ${selectedSubcategory ? 'text-[#23384d]' : 'text-[#98aab8]'}`}>
                                                {selectedSubcategory || 'Select subcategory'}
                                            </span>
                                            <FiChevronDown className={`ml-3 shrink-0 text-[20px] text-[#6a9ab1] transition-transform duration-200 ${isSubcategoryDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        <div
                                            className={`absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-y-auto border border-[#d7e5ee] bg-white shadow-[0_18px_45px_rgba(33,79,134,0.16)] transition-all duration-200 ${
                                                isSubcategoryDropdownOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
                                            }`}
                                            role="listbox"
                                        >
                                            {subcategories.length ? (
                                                subcategories.map((subcategory) => (
                                                    <button
                                                        key={subcategory._id || subcategory.name}
                                                        type="button"
                                                        role="option"
                                                        aria-selected={selectedSubcategory === subcategory.name}
                                                        onClick={() => {
                                                            setSelectedSubcategory(subcategory.name)
                                                            setIsSubcategoryDropdownOpen(false)
                                                        }}
                                                        className={`flex w-full items-center gap-3 border-b border-[#eef3f6] px-4 py-3 text-left text-[15px] font-semibold transition-colors duration-200 last:border-b-0 cursor-pointer ${
                                                            selectedSubcategory === subcategory.name
                                                                ? 'bg-[#eef5f9] text-[#214f86]'
                                                                : 'text-[#526b80] hover:bg-[#f8fbfd] hover:text-[#214f86]'
                                                        }`}
                                                    >
                                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#214f86] text-white">
                                                            <FiTag className="text-[16px]" />
                                                        </span>
                                                        <span className="min-w-0 truncate">{subcategory.name}</span>
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-4 py-4 text-[14px] leading-6 text-[#526b80]">
                                                    No subcategories found for this category.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {selectedCategoryData?.isStandalone ? (
                                <label className="mb-5 block">
                                    <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                        Product Description
                                    </span>
                                    <span className="flex min-h-[130px] items-start border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 py-4 transition-colors duration-200 focus-within:border-[#214f86]">
                                        <FiFileText className="mr-3 mt-1 shrink-0 text-[20px] text-[#6a9ab1]" />
                                        <textarea
                                            value={productDescription}
                                            onChange={(event) => setProductDescription(event.target.value)}
                                            className="min-h-[96px] w-full resize-y bg-transparent text-[15px] leading-6 text-[#23384d] outline-none placeholder:text-[#98aab8]"
                                            placeholder="Write the Genotek Exclusice product description"
                                        />
                                    </span>
                                </label>
                            ) : null}

                            <div className="mb-6 block">
                                <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                    Product Image
                                </span>
                                <button
                                    type="button"
                                    onClick={() => productImageInputRef.current?.click()}
                                    className="flex min-h-[116px] w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[#d6e4ed] bg-[#f8fbfd] px-4 py-5 text-center transition-colors duration-200 hover:border-[#214f86] hover:bg-[#eef5f9]"
                                >
                                    <FiUpload className="mb-2 text-[26px] text-[#6a9ab1]" />
                                    <span className="text-[15px] font-semibold text-[#214f86]">
                                        {productImage ? productImage.name : 'Upload product image'}
                                    </span>
                                    <span className="mt-1 text-[13px] text-[#526b80]">PNG, JPG, or WEBP</span>
                                </button>
                                <input
                                    ref={productImageInputRef}
                                    type="file"
                                    name="image"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    onChange={handleProductImageChange}
                                    className="hidden"
                                />
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex h-12 items-center justify-center gap-2 bg-[#214f86] px-5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#173d68] disabled:cursor-not-allowed disabled:bg-[#8aa7be] cursor-pointer"
                                >
                                    <FiCheckCircle className="text-[18px]" />
                                    {isSubmitting ? 'Adding...' : 'Add Product'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="inline-flex h-12 items-center justify-center gap-2 border border-[#d7e5ee] bg-white px-5 text-[15px] font-semibold text-[#214f86] transition-colors duration-200 hover:bg-[#eef5f9] cursor-pointer"
                                >
                                    <FiRefreshCw className="text-[17px]" />
                                    Reset
                                </button>
                            </div>
                        </form>

                        <aside className="border border-[#d7e5ee] bg-white p-6 shadow-[0_12px_28px_rgba(33,79,134,0.08)]">
                            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#6a9ab1]">
                                Preview
                            </p>
                            <div className="flex aspect-[4/3] items-center justify-center border border-[#d7e5ee] bg-[#f8fbfd]">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Product preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center text-[#6a9ab1]">
                                        <FiImage className="mx-auto mb-3 text-[34px]" />
                                        <p className="text-[14px] font-semibold">Image preview</p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-5 border-t border-[#d7e5ee] pt-5">
                                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6a9ab1]">
                                    Product Name
                                </p>
                                <p className="mt-2 break-words text-[20px] font-semibold text-[#214f86]">
                                    {productName.trim() || 'Product name'}
                                </p>
                                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6a9ab1]">
                                    CAS Number
                                </p>
                                <p className="mt-2 text-[15px] font-semibold text-[#526b80]">
                                    {casNumber.trim() || 'CAS number'}
                                </p>
                                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6a9ab1]">
                                    Category
                                </p>
                                <p className="mt-2 text-[15px] font-semibold text-[#526b80]">
                                    {selectedCategory || 'Category'}
                                </p>
                                {selectedCategoryData?.hasSubcategories ? (
                                    <>
                                        <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6a9ab1]">
                                            Subcategory
                                        </p>
                                        <p className="mt-2 text-[15px] font-semibold text-[#526b80]">
                                            {selectedSubcategory || 'Subcategory'}
                                        </p>
                                    </>
                                ) : null}
                                {selectedCategoryData?.isStandalone ? (
                                    <>
                                        <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6a9ab1]">
                                            Description
                                        </p>
                                        <p className="mt-2 whitespace-pre-line break-words text-[14px] leading-6 text-[#526b80]">
                                            {productDescription.trim() || 'Product description'}
                                        </p>
                                    </>
                                ) : null}
                            </div>
                        </aside>
                    </div>
                </section>
            </main>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    )
}

export default AddProduct
