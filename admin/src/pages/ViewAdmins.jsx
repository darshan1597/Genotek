import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    FiArrowLeft,
    FiPlusCircle,
    FiRefreshCw,
    FiTrash2,
    FiUsers,
} from "react-icons/fi";
import Navabar from "./components/Navabar";
import Toast from "./components/Toast";
import { serverUrl } from "../App";
import { useAdminAuth } from "./context/AdminAuthContext";

function ViewAdmins() {
    const { admin: currentAdmin } = useAdminAuth();
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [adminToDelete, setAdminToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [toast, setToast] = useState(null);

    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${serverUrl}/api/admin/all-admins`, {
                withCredentials: true,
            });
            setAdmins(Array.isArray(data) ? data : []);
        } catch (error) {
            setToast({
                type: "error",
                message: error.response?.data?.message || "Unable to load admins.",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const { data } = await axios.delete(
                `${serverUrl}/api/admin/delete-admin/${adminToDelete._id}`,
                { withCredentials: true },
            );
            setAdmins((current) =>
                current.filter((item) => item._id !== adminToDelete._id),
            );
            setToast({ type: "success", message: data.message });
            setAdminToDelete(null);
        } catch (error) {
            setToast({
                type: "error",
                message: error.response?.data?.message || "Unable to delete admin.",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fbfd]">
            <Navabar />
            <main className="px-4 pb-12 md:px-6 lg:px-10">
                <section className="mx-auto max-w-6xl py-8">
                    <div className="flex flex-col gap-4 border-b border-[#d8e6ef] pb-7 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6a9ab1]">
                                Admin Access
                            </p>
                            <h1 className="mt-2 text-[36px] font-semibold text-[#214f86]">
                                View Admins
                            </h1>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                to="/admin-panel"
                                className="inline-flex h-11 items-center gap-2 border border-[#d7e5ee] bg-white px-4 text-[14px] font-semibold text-[#214f86]"
                            >
                                <FiArrowLeft /> Dashboard
                            </Link>
                            <Link
                                to="/add-admin"
                                className="inline-flex h-11 items-center gap-2 bg-[#214f86] px-4 text-[14px] font-semibold text-white"
                            >
                                <FiPlusCircle /> Add Admin
                            </Link>
                        </div>
                    </div>
                    <div className="mt-7 border border-[#d7e5ee] bg-white shadow-[0_18px_45px_rgba(33,79,134,0.13)]">
                        <div className="flex items-center justify-between border-b border-[#d7e5ee] px-5 py-4">
                            <div>
                                <h2 className="text-[22px] font-semibold text-[#214f86]">
                                    Admin Accounts
                                </h2>
                                <p className="mt-1 text-[14px] text-[#526b80]">
                                    {loading
                                        ? "Loading..."
                                        : `${admins.length} account${admins.length === 1 ? "" : "s"} found`
                                    }
                                </p>
                            </div>
                            <button
                                onClick={fetchAdmins}
                                disabled={loading}
                                className="inline-flex h-11 cursor-pointer items-center gap-2 border border-[#d7e5ee] bg-[#f8fbfd] px-4 text-[14px] font-semibold text-[#214f86]"
                            >
                                <FiRefreshCw className={loading ? "animate-spin" : ""} />{" "}
                                Refresh
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <div className="min-w-[760px]">
                                <div className="grid grid-cols-[70px_1fr_1.3fr_150px_130px] bg-[#f8fbfd] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6a9ab1]">
                                    <span>No.</span>
                                    <span>Name</span>
                                    <span>Email</span>
                                    <span>Role</span>
                                    <span>Actions</span>
                                </div>
                                {loading ? (
                                    <p className="px-5 py-12 text-center text-[#526b80]">
                                        Loading admins...
                                    </p>
                                ) : (
                                    admins.map((admin, index) => (
                                        <div
                                            key={admin._id}
                                            className="grid grid-cols-[70px_1fr_1.3fr_150px_130px] items-center border-t border-[#d7e5ee] px-5 py-4"
                                        >
                                            <span className="text-[#6a9ab1]">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <span className="flex items-center gap-3 font-semibold text-[#214f86]">
                                                <span className="flex h-10 w-10 items-center justify-center bg-[#214f86] text-white">
                                                    <FiUsers />
                                                </span>
                                                {admin.name}
                                            </span>
                                            <span className="text-[#526b80]">{admin.email}</span>
                                            <span className="capitalize text-[#526b80]">
                                                {admin.role === "superAdmin" ? "Super Admin" : "Admin"}
                                            </span>
                                            <button
                                                disabled={admin._id === currentAdmin?._id}
                                                onClick={() => setAdminToDelete(admin)}
                                                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-red-200 text-red-600 disabled:cursor-not-allowed disabled:opacity-35"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {toast ? <Toast {...toast} onClose={() => setToast(null)} /> : null}
            {adminToDelete ? (
                <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-[rgba(15,35,55,0.42)] px-4">
                    <section className="w-full max-w-md bg-white p-6 shadow-xl">
                        <FiTrash2 className="text-[28px] text-red-600" />
                        <h2 className="mt-4 text-[24px] font-semibold text-[#214f86]">
                            Delete admin?
                        </h2>
                        <p className="mt-3 text-[#526b80]">
                            Delete <strong>{adminToDelete.name}</strong>? This account will
                            immediately lose access.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setAdminToDelete(null)}
                                disabled={isDeleting}
                                className="h-11 cursor-pointer border border-[#d7e5ee] px-5 font-semibold text-[#214f86]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="h-11 cursor-pointer bg-red-600 px-5 font-semibold text-white disabled:bg-red-300"
                            >
                                {isDeleting ? "Deleting..." : "Delete Admin"}
                            </button>
                        </div>
                    </section>
                </div>
            ) : null}
        </div>
    );
}

export default ViewAdmins;
