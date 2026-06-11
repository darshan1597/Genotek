import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import hero from "../assets/aboutStory/hero.jpg";
import Footer from "./components/Footer";

function ChiralGc() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />

            <main className="w-full px-4 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
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
                                    <p className="text-[22px] text-[34px] leading-[0.95] font-normal sm:text-[42px] md:text-[50px]">
                                        GC
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
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default ChiralGc;
