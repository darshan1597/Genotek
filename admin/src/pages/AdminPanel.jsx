import Navabar from './components/Navabar'
import { Link } from 'react-router-dom'
import {
    FiEdit3,
    FiImage,
    FiBox,
    FiGrid,
    FiLayers,
    FiList,
    FiPlusCircle,
    FiUserPlus,
    FiUsers,
} from 'react-icons/fi'

const adminActions = [
    {
        title: 'Add Admin',
        description: 'Create a new admin account for dashboard access.',
        icon: FiUserPlus,
        path: '/add-admin',
        button: 'Add'
    },
    {
        title: 'View / Delete Admins',
        description: 'Review existing admins and remove access when needed.',
        icon: FiUsers,
        path: '/admins',
        button: 'View'
    },
    {
        title: 'Add Category',
        description: 'Create product categories for organizing the catalog.',
        icon: FiGrid,
        path: '/add-category',
        button: 'Add'
    },
    {
        title: 'View Categories',
        description: 'Check existing categories before adding products.',
        icon: FiList,
        path: '/categories',
        button: 'View'
    },
    {
        title: 'Add Subcategory',
        description: 'Create subcategories for catalog sections that need another level.',
        icon: FiLayers,
        path: '/add-subcategory',
        button: 'Add'
    },
    {
        title: 'View Subcategories',
        description: 'Review subcategories and their parent category mapping.',
        icon: FiLayers,
        path: '/subcategories',
        button: 'View'
    },
    {
        title: 'Add Product',
        description: 'Add product details, category, and display information.',
        icon: FiPlusCircle,
        path: '/add-product',
        button: 'Add'
    },
    {
        title: 'View Products',
        description: 'Browse, verify, and manage products shown on the site.',
        icon: FiBox,
        path: '/products',
        button: 'View'
    },
    {
        title: 'Add About Team',
        description: 'Add team members or about-section details for the website.',
        icon: FiUserPlus,
        path: '/add-about-team',
        button: 'Add'
    },
    {
        title: 'Edit About Team',
        description: 'Update existing about-team content and team information.',
        icon: FiEdit3,
        path: '/edit-about-team',
        button: 'Edit'
    },
    {
        title: 'Change Hero Banners',
        description: 'Manage homepage hero banners and primary visual content.',
        icon: FiImage,
        path: '/hero-banners',
        button: 'Change'
    },
]

function AdminPanel() {
    return (
        <div className="min-h-screen bg-[#f8fbfd]">
            <Navabar />
            <main className="px-4 pb-12 md:px-6 lg:px-10">
                <section className="mx-auto max-w-6xl py-8 lg:py-10">
                    <div className="border-b border-[#d8e6ef] pb-7">
                        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6a9ab1]">
                            Admin Workspace
                        </p>
                        <h1 className="text-[32px] font-semibold leading-tight text-[#214f86] sm:text-[42px]">
                            Manage Genotek content
                        </h1>
                    </div>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {adminActions.map(({ title, description, icon: Icon, path, button }) => (
                            <article
                                key={title}
                                className="group border border-[#d7e5ee] bg-white p-6 shadow-[0_12px_28px_rgba(33,79,134,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-[#6d9eb7] hover:shadow-[0_18px_45px_rgba(33,79,134,0.13)]"
                            >
                                <div className="mb-6 flex h-12 w-12 items-center justify-center bg-[#214f86] text-white transition-colors duration-200 group-hover:bg-[#173d68]">
                                    <Icon className="text-[22px]" />
                                </div>
                                <h2 className="text-[20px] font-semibold text-[#214f86]">{title}</h2>
                                <p className="mt-3 min-h-[72px] text-[15px] leading-6 text-[#526b80]">
                                    {description}
                                </p>
                                <Link
                                    to={path}
                                    className="mt-5 inline-flex h-11 items-center justify-center bg-[#214f86] px-5 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#173d68] cursor-pointer"
                                >
                                    {button}
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AdminPanel
