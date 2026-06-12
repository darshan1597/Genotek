import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import { useAdminAuth } from './pages/context/AdminAuthContext'
import AddCategory from './pages/AddCategory'
import AddProduct from './pages/AddProduct'
import ViewCategories from './pages/ViewCategories'
import ViewProducts from './pages/ViewProducts'
import EditProducts from './pages/EditProducts'
import Profile from './pages/Profile'
import AddSubcategory from './pages/AddSubcategory'
import ViewSubcategories from './pages/ViewSubcategories'
import EditCategory from './pages/EditCategory'
import EditSubcategory from './pages/EditSubcategory'
import HeroSection from './pages/HeroSection'
import ViewForms from './pages/ViewForms'

export const serverUrl = import.meta.env.VITE_SERVER_URL

function App() {
    const { admin, loading } = useAdminAuth()

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f8fbfd] px-4">
                <section className="w-full max-w-sm border border-[#d7e5ee] bg-white p-8 text-center shadow-[0_18px_45px_rgba(33,79,134,0.13)]">
                    <div className="mx-auto mb-6 h-[3px] w-24 bg-[#6d9eb7]" />
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#d6e4ed] bg-[#f8fbfd]">
                        <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#d7e5ee] border-t-[#214f86]" />
                    </div>
                    <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6a9ab1]">
                        Genotek Admin
                    </p>
                    <h1 className="text-[26px] font-semibold text-[#214f86]">Loading workspace</h1>
                    <p className="mt-3 text-[14px] leading-6 text-[#526b80]">
                        Checking your admin session...
                    </p>
                </section>
            </main>
        )
    }

    return (
        <Routes>
            <Route path="/login" element={!admin ? <Login /> : <Navigate to="/" replace />} />
            <Route path="/" element={admin ? <AdminPanel /> : <Navigate to="/login" replace /> } />
            <Route path="/admin-panel" element={admin ? <AdminPanel /> : <Navigate to="/login" replace /> } />
            <Route path="/add-category" element={admin ? <AddCategory /> : <Navigate to="/login" replace /> } />
            <Route path="/categories" element={admin ? <ViewCategories /> : <Navigate to="/login" replace /> } />
            <Route path="/edit-category/:id" element={admin ? <EditCategory /> : <Navigate to="/login" replace /> } />
            <Route path="/add-subcategory" element={admin ? <AddSubcategory /> : <Navigate to="/login" replace /> } />
            <Route path="/subcategories" element={admin ? <ViewSubcategories /> : <Navigate to="/login" replace /> } />
            <Route path="/edit-subcategory/:id" element={admin ? <EditSubcategory /> : <Navigate to="/login" replace /> } />
            <Route path="/add-product" element={admin ? <AddProduct /> : <Navigate to="/login" replace /> } />
            <Route path="/products" element={admin ? <ViewProducts /> : <Navigate to="/login" replace /> } />
            <Route path="/edit-product/:id" element={admin ? <EditProducts /> : <Navigate to="/login" replace /> } />
            <Route path="/profile" element={admin ? <Profile /> : <Navigate to="/login" replace /> } />
            <Route path="/hero-banners" element={admin ? <HeroSection /> : <Navigate to="/login" replace /> } />
            <Route path="/viewforms" element={admin ? <ViewForms /> : <Navigate to="/login" replace /> } />
        </Routes>
    )
}

export default App
