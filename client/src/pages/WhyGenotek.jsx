import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import hero from "../assets/whyGenotek/Why-Genotek-Banner.jpg";
import Footer from "./components/Footer";

function WhyGenotek() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />

            <main className="w-full px-4 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />

                    <div className="flex-1">
                        <div className="relative flex flex-col gap-[10px] md:flex-row">
                            <div className="relative h-[280px] w-full overflow-hidden  sm:h-[360px] md:h-[450px]"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 92% 100%, 0 100%)' }}>
                                <img
                                    src={hero}
                                    alt="The Genotek Story"
                                    className="h-full w-full object-contain md:object-cover"
                                />

                               <div className="absolute bottom-[30px] left-0 z-[4] bg-[#2b4f7c] px-5 py-2.5 text-white shadow-lg sm:bottom-[135px] sm:px-8 sm:py-3 md:bottom-[60px] md:px-15" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 55%, 90% 100%, 0 100%)' }}>
                                    <p className="text-[20px] sm:text-[28px] md:text-[35px]">Why</p>
                                    <p className="ml-[40px] mt-1 text-[24px] leading-[0.95] sm:text-[42px] md:text-[50px]">Genotek?</p>
                                </div>
                            </div>
                        </div>
                        
                        <section className="max-w-[1320px] px-1 pb-8 pt-5 text-[16px] leading-[1.6] text-black/80  sm:text-[18px] md:pb-10 md:text-[20px] md:leading-[1.45]">
                            <p className="mb-4 text-black/80">
                                At{" "}
                                <span className="font-semibold">
                                    Genotek Biochem Private Limited
                                </span>
                                , our strength lies in delivering excellence at scale while
                                staying deeply connected to our clients’ needs.
                            </p>

                            <ul className="list-disc space-y-3 pl-6 sm:pl-12">
                                <li>
                                    <span className="font-semibold text-[#5a92b6]">
                                        End-to-End Capability
                                    </span>
                                    <br />
                                    <span className="text-black/80">
                                        Integrated solutions across discovery, development, and
                                        manufacturing — from custom synthesis to full-scale
                                        production.
                                    </span>
                                </li>

                                <li>
                                    <span className="font-semibold text-[#5a92b6]">
                                        Strong Scientific Expertise
                                    </span>
                                    <br />
                                    <span className="text-black/80">
                                        Experienced chemists solving complex challenges with
                                        practical, scalable, and innovative approaches.
                                    </span>
                                </li>

                                <li>
                                    <span className="font-semibold text-[#5a92b6]">
                                        Agility & Speed
                                    </span>
                                    <br />
                                    <span className="text-black/80">
                                        Fast turnaround times, flexible FTE/FFS models, and quick
                                        adaptation to evolving project needs.
                                    </span>
                                </li>

                                <li>
                                    <span className="font-semibold text-[#5a92b6]">
                                        Reliable Quality & Compliance
                                    </span>
                                    <br />
                                    <span className="text-black/80">
                                        Robust quality systems ensuring consistency, precision, and
                                        adherence to global standards.
                                    </span>
                                </li>

                                <li>
                                    <span className="font-semibold text-[#5a92b6]">
                                        Safety, Quality & Efficiency at the Core
                                    </span>
                                    <br />
                                    <span className="text-black/80">
                                        Infrastructure designed for safe handling of complex
                                        chemistries, including hazardous and pyrophoric materials,
                                        with strict quality control and compliance.
                                    </span>
                                </li>

                                <li>
                                    <span className="font-semibold text-[#5a92b6]">
                                        Seamless Scalability
                                    </span>
                                    <br />
                                    <span className="text-black/80">
                                        Advanced R&D and manufacturing integration enabling smooth
                                        transition from lab to large-scale production.
                                    </span>
                                </li>

                                <li>
                                    <span className="font-semibold text-[#5a92b6]">
                                        Transparent Collaboration
                                    </span>
                                    <br />
                                    <span className="text-black/80">
                                        Dedicated project management, real-time communication, and a
                                        single point of contact for clarity and accountability.
                                    </span>
                                </li>

                                <li>
                                    <span className="font-semibold text-[#5a92b6]">
                                        Sustainable Approach
                                    </span>
                                    <br />
                                    <span className="text-black/80">
                                        Focus on green chemistry, safer processes, and
                                        environmentally responsible solutions.
                                    </span>
                                </li>
                            </ul>

                            <p className="mt-6 text-[21px] italic leading-snug text-black/80 sm:text-[25px]">
                                Always within Reach.{` `}
                                <br className="block sm:hidden" />
                                 From Experiment to Outcome.
                            </p>
                        </section>
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default WhyGenotek;
