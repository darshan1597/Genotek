import { useEffect, useState } from 'react'
import axios from 'axios'
import { FiArrowLeft, FiDownload } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Navabar from './components/Navabar'
import Toast from './components/Toast'
import { serverUrl } from '../App'

function ViewForms() {
    const [forms, setForms] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [toast, setToast] = useState(null)

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const { data } = await axios.get(`${serverUrl}/api/pdf-download-forms`, { withCredentials: true })
                setForms(Array.isArray(data) ? data : [])
            } catch (error) {
                setToast({ type: 'error', message: error.response?.data?.message || 'Unable to load forms.' })
            } finally {
                setIsLoading(false)
            }
        }

        fetchForms()
    }, [])

    return (
        <div className="min-h-screen bg-[#f8fbfd]">
            <Navabar />
            <main className="px-4 pb-12 md:px-6 lg:px-10">
                <section className="mx-auto max-w-7xl py-8">
                    <div className="flex flex-col gap-4 border-b border-[#d8e6ef] pb-7 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6a9ab1]">Submissions</p>
                            <h1 className="mt-2 text-[32px] font-semibold text-[#214f86] sm:text-[42px]">View Forms</h1>
                        </div>
                        <Link to="/admin-panel" className="inline-flex h-11 items-center gap-2 border border-[#d7e5ee] bg-white px-4 text-[14px] font-semibold text-[#214f86]">
                            <FiArrowLeft /> Dashboard
                        </Link>
                    </div>

                    <div className="mt-7 overflow-x-auto border border-[#d7e5ee] bg-white">
                        <table className="min-w-[980px] w-full text-left">
                            <thead className="bg-[#214f86] text-[13px] font-semibold text-white">
                                <tr>
                                    {['Status', 'Name', 'Organization', 'Email', 'Number', 'Product / Document', 'CAS No. / Section', 'Date'].map((heading) => (
                                        <th key={heading} className="px-4 py-4">{heading}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr><td colSpan="8" className="px-4 py-10 text-center text-[#526b80]">Loading forms...</td></tr>
                                ) : forms.length ? (
                                    forms.map((form) => (
                                        <tr key={form._id} className="border-b border-[#d7e5ee] text-[14px] text-[#526b80]">
                                            <td className="px-4 py-4"><span className="inline-flex items-center gap-2 whitespace-nowrap font-semibold text-[#0f6b35]"><FiDownload /> PDF downloaded</span></td>
                                            <td className="px-4 py-4 font-semibold text-[#214f86]">{form.name}</td>
                                            <td className="px-4 py-4">{form.organization}</td>
                                            <td className="px-4 py-4">{form.email}</td>
                                            <td className="px-4 py-4">{form.number}</td>
                                            <td className="px-4 py-4">{form.productName}</td>
                                            <td className="px-4 py-4">{form.cas}</td>
                                            <td className="whitespace-nowrap px-4 py-4">{new Date(form.createdAt).toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="8" className="px-4 py-10 text-center text-[#526b80]">No PDF download forms yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
            {toast ? <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null}
        </div>
    )
}

export default ViewForms
