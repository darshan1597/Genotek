import { useState } from "react";
import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import img1 from "../assets/services/services1.png";
import img2 from "../assets/services/services2.png";
import img3 from "../assets/services/services3.png";
import img4 from "../assets/services/services4.png";
import Footer from "./components/Footer";
import hero from '../assets/aboutStory/hero.jpg'

function Services() {
    const [active, setActive] = useState(null);
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
                                      clipPath: 'polygon(0 0, 100% 0, 100% 55%, 90% 100%, 0 100%)',
                                  }}
                              >
                                  <p className="text-[22px] leading-[1.05] font-normal sm:text-[28px] md:text-[35px]">
                                  The Genotek
                                  </p>
                    
                                  <p className="mt-1 ml-[120px] text-[34px] leading-[0.95] font-normal sm:text-[42px] md:text-[50px]">
                                  Services.
                                  </p>
                              </div>
                          </div>
                      </div>
                        <div className="max-w-[1320px] px-1 pb-8 pt-1text-[16px] leading-[1.7]  sm:text-[18px] md:pb-10 md:text-[19px]">
                            <h2 className="mb-4 text-[#5a92b6] text-[30px] font-semibold">
                                Our Services
                            </h2>

                            <p className="mb-4 ">
                                At{" "}
                                <span className="font-semibold">
                                    Genotek Biochem Private Limited
                                </span>
                                    , our services are designed to support the entire
                                <span className="font-semibold">
                                    {" "}
                                    chemical development lifecycle
                                </span>
                                    , from early-stage discovery to commercial-scale manufacturing.
                                    As a trusted partner in{" "}
                                <span className="font-semibold">
                                    chemical research, development, and manufacturing
                                </span>
                                , we combine scientific expertise, scalable infrastructure, and
                                flexible engagement models to deliver solutions that are
                                precise, reliable, and tailored to our clients’ needs across
                                pharmaceuticals, agrochemicals and material sciences.
                            </p>

                            <p className="mb-4">
                                Our{" "}
                                <span className="font-semibold">
                                    FTE (Full-Time Equivalent) services
                                </span>{" "}
                                provide dedicated scientific teams that function as a seamless
                                extension of your R&amp;D organization. This model enables
                                continuous collaboration, real-time communication, and the
                                flexibility to scale resources based on project requirements,
                                ensuring faster turnaround and efficient progress across
                                discovery and development stages.
                            </p>

                            <p>
                                For well-defined projects, our{" "}
                                <span className="font-semibold">
                                    FFS (Fee-for-Service) model
                                </span>{" "}
                                offers a structured and outcome-driven approach with clear
                                timelines, milestones, and accountability. Each project is
                                executed with transparency and adaptability, allowing us to
                                maintain speed and quality while responding effectively to
                                evolving requirements.
                            </p>
                        </div>
                        <div className="px-4  pt-8">
                            {/* 4 IMAGES */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-10">
                                {[
                                    { id: 1, title: "Compound Libraries", img: img1 },
                                    { id: 2, title: "Process Development", img: img2 },
                                    { id: 3, title: "Analytical Development", img: img3 },
                                    { id: 4, title: "Purification & Isolation", img: img4 },
                                ].map((item) => (
                                    <div key={item.id} className="text-center">
                                        <div
                                        onClick={() =>
                                            setActive(active === item.id ? null : item.id)
                                        }
                                        className="cursor-pointer"
                                        >
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className={`h-[220px] w-full max-w-[250px] mx-auto transition duration-300 hover:opacity-80
                                            ${active === item.id ? "scale-105 opacity-100" : active ? "opacity-40" : "opacity-100"}`}
                                        />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CONTENT */} 
                            <div className=" mt-12 mx-auto text-left">
                                {/* 1 */}
                                {active === 1 && (
                                    <div className="ml-10">
                                        <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                            Compound Libraries (Custom & Scaffold-Based)
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            We design and synthesize{" "}
                                        <span className="font-semibold">
                                            high-quality compound libraries
                                        </span>{" "}
                                            to accelerate discovery programs across multiple
                                            industries.
                                        </p>
                                        <ul className=" ml-10 mt-4 list-disc pl-6 text-[17px] text-[#42556c] space-y-1">
                                            <li>Custom and scaffold-based library design</li>
                                            <li>
                                                Applications in pharmaceuticals, agrochemicals, and
                                                materials
                                            </li>
                                            <li>
                                                Diverse, high-purity compounds using validated routes
                                            </li>
                                            <li>
                                                Tailored solutions aligned with research objectives
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {/* 2 */}
                                {active === 2 && (
                                    <div className="ml-10">
                                        <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                            Process Development & Scale-Up
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            We develop robust, scalable chemical processes that ensure
                                            smooth transition from lab to manufacturing.
                                        </p>
                                        <ul className=" ml-10 mt-4 list-disc pl-6 text-[17px] text-[#42556c] space-y-1">
                                            <li>
                                                Route scouting, optimization, and process validation
                                            </li>
                                            <li>
                                                Safe handling of complex and hazardous chemistries
                                            </li>
                                            <li>
                                                Scalable solutions from milligram to multi-tonne
                                                production
                                            </li>
                                            <li>
                                                Focus on green chemistry and sustainable processes
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {/* 3 */}
                                {active === 3 && (
                                    <div className="ml-10">
                                        <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                            Purification & Isolation (Preparative & Chiral)
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            We provide advanced purification and separation solutions
                                            to achieve high-purity compounds and desired
                                            stereochemistry.
                                        </p>
                                        <ul className=" ml-10 mt-4 list-disc pl-6 text-[17px] text-[#42556c] space-y-1">
                                            <li>Preparative and chiral chromatography expertise</li>
                                            <li>
                                                Isolation of complex molecules with high precision
                                            </li>
                                            <li>Support for downstream applications and scale-up</li>
                                            <li>Reliable purity and characterization standards</li>
                                        </ul>
                                    </div>
                                )}

                                {/* 4 */}
                                {active === 4 && (
                                    <div className="ml-10">
                                        <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                            Analytical Method Development & Validation
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            Our analytical capabilities ensure accuracy, consistency,
                                            and regulatory compliance across all stages.
                                        </p>
                                        <ul className=" ml-10 mt-4 list-disc pl-6 text-[17px] text-[#42556c] space-y-1">
                                            <li>
                                                Method development for APIs, intermediates, and
                                                impurities
                                            </li>
                                            <li>
                                                Validation of reproducible and precise analytical
                                                methods
                                            </li>
                                            <li>
                                                Integration with process development for faster
                                                timelines
                                            </li>
                                            <li>
                                                Advanced instrumentation including HPLC, GC, and more
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Services;