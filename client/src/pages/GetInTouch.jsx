import { FiSend } from 'react-icons/fi'
import Navabar from './components/Navabar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

function GetInTouch() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Navabar />

            <main className="w-full px-4 pb-6 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
                <section className="mb-5 flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">

                    <Sidebar />

                    <div className="flex-1">
                        <div className="mx-auto max-w-[820px]">
                            <div className="mb-6 text-center">
                                <p className="text-[14px] font-semibold uppercase tracking-[0.18em] text-[#5a92b6]">
                                    Contact Us
                                </p>
                                <h2 className="mt-2 text-[30px] font-semibold leading-tight text-[#214f86] sm:text-[36px]">
                                    Let's start a conversation.
                                </h2>
                                <p className="mx-auto mt-3 max-w-[620px] text-[16px] leading-[1.65] text-[#52677a]">
                                    Share your requirement and our team will get back to you with the right support for your chemistry, process, or manufacturing needs.
                                </p>
                            </div>

                            <form
                                action="https://formsubmit.co/info@genotekbio.com"
                                method="POST"
                                className="grid gap-4 rounded-[8px] border border-[#d8e5ec] bg-white p-5 shadow-[0_16px_36px_rgba(33,79,134,0.08)] sm:p-6"
                            >
                                <input type="hidden" name="_subject" value="New Genotek website enquiry" />
                                <input type="hidden" name="_template" value="table" />
                                <input type="hidden" name="_captcha" value="false" />
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <label className="block">
                                            <span className="mb-1.5 block text-[14px] font-medium text-[#214f86]">Name</span>
                                            <input
                                                type="text"
                                                name="Name"
                                                required
                                                className="h-[46px] w-full rounded-[6px] border border-[#bdd4e2] bg-white px-4 text-[15px] text-[#214f86] outline-none transition focus:border-[#5a92b6] focus:ring-2 focus:ring-[#d7e8f1]"
                                            />
                                        </label>
                                        <label className="block">
                                            <span className="mb-1.5 block text-[14px] font-medium text-[#214f86]">Organization</span>
                                            <input
                                                type="text"
                                                name="Organization"
                                                className="h-[46px] w-full rounded-[6px] border border-[#bdd4e2] bg-white px-4 text-[15px] text-[#214f86] outline-none transition focus:border-[#5a92b6] focus:ring-2 focus:ring-[#d7e8f1]"
                                            />
                                        </label>
                                    </div>

                                <label className="block">
                                    <span className="mb-1.5 block text-[14px] font-medium text-[#214f86]">Email</span>
                                    <input
                                         type="email"
                                        name="Email"
                                        required
                                        className="h-[46px] w-full rounded-[6px] border border-[#bdd4e2] bg-white px-4 text-[15px] text-[#214f86] outline-none transition focus:border-[#5a92b6] focus:ring-2 focus:ring-[#d7e8f1]"
                                    />
                                </label>

                                <label className="block">
                                    <span className="mb-1.5 block text-[14px] font-medium text-[#214f86]">Subject</span>
                                    <input
                                         type="text"
                                        name="Subject"
                                        className="h-[46px] w-full rounded-[6px] border border-[#bdd4e2] bg-white px-4 text-[15px] text-[#214f86] outline-none transition focus:border-[#5a92b6] focus:ring-2 focus:ring-[#d7e8f1]"
                                    />
                                </label>

                                 <label className="block">
                                    <span className="mb-1.5 block text-[14px] font-medium text-[#214f86]">Message</span>
                                    <textarea
                                        rows="5"
                                        name="Message"
                                        required
                                        className="w-full resize-none rounded-[6px] border border-[#bdd4e2] bg-white px-4 py-3 text-[15px] text-[#214f86] outline-none transition focus:border-[#5a92b6] focus:ring-2 focus:ring-[#d7e8f1]"
                                    />
                                </label>

                                <button
                                    type="submit"
                                    className="mx-auto mt-1 inline-flex h-[48px] w-fit items-center gap-2 rounded-[6px] bg-[#214f86] px-6 text-[15px] font-semibold text-white transition hover:bg-[#173d69] cursor-pointer"
                                >
                                    <FiSend className="text-[18px]" />
                                    Submit
                                </button>
                            </form>
                        </div>

                        <Footer insetForSidebar={false} />
                    </div>

                </section>
            </main>
        </div>
    )
}

export default GetInTouch
