import { useState } from "react";
import { FiFileText } from "react-icons/fi";
import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import hero from "../assets/chromatographySolutions/HPLC-Columns-Image.png";
import Footer from "./components/Footer";
import GatedPdfModal from "./components/GatedPdfModal";
import hplcColumnsPdf1 from "../assets/hplcColumns/ProntoSIL Catalogue.pdf";
import hplcColumnsPdf2 from "../assets/hplcColumns/ProntoSIL Chiral.pdf";
import hplcColumnsPdf3 from "../assets/hplcColumns/ProntoSIL Prep.pdf";
import hplcColumnsPdf4 from "../assets/hplcColumns/ProntoSIL SFC.pdf";
import hplcColumnsPdf5 from "../assets/hplcColumns/ProntoGEL.pdf";
import img1 from "../assets/hplcColumns/Analyical HPLC & UHPLC.png";
import img2 from "../assets/hplcColumns/Chiral Chromatography.png";
import img3 from "../assets/hplcColumns/Preparative Chromatography.png";
import img4 from "../assets/hplcColumns/Supercritical Fluid Chromatography.png";
import img5 from "../assets/hplcColumns/Size Exclusion Chromatography.png";



const hplcDocuments = [
    { title: "ProntoSIL Catalogue", url: hplcColumnsPdf1, context: "HPLC Columns" },
    { title: "ProntoSIL Chiral", url: hplcColumnsPdf2, context: "HPLC Columns" },
    { title: "ProntoSIL Prep", url: hplcColumnsPdf3, context: "HPLC Columns" },
    { title: "ProntoSIL SFC", url: hplcColumnsPdf4, context: "HPLC Columns" },
    { title: "ProntoGEL", url: hplcColumnsPdf5, context: "HPLC Columns" },
];

