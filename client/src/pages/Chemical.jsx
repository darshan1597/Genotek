import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import hero from '../assets/ProductPageBanner.png'

const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000'

function Chemical() {
    const [categories, setCategories] = useState([])
    const [isLoadingCategories, setIsLoadingCategories] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`${serverUrl}/api/categories/fetch-category`)

                setCategories(
                    Array.isArray(data)
                        ? data.filter((category) => !category.isStandalone)
                        : []
                )
            } catch (error) {
                console.error('Error fetching categories:', error)
                setCategories([])
            } finally {
                setIsLoadingCategories(false)
            }
        }

        fetchCategories()
    }, [])

    const getCategoryImageUrl = (category) => {
        if (!category?.image?.name) return ''

        return `${serverUrl}/categoryImages/${category.image.name}`
    }

    const getCategoryPath = (categoryName) => `/products/chemical/${encodeURIComponent(categoryName)}`

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />
            <main className="w-full px-4 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />
                    <div className="flex-1">
                    <div className="relative flex flex-col gap-[10px] md:flex-row">
                        <div className="relative h-[280px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[360px] md:h-[450px]"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 92% 100%, 0 100%)' }}>
                            <img
                                src={hero}
                                alt="The Genotek Story"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                        <div className="max-w-[1320px] px-1 pb-8 pt-5 text-[16px] leading-[1.6] text-black/80  sm:text-[18px] md:pb-10 md:text-[20px] md:leading-[1.45]">
                            <p className="mb-4 text-black/80 ">
                                At{" "}
                                <span className="font-semibold">
                                    Genotek
                                </span>
                                , we work at the heart of innovation enabling industries by delivering critical intermediates, building blocks, and development solutions that power the final products. We focus on the stages that matter most, where chemistry is complex, precision is essential, and expertise makes the difference.
                            </p>
                            <p className="mb-4">
                                We partner across diverse industries, supporting discovery, development and scalable manufacturing of intermediates and specialty compounds, rather than finished products.
                            </p>
                        </div>
                        <div className="px-4">
                            <div className="mx-auto grid max-w-[820px] grid-cols-2 gap-1 md:grid-cols-4">
                                {isLoadingCategories ? (
                                    [1, 2, 3, 4].map((item) => (
                                        <div key={item} className="h-[155px] animate-pulse rounded-lg bg-slate-100" />
                                    ))
                                ) : categories.length ? (
                                    categories.map((category) => {
                                        const imageUrl = getCategoryImageUrl(category)

                                        return (
                                            <Link
                                                key={category._id || category.name}
                                                to={getCategoryPath(category.name)}
                                                className="text-center"
                                            >
                                                <div className="flex h-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg p-4 ">
                                                    {imageUrl ? (
                                                        <img
                                                            src={imageUrl}
                                                            alt={category.name}
                                                            className="h-full w-full object-contain transition duration-300 hover:opacity-80  scale-100 opacity-100"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center bg-[#f2f6f8] text-sm font-semibold text-[#214f86]">
                                                            {category.name}
                                                        </div>
                                                    )}
                                                </div>
                                            </Link>
                                        )
                                    })
                                ) : (
                                    <p className="col-span-full text-center text-[15px] text-black/70">
                                        No categories available.
                                    </p>
                                )}
                            </div>
                        </div>
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
        </div>
    );
}
export default Chemical;
