import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle, FiFileText, FiGrid, FiImage, FiLayers, FiRefreshCw, FiUpload } from 'react-icons/fi'
import Navabar from './components/Navabar'
import Toast from './components/Toast'
import axios from 'axios'
import { serverUrl } from '../App'

function AddCategory() {
    const categoryImageInputRef = useRef(null)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [hasSubcategories, setHasSubcategories] = useState(false)
    const [categoryImage, setCategoryImage] = useState(null)
    const [imagePreview, setImagePreview] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (!categoryImage) {
            setImagePreview('')
            return undefined
        }

        const previewUrl = URL.createObjectURL(categoryImage)
        setImagePreview(previewUrl)

        return () => URL.revokeObjectURL(previewUrl)
    }, [categoryImage])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const categoryName = category.trim()
        const categoryDescription = description.trim()

        if (!categoryName) {
            setToast({ message: "Enter Category Name!", type: "error" });
            setIsSubmitting(false)
            return
        }

        if (!categoryDescription) {
            setToast({ message: "Enter Category Description!", type: "error" });
            setIsSubmitting(false)
            return
        }

        if (!categoryImage) {
            setToast({ message: "Upload Category Image!", type: "error" });
            setIsSubmitting(false)
            return
        }

        try {
            const formData = new FormData()
            formData.append('name', categoryName)
            formData.append('description', categoryDescription)
            formData.append('hasSubcategories', hasSubcategories)
            formData.append('image', categoryImage)

            await axios.post(
                `${serverUrl}/api/categories/add-category`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            )
            setToast({ message: "Category Added Successfully!", type: "success" });
            setCategory("")
            setDescription("")
            setHasSubcategories(false)
            setCategoryImage(null)

            if (categoryImageInputRef.current) {
                categoryImageInputRef.current.value = ''
            }
        } catch (error) {
            setToast({
                message: error?.response?.data?.message || "Error Adding Category!",
                type: "error",
            });
            console.log(error)
        } finally{
            setIsSubmitting(false)
        }
    }

    const handleReset = () => {
        setCategory('')
        setDescription('')
        setHasSubcategories(false)
        setCategoryImage(null)

        if (categoryImageInputRef.current) {
            categoryImageInputRef.current.value = ''
        }
    }

    const handleCategoryImageChange = (event) => {
        const file = event.target.files?.[0]

        if (!file) {
            setCategoryImage(null)
            return
        }

        if (!file.type.startsWith('image/')) {
            setToast({ message: 'Please upload a valid image file.', type: 'error' })
            event.target.value = ''
            setCategoryImage(null)
            return
        }

        setCategoryImage(file)
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
                                Add Category
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
                                <h2 className="text-[24px] font-semibold text-[#214f86]">Category Details</h2>
                            </div>

                            <label className="mb-5 block">
                                <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                    Category Name
                                </span>
                                <span className="flex h-13 items-center border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 transition-colors duration-200 focus-within:border-[#214f86]">
                                    <FiGrid className="mr-3 shrink-0 text-[20px] text-[#6a9ab1]" />
                                    <input
                                        type="text"
                                        name="category"
                                        value={category}
                                        onChange={(event) => {
                                            setCategory(event.target.value)
                                        }}
                                        className="w-full bg-transparent text-[15px] text-[#23384d] outline-none placeholder:text-[#98aab8]"
                                        placeholder="Example: Laboratory Chemicals"
                                    />
                                </span>
                            </label>

                            <label className="mb-5 block">
                                <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                    Description
                                </span>
                                <span className="flex min-h-[130px] items-start border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 py-4 transition-colors duration-200 focus-within:border-[#214f86]">
                                    <FiFileText className="mr-3 mt-1 shrink-0 text-[20px] text-[#6a9ab1]" />
                                    <textarea
                                        name="description"
                                        value={description}
                                        onChange={(event) => {
                                            setDescription(event.target.value)
                                        }}
                                        className="min-h-[96px] w-full resize-y bg-transparent text-[15px] leading-6 text-[#23384d] outline-none placeholder:text-[#98aab8]"
                                        placeholder="Write a short description for this category"
                                    />
                                </span>
                            </label>

                            <label className="mb-6 flex cursor-pointer items-start gap-4 border border-[#d7e5ee] bg-[#f8fbfd] p-4">
                                <input
                                    type="checkbox"
                                    checked={hasSubcategories}
                                    onChange={(event) => setHasSubcategories(event.target.checked)}
                                    className="mt-1 h-5 w-5 accent-[#214f86]"
                                />
                                <span>
                                    <span className="flex items-center gap-2 text-[15px] font-semibold text-[#214f86]">
                                        <FiLayers className="text-[18px] text-[#6a9ab1]" />
                                        This category has subcategories
                                    </span>
                                    <span className="mt-1 block text-[13px] leading-5 text-[#526b80]">
                                        Use this for categories like cat4 where users should see subcategories before products.
                                    </span>
                                </span>
                            </label>

                            <div className="mb-6 block">
                                <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                    Category Image
                                </span>
                                <button
                                    type="button"
                                    onClick={() => categoryImageInputRef.current?.click()}
                                    className="flex min-h-[116px] w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[#d6e4ed] bg-[#f8fbfd] px-4 py-5 text-center transition-colors duration-200 hover:border-[#214f86] hover:bg-[#eef5f9]"
                                >
                                    <FiUpload className="mb-2 text-[26px] text-[#6a9ab1]" />
                                    <span className="text-[15px] font-semibold text-[#214f86]">
                                        {categoryImage ? categoryImage.name : 'Upload category image'}
                                    </span>
                                    <span className="mt-1 text-[13px] text-[#526b80]">PNG, JPG, or WEBP</span>
                                </button>
                                <input
                                    ref={categoryImageInputRef}
                                    type="file"
                                    name="image"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    onChange={handleCategoryImageChange}
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
                                    {isSubmitting ? 'Adding...' : 'Add Category'}
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
                                        alt="Category preview"
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
                                    Category Name
                                </p>
                                <p className="mt-2 break-words text-[20px] font-semibold text-[#214f86]">
                                    {category.trim() || 'Category name'}
                                </p>
                                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6a9ab1]">
                                    Description
                                </p>
                                <p className="mt-2 whitespace-pre-line break-words text-[15px] leading-6 text-[#526b80]">
                                    {description.trim() || 'Category description'}
                                </p>
                                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6a9ab1]">
                                    Structure
                                </p>
                                <p className="mt-2 inline-flex border border-[#d7e5ee] bg-[#f8fbfd] px-3 py-2 text-[14px] font-semibold text-[#214f86]">
                                    {hasSubcategories ? 'Has subcategories' : 'Direct products'}
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

export default AddCategory
