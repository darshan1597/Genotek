import Footer from './components/Footer'
import Navabar from './components/Navabar'
import Sidebar from './components/Sidebar'
import { FaSyringe } from 'react-icons/fa'
import { GiChemicalDrop, GiMolecule } from 'react-icons/gi'
import molecule from '../assets/molecule.png'

function InfoPage() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="h-[2px] w-full bg-[#6a9fba]" />
            <Navabar />

            <main className="w-full px-4 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
                    <Sidebar />

                    <div className="flex-1">
                        <div className="min-h-[420px] rounded-sm bg-[linear-gradient(180deg,#f7fbfd_0%,#eef5f8_100%)] px-6 py-12 shadow-[inset_0_0_0_1px_rgba(103,150,178,0.18)] sm:px-10 lg:px-14">
                            <div className="mx-auto flex min-h-[320px] max-w-[880px] flex-col items-center justify-center text-center">
                                <div className="relative flex h-[116px] w-[116px] items-center justify-center rounded-full border border-[#bdd4e2] bg-white shadow-[0_18px_42px_rgba(33,79,134,0.12)]">
                                    <GiMolecule className="absolute -right-3 top-1 text-[34px] text-[#6a9fba]" />
                                    <GiChemicalDrop className="absolute -left-2 bottom-3 text-[26px] text-[#5a92b6]" />
                                    {/* <FaSyringe className="-rotate-45 text-[48px] text-[#214f86]" /> */}
                                    <img src={molecule} alt="Molecule" width={"80px"} />
                                </div>

                                <div className="mt-8 h-px w-full max-w-[520px] bg-[#a5becc]" />

                                <p className="mt-7 text-[14px] font-semibold uppercase tracking-[0.18em] text-[#5a92b6]">
                                    Chemistry in progress
                                </p>
                                <h1 className="mt-3 text-[30px] font-semibold leading-tight text-[#214f86] sm:text-[38px]">
                                    Stay Tuned!
                                </h1>
                                <p className="mt-4 max-w-[640px] text-[16px] leading-[1.7] text-[#52677a] sm:text-[18px]">
                                    Our team is preparing detailed information on <br /> Genotek&apos;s capabilities,
                                    technologies and solutions.
                                </p>
                            </div>
                        </div>
                        <Footer insetForSidebar={false} />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default InfoPage
