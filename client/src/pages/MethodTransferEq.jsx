import { useState } from "react";
import { FiFileText } from "react-icons/fi";
import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import hero from "../assets/chromatographySolutions/Method_Transfer_&_Equivalency_Banner-Image.png";
import Footer from "./components/Footer";
import GatedPdfModal from "./components/GatedPdfModal";
import { Link } from 'react-router-dom'



function MethodTransferEq() {
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
                                        Method Transfer & 
                                    </p>

                                    <p className="mt-1 ml-[40px] text-[34px] leading-[0.95] font-normal sm:text-[42px] md:text-[50px]">
                                        Equivalency
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <section className="max-w-[1320px] px-1 pb-8 pt-5 text-[16px] leading-[1.6] text-black/80  sm:text-[18px] md:pb-10 md:text-[20px] md:leading-[1.45]">
                            
                            <p className="mb-4 text-black/80">
                                Column equivalency and method transfer are critical for ensuring continuity and consistency in analytical workflows, especially when facing column discontinuation, supply chain changes, or system upgrades. These studies are designed to identify suitable alternative stationary phases while preserving established chromatographic performance. Through systematic scientific evaluation, laboratories can transition between columns or technologies with minimal disruption, ensuring method integrity, regulatory compliance, and reliable analytical outcomes.
                            </p>
                            <ul className="list-disc space-y-3 pl-6 sm:pl-12">
                                <li>
                                    <span className="text-black/80">
                                        Retention behavior assessment for method consistency 
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        Selectivity comparison across equivalent stationary phases 
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        Resolution studies for critical peak separation 
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                       Peak shape evaluation for accurate quantification 
                                    </span>
                                </li>

                                <li>
                                    <span className="text-black/80">
                                        Robustness assessment under varied conditions 
                                    </span>
                                </li>
                                <li>
                                    <span className="text-black/80">
                                        Method transfer support across instruments & systems 
                                    </span>
                                </li>
                                <li>
                                    <span className="text-black/80 ">
                                        Documentation support for regulated environments 
                                    </span>
                                </li>
                            </ul>
                             
                             <p className="mt-4 mb-4 text-black/80">Beyond products, chromatography solutions are strengthened through close scientific collaboration, enabling development of fit-for-purpose separation strategies tailored to specific analytical goals. By working closely with analytical scientists, process chemists, and quality control teams, solutions are designed to improve efficiency, reproducibility, and scalability across applications ranging from routine analysis to complex separations.</p>
                             <ul className="list-disc space-y-3 pl-6 sm:pl-12">
                                <li>
                                    <span className="text-black/80">
                                        Improved resolution for complex separations 
                                    </span>
                                </li>
                                <li>
                                    <span className="text-black/80">
                                        Faster method development & optimization 
                                    </span>
                                </li>
                                <li>
                                    <span className="text-black/80">
                                    Enhanced reproducibility across workflows 
                                    </span>
                                </li>
                                <li>
                                    <span className="text-black/80">
                                        Reduced analytical and operational costs 
                                    </span>
                                </li>
                                <li>
                                    <span className="text-black/80">
                                        Efficient purification and scale-up workflows 
                                    </span>
                                </li>
                                <li>
                                    <span className="text-black/80">
                                        Reliable and seamless method transfer
                                    </span>
                                </li>
                             </ul>
                             <Link to="/contact">
                             <p className="mt-5 text-[21px] italic leading-snug text-black/80 sm:text-[25px]">
                             Reach out to us to know more.
                             </p>
                             </Link>
                             
                        </section>
                    
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
            <GatedPdfModal document={selectedPdf} onClose={() => setSelectedPdf(null)} />
        </div>
    );
}

export default MethodTransferEq;
