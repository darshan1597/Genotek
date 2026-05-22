import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle, FiGrid, FiRefreshCw } from 'react-icons/fi'
import Navabar from './components/Navabar'

function AddProduct() {
    const [category, setCategory] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const categoryName = category.trim()

        if (!categoryName) {
            setMessage('Please enter a category name.')
            return
        }

        setIsSubmitting(true)
        setMessage('Category API is not connected yet. The form UI is ready for integration.')
        setIsSubmitting(false)
    }

    const handleReset = () => {
        setCategory('')
        setMessage('')
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

                    <div className="">
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
                                    <FiGrid className="mr-3 shrink-0 text-[20px] text-[#6a9ab1]" />
                                    <input
                                        type="text"
                                        name="category"
                                        value={category}
                                        onChange={(event) => {
                                            setCategory(event.target.value)
                                            setMessage('')
                                        }}
                                        className="w-full bg-transparent text-[15px] text-[#23384d] outline-none placeholder:text-[#98aab8]"
                                        placeholder="Example: Laboratory Chemicals"
                                        required
                                    />
                                </span>
                            </label>

                            {message ? (
                                <p className="mb-5 border border-[#d7e5ee] bg-[#f8fbfd] px-4 py-3 text-[14px] leading-6 text-[#526b80]">
                                    {message}
                                </p>
                            ) : null}

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
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AddProduct
