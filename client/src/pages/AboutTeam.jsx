import { useEffect, useState } from 'react'
import axios from 'axios'
import Navabar from './components/Navabar'
import Sidebar from './components/Sidebar'
import hero from '../assets/aboutTeam/hero.png'
import Footer from './components/Footer'

const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000'

function Divider() {
    return (
        <div className="relative mx-auto mt-6 h-[20px] w-[92%] sm:mt-14 md:mt-8 md:w-[90%]">
            <span className="absolute left-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px]" />
            <span className="absolute right-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 bg-[#6796b2] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px] lg:right-[88px]" />
            <span className="absolute left-[14px] right-[14px] top-1/2 h-px -translate-y-1/2 bg-[#a5becc] lg:right-[100px]" />
        </div>
    )
}

function AboutTeam() {
    const [members, setMembers] = useState([])

    useEffect(() => {
        axios.get(`${serverUrl}/api/team-members`)
            .then(({ data }) => setMembers(Array.isArray(data) ? data : []))
            .catch((error) => {
                console.error('Error loading team members:', error)
                setMembers([])
            })
    }, [])

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />
            <main className="w-full px-4 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />
                    <div className="min-w-0 flex-1">
                        <div className="relative h-[280px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[360px] md:h-[500px]">
                            <img src={hero} alt="Genotek Team" className="h-full w-full object-content" />
                            <div className="absolute bottom-[110px] left-0 z-[4] bg-[#2b4f7c] px-5 py-2.5 text-white shadow-lg sm:bottom-[135px] sm:px-8 sm:py-3 md:bottom-[200px] md:px-15" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 55%, 90% 100%, 0 100%)' }}>
                                <p className="text-[20px] sm:text-[28px] md:text-[35px]">Genotek</p>
                                <p className="ml-[60px] mt-1 text-[24px] leading-[0.95] sm:text-[42px] md:text-[50px]">Team.</p>
                            </div>
                        </div>

                        <div className="px-1 pb-10 pt-1">
                            {members.length ? members.map((member, index) => (
                                <div key={member._id}>
                                    <article className="mt-8 grid items-start gap-6 md:mt-10 md:gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-5 lg:pr-[100px] xl:pr-[150px]">
                                        <div className="w-full text-left lg:ml-10">
                                            {/* Mobile Layout */}
                                        <div className="flex items-start lg:hidden">
                                            <div className="min-w-0 pr-3">
                                                <h2 className="text-[26px] font-semibold leading-tight text-[#5a92b6]">
                                                    {member.name}
                                                </h2>

                                                <h3 className="mt-1 text-[17px] text-gray-600">
                                                    {member.role}
                                                </h3>
                                            </div>

                                            <img
                                                src={`${serverUrl}/teamImages/${member.image.name}`}
                                                alt={member.name}
                                                className="ml-8 h-28 w-24 shrink-0 object-cover"
                                                style={{
                                                    clipPath: 'polygon(0 0, 100% 0, 100% 75%, 85% 100%, 0 100%)'
                                                }}
                                            />
                                        </div>

                                        {/* Desktop Layout */}
                                        <div className="hidden lg:block">
                                            <h2 className="text-[26px] font-semibold leading-tight text-[#5a92b6] sm:text-[32px] md:text-[36px]">
                                                {member.name}
                                            </h2>

                                            <h3 className="ml-1 mt-2 text-[17px] text-gray-600 md:text-[20px]">
                                                {member.role}
                                            </h3>
                                        </div>
                                            {member.about ? <p className="mt-4 whitespace-pre-line text-[16px] leading-[1.7] text-black/80 sm:text-[18px] md:text-[19px] md:text-justify">{member.about}</p> : null}
                                            {member.bulletPoints?.length ? (
                                                <ul className="mt-4 list-disc space-y-2 pl-6 text-[16px] text-black/80 sm:pl-12 sm:text-[18px]">
                                                    {member.bulletPoints.map((point, pointIndex) => <li key={`${member._id}-${pointIndex}`}>{point}</li>)}
                                                </ul>
                                            ) : null}
                                        </div>
                                            <div className="hidden w-full overflow-hidden lg:block lg:w-[400px] lg:shrink-0">
                                                <img
                                                    src={`${serverUrl}/teamImages/${member.image.name}`}
                                                    alt={member.name}
                                                    className="w-[220px] aspect-[3/4] object-cover mx-auto"
                                                    style={{
                                                        clipPath: 'polygon(0 0, 100% 0, 100% 75%, 85% 100%, 0 100%)'
                                                    }}
                                                />
                                            </div>
                                    </article>
                                    {index < members.length - 1 ? <Divider /> : null}
                                </div>
                            )) : (
                                <p className="py-14 text-center text-[16px] text-[#526b80]">Team details will be available soon.</p>
                            )}
                        </div>
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AboutTeam
