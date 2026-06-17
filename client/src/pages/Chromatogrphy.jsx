import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import img1 from "../assets/Chromatography/GC_Columns.png";
import img2 from "../assets/Chromatography/HPLC_Columns.png";
import img3 from "../assets/Chromatography/HPLC_Pumps.png";
import img4 from "../assets/Chromatography/Method_Transfer_& _Equivalency.png";
import Footer from "./components/Footer";
import hero from '../assets/Chromatography/Chromatography_Solutions_Banner.png';
import { Link } from "react-router-dom";
function Chromatogrphy() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />
            <main className="w-full px-4 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />
                    <div className="flex-1">
                    <div className="relative flex flex-col gap-[10px] md:flex-row">
                        <div className="relative h-[280px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[360px] md:h-[520px]">
                            <img
                                src={hero}
                                alt="The Genotek Story"
                                className="h-full w-full object-cover"
                            />
                    
                            <div
                                className="absolute bottom-[24px] left-0 z-[4] w-[min(92%,320px)] bg-[#2b4f7c] px-5 py-2.5 text-white shadow-lg sm:bottom-[38px] sm:w-[min(88%,420px)] sm:px-8 sm:py-3 md:bottom-[64px] md:w-auto md:px-15"
                                style={{
                                    clipPath: 'polygon(0 0, 100% 0, 100% 55%, 90% 100%, 0 100%)',
                                }}
                            >
                                <p className="text-[20px] leading-[1.0] font-normal sm:text-[28px] md:text-[35px]">
                                    Chromatography
                                    </p>
                                    <p className="mt-1 ml-[60px] text-[24px] leading-[0.95] font-normal sm:text-[42px] md:text-[50px]">
                                    Solutions.
                                    </p>
                            </div>
                        </div>
                    </div>
                        <div className="max-w-[1320px] px-1 pb-8 pt-5 text-[16px] leading-[1.6] text-black/80  sm:text-[18px] md:pb-10 md:text-[20px] md:leading-[1.45]">
                            <p className="mb-4 text-black/80 ">
                                Chromatography plays a critical role in modern analytical science, enabling precise separation, identification, and purification of complex chemical mixtures across pharmaceuticals, biotechnology, chemical research, and quality control. Through collaboration with <span className="font-semibold">BISCHOFF Chromatography (Germany)</span>, a comprehensive portfolio of high-performance chromatography solutions is available, combining advanced stationary phase technologies with robust system design to deliver high selectivity, reproducibility, and efficiency. These solutions support applications ranging from impurity profiling and chiral analysis to biomolecule characterization and process-scale purification, ensuring reliable performance across analytical and preparative workflows.
                            </p>
                            <ul className="list-disc space-y-3 pl-6 sm:pl-12">
                                <li>
                                    <span className="text-black/80">
                                        <span className="font-semibold">Chiral Gas Chromatography (GC) Columns</span>: High-efficiency columns including Fast GC technologies for rapid and reliable analysis
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        <span className="font-semibold">Chiral HPLC Columns</span>: Advanced stationary phases for high-resolution analytical and preparative separations
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        <span className="font-semibold">HPLC Pumps</span>: Precision flow systems ensuring consistent, reproducible chromatographic performance
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="px-4">
                            {/* 4 IMAGES */}
                            <div className="mx-auto grid max-w-[820px] grid-cols-2 gap-1 md:grid-cols-4">
                                {[
                                    { id: 1, title: "Chiral GC Columns", img: img1, link: "/products/chiral-gc-columns" },
                                    { id: 2, title: "Chiral Hplc Columns", img: img2, link: "/products/chiral-hplc-columns" },
                                    { id: 3, title: "HPLC Pumps", img: img3, link: "/products/hplc-pumps" },
                                    { id: 4, title: "Method Transfer Equivalency", img: img4, link: "/products/method-transfer-n-equivalency" },
                                ].map((item) => (
                                    <div key={item.id} className="text-center">
                                        <Link
                                            to={item.link}
                                            className="flex h-[155px] cursor-pointer items-center justify-center overflow-hidden rounded-lg p-1 sm:p-2"
                                        >
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="h-full w-full object-contain transition duration-300 hover:opacity-80"
                                            />
                                        </Link>
                                    </div>
                                ))}
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
