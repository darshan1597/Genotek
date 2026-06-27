import { useEffect, useState } from "react";
import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import hero from '../assets/Chromatography/Chromatography_Solutions_Banner.png';
import { Link } from "react-router-dom";
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000'

function Chromatogrphy() {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`${serverUrl}/api/chromatography-categories`)
                setCategories(Array.isArray(data) ? data : [])
            } catch (error) {
                console.error('Error loading chromatography categories:', error)
                setCategories([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchCategories()
    }, [])

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />
            <main className="w-full px-4 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />
                    <div className="flex-1">
                    <div className="relative flex flex-col gap-[10px] md:flex-row">
                        <div className="relative h-[280px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[360px] md:h-[520px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 92% 100%, 0 100%)' }}>
                            <img
                                src={hero}
                                alt="The Genotek Story"
                                className="h-full w-full object-cover object-right md:object-fill md:object-center"
                            />
                    
                            <div
                                className="absolute left-0 top-4 z-[4] bg-[#2b4f7c] px-6 py-2.5 text-white shadow-lg sm:px-8 sm:py-3 md:bottom-[60px] md:top-auto md:px-15" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 55%, 90% 100%, 0 100%)' }}
                            >
                                <p className="text-[20px] leading-[1.0] font-normal sm:text-[28px] md:text-[35px]">
                                    Chromatography
                                    </p>
                                    <p className="mt-1 ml-[60px] text-[24px] leading-[0.95] font-normal sm:text-[42px] md:text-[50px]">
                                    Solutions
                                    </p>
                            </div>
                        </div>
                    </div>
                        <div className="max-w-[1320px] px-1 pb-8 pt-5 text-[16px] leading-[1.6] text-black/80  sm:text-[18px] md:pb-10 md:text-[20px] md:leading-[1.45]">
                            <p className="mb-4 text-black/80 ">
                                At Genotek Biochem, we believe chromatography is more than an analytical technique-it is a critical scientific tool that drives innovation across pharmaceutical development, biotechnology, chemical research, quality control, and process manufacturing.
                            </p>
                            <p className="mb-4 text-black/80 ">
                                Through our strategic collaboration with <span className="font-semibold">BISCHOFF</span> Analysentechnik u. –gerate GmbH, Germany, we bring to the Indian scientific community, a comprehensive portfolio of high-performance chromatographic columns under <span className="font-semibold">ProntoSIL</span> brand, and specialized separation solutions supported by deep application expertise. Combining German engineering excellence with local scientific support, we help laboratories solve complex analytical challenges, accelerate method development, and improve purification efficiency.
                            </p>
                            <p className="mb-4 text-black/80 ">
                                Whether the objective is impurity profiling, chiral resolution, biomolecule characterization, process development, or large-scale purification, Genotek Biochem provides the products, knowledge, and technical support required to achieve reliable and reproducible separations.
                            </p>

                            <p className="font-semibold mb-4 text-[19px] sm:text-[21px] md:text-[23px]">
                                Scientific Excellence in Chromatographic Separations
                            </p>
                            <p className="mb-4 text-black/80 ">
                                Modern analytical laboratories require chromatographic systems capable of delivering high selectivity, exceptional reproducibility, and robust performance across diverse sample matrices at competitive costs. The BISCHOFF portfolio has been developed to address these challenges through carefully engineered stationary phases, stringent manufacturing controls, and batch-to-batch consistency.
                            </p>
                        </div>
                        <div className="px-4">
                            <div className="mx-auto grid max-w-[820px] grid-cols-2 gap-1 md:grid-cols-4">
                                {isLoading ? (
                                    [1, 2, 3, 4].map((item) => (
                                        <div key={item} className="h-[155px] animate-pulse rounded-lg bg-slate-100" />
                                    ))
                                ) : categories.length ? (
                                    categories.map((category) => (
                                    <div key={category._id || category.slug} className="text-center">
                                        <Link
                                            to={`/products/${category.slug}`}
                                            className="flex h-[155px] items-center justify-center overflow-hidden rounded-lg p-1 sm:p-2"
                                        >
                                            <img
                                                src={`${serverUrl}/chromatographyImages/${category.categoryImage?.name}`}
                                                alt={category.name}
                                                className="h-full w-full object-contain transition duration-300 hover:opacity-80"
                                            />
                                        </Link>
                                    </div>
                                ))
                                ) : (
                                    <p className="col-span-full text-center text-[15px] text-black/70">
                                        No chromatography categories available.
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
export default Chromatogrphy;
