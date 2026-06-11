import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FiArrowLeft, FiEdit2, FiGrid, FiPlusCircle, FiRefreshCw, FiTrash2 } from 'react-icons/fi'
import Navabar from './components/Navabar'
import Toast from './components/Toast'
import { serverUrl } from '../App'

function ViewCategories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [categoryToDelete, setCategoryToDelete] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [toast, setToast] = useState(null)

    const fetchCategories = async () => {
        setLoading(true)

        try {
            const { data } = await axios.get(`${serverUrl}/api/categories/fetch-category`, {
                withCredentials: true,
            })

            setCategories(Array.isArray(data) ? data : [])
        } catch (error) {
            setToast({
                message: error?.response?.data?.message || 'Error fetching categories.',
                type: 'error',
            })
            console.error("Error fetching categories:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleDelete = async () => {
        if (!categoryToDelete?._id) return
        setIsDeleting(true)
        try {
            const { data } = await axios.delete(`${serverUrl}/api/categories/delete-category/${categoryToDelete._id}`, { withCredentials: true })
            setCategories((current) => current.filter((item) => item._id !== categoryToDelete._id))
            setToast({ message: data?.message || 'Category deleted successfully.', type: 'success' })
            setCategoryToDelete(null)
        } catch (error) {
            setToast({ message: error?.response?.data?.message || 'Unable to delete category.', type: 'error' })
        } finally {
            setIsDeleting(false)
        }
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
                                View Categories
                            </h1>
                            <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[#526b80]">
                                Review all product categories currently available for catalog organization.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/admin-panel"
                                className="inline-flex h-11 items-center justify-center gap-2 border border-[#d7e5ee] bg-white px-4 text-[14px] font-semibold text-[#214f86] transition-colors duration-200 hover:bg-[#eef5f9]"
                            >
                                <FiArrowLeft className="text-[17px]" />
                                Dashboard
                            </Link>
                            <Link
                                to="/add-category"
                                className="inline-flex h-11 items-center justify-center gap-2 bg-[#214f86] px-4 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#173d68]"
                            >
                                <FiPlusCircle className="text-[17px]" />
                                Add Category
                            </Link>
                        </div>
                    </div>

                    <div className="border border-[#d7e5ee] bg-white shadow-[0_18px_45px_rgba(33,79,134,0.13)]">
                        <div className="flex flex-col gap-4 border-b border-[#d7e5ee] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-[22px] font-semibold text-[#214f86]">Categories</h2>
                                <p className="mt-1 text-[14px] text-[#526b80]">
                                    {loading ? 'Loading categories...' : `${categories.length} category${categories.length === 1 ? '' : 'ies'} found`}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={fetchCategories}
                                disabled={loading}
                                className="inline-flex h-11 items-center justify-center gap-2 border border-[#d7e5ee] bg-[#f8fbfd] px-4 text-[14px] font-semibold text-[#214f86] transition-colors duration-200 hover:bg-[#eef5f9] disabled:cursor-not-allowed disabled:text-[#8aa7be] cursor-pointer"
                            >
                                <FiRefreshCw className={`text-[17px] ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                        </div>

                        {loading ? (
                            <div className="divide-y divide-[#d7e5ee]">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div
                                        key={item}
                                        className="flex animate-pulse items-center gap-4 px-5 py-5"
                                    >
                                        <span className="h-10 w-10 bg-[#edf4f8]" />
                                        <span className="h-4 w-12 bg-[#edf4f8]" />
                                        <span className="h-4 flex-1 bg-[#edf4f8]" />
                                        <span className="hidden h-4 w-32 bg-[#edf4f8] sm:block" />
                                    </div>
                                ))}
                            </div>
                        ) : categories.length ? (
                            <div className="overflow-x-auto">
                                <div className="min-w-[960px]">
                                    <div className="grid grid-cols-[70px_minmax(230px,0.8fr)_minmax(320px,1.2fr)_140px_110px] border-b border-[#d7e5ee] bg-[#f8fbfd] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6a9ab1]">
                                        <span>No.</span>
                                        <span>Category Name</span>
                                        <span>Description</span>
                                        <span>Created</span>
                                        <span>Actions</span>
                                    </div>

                                    <div className="divide-y divide-[#d7e5ee]">
                                        {categories.map((category, index) => (
                                            <div
                                                key={category._id || category.name || index}
                                                className="grid grid-cols-[70px_minmax(230px,0.8fr)_minmax(320px,1.2fr)_140px_110px] items-center px-5 py-4 transition-colors duration-200 hover:bg-[#f8fbfd]"
                                            >
                                                <span className="text-[14px] font-semibold text-[#6a9ab1]">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#214f86] text-white">
                                                        <FiGrid className="text-[18px]" />
                                                    </span>
                                                    <span className="truncate uppercase text-[16px] font-semibold text-[#214f86]">
                                                        {category.name}
                                                    </span>
                                                </div>
                                                <p className="line-clamp-3 pr-6 text-[14px] leading-6 text-[#526b80]">
                                                    {category.description || 'No description'}
                                                </p>
                                                <span className="text-[14px] text-[#526b80]">
                                                    {category.createdAt
                                                        ? new Date(category.createdAt).toLocaleDateString()
                                                        : 'Not available'}
                                                </span>
                                                <div className="flex gap-2">
                                                    <Link to={`/edit-category/${category._id}`} aria-label={`Edit ${category.name}`} className="inline-flex h-10 w-10 items-center justify-center border border-[#d7e5ee] bg-white text-[#214f86] hover:bg-[#eef5f9]">
                                                        <FiEdit2 />
                                                    </Link>
                                                    <button type="button" onClick={() => setCategoryToDelete(category)} aria-label={`Delete ${category.name}`} className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-red-200 bg-white text-red-600 hover:bg-red-50">
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-[#d7e5ee] bg-[#f8fbfd] px-5 py-3 text-[13px] text-[#526b80]">
                                    Showing {categories.length} category{categories.length === 1 ? '' : 'ies'}
                                </div>
                            </div>
                        ) : (
                            <div className="flex min-h-[280px] flex-col items-center justify-center px-5 py-12 text-center">
                                <div className="mb-5 flex h-16 w-16 items-center justify-center border border-[#d7e5ee] bg-[#f8fbfd] text-[#214f86]">
                                    <FiGrid className="text-[28px]" />
                                </div>
                                <h2 className="text-[24px] font-semibold text-[#214f86]">No categories found</h2>
                                <p className="mt-3 max-w-md text-[15px] leading-6 text-[#526b80]">
                                    Add your first category to start organizing products in the admin catalog.
                                </p>
                                <Link
                                    to="/add-category"
                                    className="mt-6 inline-flex h-11 items-center justify-center gap-2 bg-[#214f86] px-5 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#173d68]"
                                >
                                    <FiPlusCircle className="text-[17px]" />
                                    Add Category
                                </Link>
                            </div>
                        )}
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
            {categoryToDelete ? (
                <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-[rgba(15,35,55,0.42)] px-4">
                    <section className="w-full max-w-md border border-[#d7e5ee] bg-white p-6 shadow-xl">
                        <FiTrash2 className="mb-4 text-[28px] text-red-600" />
                        <h2 className="text-[24px] font-semibold text-[#214f86]">Delete category?</h2>
                        <p className="mt-3 text-[15px] leading-6 text-[#526b80]">
                            Delete <strong>{categoryToDelete.name}</strong>? Categories still containing products or subcategories cannot be deleted.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button type="button" disabled={isDeleting} onClick={() => setCategoryToDelete(null)} className="h-11 border border-[#d7e5ee] px-5 font-semibold text-[#214f86] cursor-pointer">Cancel</button>
                            <button type="button" disabled={isDeleting} onClick={handleDelete} className="h-11 bg-red-600 px-5 font-semibold text-white disabled:bg-red-300 cursor-pointer">{isDeleting ? 'Deleting...' : 'Delete Category'}</button>
                        </div>
                    </section>
                </div>
            ) : null}
        </div>
    )
}

export default ViewCategories
