import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'
import { useAdminAuth } from '../context/AdminAuthContext'
import { RiLogoutBoxFill } from "react-icons/ri"
import { IoReceiptSharp } from "react-icons/io5";
import axios from 'axios'
import { serverUrl } from '../../App'

function Navabar() {
    const navigate = useNavigate()
    const menuRef = useRef(null)
    const { admin, setAdmin } = useAdminAuth()
    const [accountLoginMenuOpen, setAccountLoginMenuOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setAccountLoginMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/admin/signout`, { withCredentials: true })
            setAdmin(null)
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header className="bg-white">
            <div className="w-full border-t-[6px] border-[#6d9eb7] pt-[2px]">
                <div className="h-[2px] w-full bg-[#6d9eb7]" />
            </div>

            <div className="flex w-full items-center justify-between gap-2 pt-3 pb-4 sm:gap-4 sm:px-4 md:px-6 min-[1117px]:gap-6 min-[1117px]:pl-6 min-[1117px]:pr-6 min-[1117px]:pb-7 min-[1117px]:pt-10 xl:pl-10 xl:pr-10">

                <Link to="/" className="shrink-0 sm:ml-3">
                    <div className="relative w-[clamp(178px,54vw,260px)] md:w-[330px] min-[1117px]:w-[360px] xl:w-[430px]">
                        <img
                            src={logo}
                            alt="Genotek Biochem"
                            className="h-auto w-full object-contain"
                        />
                    </div>
                </Link>

                {admin && (
                    <div ref={menuRef} className="relative shrink-0">
                        <button
                            type="button"
                            aria-label="Open admin menu"
                            aria-expanded={accountLoginMenuOpen}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6e4ed] bg-[#f8fbfd] cursor-pointer transition-colors duration-200 hover:bg-[#eef5f9]"
                            onClick={() => setAccountLoginMenuOpen((prev) => !prev)}
                        >
                            <FiUser className="text-[20px] text-[#214f86]" />
                        </button>

                        <div
                            className={`absolute right-0 top-full z-[999] mt-3 w-[230px] origin-top-right border border-[#d7e5ee] bg-white py-2 shadow-[0_18px_45px_rgba(33,79,134,0.16)] transition-all duration-200 ease-out ${
                                accountLoginMenuOpen
                                    ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                                    : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                            }`}
                        >
                            <div className="border-b border-[#d7e5ee] px-4 pb-3 pt-2">
                                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6a9ab1]">
                                    Welcome
                                </p>
                                <p className="mt-1 truncate text-[16px] font-semibold text-[#214f86]">
                                    {admin?.name?.split(" ")[0] || "Admin"}
                                </p>
                            </div>

                            <button
                                type="button"
                                className="flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold text-[#526b80] transition-colors duration-200 hover:bg-[#f8fbfd] hover:text-[#214f86] cursor-pointer"
                                onClick={() => {
                                    navigate("/profile")
                                    setAccountLoginMenuOpen(false)
                                }}
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#214f86] text-[14px] font-semibold uppercase text-white">
                                    {admin?.name?.slice(0, 1) || "A"}
                                </span>
                                Profile
                            </button>

                            <button
                                type="button"
                                className="flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold text-[#526b80] transition-colors duration-200 hover:bg-[#f8fbfd] hover:text-[#214f86] cursor-pointer"
                                onClick={() => {
                                    navigate("/viewforms")
                                    setAccountLoginMenuOpen(false)
                                }}
                            >
                                <IoReceiptSharp size={22} className='text-[#214f86]' />
                                View Forms
                            </button>

                            <button
                                type="button"
                                className="flex w-full items-center gap-3 border-t border-[#eef3f6] px-4 py-3 text-left text-[15px] font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50 cursor-pointer"
                                onClick={handleLogout}
                            >
                                <RiLogoutBoxFill size={22} />
                                Logout
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </header>
    )
}

export default Navabar