function HplcColumns() {
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
                                        clipPath:
                                        "polygon(0 0, 100% 0, 100% 55%, 90% 100%, 0 100%)",
                                    }}
                                >
                                    <p className="text-[20px] leading-[1.0] font-normal sm:text-[28px] md:text-[35px]">
                                        HPLC
                                    </p>

                                    <p className="mt-1 ml-[40px] text-[34px] leading-[0.95] font-normal sm:text-[42px] md:text-[50px]">
                                        Columns
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <section className="max-w-[1320px] px-1 pb-8 pt-5 text-[16px] leading-[1.6] text-black/80  sm:text-[18px] md:pb-10 md:text-[20px] md:leading-[1.45]">
                            <p className="font-semibold mb-4">
                                High-Resolution & Reproducible Separation Performance
                            </p>
                            <p className="mb-4 text-black/80">
                                HPLC columns are at the core of liquid chromatography, determining selectivity, resolution, and reproducibility in analytical workflows. Designed with advanced stationary phase chemistries, these columns support a wide range of applications across pharmaceuticals, food analysis, environmental testing, and life sciences. With strong emphasis on consistent selectivity and batch-to-batch reproducibility, they enable reliable method development, validation, and routine analysis, even for structurally complex and closely related compounds.
                            </p>
                            <ul className="list-disc space-y-3 pl-6 sm:pl-12">
                                <li>
                                    <span className="text-black/80">
                                        Wide range of chemistries: C18, Phenyl-Hexyl, PFP, CN, Amino, Diol, HILIC, ion-exchange
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        High reproducibility ensuring consistent analytical performance
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        Suitable for impurity profiling, stability studies, and bioanalysis
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        Chiral columns available for enantiomeric separations
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        Scalable solutions from analytical to preparative chromatography
                                    </span>
                                </li>
                            </ul>
                        </section>
                        
                        <div className="px-4">
                            {/* 5 IMAGES */}
                            <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-1 md:grid-cols-5">
                                {[
                                    { id: 1, title: "Analytical HPLC & UHPLC Solutions", img: img1 },
                                    { id: 2, title: "Chiral Chromatography Solutions", img: img2 },
                                    { id: 3, title: "Preparative Chromatography Solutions", img: img3 },
                                    { id: 4, title: "Supercritical Fluid Chromatography (SFC)", img: img4 },
                                    { id: 5, title: "Size Exclusion Chromatography (SEC / GPC)", img: img5 },

                                    
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
                                            Analytical HPLC & UHPLC Solutions
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            Designed for high-resolution separations, analytical HPLC and UHPLC columns provide versatile solutions for routine analysis, method development, and complex separations. The ProntoSIL® portfolio offers a wide range of stationary phases, enabling precise optimization for diverse compounds and applications, with strong emphasis on reproducible selectivity and consistent performance.
                                        </p>
                                        <ul className="mt-4 list-disc pl-12 space-y-2 text-[16px] text-black/80 sm:text-[18px]">
                                        <li>Reversed-phase, normal-phase & specialty chemistries </li>
                                        <li>High reproducibility for validated methods </li>
                                        <li>Suitable for impurity profiling & stability studies </li>
                                        <li>Applications in pharma, food & environmental testing </li>
                                        <li>Reliable performance across diverse sample matrices </li>
                                        </ul>

                                        {/* pdf0 */}
                                        <div className="flex flex-wrap gap-4 mt-6">
                                            {hplcDocuments[0] && (
                                                <button
                                                    key={document.title}
                                                    type="button"
                                                    onClick={() => setSelectedPdf(hplcDocuments[0])}
                                                    className="group flex min-h-[96px] w-full cursor-pointer items-center gap-4 border-2 border-[#5790aa] bg-white px-4 py-3 text-left transition hover:border-[#214f86] hover:shadow-[0_10px_24px_rgba(33,79,134,0.15)] sm:w-[360px] rounded-lg"
                                                >
                                                    <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#5790aa] text-white transition group-hover:bg-[#214f86]">
                                                        <FiFileText className="text-[25px]" />
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="block text-[16px] font-semibold leading-6 text-[#214f86]">{hplcDocuments[0].title}</span>
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
                                            Chiral Chromatography Solutions
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            Chiral chromatography is essential for separating enantiomers and ensuring regulatory compliance in pharmaceutical development. The <strong>ProntoSIL® Chiral range</strong>  offers highly selective polysaccharide-based stationary phases, enabling efficient enantiomeric resolution from early screening to preparative purification.
                                        </p>
                                        <ul className="mt-4 list-disc pl-12 space-y-2 text-[16px] text-black/80 sm:text-[18px]">
                                        <li>High selectivity for enantiomeric separations </li>
                                        <li>Chiral screening & method development support </li>
                                        <li>Enantiomeric purity & impurity analysis  </li>
                                        <li>Analytical to preparative scale-up capability  </li>
                                        <li>Applications in APIs, intermediates & natural products  </li>
                                        </ul>

                                        {/* pdf1 */}
                                        <div className="flex flex-wrap gap-4 mt-6">
                                            {hplcDocuments[1] && (
                                                <button
                                                    key={document.title}
                                                    type="button"
                                                    onClick={() => setSelectedPdf(hplcDocuments[1])}
                                                    className="group flex min-h-[96px] w-full cursor-pointer items-center gap-4 border-2 border-[#5790aa] bg-white px-4 py-3 text-left transition hover:border-[#214f86] hover:shadow-[0_10px_24px_rgba(33,79,134,0.15)] sm:w-[360px] rounded-lg"
                                                >
                                                    <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#5790aa] text-white transition group-hover:bg-[#214f86]">
                                                        <FiFileText className="text-[25px]" />
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="block text-[16px] font-semibold leading-6 text-[#214f86]">{hplcDocuments[1].title}</span>
                                                        <span className="mt-1 block text-[13px] text-[#526b80]">Open PDF</span>
                                                    </span>
                                                    
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {/* 3 */}
                                {active === 3 && (
                                     <div className="ml-0 md:ml-10">
                                        <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                            Preparative Chromatography Solutions
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            Preparative chromatography systems are designed for efficient isolation and purification at scale, enabling seamless transition from analytical methods to production workflows. With consistent stationary phase chemistry, these solutions reduce development risks and improve scalability.
                                        </p>
                                        <ul className="mt-4 list-disc pl-12 space-y-2 text-[16px] text-black/80 sm:text-[18px]">
                                        <li>Efficient scale-up from analytical to preparative </li>
                                        <li>Ideal for impurity isolation & compound purification  </li>
                                        <li>High loading capacity & process efficiency s </li>
                                        <li>Consistent chemistry across column formats  </li>
                                        <li>Applications in pharma, natural products & R&D  </li>
                                        </ul>

                                        {/* pdf2 */}
                                        <div className="flex flex-wrap gap-4 mt-6">
                                            {hplcDocuments[2] && (
                                                <button
                                                    key={document.title}
                                                    type="button"
                                                    onClick={() => setSelectedPdf(hplcDocuments[2])}
                                                    className="group flex min-h-[96px] w-full cursor-pointer items-center gap-4 border-2 border-[#5790aa] bg-white px-4 py-3 text-left transition hover:border-[#214f86] hover:shadow-[0_10px_24px_rgba(33,79,134,0.15)] sm:w-[360px] rounded-lg"
                                                >
                                                    <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#5790aa] text-white transition group-hover:bg-[#214f86]">
                                                        <FiFileText className="text-[25px]" />
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="block text-[16px] font-semibold leading-6 text-[#214f86]">{hplcDocuments[2].title}</span>
                                                        <span className="mt-1 block text-[13px] text-[#526b80]">Open PDF</span>
                                                    </span>
                                                    
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {/* 4 */}
                                {active === 4 && (
                                     <div className="ml-0 md:ml-10">
                                        <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                            Supercritical Fluid Chromatography (SFC)
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                           SFC combines the efficiency of gas-phase transport with liquid-phase selectivity, offering a faster and more sustainable alternative to traditional liquid chromatography. These solutions are ideal for high-throughput screening and preparative separations.
                                        </p>
                                        <ul className="mt-4 list-disc pl-12 space-y-2 text-[16px] text-black/80 sm:text-[18px]">
                                        <li>Faster method development & analysis time  </li>
                                        <li>Reduced solvent consumption & greener processes </li>
                                        <li>High efficiency in chiral separations  </li>
                                        <li>Seamless transition from screening to purification </li>
                                        <li>Suitable for pharma & advanced research applications  </li>
                                        </ul>

                                        {/* pdf3 */}
                                        <div className="flex flex-wrap gap-4 mt-6">
                                            {hplcDocuments[3] && (
                                                <button
                                                    key={document.title}
                                                    type="button"
                                                    onClick={() => setSelectedPdf(hplcDocuments[3])}
                                                    className="group flex min-h-[96px] w-full cursor-pointer items-center gap-4 border-2 border-[#5790aa] bg-white px-4 py-3 text-left transition hover:border-[#214f86] hover:shadow-[0_10px_24px_rgba(33,79,134,0.15)] sm:w-[360px] rounded-lg"
                                                >
                                                    <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#5790aa] text-white transition group-hover:bg-[#214f86]">
                                                        <FiFileText className="text-[25px]" />
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="block text-[16px] font-semibold leading-6 text-[#214f86]">{hplcDocuments[3].title}</span>
                                                        <span className="mt-1 block text-[13px] text-[#526b80]">Open PDF</span>
                                                    </span>
                                                    
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {/* 5 */}
                                {active === 5 && (
                                    <div className="ml-0 md:ml-10">
                                        <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                            Size Exclusion Chromatography (SEC / GPC)
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            SEC/GPC solutions enable accurate molecular size-based separations, essential for polymer, protein, and biopharmaceutical analysis. The<strong>ProntoGel® portfolio</strong>  ensures high reproducibility and reliability for both routine and advanced characterization.
                                        </p>
                                        <ul className="mt-4 list-disc pl-12 space-y-2 text-[16px] text-black/80 sm:text-[18px]">
                                        <li>Precise molecular weight determination </li>
                                        <li>Protein aggregation & biopolymer analysis  </li>
                                        <li>High reproducibility in size-based separations </li>
                                        <li>Applications in polymers, peptides & biologics  </li>
                                        <li>Suitable for QC & advanced research workflows </li>
                                        </ul>

                                        {/* pdf4 */}
                                        <div className="flex flex-wrap gap-4 mt-6">
                                            {hplcDocuments[4] && (
                                                <button
                                                    key={document.title}
                                                    type="button"
                                                    onClick={() => setSelectedPdf(hplcDocuments[4])}
                                                    className="group flex min-h-[96px] w-full cursor-pointer items-center gap-4 border-2 border-[#5790aa] bg-white px-4 py-3 text-left transition hover:border-[#214f86] hover:shadow-[0_10px_24px_rgba(33,79,134,0.15)] sm:w-[360px] rounded-lg"
                                                >
                                                    <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#5790aa] text-white transition group-hover:bg-[#214f86]">
                                                        <FiFileText className="text-[25px]" />
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="block text-[16px] font-semibold leading-6 text-[#214f86]">{hplcDocuments[4].title}</span>
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

export default HplcColumns;
