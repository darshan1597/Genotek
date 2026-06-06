import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
    FiArrowLeft,
    FiCheckCircle,
    FiChevronDown,
    FiGrid,
    FiImage,
    FiLayers,
    FiRefreshCw,
    FiUpload,
} from 'react-icons/fi'
import Navabar from './components/Navabar'
import Toast from './components/Toast'
import { serverUrl } from '../App'

function AddSubcategory() {
    const categoryDropdownRef = useRef(null)
    const subcategoryImageInputRef = useRef(null)
    const [name, setName] = useState('')
    const [parentCategory, setParentCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [subcategoryImage, setSubcategoryImage] = useState(null)
    const [imagePreview, setImagePreview] = useState('')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isLoadingCategories, setIsLoadingCategories] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toast, setToast] = useState(null)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`${serverUrl}/api/categories/fetch-category`, {
                    withCredentials: true,
                })

                setCategories(Array.isArray(data) ? data.filter((category) => category.hasSubcategories) : [])
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
        if (!subcategoryImage) {
            setImagePreview('')
            return undefined
        }

        const previewUrl = URL.createObjectURL(subcategoryImage)
        setImagePreview(previewUrl)

        return () => URL.revokeObjectURL(previewUrl)
    }, [subcategoryImage])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const subcategoryName = name.trim()

        if (!parentCategory) {
            setToast({ message: 'Select parent category.', type: 'error' })
            return
        }

        if (!subcategoryName) {
            setToast({ message: 'Enter subcategory name.', type: 'error' })
            return
        }

        if (!subcategoryImage) {
            setToast({ message: 'Upload subcategory image.', type: 'error' })
            return
        }

        setIsSubmitting(true)

        try {
            const formData = new FormData()
            formData.append('name', subcategoryName)
            formData.append('category', parentCategory)
            formData.append('image', subcategoryImage)

            const { data } = await axios.post(
                `${serverUrl}/api/subcategories/add-subcategory`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            )

            setToast({ message: data?.message || 'Subcategory added successfully.', type: 'success' })
            setName('')
            setSubcategoryImage(null)
            if (subcategoryImageInputRef.current) {
                subcategoryImageInputRef.current.value = ''
            }
        } catch (error) {
            setToast({
                message: error?.response?.data?.message || 'Error adding subcategory.',
                type: 'error',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleReset = () => {
        setName('')
        setParentCategory('')
        setSubcategoryImage(null)
        if (subcategoryImageInputRef.current) {
            subcategoryImageInputRef.current.value = ''
        }
    }

    const handleSubcategoryImageChange = (event) => {
        const file = event.target.files?.[0]

        if (!file) {
            setSubcategoryImage(null)
            return
        }

        if (!file.type.startsWith('image/')) {
            setToast({ message: 'Please upload a valid image file.', type: 'error' })
            event.target.value = ''
            setSubcategoryImage(null)
            return
        }

        setSubcategoryImage(file)
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
                                Add Subcategory
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
                                <h2 className="text-[24px] font-semibold text-[#214f86]">Subcategory Details</h2>
                            </div>

                            <div className="mb-5 block" ref={categoryDropdownRef}>
                            <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                Parent Category
                            </span>
                            <div className="relative">
                                <button
                                    type="button"
                                    disabled={isLoadingCategories}
                                    aria-haspopup="listbox"
                                    aria-expanded={isDropdownOpen}
                                    onClick={() => setIsDropdownOpen((current) => !current)}
                                    className="flex h-13 w-full items-center border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 text-left transition-colors duration-200 hover:border-[#214f86] disabled:cursor-not-allowed disabled:text-[#8aa7be]"
                                >
                                    <FiLayers className="mr-3 shrink-0 text-[20px] text-[#6a9ab1]" />
                                    <span className={`min-w-0 flex-1 truncate text-[15px] ${parentCategory ? 'text-[#23384d]' : 'text-[#98aab8]'}`}>
                                        {isLoadingCategories ? 'Loading categories...' : parentCategory || 'Select category'}
                                    </span>
                                    <FiChevronDown className={`ml-3 shrink-0 text-[20px] text-[#6a9ab1] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <div
                                    className={`absolute left-0 right-0 top-full z-40 mt-2 max-h-64 overflow-y-auto border border-[#d7e5ee] bg-white shadow-[0_18px_45px_rgba(33,79,134,0.16)] transition-all duration-200 ${
                                        isDropdownOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
                                    }`}
                                    role="listbox"
                                >
                                    {categories.length ? (
                                        categories.map((category) => (
                                            <button
                                                key={category._id || category.name}
                                                type="button"
                                                onClick={() => {
                                                    setParentCategory(category.name)
                                                    setIsDropdownOpen(false)
                                                }}
                                                className={`flex w-full items-center gap-3 border-b border-[#eef3f6] px-4 py-3 text-left text-[15px] font-semibold transition-colors duration-200 last:border-b-0 ${
                                                    parentCategory === category.name ? 'bg-[#eef5f9] text-[#214f86]' : 'text-[#526b80] hover:bg-[#f8fbfd] hover:text-[#214f86]'
                                                }`}
                                            >
                                                <FiLayers className="text-[18px]" />
                                                <span className="min-w-0 truncate">{category.name}</span>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-4 py-4 text-[14px] leading-6 text-[#526b80]">
                                            No categories with subcategories found.
                                        </div>
                                    )}
                                </div>
                            </div>
                            </div>

                            <label className="mb-5 block">
                            <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                Subcategory Name
                            </span>
                            <span className="flex h-13 items-center border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 transition-colors duration-200 focus-within:border-[#214f86]">
                                <FiGrid className="mr-3 shrink-0 text-[20px] text-[#6a9ab1]" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className="w-full bg-transparent text-[15px] text-[#23384d] outline-none placeholder:text-[#98aab8]"
                                    placeholder="Example: Solvents"
                                />
                            </span>
                            </label>

                            <div className="mb-6 block">
                                <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                    Subcategory Image
                                </span>
                                <button
                                    type="button"
                                    onClick={() => subcategoryImageInputRef.current?.click()}
                                    className="flex min-h-[116px] w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[#d6e4ed] bg-[#f8fbfd] px-4 py-5 text-center transition-colors duration-200 hover:border-[#214f86] hover:bg-[#eef5f9]"
                                >
                                    <FiUpload className="mb-2 text-[26px] text-[#6a9ab1]" />
                                    <span className="text-[15px] font-semibold text-[#214f86]">
                                        {subcategoryImage ? subcategoryImage.name : 'Upload subcategory image'}
                                    </span>
                                    <span className="mt-1 text-[13px] text-[#526b80]">PNG, JPG, or WEBP</span>
                                </button>
                                <input
                                    ref={subcategoryImageInputRef}
                                    type="file"
                                    name="image"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    onChange={handleSubcategoryImageChange}
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
                                    {isSubmitting ? 'Adding...' : 'Add Subcategory'}
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
                                        alt="Subcategory preview"
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
                                    Subcategory Name
                                </p>
                                <p className="mt-2 break-words text-[20px] font-semibold text-[#214f86]">
                                    {name.trim() || 'Subcategory name'}
                                </p>
                                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6a9ab1]">
                                    Parent Category
                                </p>
                                <p className="mt-2 inline-flex border border-[#d7e5ee] bg-[#f8fbfd] px-3 py-2 text-[14px] font-semibold text-[#214f86]">
                                    {parentCategory || 'Category'}
                                </p>
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

export default AddSubcategory
