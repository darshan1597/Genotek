import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FiArrowLeft, FiLayers, FiPlusCircle, FiRefreshCw } from 'react-icons/fi'
import Navabar from './components/Navabar'
import Toast from './components/Toast'
import { serverUrl } from '../App'

function ViewSubcategories() {
    const [subcategories, setSubcategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [toast, setToast] = useState(null)

    const fetchSubcategories = async () => {
        setLoading(true)

        try {
            const { data } = await axios.get(`${serverUrl}/api/subcategories/fetch-subcategories`, {
                withCredentials: true,
            })

            setSubcategories(Array.isArray(data) ? data : [])
        } catch (error) {
            setToast({
                message: error?.response?.data?.message || 'Error fetching subcategories.',
                type: 'error',
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSubcategories()
    }, [])

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
                                View Subcategories
                            </h1>
                            <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[#526b80]">
                                Review subcategories grouped under parent categories.
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
                                to="/add-subcategory"
                                className="inline-flex h-11 items-center justify-center gap-2 bg-[#214f86] px-4 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#173d68]"
                            >
                                <FiPlusCircle className="text-[17px]" />
                                Add Subcategory
                            </Link>
                        </div>
                    </div>

                    <div className="border border-[#d7e5ee] bg-white shadow-[0_18px_45px_rgba(33,79,134,0.13)]">
                        <div className="flex flex-col gap-4 border-b border-[#d7e5ee] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-[22px] font-semibold text-[#214f86]">Subcategories</h2>
                                <p className="mt-1 text-[14px] text-[#526b80]">
                                    {loading ? 'Loading subcategories...' : `${subcategories.length} subcategor${subcategories.length === 1 ? 'y' : 'ies'} found`}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={fetchSubcategories}
                                disabled={loading}
                                className="inline-flex h-11 items-center justify-center gap-2 border border-[#d7e5ee] bg-[#f8fbfd] px-4 text-[14px] font-semibold text-[#214f86] transition-colors duration-200 hover:bg-[#eef5f9] disabled:cursor-not-allowed disabled:text-[#8aa7be]"
                            >
                                <FiRefreshCw className={`text-[17px] ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                        </div>

                        {loading ? (
                            <div className="divide-y divide-[#d7e5ee]">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="flex animate-pulse items-center gap-4 px-5 py-5">
                                        <span className="h-10 w-10 bg-[#edf4f8]" />
                                        <span className="h-4 flex-1 bg-[#edf4f8]" />
                                        <span className="hidden h-4 w-44 bg-[#edf4f8] sm:block" />
                                    </div>
                                ))}
                            </div>
                        ) : subcategories.length ? (
                            <div className="overflow-x-auto">
                                <div className="min-w-[760px]">
                                    <div className="grid grid-cols-[88px_minmax(260px,1fr)_minmax(220px,0.8fr)_160px] border-b border-[#d7e5ee] bg-[#f8fbfd] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6a9ab1]">
                                        <span>No.</span>
                                        <span>Subcategory</span>
                                        <span>Parent Category</span>
                                        <span>Created</span>
                                    </div>

                                    <div className="divide-y divide-[#d7e5ee]">
                                        {subcategories.map((subcategory, index) => (
                                            <div
                                                key={subcategory._id || `${subcategory.category}-${subcategory.name}-${index}`}
                                                className="grid grid-cols-[88px_minmax(260px,1fr)_minmax(220px,0.8fr)_160px] items-center px-5 py-4 transition-colors duration-200 hover:bg-[#f8fbfd]"
                                            >
                                                <span className="text-[14px] font-semibold text-[#6a9ab1]">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#214f86] text-white">
                                                        <FiLayers className="text-[18px]" />
                                                    </span>
                                                    <span className="truncate text-[16px] font-semibold text-[#214f86]">
                                                        {subcategory.name}
                                                    </span>
                                                </div>
                                                <span className="truncate text-[14px] font-semibold text-[#526b80]">
                                                    {subcategory.category}
                                                </span>
                                                <span className="text-[14px] text-[#526b80]">
                                                    {subcategory.createdAt
                                                        ? new Date(subcategory.createdAt).toLocaleDateString()
                                                        : 'Not available'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex min-h-[280px] flex-col items-center justify-center px-5 py-12 text-center">
                                <div className="mb-5 flex h-16 w-16 items-center justify-center border border-[#d7e5ee] bg-[#f8fbfd] text-[#214f86]">
                                    <FiLayers className="text-[28px]" />
                                </div>
                                <h2 className="text-[24px] font-semibold text-[#214f86]">No subcategories found</h2>
                                <p className="mt-3 max-w-md text-[15px] leading-6 text-[#526b80]">
                                    Add subcategories for categories that need a second catalog level.
                                </p>
                                <Link
                                    to="/add-subcategory"
                                    className="mt-6 inline-flex h-11 items-center justify-center gap-2 bg-[#214f86] px-5 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#173d68]"
                                >
                                    <FiPlusCircle className="text-[17px]" />
                                    Add Subcategory
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
        </div>
    )
}

export default ViewSubcategories
