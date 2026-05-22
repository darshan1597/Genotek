import { useEffect, useState } from 'react'
import { FiLock, FiMail } from 'react-icons/fi'
import { Navigate, useNavigate } from 'react-router-dom'
import Navabar from './components/Navabar'
import { useAdminAuth } from './context/AdminAuthContext'
import axios from "axios"
import { serverUrl } from '../App'

function Login() {
    const navigate = useNavigate()
    const { setAdmin } = useAdminAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSignIn = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const result = await axios.post(`${serverUrl}/api/auth/admin/admin-signin`, { email, password }, {withCredentials: true})

            setAdmin(result.data.admin || result.data)

            setError("")
            navigate("/admin-panel")
        } catch (error) {
            setError(error?.response?.data?.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
            <main className="pb-10">
                <Navabar />
                <section className="mx-auto grid min-h-[calc(100vh-300px)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_440px]">
                    <div className="max-w-2xl px-3">
                        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6a9ab1]">
                            Admin Access
                        </p>
                        <h1 className="text-[34px] font-semibold leading-tight text-[#214f86] sm:text-[44px]">
                            Genotek control center
                        </h1>
                        <p className="mt-4 max-w-xl text-[16px] leading-7 text-[#526b80]">
                            Sign in to manage website content, enquiries, product updates, and internal admin workflows.
                        </p>
                        <div className="mt-8 h-[3px] w-32 bg-[#6d9eb7]" />
                    </div>

                    <form
                        onSubmit={handleSignIn}
                        className="border border-[#d7e5ee] bg-white p-6 shadow-[0_18px_45px_rgba(33,79,134,0.13)] sm:p-8"
                    >
                        <div className="mb-7">
                            <h2 className="text-[24px] font-semibold text-[#214f86]">Admin Login</h2>
                            <p className="mt-2 text-[14px] leading-6 text-[#668095]">
                                Use your admin email and password to continue.
                            </p>
                        </div>

                        <label className="mb-5 block">
                            <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">Email</span>
                            <span className="flex h-13 items-center border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 focus-within:border-[#214f86]">
                                <FiMail className="mr-3 shrink-0 text-[20px] text-[#6a9ab1]" />
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    autoComplete="email"
                                    className="w-full bg-transparent text-[15px] text-[#23384d] outline-none placeholder:text-[#98aab8]"
                                    placeholder="admin@genotekbio.com"
                                    required
                                />
                            </span>
                        </label>

                        <label className="mb-4 block">
                            <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">Password</span>
                            <span className="flex h-13 items-center border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 focus-within:border-[#214f86]">
                                <FiLock className="mr-3 shrink-0 text-[20px] text-[#6a9ab1]" />
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    className="w-full bg-transparent text-[15px] text-[#23384d] outline-none placeholder:text-[#98aab8]"
                                    placeholder="Enter password"
                                    required
                                />
                            </span>
                        </label>

                        {error ? (
                            <p className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
                                {error}
                            </p>
                        ) : null}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 h-13 w-full bg-[#214f86] px-5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#173d68] cursor-pointer"
                        >
                            {isSubmitting ? 'Logging in...' : 'Login to Dashboard'}
                        </button>
                    </form>
                </section>
            </main>
    )
}

export default Login
