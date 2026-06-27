import { useState } from 'react'
import axios from 'axios'
import { FiDownload, FiX } from 'react-icons/fi'

const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000'

function GatedPdfModal({ document, onClose }) {
    const [showForm, setShowForm] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [form, setForm] = useState({ name: '', organization: '', email: '', number: '' })

    if (!document) return null

    const hasSubmitted = () =>
        window.document.cookie.split('; ').some((cookie) => cookie.startsWith('genotekPdfFormSubmitted='))

    const downloadPdf = async () => {
        const response = await axios.get(document.url, { responseType: 'blob' })
        const blobUrl = URL.createObjectURL(response.data)
        const link = window.document.createElement('a')
        link.href = blobUrl
        link.download = `${document.title}.pdf`
        window.document.body.appendChild(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(blobUrl)
    }

    const handleDownload = async () => {
        if (!hasSubmitted()) {
            setShowForm(true)
            return
        }

        try {
            await axios.post(`${serverUrl}/api/pdf-download-forms/download`, {
                productId: document.productId || undefined,
                documentName: document.title,
                documentContext: document.context || '',
                documentFileName: document.fileName || '',
            }, { withCredentials: true })
            await downloadPdf()
        } catch (downloadError) {
            if (downloadError.response?.status === 401) {
                window.document.cookie = 'genotekPdfFormSubmitted=; max-age=0; path=/; samesite=lax'
                setShowForm(true)
                return
            }
            setError('Unable to download the PDF. Please try again.')
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            await axios.post(`${serverUrl}/api/pdf-download-forms`, {
                ...form,
                productId: document.productId || undefined,
                documentName: document.title,
                documentContext: document.context || '',
                documentFileName: document.fileName || '',
            }, { withCredentials: true })
            window.document.cookie = 'genotekPdfFormSubmitted=true; max-age=31536000; path=/; samesite=lax'
            setShowForm(false)
            await downloadPdf()
        } catch (submitError) {
            setError(submitError.response?.data?.message || 'Unable to submit the form. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="PDF preview">
            <div className="relative flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden bg-white shadow-xl">
                <div className="flex items-center justify-between gap-3 border-b border-[#d7e5ee] px-4 py-3">
                    <p className="min-w-0 truncate font-semibold text-[#214f86]">{document.title}</p>
                    <div className="flex shrink-0 items-center gap-2">
                        <button type="button" onClick={handleDownload} className="inline-flex h-10 cursor-pointer items-center gap-2 bg-[#214f86] px-4 text-[13px] font-semibold text-white hover:bg-[#173d68]">
                            <FiDownload /> Download
                        </button>
                        <button type="button" onClick={onClose} className="flex h-10 w-10 cursor-pointer items-center justify-center bg-[#eef5f9] text-[20px] text-[#214f86]" aria-label="Close PDF">
                            <FiX />
                        </button>
                    </div>
                </div>
                <iframe src={`${document.url}#toolbar=0&navpanes=0&scrollbar=1`} title={`${document.title} PDF`} className="min-h-0 flex-1 border-0" />

                {showForm ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 p-4">
                        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-5 shadow-xl sm:p-7">
                            <h2 className="text-[24px] font-semibold text-[#214f86]">Download PDF</h2>
                            <p className="mt-2 text-[14px] text-[#526b80]">Please share your details to continue.</p>
                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                {[['name', 'Name', 'text'], ['organization', 'Organization', 'text'], ['email', 'Email', 'email'], ['number', 'Mobile', 'tel']].map(([field, label, type]) => (
                                    <label key={field} className="text-[13px] font-semibold text-[#526b80]">
                                        {label}
                                        <input required type={type} value={form[field]} onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))} className="mt-2 h-11 w-full border border-[#d7e5ee] px-3 text-[14px] outline-none focus:border-[#214f86]" />
                                    </label>
                                ))}
                            </div>
                            {error ? <p className="mt-4 text-[13px] text-red-600">{error}</p> : null}
                            <div className="mt-6 flex justify-end gap-3">
                                <button type="button" onClick={() => setShowForm(false)} className="h-11 cursor-pointer border border-[#d7e5ee] px-4 text-[14px] font-semibold text-[#526b80]">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="h-11 cursor-pointer bg-[#214f86] px-5 text-[14px] font-semibold text-white disabled:opacity-60">
                                    {isSubmitting ? 'Submitting...' : 'Submit & Download'}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default GatedPdfModal
