import Navabar from './components/Navabar'
import Sidebar from './components/Sidebar'
import RushabGohilImage from '../assets/aboutTeam/rushab-gohil.png'
import HiteshGandhiImage from '../assets/aboutTeam/hitesh-gandhi.png'
import hero from '../assets/aboutTeam/hero.png'
import Footer from './components/Footer'

function AboutTeam() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />
        
            <main className="w-full px-4 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />
             
                    <div className="flex-1">
                        <div className="relative flex flex-col gap-[10px] md:flex-row">
                            <div className="relative h-[280px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[360px] md:h-[500px]">
                                <img
                                    src={hero}
                                    alt="The Genotek Story"
                                    className="h-full w-full object-cover"
                                />
             
                                <div
                                    className="absolute bottom-[50px] left-0 z-[4] -translate-y-[80px] w-[min(92%,320px)] bg-[#2b4f7c] px-5 py-2.5 text-white shadow-lg sm:bottom-[60px] sm:w-[min(88%,420px)] sm:px-8 sm:py-3 md:bottom-[80px] md:w-auto md:px-15"
                                    style={{
                                        clipPath: 'polygon(0 0, 100% 0, 100% 55%, 90% 100%, 0 100%)',
                                    }}
                                >
                                    <p className="text-[20px] leading-[1.0] font-normal sm:text-[28px] md:text-[35px]">
                                        Genotek
                                    </p>

                                    <p className="mt-1 ml-[60px] text-[24px] leading-[0.95] font-normal sm:text-[42px] md:text-[50px]">
                                        Team.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="px-1 pt-8 sm:pt-12 md:pt-20">
                            {/* <div className="grid items-start gap-6 md:gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[300px_minmax(0,1fr)]"> */}
                            {/* person-1 */}
                            <div className="lg:ml-10">
                                <div 
                                    className="overflow-hidden"
                                    style={{
                                        clipPath: 'polygon(0 0, 100% 0, 100% 72%, 86% 100%, 0 100%)',
                                    }}
                                >
                                    {/* <img
                                        src={RushabGohilImage}
                                        alt="Rushal Gohil"
                                        className="h-[180px] w-full object-cover sm:h-[100px] md:h-[280px]"
                                    /> */}
                                </div>
             
                                <div className="pr-0 lg:pr-8 xl:pr-32">
                                    <h2 className="text-[26px] font-semibold leading-tight text-[#5a92b6] sm:text-[32px] md:text-[35px]">
                                        Rushab Gohil
                                    </h2>
                                    <h4 className='mt-3 text-[20px] text-gray-500 sm:text-[20px] md:mt-4 md:text-[25px]'>Founder & CEO</h4>
                                    <p className="mt-4 max-w-[900px] text-[16px] leading-[1.7] text-black/80 text-left sm:text-[18px] md:text-[20px] md:text-justify">
                                        Rushabh Gohil is an emerging leader known for his strategic thinking and execution-driven approach. With a strong focus on building arelationships and driving business outcomes, he brings a balanced perspective of operational discipline and growth ambition. He plays a key role in enabling customerfocused solutions, contributing to scalable success and long-term value creation in dynamic and competitive environments.
                                    </p>
                                    
                                </div>
                            </div>
            
                            <div className="relative mx-auto mb-5 mt-5 h-[20px] w-[92%] sm:mb-7 sm:mt-7 md:mb-8 md:mt-8 md:w-[90%]">
                                <span className="absolute left-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px]" />
                                <span className="absolute right-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px]" />
                                <span className="absolute left-[14px] right-[14px] top-1/2 h-px -translate-y-1/2 bg-[#a5becc]" />
                            </div>
                            {/* person-2*/}
                            <div className="lg:ml-10">
                                <div 
                                    className="overflow-hidden"
                                    style={{
                                        clipPath: 'polygon(0 0, 100% 0, 100% 72%, 86% 100%, 0 100%)',
                                    }}
                                >
                                    {/* <img
                                        src={RushabGohilImage}
                                        alt="Rushal Gohil"
                                        className="h-[180px] w-full object-cover sm:h-[100px] md:h-[280px]"
                                    /> */}
                                </div>
                                
                                <div className="pr-0 lg:pr-8 xl:pr-32">
                                    <h2 className="text-[26px] font-semibold leading-tight text-[#5a92b6] sm:text-[32px] md:text-[35px]">
                                        Nisarg Gohil
                                    </h2>
                                    <h4 className='mt-3 text-[16px] text-gray-500 sm:text-[18px] md:mt-4 md:text-[25px]'>Co-founder & COO</h4>
                                    <p className="mt-4 max-w-[900px] text-[16px] leading-[1.7] text-black/80 text-left sm:text-[18px] md:text-[20px] md:text-justify">
                                        Nisarg Gohil is a biotechnology professional with Genotek Biochem in India, supported by a strong academic background and international exposure, including at Cornell University. Based in Mumbai, he is active in the life sciences sector and maintains a large professional network. His profile reflects a blend of scientific expertise, global perspective, and industry engagement.
                                    </p>
                                </div>
                            </div>
            
                            <div className="relative mx-auto mb-5 mt-5 h-[20px] w-[92%] sm:mb-7 sm:mt-7 md:mb-8 md:mt-8 md:w-[90%]">
                                <span className="absolute left-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px]" />
                                <span className="absolute right-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px]" />
                                <span className="absolute left-[14px] right-[14px] top-1/2 h-px -translate-y-1/2 bg-[#a5becc]" />
                            </div>
                            {/* person-3 */}
                            <div className="lg:ml-10">
                                <div 
                                    className="overflow-hidden"
                                    style={{
                                        clipPath: 'polygon(0 0, 100% 0, 100% 72%, 86% 100%, 0 100%)',
                                    }}
                                >
                                    {/* <img
                                        src={RushabGohilImage}
                                        alt="Rushal Gohil"
                                        className="h-[180px] w-full object-cover sm:h-[100px] md:h-[280px]"
                                    /> */}
                                </div>

                                <div className="pr-0 lg:pr-8 xl:pr-32">
                                    <h2 className="text-[26px] font-semibold leading-tight text-[#5a92b6] sm:text-[32px] md:text-[35px]">
                                        Hitesh Gandhi
                                    </h2>
                                    <h4 className='mt-3 text-[16px] text-gray-500 sm:text-[18px] md:mt-4 md:text-[25px]'>President- Marketing & Projects</h4>
                                    <p className="mt-4 max-w-[900px] text-[16px] leading-[1.7] text-black/80 text-left sm:text-[18px] md:text-[20px] md:text-justify">
                                        Hitesh is a results-driven leader in the pharmaceutical and CDMO sector, recognized for shaping growth strategies and building strong global partnerships. Combining commercial acumen with industry expertise, he drives execution-focused teams to deliver customer-centric solutions. His leadership emphasizes innovation, agility, and long-term value creation, enabling organizations to scale effectively and succeed in competitive, evolving markets.
                                    </p>
                                </div>
                            </div>
            
             
                            {/* <div className="mt-8 grid items-start gap-6 md:mt-10 md:gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10 lg:pr-8 xl:grid-cols-[minmax(0,1fr)_300px] xl:pr-32">
                                <div className="pt-2 text-left md:pt-4 lg:pl-6 lg:text-right xl:pl-16">
                                    <h2 className="text-[28px] font-semibold leading-none text-[#5a92b6] sm:text-[32px] md:text-[35px]">
                                        Hitesh Gandhi
                                    </h2>
                                    <h4 className='mt-3 text-[16px] text-gray-500 sm:text-[18px] md:mt-4 md:text-[20px]'>President - Marketing & Projects</h4>
                                    <p className="mx-auto mt-4 max-w-[980px] text-[16px] leading-[1.7] text-black/80 text-left sm:text-[18px] md:text-[20px] md:text-justify">
                                        Hitesh is a results-driven leader in the pharmaceutical and CDMO sector, recognized for shaping growth strategies and building strong global partnerships. Combining commercial acumen with industry expertise, he drives execution-focused teams to deliver customer-centric solutions. His leadership emphasizes innovation, agility, and long-term value creation, enabling organizations to scale effectively and succeed in competitive, evolving markets.
                                    </p>
                                </div>

                                <div
                                    className="overflow-hidden"
                                    style={{
                                        clipPath: 'polygon(0 0, 100% 0, 100% 72%, 86% 100%, 0 100%)',
                                    }}
                                >
                                    <img
                                        src={HiteshGandhiImage}
                                        alt="What we do"
                                        className="h-[180px] w-full object-cover sm:h-[100px] md:h-[280px]"
                                    />
                                </div> 
                            </div> */}
                        </div>
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AboutTeam
