import { useEffect, useState } from 'react'
import { FiBarChart2, FiBox, FiLogOut, FiMail, FiSettings } from 'react-icons/fi'
import { Navigate, useNavigate } from 'react-router-dom'
import AdminShell from '../components/AdminShell'
import apiClient, { ADMIN_PROFILE_KEY, ADMIN_TOKEN_KEY } from '../config/api'

const dashboardItems = [
    {
        icon: FiMail,
        label: 'Enquiries',
        value: '0',
    },
    {
        icon: FiBox,
        label: 'Products',
        value: 'Ready',
    },
    {
        icon: FiBarChart2,
        label: 'Site Status',
        value: 'Live',
    },
    {
        icon: FiSettings,
        label: 'Settings',
        value: 'Admin',
    },
]

function AdminDashboard() {
    const navigate = useNavigate()
    const [admin, setAdmin] = useState(() => {
        const storedAdmin = window.localStorage.getItem(ADMIN_PROFILE_KEY)
        return storedAdmin ? JSON.parse(storedAdmin) : null
    })
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(window.localStorage.getItem(ADMIN_TOKEN_KEY)))

    useEffect(() => {
        const token = window.localStorage.getItem(ADMIN_TOKEN_KEY)
        if (!token) {
            setIsAuthenticated(false)
            return
        }

        apiClient
            .get('/admin/me')
            .then(({ data }) => {
                setAdmin(data.admin)
                window.localStorage.setItem(ADMIN_PROFILE_KEY, JSON.stringify(data.admin))
            })
            .catch(() => {
                window.localStorage.removeItem(ADMIN_TOKEN_KEY)
                window.localStorage.removeItem(ADMIN_PROFILE_KEY)
                setIsAuthenticated(false)
            })
    }, [])

    const handleLogout = () => {
        window.localStorage.removeItem(ADMIN_TOKEN_KEY)
        window.localStorage.removeItem(ADMIN_PROFILE_KEY)
        navigate('/login', { replace: true })
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return (
        <AdminShell>
            <main className="px-4 pb-10 md:px-6 lg:px-10">
                <section className="mx-auto max-w-6xl py-8 lg:py-12">
                    <div className="flex flex-col gap-5 border-b border-[#d8e6ef] pb-7 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6a9ab1]">
                                Admin Dashboard
                            </p>
                            <h1 className="text-[32px] font-semibold leading-tight text-[#214f86] sm:text-[42px]">
                                Welcome, {admin?.name || 'Genotek Admin'}
                            </h1>
                            <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[#526b80]">
                                This is the starting point for your admin tools. Connect these sections to real data when
                                the backend is ready.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="inline-flex h-12 items-center justify-center gap-2 bg-[#214f86] px-5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#173d68]"
                        >
                            <FiLogOut className="text-[18px]" />
                            Logout
                        </button>
                    </div>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {dashboardItems.map(({ icon: Icon, label, value }) => (
                            <article
                                key={label}
                                className="border border-[#d7e5ee] bg-[#f8fbfd] p-5 shadow-[0_12px_28px_rgba(33,79,134,0.08)]"
                            >
                                <div className="mb-6 flex h-11 w-11 items-center justify-center bg-[#214f86] text-white">
                                    <Icon className="text-[21px]" />
                                </div>
                                <p className="text-[14px] font-semibold uppercase tracking-[0.12em] text-[#6a9ab1]">
                                    {label}
                                </p>
                                <p className="mt-2 text-[26px] font-semibold text-[#214f86]">{value}</p>
                            </article>
                        ))}
                    </div>

                    <section className="mt-8 border border-[#d7e5ee] bg-white p-6 shadow-[0_18px_45px_rgba(33,79,134,0.1)]">
                        <h2 className="text-[24px] font-semibold text-[#214f86]">Admin Workspace</h2>
                        <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#526b80]">
                            Add content management, inquiry review, product catalog controls, or analytics modules here as
                            the admin panel grows.
                        </p>
                    </section>
                </section>
            </main>
        </AdminShell>
    )
}

export default AdminDashboard
