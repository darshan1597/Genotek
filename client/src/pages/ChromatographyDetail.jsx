import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FiFileText } from "react-icons/fi";
import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import GatedPdfModal from "./components/GatedPdfModal";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

const imageUrl = (folder, asset) => asset?.name ? `${serverUrl}/${folder}/${asset.name}` : "";
const pdfDocument = (document, context) => ({
    title: document.title,
    url: `${serverUrl}/chromatographyPdfs/${document.name}`,
    context,
});

function PdfButtons({ documents = [], context, onSelect }) {
    if (!documents.length) return null;

    return (
        <div className="mt-6 flex flex-wrap gap-4">
            {documents.filter((document) => document.name).map((document) => (
                <button
                    key={`${document.title}-${document.name}`}
                    type="button"
                    onClick={() => onSelect(pdfDocument(document, context))}
                    className="group flex min-h-[96px] w-full cursor-pointer items-center gap-4 rounded-lg border-2 border-[#5790aa] bg-white px-4 py-3 text-left transition hover:border-[#214f86] hover:shadow-[0_10px_24px_rgba(33,79,134,0.15)] sm:w-[360px]"
                >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#5790aa] text-white transition group-hover:bg-[#214f86]">
                        <FiFileText className="text-[25px]" />
                    </span>
                    <span className="min-w-0">
                        <span className="block text-[16px] font-semibold leading-6 text-[#214f86]">
                            {document.title || "Document"}
                        </span>
                        <span className="mt-1 block text-[13px] text-[#526b80]">Open PDF</span>
                    </span>
                </button>
            ))}
        </div>
    );
}

function ContentSections({ text, points = [], extraSections = [] }) {
    return (
        <>
            {text ? <p className="mb-4 text-black/80">{text}</p> : null}
            {points.length ? (
                <ul className="list-disc space-y-3 pl-6 sm:pl-12">
                    {points.map((point, index) => (
                        <li key={`${point}-${index}`}>
                            <span className="text-black/80">{point}</span>
                        </li>
                    ))}
                </ul>
            ) : null}
            {extraSections.map((section, index) => (
                <div key={`${section.text}-${index}`}>
                    {section.text ? <p className="mb-4 mt-4 text-black/80">{section.text}</p> : null}
                    {section.points?.length ? (
                        <ul className="list-disc space-y-3 pl-6 sm:pl-12">
                            {section.points.map((point, pointIndex) => (
                                <li key={`${point}-${pointIndex}`}>
                                    <span className="text-black/80">{point}</span>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            ))}
        </>
    );
}

function ChromatographyDetail() {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [active, setActive] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`${serverUrl}/api/chromatography-categories/${slug}`);
                setCategory(data.category || null);
                setActive(null);
            } catch (error) {
                console.error("Error loading chromatography category:", error);
                setCategory(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategory();
    }, [slug]);

    const bannerLines = category?.bannerLines?.length ? category.bannerLines : [category?.name || ""];
    const categoryImage = imageUrl("chromatographyImages", category?.bannerImage);

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />
            <main className="w-full px-4 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />
                    <div className="flex-1">
                        <nav aria-label="Breadcrumb" className="mb-3 px-1">
                            <div className="flex items-center gap-2 text-[14px] text-gray-500">
                                <Link to="/products/chromatography-solutions" className="hover:text-[#214f86]">
                                    Chromatography Solutions
                                </Link>
                                <span>&gt;</span>
                                <span className="font-semibold text-[#214f86]">
                                    {category?.name || "Category"}
                                </span>
                            </div>
                        </nav>

                        {isLoading ? (
                            <div className="flex min-h-[360px] items-center justify-center text-[#526b80]">
                                Loading chromatography page...
                            </div>
                        ) : category ? (
                            <>
                                <div className="relative flex flex-col gap-[10px] md:flex-row">
                                    <div
                                        className="relative h-[280px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[360px] md:h-[520px]"
                                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 92% 100%, 0 100%)" }}
                                    >
                                        {categoryImage ? (
                                            <img src={categoryImage} alt={category.name} className="h-full w-full object-cover" />
                                        ) : null}
                                        <div
                                            className="absolute bottom-[40px] left-0 z-[4] bg-[#2b4f7c] px-5 py-2.5 text-white shadow-lg sm:bottom-[135px] sm:px-8 sm:py-3 md:bottom-[60px] md:px-15"
                                            style={{ clipPath: "polygon(0 0, 100% 0, 100% 55%, 90% 100%, 0 100%)" }}
                                        >
                                            <p className="text-[20px] leading-[1.0] font-normal sm:text-[28px] md:text-[35px]">
                                                {bannerLines[0]}
                                            </p>
                                            {bannerLines[1] ? (
                                                <p className="ml-[30px] mt-1 text-[24px] leading-[0.95] font-normal sm:text-[42px] md:text-[50px]">
                                                    {bannerLines[1]}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>

                                <section className="max-w-[1320px] px-1 pb-8 pt-5 text-[16px] leading-[1.6] text-black/80 sm:text-[18px] md:pb-10 md:text-[20px] md:leading-[1.45]">
                                    {category.heading ? (
                                        <p className="mb-4 font-semibold text-[19px] sm:text-[21px] md:text-[23px]">
                                            {category.heading}
                                        </p>
                                    ) : null}
                                    <ContentSections text={category.text} points={category.points} extraSections={category.extraSections} />
                                    {!category.hasSubcategories ? (
                                        <PdfButtons documents={category.documents} context={category.name} onSelect={setSelectedPdf} />
                                    ) : null}
                                </section>

                                {category.hasSubcategories ? (
                                    <div className="px-4">
                                        <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-1 md:grid-cols-5">
                                            {category.subcategories.map((subcategory, index) => (
                                                <div key={subcategory._id || subcategory.heading} className="text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => setActive(active === index ? null : index)}
                                                        className="flex h-[165px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg p-1 sm:p-2 md:h-[185px]"
                                                    >
                                                        <img
                                                            src={imageUrl("chromatographyImages", subcategory.image)}
                                                            alt={subcategory.heading}
                                                            className={`h-full w-full object-contain transition duration-300 hover:opacity-80 ${
                                                                active === index ? "scale-[1.04] opacity-100" : active !== null ? "scale-100 opacity-40 hover:opacity-75" : "scale-100 opacity-100"
                                                            }`}
                                                        />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mx-auto mt-12 text-left">
                                            {active !== null && category.subcategories[active] ? (
                                                <div className="ml-0 md:ml-10">
                                                    <h2 className="text-[28px] font-semibold text-[#5a92b6]">
                                                        {category.subcategories[active].heading}
                                                    </h2>
                                                    <div className="mt-3 text-[18px] text-[#42556c]">
                                                        <ContentSections
                                                            text={category.subcategories[active].text}
                                                            points={category.subcategories[active].points}
                                                            extraSections={category.subcategories[active].extraSections}
                                                        />
                                                    </div>
                                                    <PdfButtons
                                                        documents={category.subcategories[active].documents}
                                                        context={category.subcategories[active].heading}
                                                        onSelect={setSelectedPdf}
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                ) : null}
                            </>
                        ) : (
                            <div className="flex min-h-[360px] items-center justify-center text-[#526b80]">
                                Chromatography page not found.
                            </div>
                        )}

                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
            <GatedPdfModal document={selectedPdf} onClose={() => setSelectedPdf(null)} />
        </div>
    );
}

export default ChromatographyDetail;
