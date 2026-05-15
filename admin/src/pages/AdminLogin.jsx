import { useEffect, useState } from 'react'
import { FiLock, FiMail } from 'react-icons/fi'
import { Navigate, useNavigate } from 'react-router-dom'
import AdminShell from '../components/AdminShell'
import apiClient, { ADMIN_PROFILE_KEY, ADMIN_TOKEN_KEY } from '../config/api'

function AdminLogin() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        setIsAuthenticated(Boolean(window.localStorage.getItem(ADMIN_TOKEN_KEY)))
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((current) => ({
            ...current,
            [name]: value,
        }))
        setError('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            const { data } = await apiClient.post('/admin/login', {
                email: formData.email,
                password: formData.password,
            })

            window.localStorage.setItem(ADMIN_TOKEN_KEY, data.token)
            window.localStorage.setItem(ADMIN_PROFILE_KEY, JSON.stringify(data.admin))
            navigate('/dashboard', { replace: true })
        } catch (loginError) {
            const errorMessage = loginError.response?.data?.message || loginError.message

            setError(
                errorMessage === 'Network Error'
                    ? 'Cannot connect to the backend API. Please make sure the backend server is running.'
                    : errorMessage || 'Unable to login right now.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <AdminShell>
            <main className="px-4 pb-10 md:px-6 lg:px-10">
                <section className="mx-auto grid min-h-[calc(100vh-190px)] max-w-6xl items-center gap-8 py-8 lg:grid-cols-[1fr_440px] lg:py-12">
                    <div className="max-w-2xl">
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
                        onSubmit={handleSubmit}
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
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    value={formData.password}
                                    onChange={handleChange}
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
                            className="mt-2 h-13 w-full bg-[#214f86] px-5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#173d68]"
                        >
                            {isSubmitting ? 'Logging in...' : 'Login to Dashboard'}
                        </button>
                    </form>
                </section>
            </main>
        </AdminShell>
    )
}

export default AdminLogin
