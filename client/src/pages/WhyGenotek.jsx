import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import hero from "../assets/aboutStory/hero.jpg";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";

function WhyGenotek() {
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
                                        Why
                                    </p>

                                    <p className="mt-1 ml-[40px] text-[34px] leading-[0.95] font-normal sm:text-[42px] md:text-[50px]">
                                        Genotek?
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* content goes here */}
                        <section className="text-black  text-[20px] leading-[1.75] mt-10 max-w-[1320px] px-1 pb-8 pt-5 sm:text-[22px] md:pb-10 md:text-[24px] md:leading-[1.6]">
                            <p className="mb-4 text-black/80">
                                At{" "}
                                <span className="font-semibold">
                                    Genotek Biochem Private Limited
                                </span>
                                , our strength lies in delivering excellence at scale while
                                staying deeply connected to our clients’ needs.
                            </p>

                            <ul className="list-disc pl-12 space-y-3">
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

                            <p className="mt-6 text-[25px] italic text-black/80">
                                Always within Reach, from Experiment to Outcome.
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
