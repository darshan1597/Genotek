import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FiArrowLeft, FiCheckCircle, FiLock, FiMail, FiShield, FiUser } from 'react-icons/fi'
import Navabar from './components/Navabar'
import Toast from './components/Toast'
import { useAdminAuth } from './context/AdminAuthContext'
import { serverUrl } from '../App'

function Profile() {
    const { admin } = useAdminAuth()
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toast, setToast] = useState(null)

    const handleChange = (event) => {
        const { name, value } = event.target

        setPasswordData((current) => ({
            ...current,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            setToast({ message: 'Fill all password fields.', type: 'error' })
            return
        }

        if (passwordData.newPassword.length < 6) {
            setToast({ message: 'New password must be at least 6 characters.', type: 'error' })
            return
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setToast({ message: 'New passwords do not match.', type: 'error' })
            return
        }

        setIsSubmitting(true)

        try {
            const { data } = await axios.put(`${serverUrl}/api/admin/change-password`, passwordData, {
                withCredentials: true,
            })

            setToast({ message: data?.message || 'Password changed successfully.', type: 'success' })
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
        } catch (error) {
            setToast({
                message: error?.response?.data?.message || 'Failed to change password.',
                type: 'error',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#f8fbfd]">
            <Navabar />
            <main className="px-4 pb-12 md:px-6 lg:px-10">
                <section className="mx-auto max-w-6xl py-8 lg:py-10">
                    <div className="mb-8 flex flex-col gap-5 border-b border-[#d8e6ef] pb-7 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6a9ab1]">
                                Admin Account
                            </p>
                            <h1 className="text-[32px] font-semibold leading-tight text-[#214f86] sm:text-[42px]">
                                Profile
                            </h1>
                        </div>

                        <Link
                            to="/admin-panel"
                            className="inline-flex h-11 items-center justify-center gap-2 border border-[#d7e5ee] bg-white px-4 text-[14px] font-semibold text-[#214f86] transition-colors duration-200 hover:bg-[#eef5f9]"
                        >
                            <FiArrowLeft className="text-[17px]" />
                            Dashboard
                        </Link>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
                        <aside className="border border-[#d7e5ee] bg-white p-6 shadow-[0_12px_28px_rgba(33,79,134,0.08)]">
                            <div className="flex h-20 w-20 items-center justify-center bg-[#214f86] text-[34px] font-semibold uppercase text-white">
                                {admin?.name?.slice(0, 1) || 'A'}
                            </div>
                            <h2 className="mt-5 break-words text-[24px] font-semibold text-[#214f86]">
                                {admin?.name || 'Admin'}
                            </h2>
                            <p className="mt-2 text-[14px] leading-6 text-[#526b80]">
                                Manage your account details and update your login password.
                            </p>

                            <div className="mt-6 space-y-4 border-t border-[#d7e5ee] pt-5">
                                <div className="flex items-start gap-3">
                                    <FiMail className="mt-1 shrink-0 text-[19px] text-[#6a9ab1]" />
                                    <div className="min-w-0">
                                        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6a9ab1]">
                                            Email
                                        </p>
                                        <p className="mt-1 break-words text-[15px] font-semibold text-[#214f86]">
                                            {admin?.email || 'Not available'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FiShield className="mt-1 shrink-0 text-[19px] text-[#6a9ab1]" />
                                    <div>
                                        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6a9ab1]">
                                            Role
                                        </p>
                                        <p className="mt-1 text-[15px] font-semibold capitalize text-[#214f86]">
                                            {admin?.role || 'Admin'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <form
                            onSubmit={handleSubmit}
                            className="border border-[#d7e5ee] bg-white p-6 shadow-[0_18px_45px_rgba(33,79,134,0.13)] sm:p-8"
                        >
                            <div className="mb-7">
                                <h2 className="text-[24px] font-semibold text-[#214f86]">Change Password</h2>
                                <p className="mt-2 text-[14px] leading-6 text-[#668095]">
                                    Use a strong password with at least 6 characters.
                                </p>
                            </div>

                            {[
                                ['currentPassword', 'Current Password'],
                                ['newPassword', 'New Password'],
                                ['confirmPassword', 'Confirm New Password'],
                            ].map(([name, label]) => (
                                <label key={name} className="mb-5 block">
                                    <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                        {label}
                                    </span>
                                    <span className="flex h-13 items-center border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 transition-colors duration-200 focus-within:border-[#214f86]">
                                        <FiLock className="mr-3 shrink-0 text-[20px] text-[#6a9ab1]" />
                                        <input
                                            type="password"
                                            name={name}
                                            value={passwordData[name]}
                                            onChange={handleChange}
                                            className="w-full bg-transparent text-[15px] text-[#23384d] outline-none placeholder:text-[#98aab8]"
                                            placeholder={label}
                                        />
                                    </span>
                                </label>
                            ))}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex h-12 items-center justify-center gap-2 bg-[#214f86] px-5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#173d68] disabled:cursor-not-allowed disabled:bg-[#8aa7be] cursor-pointer"
                            >
                                <FiCheckCircle className="text-[18px]" />
                                {isSubmitting ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    )
}

export default Profile
