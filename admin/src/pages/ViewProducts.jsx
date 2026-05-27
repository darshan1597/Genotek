import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
    FiArrowLeft,
    FiEdit2,
    FiImage,
    FiPackage,
    FiPlusCircle,
    FiRefreshCw,
    FiTrash2,
} from 'react-icons/fi'
import Navabar from './components/Navabar'
import Toast from './components/Toast'
import { serverUrl } from '../App'

function ViewProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [productToDelete, setProductToDelete] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [toast, setToast] = useState(null)

    const fetchProducts = async () => {
        setLoading(true)

        try {
            const { data } = await axios.get(`${serverUrl}/api/products/fetch-products`, {
                withCredentials: true,
            })

            setProducts(Array.isArray(data) ? data : [])
        } catch (error) {
            setToast({
                message: error?.response?.data?.message || 'Error fetching products.',
                type: 'error',
            })
            console.error("Error fetching products:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleDelete = async () => {
        if (!productToDelete?._id) return

        setIsDeleting(true)

        try {
            const { data } = await axios.delete(`${serverUrl}/api/products/delete-product/${productToDelete._id}`, {
                withCredentials: true,
            })

            setProducts((currentProducts) =>
                currentProducts.filter((product) => product._id !== productToDelete._id)
            )
            setToast({
                message: data?.message || 'Product deleted successfully.',
                type: 'success',
            })
            setProductToDelete(null)
        } catch (error) {
            setToast({
                message: error?.response?.data?.message || 'Failed to delete product.',
                type: 'error',
            })
        } finally {
            setIsDeleting(false)
        }
    }

    const getProductImageUrl = (product) => {
        if (!product?.image?.name) return ''

        return `${serverUrl}/productImages/${product.image.name}`
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
                                View Products
                            </h1>
                            <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[#526b80]">
                                Review product details, images, categories, and catalog actions.
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
                                to="/add-product"
                                className="inline-flex h-11 items-center justify-center gap-2 bg-[#214f86] px-4 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#173d68]"
                            >
                                <FiPlusCircle className="text-[17px]" />
                                Add Product
                            </Link>
                        </div>
                    </div>

                    <div className="border border-[#d7e5ee] bg-white shadow-[0_18px_45px_rgba(33,79,134,0.13)]">
                        <div className="flex flex-col gap-4 border-b border-[#d7e5ee] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-[22px] font-semibold text-[#214f86]">Products</h2>
                                <p className="mt-1 text-[14px] text-[#526b80]">
                                    {loading ? 'Loading products...' : `${products.length} product${products.length === 1 ? '' : 's'} found`}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={fetchProducts}
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
                                    <div key={item} className="flex animate-pulse items-center gap-4 px-5 py-5">
                                        <span className="h-14 w-14 bg-[#edf4f8]" />
                                        <span className="h-4 w-12 bg-[#edf4f8]" />
                                        <span className="h-4 flex-1 bg-[#edf4f8]" />
                                        <span className="hidden h-4 w-28 bg-[#edf4f8] md:block" />
                                        <span className="hidden h-4 w-28 bg-[#edf4f8] lg:block" />
                                    </div>
                                ))}
                            </div>
                        ) : products.length ? (
                            <div className="overflow-x-auto">
                                <div className="min-w-[1040px]">
                                    <div className="grid grid-cols-[80px_minmax(360px,1fr)_160px_150px_150px] border-b border-[#d7e5ee] bg-[#f8fbfd] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6a9ab1]">
                                        <span>No.</span>
                                        <span>Product</span>
                                        <span>Category</span>
                                        <span>CAS / Subcategory</span>
                                        <span>Actions</span>
                                    </div>

                                    <div className="divide-y divide-[#d7e5ee]">
                                        {products.map((product, index) => {
                                            const imageUrl = getProductImageUrl(product)

                                            return (
                                                <div
                                                    key={product._id || product.name || index}
                                                    className="grid grid-cols-[80px_minmax(360px,1fr)_160px_150px_150px] items-center px-5 py-5 transition-colors duration-200 hover:bg-[#f8fbfd]"
                                                >
                                                    <span className="text-[14px] font-semibold text-[#6a9ab1]">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span>

                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <div className="flex h-24 w-24 shrink-0 items-center justify-center border border-[#d7e5ee] bg-[#f8fbfd]">
                                                            {imageUrl ? (
                                                                <img
                                                                    src={imageUrl}
                                                                    alt={product.name}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <FiImage className="text-[22px] text-[#6a9ab1]" />
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="max-w-[520px] whitespace-normal break-words text-[16px] font-semibold leading-6 text-[#214f86]">
                                                                {product.name}
                                                            </p>
                                                            <p className="mt-1 text-[13px] text-[#526b80]">
                                                                {product.createdAt
                                                                    ? `Added ${new Date(product.createdAt).toLocaleDateString()}`
                                                                    : 'Date not available'}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <span className="truncate text-[14px] font-semibold text-[#526b80]">
                                                        {product.category}
                                                    </span>

                                                    <span className="text-[14px] text-[#526b80]">
                                                        <span className="block truncate">{product.cas}</span>
                                                        {product.subcategory ? (
                                                            <span className="mt-1 block truncate text-[13px] font-semibold text-[#6a9ab1]">
                                                                {product.subcategory}
                                                            </span>
                                                        ) : null}
                                                    </span>

                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            to={`/edit-product/${product._id}`}
                                                            className="inline-flex h-10 w-10 items-center justify-center border border-[#d7e5ee] bg-white text-[#214f86] transition-colors duration-200 hover:bg-[#eef5f9]"
                                                            aria-label={`Edit ${product.name}`}
                                                        >
                                                            <FiEdit2 className="text-[17px]" />
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => setProductToDelete(product)}
                                                            className="inline-flex h-10 w-10 items-center justify-center border border-red-200 bg-white text-red-600 transition-colors duration-200 hover:bg-red-50 cursor-pointer"
                                                            aria-label={`Delete ${product.name}`}
                                                        >
                                                            <FiTrash2 className="text-[17px]" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="border-t border-[#d7e5ee] bg-[#f8fbfd] px-5 py-3 text-[13px] text-[#526b80]">
                                    Showing {products.length} product{products.length === 1 ? '' : 's'}
                                </div>
                            </div>
                        ) : (
                            <div className="flex min-h-[280px] flex-col items-center justify-center px-5 py-12 text-center">
                                <div className="mb-5 flex h-16 w-16 items-center justify-center border border-[#d7e5ee] bg-[#f8fbfd] text-[#214f86]">
                                    <FiPackage className="text-[28px]" />
                                </div>
                                <h2 className="text-[24px] font-semibold text-[#214f86]">No products found</h2>
                                <p className="mt-3 max-w-md text-[15px] leading-6 text-[#526b80]">
                                    Add your first product to start building the catalog.
                                </p>
                                <Link
                                    to="/add-product"
                                    className="mt-6 inline-flex h-11 items-center justify-center gap-2 bg-[#214f86] px-5 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#173d68]"
                                >
                                    <FiPlusCircle className="text-[17px]" />
                                    Add Product
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

            {productToDelete ? (
                <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-[rgba(15,35,55,0.42)] px-4">
                    <section className="w-full max-w-md border border-[#d7e5ee] bg-white p-6 shadow-[0_24px_70px_rgba(15,35,55,0.24)]">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center bg-red-50 text-red-600">
                            <FiTrash2 className="text-[23px]" />
                        </div>
                        <h2 className="text-[24px] font-semibold text-[#214f86]">Delete product?</h2>
                        <p className="mt-3 text-[15px] leading-6 text-[#526b80]">
                            This will permanently delete{' '}
                            <span className="font-semibold text-[#214f86]">{productToDelete.name}</span>
                            {' '}and remove its image from the server.
                        </p>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                disabled={isDeleting}
                                onClick={() => setProductToDelete(null)}
                                className="inline-flex h-11 items-center justify-center border border-[#d7e5ee] bg-white px-5 text-[14px] font-semibold text-[#214f86] transition-colors duration-200 hover:bg-[#eef5f9] disabled:cursor-not-allowed disabled:text-[#8aa7be] cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                disabled={isDeleting}
                                onClick={handleDelete}
                                className="inline-flex h-11 items-center justify-center bg-red-600 px-5 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300 cursor-pointer"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete Product'}
                            </button>
                        </div>
                    </section>
                </div>
            ) : null}
        </div>
    )
}

export default ViewProducts
