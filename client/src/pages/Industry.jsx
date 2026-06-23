import { useState } from "react";
import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import img1 from "../assets/industry/industry1.png";
import img2 from "../assets/industry/industry2.png";
import img3 from "../assets/industry/industry3.png";
import img4 from "../assets/industry/industry4.png";
import img5 from "../assets/industry/industry5.png";
import img6 from "../assets/industry/industry6.png";
import Footer from "./components/Footer";
import banner from '../assets/industry/banner.png'

const industries = [
    { id: 1, title: "Pharmaceuticals", img: img1 },
    { id: 2, title: "Agrochemicals", img: img2 },
    { id: 3, title: "Flavours & Fragrances", img: img3 },
    { id: 4, title: "Cosmeceuticals", img: img4 },
    { id: 5, title: "Specialty Chemicals", img: img5 },
    { id: 6, title: "Material Sciences", img: img6 },
];

function Industry() {
    const [active, setActive] = useState(null);
    const [visibleIds, setVisibleIds] = useState([1, 2, 3, 4, 5]);
    const [trackIds, setTrackIds] = useState([1, 2, 3, 4, 5]);
    const [trackOffset, setTrackOffset] = useState("0px");
    const [isSliding, setIsSliding] = useState(false);

    const getIndustry = (id) => industries.find((item) => item.id === id);
    const nextId = (id) => (id % industries.length) + 1;
    const prevId = (id) => ((id + industries.length - 2) % industries.length) + 1;
    const slideDistance = "calc(-1 * var(--industry-slide-distance))";

    const slideRight = () => {
        if (isSliding) return;

        const last = visibleIds[visibleIds.length - 1];
        const nextVisibleIds = [
            ...visibleIds.slice(1),
            nextId(last),
        ];

        setTrackIds([...visibleIds, nextVisibleIds[nextVisibleIds.length - 1]]);
        setTrackOffset("0px");
        setIsSliding(false);

        requestAnimationFrame(() => {
            setIsSliding(true);
            setTrackOffset(slideDistance);
        });

        setVisibleIds(nextVisibleIds);
    };

    const slideLeft = () => {
        if (isSliding) return;

        const first = visibleIds[0];
        const nextVisibleIds = [
            prevId(first),
            ...visibleIds.slice(0, -1),
        ];

        setTrackIds([nextVisibleIds[0], ...visibleIds]);
        setTrackOffset(slideDistance);
        setIsSliding(false);

        requestAnimationFrame(() => {
            setIsSliding(true);
            setTrackOffset("0px");
        });

        setVisibleIds(nextVisibleIds);
    };

    const finishSlide = (event) => {
        if (event.target !== event.currentTarget) return;

        setIsSliding(false);
        setTrackOffset("0px");
        setTrackIds(visibleIds);
    };

    const renderIndustryCard = (item, index) => (
        <button
            type="button"
            key={`${item.id}-${index}`}
            onClick={() =>
                setActive(active === item.id ? null : item.id)
            }
            className={`group flex h-[175px] min-w-0 shrink-0 basis-[calc((100%-var(--industry-gap))/2)] cursor-pointer items-center justify-center overflow-hidden rounded-lg p-1 text-center transition focus:outline-none hover:opacity-80 sm:p-2 md:basis-[calc((100%-(var(--industry-gap)*4))/5)]
            ${active === item.id ? "opacity-100" : active ? "opacity-40" : "opacity-100"}`}
        >
            <img
                src={item.img}
                alt={item.title}
                className={`h-full w-full object-contain transition duration-300
                ${active === item.id ? "scale-[1.04]" : "scale-100"}`}
            />
        </button>
    );

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />
            <main className="w-full px-4 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />
                    <div className="flex-1">
                        <div className="relative flex flex-col gap-[10px] md:flex-row">
                            <div className="relative h-[280px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[360px] md:h-[450px]"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 92% 100%, 0 100%)' }}>
                                <img
                                    src={banner}
                                    alt="The Genotek Story"
                                    className="h-full w-full object-cover"
                                />
                        
                                <div className="absolute bottom-[10px] left-0 z-[4] bg-[#2b4f7c] px-5 py-2.5 text-white shadow-lg sm:bottom-[135px] sm:px-8 sm:py-3 md:bottom-[60px] md:px-15" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 55%, 90% 100%, 0 100%)' }}>
                                <p className="text-[20px] sm:text-[28px] md:text-[35px]">Industries</p>
                                <p className="ml-[60px] mt-1 text-[24px] leading-[0.95] sm:text-[42px] md:text-[50px]">We Serve</p>
                            </div>
                            </div>
                        </div>
                        <div className="max-w-[1320px] px-1 pb-8 pt-5 text-[16px] leading-[1.6] text-black/80  sm:text-[18px] md:pb-10 md:text-[20px] md:leading-[1.45]">
                            <p className="mb-4 text-black/80 ">
                                At{" "}
                                <span className="font-semibold">
                                    Genotek Biochem Private Limited
                                </span>
                                , we operate at the core of innovation by delivering high-quality chemical intermediates, building blocks, and specialty compounds that power critical industries. Our focus lies in solving complex chemistry challenges where precision, purity, and scalability are essential.
                            </p>
                            <p className="mb-4">
                                We partner with organizations across {" "}
                                <span className="font-semibold">
                                    Pharmaceuticals, Agrochemicals, Specialty Chemicals, Material Sciences, and more
                                </span> 
                                , supporting {" "}
                                <span className="font-semibold">
                                    Research, Development, and Manufacturing of Intermediates
                                </span>
                                . By combining deep scientific expertise with flexible execution, we enable faster development cycles, reliable scale-up, and consistent quality across applications.
                            </p>
                        </div>
                        <div className="px-4 ">
                            {/* INDUSTRY CAROUSEL */}
                            <div className="mx-auto flex max-w-[1080px] items-center justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={slideLeft}
                                    aria-label="Show previous industries"
                                    className="flex h-[155px] w-[28px] shrink-0 cursor-pointer items-center justify-center rounded-[10px] border-2 border-[#2f5d8f] bg-white text-[#2f5d8f] transition hover:bg-[#eef7fb] focus:outline-none"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="h-0 w-0 border-y-[8px] border-r-[11px] border-y-transparent border-r-[#2f5d8f]"
                                    />
                                </button>

                                <div
                                    className="max-w-[1020px] flex-1 overflow-hidden [--industry-gap:0.25rem] [--industry-slide-distance:calc(50%_+_(var(--industry-gap)/2))] md:[--industry-slide-distance:calc(20%_+_(var(--industry-gap)*0.8))]"
                                >
                                    <div
                                        className={`flex gap-1 ${isSliding ? "transition-transform duration-500 ease-in-out" : ""}`}
                                        style={{ transform: `translateX(${trackOffset})` }}
                                        onTransitionEnd={finishSlide}
                                    >
                                        {trackIds.map((id, index) => renderIndustryCard(getIndustry(id), index))}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={slideRight}
                                    aria-label="Show next industries"
                                    className="flex h-[155px] w-[28px] shrink-0 cursor-pointer items-center justify-center rounded-[10px] border-2 border-[#2f5d8f] bg-white text-[#2f5d8f] transition hover:bg-[#eef7fb] focus:outline-none"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="h-0 w-0 border-y-[8px] border-l-[11px] border-y-transparent border-l-[#2f5d8f]"
                                    />
                                </button>
                            </div>
                            {/* CONTENT */} 
                            <div className=" mt-12 mx-auto text-left">
                                {/* 1 */}
                                {active === 1 && (
                                    <div className="ml-0 md:ml-10">
                                        <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                            Pharmaceuticals
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            We support pharmaceutical research and drug development by supplying critical intermediates and compounds required across the development lifecycle, from discovery to commercialization.
                                        </p>
                                        <ul className="mt-4 list-disc pl-12 space-y-2 text-[16px] text-black/80 sm:text-[18px]">
                                            <li>Key Starting Materials (KSMs) and intermediates</li>
                                            <li>Impurities and reference standards</li>
                                            <li>Custom synthesis for drug discovery</li>
                                            <li>Scalable solutions from lab to manufacturing</li>
                                        </ul>
                                    </div>
                                )}
                                {/* 2 */}
                                {active === 2 && (
                                    <div className="ml-0 md:ml-10">
                                        <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                            Agrochemicals
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            Our solutions enable the development of advanced agrochemical formulations used in crop protection and agricultural productivity, with a focus on efficiency and sustainability.
                                        </p>
                                        <ul className="mt-4 list-disc pl-12 space-y-2 text-[16px] text-black/80 sm:text-[18px]">
                                            <li>Intermediates for crop protection chemicals</li>
                                            <li>Scalable and cost-effective synthesis</li>
                                            <li>Support for formulation development</li>
                                            <li>Emphasis on sustainable and green chemistry</li>
                                        </ul>
                                    </div>
                                )}
                                {/* 3 */}
                                {active === 3 && (
                                    <div className="ml-0 md:ml-10">
                                        <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                            Flavours & Fragrances
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            We provide high-purity intermediates and specialty molecules used in the creation of flavour and fragrance ingredients, ensuring consistency and performance.
                                        </p>
                                        <ul className="mt-4 list-disc pl-12 space-y-2 text-[16px] text-black/80 sm:text-[18px]">
                                            <li>Custom-synthesized aroma intermediates</li>
                                            <li>High-purity specialty compounds</li>
                                            <li>Consistent quality for formulation stability</li>
                                            <li>Reliable supply for production needs</li>
                                        </ul>
                                    </div>
                                )}
                                {/* 4 */}
                                {active === 4 && (
                                    <div className="ml-0 md:ml-10">
                                        <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                            Cosmeceuticals
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            In the cosmeceutical and personal care industry, we support innovation by delivering high-quality chemical precursors used in advanced formulations.
                                        </p>
                                        <ul className="mt-4 list-disc pl-12 space-y-2 text-[16px] text-black/80 sm:text-[18px]">
                                            <li>Intermediates for skincare and personal care</li>
                                            <li>Functional ingredient precursors</li>
                                            <li>High purity and consistency</li>
                                            <li>Support for product innovation</li>
                                        </ul>
                                    </div>
                                )}
                                {/* 5 */}
                                {active === 5 && (
                                    <div className="ml-0 md:ml-10">
                                        <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                            Material Sciences
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            At Genotek Biochem Private Limited, we support innovation in material science by developing and supplying high-quality chemical intermediates, building blocks, and specialty compounds that form the foundation of advanced materials. Our expertise lies in enabling the design and synthesis of next-generation materials used in coatings, polymers, functional surfaces, and high-performance applications. By combining deep chemistry knowledge with scalable processes, we help translate conceptual material designs into reliable, reproducible, and commercially viable solutions.
                                        </p>
                                        <ul className="mt-4 list-disc pl-12 space-y-2 text-[16px] text-black/80 sm:text-[18px]">
                                            <li className="font-bold">Semiconductors</li>
                                            <p>
                                                High-purity intermediates and specialty chemicals for semiconductor manufacturing, including applications in deposition processes, etching chemistries, and advanced electronic materials, with strict control on purity and reproducibility.
                                            </p>
                                            <li className="font-bold">OLED Chemicals</li>
                                            <p>
                                                Specialized intermediates and organic building blocks for OLED materials used in display and lighting technologies, enabling high-performance emissive layers with consistent quality and scalable synthesis.
                                            </p>
                                        </ul>
                                    </div>
                                )}
                                {/* 6 */}
                                {active === 6 && (
                                    <div className="ml-0 md:ml-10">
                                        <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                            Specialty Chemicals
                                        </h2>
                                        <p className="mt-3 text-[18px] text-[#42556c]">
                                            We develop and manufacture fine and specialty chemical intermediates for a wide range of industrial applications, with strong capabilities in complex chemistries.
                                        </p>
                                        <ul className="mt-4 list-disc pl-12 space-y-2 text-[16px] text-black/80 sm:text-[18px]">
                                            <li>Custom chemical intermediates</li>
                                            <li>Expertise in multi-step synthesis</li>
                                            <li>Consistent quality across scales</li>
                                            <li>Solutions tailored to industrial applications</li>
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
export default Industry;
