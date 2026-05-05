import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import hero from "../assets/aboutStory/hero.jpg";
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
                                        The Genotek
                                    </p>

                                    <p className="mt-1 ml-[120px] text-[20px] leading-[0.95] font-normal sm:text-[42px] md:text-[50px]">
                                        Infrastructure.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* content goes here */}
                        <section className="text-black text-[20px] leading-relaxed">
                            <p className="mb-4 mt-5">
                                <span className="font-semibold text-[30px] text-[#5a92b6] ">
                                    Our Facilities
                                </span>
                                <br />
                                <br />
                                At <span className="font-semibold">Genotek Biochem</span>, our
                                facilities are built to support the full journey of chemical
                                innovation — from research to large-scale manufacturing. We
                                combine advanced infrastructure with safety, precision, and
                                flexibility at every stage. Supported by a{" "}
                                <strong>multi-reactor manufacturing facility near Pune</strong>,
                                we enable smooth transition from pilot to commercial-scale
                                production with reliable quality and scalability.
                            </p>

                            <ul className="list-disc pl-12 space-y-3">
                                <li>
                                    <span className="font-semibold text-[#5a92b6]">
                                        Advanced Research & Development Centre
                                    </span>
                                    <br />
                                    <span className="text-gray-700">
                                        Our Pune-based R&D centre features modern, modular labs
                                        equipped for safe, efficient execution of complex
                                        chemistries, enabling fast and precise research, discovery,
                                        and development.
                                    </span>
                                </li>

                                <li>
                                    <span className="font-semibold text-[#5a92b6]">
                                        Integrated Scale-Up Capabilities (Kilo Labs)
                                    </span>
                                    <br />
                                    <span className="text-gray-700">
                                        Our in-house kilo labs bridge research and manufacturing,
                                        supporting seamless scale-up with pilot-scale reactors and
                                        systems for handling complex and hazardous chemistries.
                                    </span>
                                </li>

                                <li>
                                    <span className="font-semibold text-[#5a92b6]">
                                        High-Pressure & Specialized Reaction Infrastructure
                                    </span>
                                    <br />
                                    <span className="text-gray-700">
                                        Dedicated high-pressure systems enable safe and efficient
                                        execution of demanding reactions, including hydrogenation
                                        under controlled conditions.
                                    </span>
                                </li>

                                <li>
                                    <span className="font-semibold text-[#5a92b6]">
                                        Analytical Development Laboratories
                                    </span>
                                    <br />
                                    <span className="text-gray-700">
                                        Equipped with advanced tools like HPLC, GC, and Prep HPLC,
                                        our analytical labs ensure accurate characterization, method
                                        development, and consistent product quality.
                                    </span>
                                </li>
                            </ul>
                        </section>
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default GenotekInfra;
