import logo from '../../../client/src/assets/logo.jpeg'

function AdminShell({ children }) {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <header className="bg-white">
                <div className="w-full border-t-[6px] border-[#6d9eb7] pt-[2px]">
                    <div className="h-[2px] w-full bg-[#6d9eb7]" />
                </div>
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-6 lg:px-8">
                    <img src={logo} alt="Genotek Biochem" className="h-auto w-[220px] object-contain sm:w-[280px]" />
                    <p className="hidden text-[13px] font-semibold uppercase tracking-[0.2em] text-[#6a9ab1] sm:block">
                        Admin
                    </p>
                </div>
            </header>

            {children}

            <footer className="border-t border-[#d8e6ef] px-4 py-5 text-center text-[13px] text-[#668095]">
                Genotek Biochem Admin
            </footer>
        </div>
    )
}

export default AdminShell

