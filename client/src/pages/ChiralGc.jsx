import { useState } from "react";
import { FiFileText } from "react-icons/fi";
import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import hero from "../assets/chromatographySolutions/GC-Columns-Image.png";
import Footer from "./components/Footer";
import GatedPdfModal from "./components/GatedPdfModal";
import chiralGcPdf from "../assets/GcColumns/Bischoff Chiral GC-Phases.pdf";
import fastGcPdf from "../assets/GcColumns/Bischoff_Fast GC Columns.pdf";

const gcDocuments = [
    { title: "Bischoff Chiral GC Phases", url: chiralGcPdf, context: "GC Columns" },
    { title: "Bischoff Fast GC Columns", url: fastGcPdf, context: "GC Columns" },
];

function ChiralGc() {
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
                                    className="absolute bottom-[24px] left-0 z-[4] w-[min(92%,220px)] bg-[#2b4f7c] px-5 py-2.5 text-white shadow-lg sm:bottom-[38px] sm:w-[min(88%,420px)] sm:px-8 sm:py-3 md:bottom-[64px] md:w-auto md:px-15"
                                    style={{
                                        clipPath:
                                        "polygon(0 0, 100% 0, 100% 55%, 90% 100%, 0 100%)",
                                    }}
                                >
                                    <p className="ttext-[20px] leading-[1.0] font-normal sm:text-[28px] md:text-[35px]">
                                        Chiral GC
                                    </p>

                                    <p className="mt-1 ml-[40px] text-[34px] leading-[0.95] font-normal sm:text-[42px] md:text-[50px]">
                                        Columns
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <section className="max-w-[1320px] px-1 pb-8 pt-5 text-[16px] leading-[1.6] text-black/80  sm:text-[18px] md:pb-10 md:text-[20px] md:leading-[1.45]">
                            <p className="font-semibold mb-4">
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
                        <section className="px-1 pb-10">
                            <h2 className="mb-5 text-[26px] font-semibold text-[#214f86]">Product Documents</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {gcDocuments.map((document) => (
                                    <button key={document.title} type="button" onClick={() => setSelectedPdf(document)} className="group flex min-h-[112px] cursor-pointer items-center gap-4 border-2 border-[#5790aa] bg-white px-5 py-4 text-left transition hover:border-[#214f86] hover:shadow-[0_10px_24px_rgba(33,79,134,0.15)]">
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
                        </section>
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
            <GatedPdfModal document={selectedPdf} onClose={() => setSelectedPdf(null)} />
        </div>
    );
}

export default ChiralGc;
