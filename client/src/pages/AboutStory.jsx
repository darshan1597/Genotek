import Navabar from './components/Navabar'
import Sidebar from './components/Sidebar'
import hero from '../assets/aboutStory/hero.jpg'
import whatWeDoImage from '../assets/aboutStory/what-we-do.jpg'
import WhoWeAreImage from '../assets/aboutStory/who-we-are.jpg'
import WhyChooseUsImage from '../assets/aboutStory/why-choose-us.jpg'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'

function AboutStory() {
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
                                    Story.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-[1320px] px-1 pb-8 pt-5 text-[16px] leading-[1.6] text-black sm:text-[18px] md:pb-10 md:text-[20px] md:leading-[1.45]">
                            <p>
                                At Genotek Biochem Private Limited, we believe that true progress in science comes from balancing scale with sensitivity. Guided by our mantra, "Big enough to deliver, small enough to care". We bring together capability and compassion in everything we do.
                            </p>
                        </div>

                        <div className="px-1 pb-10 pt-4 sm:pb-12 md:pb-14 md:pt-10">
                            <div className="grid items-start gap-6 md:gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-10">
                                <div 
                                    className="overflow-hidden"
                                    style={{
                                        clipPath: 'polygon(0 0, 100% 0, 100% 72%, 86% 100%, 0 100%)',
                                    }}
                                >
                                    <img
                                        src={WhoWeAreImage}
                                        alt="Who we are"
                                        className="h-[180px] w-full object-cover sm:h-[100px] md:h-[280px]"
                                    />
                                </div>

                                <div className="pr-0 lg:pr-8 xl:pr-20">
                                {/* Heading */}
                                <h2 className="text-[30px] font-semibold text-[#5a92b6] sm:text-[34px] md:text-[38px]">
                                    Who we are
                                </h2>

                                {/* Paragraph */}
                                <p className="mt-4 max-w-[900px] text-[16px] leading-[1.8] text-[#42556c] sm:text-[18px] md:text-[19px] text-justify">
                                    At Genotek Biochem Private Limited, we combine scientific capability with a human touch. We balance scale, expertise, and responsiveness to serve our partners better. We are a chemistry-driven organization committed to delivering reliable, high-quality solutions while building meaningful, long-term relationships.
                                </p>

                                {/* Bullet Points */}
                                <ul className="mt-4 list-disc pl-6 space-y-2 text-[16px] text-[#42556c] sm:text-[18px]">
                                    <li>Science-driven company rooted in chemistry excellence</li>
                                    <li>Strong technical expertise with scalable infrastructure</li>
                                    <li>Agile, responsive, and client-focused approach</li>
                                    <li>Team of passionate scientists and problem-solvers</li>
                                    <li>Commitment to responsible, high-impact innovation</li>
                                </ul>

                                {/* Tagline */}
                                <p className="mt-5 italic text-[15px] text-[#42556c] sm:text-[17px]">
                                    Big enough to deliver, small enough to care
                                </p>

                                {/* Link */}
                                <Link to="/about/team">
                                    <p className="mt-4 inline-block text-[18px] font-semibold text-[#5a92b6] underline underline-offset-4 sm:text-[20px] md:text-[22px]">
                                    Our Team
                                    </p>
                                </Link>
                                </div>
                            </div>

                            <div className="relative mx-auto mt-10 h-[20px] w-[92%] sm:mt-14 md:mt-16 md:w-[90%]">
                                <span className="absolute left-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px]" />
                                <span className="absolute right-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px]" />
                                <span className="absolute left-[14px] right-[14px] top-1/2 h-px -translate-y-1/2 bg-[#a5becc]" />
                            </div>

                            
                            <div className="mt-8 grid items-start gap-8 md:mt-10 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_520px] lg:gap-12 xl:gap-16">

                                {/* LEFT CONTENT */}
                                <div className="max-w-[700px] text-left lg:pl-10 xl:pl-16">
                                    
                                    <h2 className="text-[28px] font-semibold text-[#5a92b6] sm:text-[32px] md:text-[36px]">
                                    What we do
                                    </h2>

                                    <p className="mt-4 text-[16px] leading-[1.7] text-[#42556c] sm:text-[18px] md:text-[19px] text-justify">
                                    At Genotek Biochem Private Limited, we enable innovation from concept to commercialization. 
                                    As a Research, Development, and Manufacturing partner, we provide integrated, scalable 
                                    solutions across industries including pharmaceuticals, agrochemicals, and material sciences.
                                    </p>

                                    <ul className="mt-5 list-disc space-y-2 pl-5 text-[16px] text-[#42556c] sm:text-[17px] md:text-[18px]">
                                    <li>Custom synthesis, process development & scale-up</li>
                                    <li>Analytical and method development capabilities</li>
                                    <li>FTE/FFS-based research services</li>
                                    <li>Supply of fine & specialty chemicals, catalysts, and compounds</li>
                                    <li>Scalable solutions from milligram to multi-tonne production</li>
                                    <li>Focus on green chemistry and sustainable processes</li>
                                    <li>Collaborative, flexible engagement models with fast turnaround</li>
                                    </ul>

                                    <p className="mt-4 italic text-[15px] text-[#6b7c8f]">
                                    Driven by Innovation, defined by quality
                                    </p>

                                </div>




                                <div
                                    className="overflow-hidden "
                                    style={{
                                        clipPath: 'polygon(0 0, 100% 0, 100% 72%, 86% 100%, 0 100%)',
                                    }}
                                >
                                    <img
                                        src={whatWeDoImage}
                                        alt="What we do"
                                        className="h-[180px] w-10px object-cover sm:h-[100px] md:h-[280px] mr-20px"
                                    />
                                </div>
                                </div>
                        

                            <div className="relative mx-auto mt-10 h-[20px] w-[92%] sm:mt-14 md:mt-16 md:w-[90%]">
                                <span className="absolute left-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px]" />
                                <span className="absolute right-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px]" />
                                <span className="absolute left-[14px] right-[14px] top-1/2 h-px -translate-y-1/2 bg-[#a5becc]" />
                            </div>
                        </div>
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AboutStory
