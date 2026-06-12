import { useState } from "react";
import { FiFileText } from "react-icons/fi";
import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import hero from "../assets/chromatographySolutions/HPLC-pumps-Image.png";
import Footer from "./components/Footer";
import GatedPdfModal from "./components/GatedPdfModal";
import pump3350Pdf from "../assets/hpclPumps/Bischoff 3350 HPLC Dosing Pump.pdf";
import pump3351Pdf from "../assets/hpclPumps/Bischoff 3351 HPLC Dosing Pump.pdf";

const pumpDocuments = [
    { title: "Bischoff 3350 HPLC Dosing Pump", url: pump3350Pdf, context: "HPLC Pumps" },
    { title: "Bischoff 3351 HPLC Dosing Pump", url: pump3351Pdf, context: "HPLC Pumps" },
];

function HplcPumps() {
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
                                        Pumps
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <section className="max-w-[1320px] px-1 pb-8 pt-5 text-[16px] leading-[1.6] text-black/80  sm:text-[18px] md:pb-10 md:text-[20px] md:leading-[1.45]">
                            <p className="font-semibold mb-4">
                                Precision Flow Control for Consistent Chromatography
                            </p>
                            <p className="mb-4 text-black/80">
                                HPLC pumps are critical for delivering accurate and stable mobile phase flow, directly impacting chromatographic performance and reproducibility. Engineered for high-pressure operation and precise solvent delivery, these pumps support both isocratic and gradient methods, ensuring reliable retention times and peak consistency. Their robust design and minimal pulsation enable efficient operation across routine analysis, method development, and preparative applications.
                            </p>
                            <ul className="list-disc space-y-3 pl-6 sm:pl-12">
                                <li>
                                    <span className="text-black/80">
                                        High-precision flow control for reproducible results
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        Stable gradient formation for complex separations
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        Low pulsation for improved peak shape and resolution
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        Compatible with a wide range of solvents and applications
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        Designed for continuous, reliable laboratory operation
                                    </span>
                                </li>
                            </ul>
                        </section>

                        <section className="px-1 pb-10">
                            <h2 className="mb-5 text-[26px] font-semibold text-[#214f86]">Product Documents</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {pumpDocuments.map((document) => (
                                    <button
                                        key={document.title}
                                        type="button"
                                        onClick={() => setSelectedPdf(document)}
                                        className="group flex min-h-[112px] cursor-pointer items-center gap-4 border-2 border-[#5790aa] bg-white px-5 py-4 text-left transition hover:border-[#214f86] hover:shadow-[0_10px_24px_rgba(33,79,134,0.15)]"
                                    >
                                        <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#5790aa] text-white transition group-hover:bg-[#214f86]">
                                            <FiFileText className="text-[25px]" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-[16px] font-semibold leading-6 text-[#214f86]">
                                                {document.title}
                                            </span>
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

export default HplcPumps;
