import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import hero from "../assets/aboutStory/hero.jpg";
import img1 from "../assets/aboutInfra/1.jpeg";
import img2 from "../assets/aboutInfra/2.jpg";
import img3 from "../assets/aboutInfra/3.png";
import img4 from "../assets/aboutInfra/4.jpg";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";

function GenotekInfra() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />

            <main className="w-full px-4 pb-6 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="mb-10 flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />

                    <div className="flex-1">
                        <div className="relative flex flex-col gap-[10px] md:flex-row">
                            <div className="relative h-[280px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[360px] md:h-[450px]">
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
                                    <p className="text-[22px] leading-[1.05] font-normal sm:text-[28px] md:text-[35px]">
                                        Genotek
                                    </p>

                                    <p className="mt-1 ml-[50px] text-[20px] leading-[0.95] font-normal sm:text-[42px] md:text-[50px]">
                                        Infra.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* content goes here */}
                        <div className="max-w-[1320px] px-1 pb-8 pt-5 text-[16px] leading-[1.6] text-black sm:text-[18px] md:pb-10 md:text-[20px] md:leading-[1.45]">
                            <p>
                        At Genotek Biochem, our facilities are built to support the full journey of chemical innovation — from research to large-scale manufacturing. We combine advanced infrastructure with safety, precision, and flexibility at every stage.Supported by a <strong>
                        Multi-Reactor Manufacturing Facility</strong> near Pune, we enable smooth transition from pilot to commercial-scale production with reliable quality and scalability
                            </p>
                        </div>

                        <div className="px-1 ">
                            <div className="grid items-start gap-6 md:gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-10">
                                <div 
                                    className="overflow-hidden"
                                    style={{
                                        clipPath: 'polygon(0 0, 100% 0, 100% 72%, 86% 100%, 0 100%)',
                                    }}
                                >
                                    <img
                                        src={img1}
                                        alt="img1"
                                        className="h-[180px] ml-8 w-full object-cover sm:h-[100px] md:h-[280px]"
                                    />
                                </div>

                                <div className="pr-0 lg:pr-8 xl:pr-20">
                                {/* Heading */}
                                <h2 className="text-[30px] font-semibold text-[#5a92b6] sm:text-[34px] md:text-[38px]">
                                    Advanced Research & Development Centre
                                </h2>

                                {/* Paragraph */}
                                <p className="mt-4 max-w-[900px] text-[16px] leading-[1.8] text-black/80 sm:text-[18px] md:text-[19px] text-justify">
                                Our Pune-based R&D centre features modern, modular labs equipped for safe, efficient execution of complex chemistries, enabling fast and precise research, discovery, and development.                       
                                 </p>


                                </div>
                            </div>

                            <div className="relative mx-auto  h-[20px] w-[92%] sm:mt-14 md:mt-8 md:w-[90%]">
                                <span className="absolute left-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px]" />
                                <span className="absolute right-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px]" />
                                <span className="absolute left-[14px] right-[14px] top-1/2 h-px -translate-y-1/2 bg-[#a5becc]" />
                            </div>

                            
                            <div className="mt-8 grid items-start  md:mt-10 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_520px] ">

                
                            {/* LEFT CONTENT */}
                            <div className="max-w-[700px] ml-10 text-left">
                                <h2 className="text-[28px] font-semibold text-[#5a92b6] sm:text-[32px] md:text-[36px]">
                                    Integrated Scale-Up Capabilities <br />(Kilo Labs)
                                </h2>

                                <p className="mt-4 text-[16px] leading-[1.7] text-black/80 sm:text-[18px] md:text-[19px] text-justify">
                                    Our in-house kilo labs bridge research and manufacturing, supporting seamless scale-up with pilot-scale reactors and systems for handling complex and hazardous chemistries.
                                </p>
                            </div>

                            {/* RIGHT IMAGE */}
                            <div
                                className="overflow-hidden w-[400px] shrink-0"
                                style={{
                                    clipPath: 'polygon(0 0, 100% 0, 100% 72%, 86% 100%, 0 100%)'
                                }}
                            >
                                <img
                                    src={img4}
                                    alt="img4"
                                    className="w-full h-[250px] object-cover object-left"
                                />
                            </div>
                            </div>
                            <div className="relative mx-auto mt-10 h-[20px] w-[92%] sm:mt-14 md:mt-8 md:w-[90%]">
                                <span className="absolute left-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px]" />
                                <span className="absolute right-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px]" />
                                <span className="absolute left-[14px] right-[14px] top-1/2 h-px -translate-y-1/2 bg-[#a5becc]" />
                            </div>
                            <div className="grid items-start gap-6 md:gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-10 mt-8">
                                <div 
                                    className="overflow-hidden"
                                    style={{
                                        clipPath: 'polygon(0 0, 100% 0, 100% 72%, 86% 100%, 0 100%)',
                                    }}
                                >
                                    <img
                                        src={img3}
                                        alt="img3"
                                        className="h-[180px] ml-8 w-full object-cover sm:h-[100px] md:h-[280px]"
                                    />
                                </div>

                                <div className="pr-0 lg:pr-8 xl:pr-20 ">
                                {/* Heading */}
                                <h2 className="text-[30px] font-semibold text-[#5a92b6] sm:text-[34px] md:text-[38px]">
                                    High-Pressure & Specialized Reaction Infrastructure
                                </h2>

                                {/* Paragraph */}
                                <p className="mt-4 max-w-[900px] text-[16px] leading-[1.8] text-black/80 sm:text-[18px] md:text-[19px] text-justify">
                                Dedicated high-pressure systems enable safe and efficient execution of demanding reactions, including hydrogenation under controlled conditions.                      
                                 </p>


                                </div>
                            </div>

                            <div className="relative mx-auto mt-10 h-[20px] w-[92%] sm:mt-14 md:mt-8 md:w-[90%]">
                                <span className="absolute left-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px]" />
                                <span className="absolute right-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px]" />
                                <span className="absolute left-[14px] right-[14px] top-1/2 h-px -translate-y-1/2 bg-[#a5becc]" />
                            </div>

                            
                            <div className="mt-8 grid items-start  md:mt-10 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_520px] ">

                
                            {/* LEFT CONTENT */}
                            <div className="max-w-[700px] ml-10 text-left">
                                <h2 className="text-[28px] font-semibold text-[#5a92b6] sm:text-[32px] md:text-[36px]">
                                    Analytical Development Laboratories
                                </h2>

                                <p className="mt-4 text-[16px] leading-[1.7] text-black/80 sm:text-[18px] md:text-[19px] text-justify">
                                    Equipped with advanced tools like HPLC, GC, and Prep HPLC, our analytical labs ensure accurate characterization, method development, and consistent product quality.
                                </p>
                            </div>

                            {/* RIGHT IMAGE */}
                            <div
                                className="overflow-hidden w-[400px] shrink-0"
                                style={{
                                    clipPath: 'polygon(0 0, 100% 0, 100% 72%, 86% 100%, 0 100%)'
                                }}
                            >
                                <img
                                    src={img2}
                                    alt="img2"
                                    className="w-full h-[250px] object-cover object-left"
                                />
                            </div>
                            </div>
                            


                        
                            </div>
                        
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default GenotekInfra;
