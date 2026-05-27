import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
    FiArrowLeft,
    FiCheckCircle,
    FiChevronDown,
    FiFileText,
    FiGrid,
    FiLayers,
    FiRefreshCw,
} from 'react-icons/fi'
import Navabar from './components/Navabar'
import Toast from './components/Toast'
import { serverUrl } from '../App'

function AddSubcategory() {
    const categoryDropdownRef = useRef(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [parentCategory, setParentCategory] = useState('')
    const [categories, setCategories] = useState([])
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
        const subcategoryDescription = description.trim()

        if (!parentCategory) {
            setToast({ message: 'Select parent category.', type: 'error' })
            return
        }

        if (!subcategoryName) {
            setToast({ message: 'Enter subcategory name.', type: 'error' })
            return
        }

        if (!subcategoryDescription) {
            setToast({ message: 'Enter subcategory description.', type: 'error' })
            return
        }

        setIsSubmitting(true)

        try {
            const { data } = await axios.post(
                `${serverUrl}/api/subcategories/add-subcategory`,
                { name: subcategoryName, description: subcategoryDescription, category: parentCategory },
                { withCredentials: true }
            )

            setToast({ message: data?.message || 'Subcategory added successfully.', type: 'success' })
            setName('')
            setDescription('')
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
        setDescription('')
        setParentCategory('')
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

                        <label className="mb-6 block">
                            <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                Description
                            </span>
                            <span className="flex min-h-[130px] items-start border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 py-4 transition-colors duration-200 focus-within:border-[#214f86]">
                                <FiFileText className="mr-3 mt-1 shrink-0 text-[20px] text-[#6a9ab1]" />
                                <textarea
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    className="min-h-[96px] w-full resize-y bg-transparent text-[15px] leading-6 text-[#23384d] outline-none placeholder:text-[#98aab8]"
                                    placeholder="Write a short description for this subcategory"
                                />
                            </span>
                        </label>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex h-12 items-center justify-center gap-2 bg-[#214f86] px-5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#173d68] disabled:cursor-not-allowed disabled:bg-[#8aa7be]"
                            >
                                <FiCheckCircle className="text-[18px]" />
                                {isSubmitting ? 'Adding...' : 'Add Subcategory'}
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="inline-flex h-12 items-center justify-center gap-2 border border-[#d7e5ee] bg-white px-5 text-[15px] font-semibold text-[#214f86] transition-colors duration-200 hover:bg-[#eef5f9]"
                            >
                                <FiRefreshCw className="text-[17px]" />
                                Reset
                            </button>
                        </div>
                    </form>
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
