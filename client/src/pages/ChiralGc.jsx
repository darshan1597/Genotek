import { useState } from "react";
import { FiFileText } from "react-icons/fi";

import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import hero from "../assets/chromatographySolutions/GC-Columns-Image.png";
import Footer from "./components/Footer";
import GatedPdfModal from "./components/GatedPdfModal";
import ProntoSIL_GC from "../assets/GcColumns/ProntoSIL_GC.pdf";
import ProntoSIL_SF_GC from "../assets/GcColumns/ProntoSIL_SF_GC.pdf";
import img1 from "../assets/GcColumns/Gas_Chromatography.png";
import img2 from "../assets/GcColumns/SuperFast_Gas_Chromatography.png";
import { Link } from "react-router-dom";

const gcDocuments = [
    { title: "ProntoSIL GC", url: ProntoSIL_GC, context: "GC Columns" },
    { title: "ProntoSIL SF-GC", url: ProntoSIL_SF_GC, context: "GC Columns" },
];

function ChiralGc() {
    const [active, setActive] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState(null);

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />

            <main className="w-full px-4 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />
                    

                    <div className="flex-1">
                         <nav aria-label="Breadcrumb" className="mb-3 px-1">
                            <div className="flex items-center gap-2 text-[14px] text-gray-500">
                                <Link
                                    to="/products/chromatography-solutionss"
                                    className="hover:text-[#214f86]"
                                >
                                    Chromatography Solutions
                                </Link>

                                <span>&gt;</span>

                                <span className="font-semibold text-[#214f86]">
                                    GC Columns
                                </span>
                            </div>
                        </nav>
                        <div className="relative flex flex-col gap-[10px] md:flex-row">
                            <div className="relative h-[280px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[360px] md:h-[520px]"style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 92% 100%, 0 100%)' }}>
                                <img
                                    src={hero}
                                    alt="The Genotek Story"
                                    className="h-full w-full object-cover"
                                />

                                <div
                                    className="absolute bottom-[24px] left-0 z-[4] w-[min(92%,220px)] bg-[#2b4f7c] px-5 py-2.5 text-white shadow-lg sm:bottom-[38px] sm:w-[min(88%,420px)] sm:px-8 sm:py-3 md:bottom-[64px] md:w-auto md:px-15"
                                    style={{
                                        clipPath:
                                        "polygon(0 0, 100% 0, 100% 55%, 90% 100%, 0 100%)",
                                    }}
                                >
                                    <p className="text-[30px] leading-[1.0] font-normal sm:text-[28px] md:text-[35px]">
                                        GC
                                    </p>

                                    <p className="mt-1 ml-[40px] text-[34px] leading-[0.95] font-normal sm:text-[42px] md:text-[50px]">
                                        Columns
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <section className="max-w-[1320px] px-1 pb-8 pt-5 text-[16px] leading-[1.6] text-black/80 sm:text-[18px] md:pb-10 md:text-[20px] md:leading-[1.45]">
                            <p className="font-semibold mb-4 text-[19px] sm:text-[21px] md:text-[23px]">
                                Fast, Selective & High-Efficiency GC Solutions
                            </p>
                            <p className="mb-4 text-black/80">
                                Gas chromatography columns are essential for separating volatile and semi-volatile compounds with high sensitivity and efficiency. Developed with optimized stationary phases and precise column dimensions, these columns deliver excellent selectivity and resolution across a wide range of applications. The portfolio includes advanced <span className="font-semibold">Fast GC technologies</span>, enabling significantly reduced analysis times while maintaining analytical integrity, making them ideal for high-throughput laboratories and time-critical workflows.
                            </p>
                            <ul className="list-disc space-y-3 pl-6 sm:pl-12">
                                <li>
                                    <span className="text-black/80">
                                        Wide range of stationary phases for optimized selectivity across applications
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        Fast GC (SF-GC) technology enabling 3-10x faster analysis
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        High-resolution separation for complex mixtures
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        Chiral GC columns for enantiomeric separations using cyclodextrin phases
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        Applications in residual solvents, flavours & fragrances, pesticides, and environmental analysis
                                    </span>
                                </li>
                            </ul>
                        </section>
                        {/* <section className="px-1 pb-10">
                            <h2 className="mb-5 text-[26px] font-semibold text-[#214f86]">Product Documents</h2>
                            <div className="flex flex-wrap gap-4">
                                {gcDocuments.map((document) => (
                                    <button key={document.title} type="button" onClick={() => setSelectedPdf(document)} className="group flex min-h-[96px] w-full cursor-pointer items-center gap-4 border-2 border-[#5790aa] bg-white px-4 py-3 text-left transition hover:border-[#214f86] hover:shadow-[0_10px_24px_rgba(33,79,134,0.15)] sm:w-[360px]">
                                        <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#5790aa] text-white transition group-hover:bg-[#214f86]">
                                            <FiFileText className="text-[25px]" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-[16px] font-semibold leading-6 text-[#214f86]">{document.title}</span>
                                            <span className="mt-1 block text-[13px] text-[#526b80]">Open PDF</span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </section> */}

                        <div className="px-4">
                            {/* 2 IMAGES */}
                            <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-1 md:grid-cols-5">
                                {[
                                    { id: 1, title: "Compound Libraries", img: img1 },
                                    { id: 2, title: "Process Development", img: img2 },
                                    
                                ].map((item) => (
                                    <div key={item.id} className="text-center">
                                        <div
                                            onClick={() =>
                                                setActive(active === item.id ? null : item.id)
                                            }
                                             className="flex h-[155px] cursor-pointer items-center justify-center overflow-hidden rounded-lg p-1 sm:p-2"
                                        >
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className={`h-full w-full object-contain transition duration-300 hover:opacity-80
                                            ${active === item.id ? "scale-[1.04] opacity-100" : active ? "scale-100 opacity-40 hover:opacity-75" : "scale-100 opacity-100"}`}
                                        />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* CONTENT */} 
                            <div className=" mt-12 mx-auto text-left">
                                {/* 1 */}
                                {active === 1 && (
                                    <div className="ml-0 md:ml-10">
                                        <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                            Gas Chromatography (GC) Columns
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            Gas chromatography columns are designed for high-efficiency separation of volatile and semi-volatile compounds across a wide range of analytical applications. The BISCHOFF GC portfolio offers diverse stationary phase chemistries with optimized selectivity, enabling accurate, reproducible, and high-resolution separations even for complex sample matrices.
                                        </p>
                                        <ul className="mt-4 list-disc pl-12 space-y-2 text-[16px] text-black/80 sm:text-[18px]">
                                            <li>
                                                Wide range of stationary phases for tailored selectivity 
                                            </li>
                                            <li>
                                               High-resolution separation of volatile compounds 
                                            </li>
                                            <li>
                                                Reliable performance for routine & advanced analysis 
                                            </li>
                                            <li>
                                                Suitable for complex multi-component mixtures 
                                            </li>
                                            <li>
                                                Consistent reproducibility across applications 
                                            </li>
                            
                                        </ul>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            Key Applications:
                                        </p>
                                        <ul className="mt-4 list-disc pl-12 space-y-2 text-[16px] text-black/80 sm:text-[18px]">
                                            <li>
                                                Residual solvent analysis
                                            </li>
                                            <li>
                                                Petrochemical characterization
                                            </li>
                                            <li>
                                                Essential oils & flavors
                                            </li>
                                            <li>
                                                Environmental contaminant analysis
                                            </li>
                                            <li>
                                                Food safety & quality testing
                                            </li>
                                        </ul>
                                        {/* pdf0 */}
                                        <div className="flex flex-wrap gap-4 mt-6">
                                            {gcDocuments[0] && (
                                                <button
                                                    key={document.title}
                                                    type="button"
                                                    onClick={() => setSelectedPdf(gcDocuments[0])}
                                                    className="group flex min-h-[96px] w-full cursor-pointer items-center gap-4 border-2 border-[#5790aa] bg-white px-4 py-3 text-left transition hover:border-[#214f86] hover:shadow-[0_10px_24px_rgba(33,79,134,0.15)] sm:w-[360px] rounded-lg"
                                                >
                                                    <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#5790aa] text-white transition group-hover:bg-[#214f86]">
                                                        <FiFileText className="text-[25px]" />
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="block text-[16px] font-semibold leading-6 text-[#214f86]">{gcDocuments[0].title}</span>
                                                        <span className="mt-1 block text-[13px] text-[#526b80]">Open PDF</span>
                                                    </span>
                                                    
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {/* 2 */}
                                {active === 2 && (
                                    <div className="ml-0 md:ml-10">
                                        <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                            Super Fast Gas Chromatography (SF-GC)
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            Super Fast Gas Chromatography (SF-GC) is an advanced technique designed to significantly reduce analysis time while maintaining high separation efficiency. By utilizing narrow-bore columns, optimized stationary phases, and higher temperature ramp rates, SF-GC enables rapid analysis of medium-to-high complexity mixtures, making it ideal for high-throughput laboratories and time-sensitive workflows.
                                        </p>
                                        <ul className="mt-4 list-disc pl-12 space-y-2 text-[16px] text-black/80 sm:text-[18px]">
                                            <li>
                                            3x–10x faster analysis compared to conventional GC 
                                            </li>
                                            <li>
                                            Maintains resolution with reduced run times 
                                            </li>
                                            <li>
                                            Narrow-bore columns for high efficiency 
                                            </li>
                                            <li>
                                             Optimized selectivity for critical peak separation 
                                            </li>
                                            <li>
                                            Ideal for high-throughput analytical environments 
                                            </li>
                                        </ul>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            Key Applications:
                                        </p>    
                                        <ul className="mt-4 list-disc pl-12 space-y-2 text-[16px] text-black/80 sm:text-[18px]">
                                            <li> Faster method development & increased productivity</li>
                                            <li>Reduced operational time & improved throughput </li>
                                            <li>Efficient handling of complex mixtures </li>
                                            <li>Enhanced performance with optimized stationary phases</li>
                                        </ul>

                                        {/* pdf1 */}
                                        <div className="flex flex-wrap gap-4 mt-6">
                                            {gcDocuments[1] && (
                                                <button
                                                    key={document.title}
                                                    type="button"
                                                    onClick={() => setSelectedPdf(gcDocuments[1])}
                                                    className="group flex min-h-[96px] w-full cursor-pointer items-center gap-4 border-2 border-[#5790aa] bg-white px-4 py-3 text-left transition hover:border-[#214f86] hover:shadow-[0_10px_24px_rgba(33,79,134,0.15)] sm:w-[360px] rounded-lg"
                                                >
                                                    <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#5790aa] text-white transition group-hover:bg-[#214f86]">
                                                        <FiFileText className="text-[25px]" />
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="block text-[16px] font-semibold leading-6 text-[#214f86]">{gcDocuments[1].title}</span>
                                                        <span className="mt-1 block text-[13px] text-[#526b80]">Open PDF</span>
                                                    </span>
                                                    
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
            <GatedPdfModal document={selectedPdf} onClose={() => setSelectedPdf(null)} />
        </div>
    );
}

export default ChiralGc;
