import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    FiArrowLeft,
    FiCheckCircle,
    FiLock,
    FiMail,
    FiUser,
    FiUserPlus,
} from "react-icons/fi";
import Navabar from "./components/Navabar";
import Toast from "./components/Toast";
import { serverUrl } from "../App";

function AddAdmin() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "admin",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    const setField = (field, value) =>
        setForm((current) => ({ ...current, [field]: value }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (form.password !== form.confirmPassword) {
            setToast({ type: "error", message: "Passwords do not match." });
            return;
        }

        setIsSubmitting(true);
        try {
            const { data } = await axios.post(
                `${serverUrl}/api/admin/add-admin`,
                {
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    role: form.role,
                },
                { withCredentials: true },
            );
            setToast({ type: "success", message: data.message });
            setForm({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "admin",
            });
        } catch (error) {
            setToast({
                type: "error",
                message: error.response?.data?.message || "Unable to add admin.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const fields = [
        { key: "name", label: "Name", type: "text", icon: FiUser },
        { key: "email", label: "Email", type: "email", icon: FiMail },
        { key: "password", label: "Password", type: "password", icon: FiLock },
        {
            key: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            icon: FiLock,
        },
    ];

    return (
        <div className="min-h-screen bg-[#f8fbfd]">
            <Navabar />
            <main className="px-4 pb-12 md:px-6 lg:px-10">
                <section className="mx-auto max-w-4xl py-8">
                    <div className="flex items-end justify-between border-b border-[#d8e6ef] pb-7">
                        <div>
                            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6a9ab1]">
                                Admin Access
                            </p>
                            <h1 className="mt-2 text-[36px] font-semibold text-[#214f86]">
                                Add Admin
                            </h1>
                        </div>
                        <Link
                            to="/admin-panel"
                            className="inline-flex h-11 items-center gap-2 border border-[#d7e5ee] bg-white px-4 text-[14px] font-semibold text-[#214f86]"
                        >
                            <FiArrowLeft /> Dashboard
                        </Link>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="mt-7 border border-[#d7e5ee] bg-white p-6 shadow-[0_18px_45px_rgba(33,79,134,0.13)] sm:p-8"
                    >
                        <div className="mb-6 flex items-center gap-3">
                            <span className="flex h-12 w-12 items-center justify-center bg-[#214f86] text-white">
                                <FiUserPlus />
                            </span>
                            <h2 className="text-[24px] font-semibold text-[#214f86]">
                                Account Details
                            </h2>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            {fields.map(({ key, label, type, icon: Icon }) => (
                                <label key={key} className="block">
                                    <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                        {label}
                                    </span>
                                    <span className="flex h-13 items-center border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 focus-within:border-[#214f86]">
                                        <Icon className="mr-3 text-[#6a9ab1]" />
                                        <input
                                            required
                                            minLength={type === "password" ? 6 : undefined}
                                            type={type}
                                            value={form[key]}
                                            onChange={(event) => setField(key, event.target.value)}
                                            className="w-full bg-transparent text-[15px] outline-none"
                                        />
                                    </span>
                                </label>
                            ))}
                        </div>
                        <label className="mt-5 block">
                            <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">
                                Role
                            </span>
                            <select
                                value={form.role}
                                onChange={(event) => setField("role", event.target.value)}
                                className="h-13 w-full border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 text-[15px] text-[#23384d] outline-none focus:border-[#214f86]"
                            >
                                <option value="admin">Admin</option>
                                <option value="superAdmin">Super Admin</option>
                            </select>
                        </label>
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="mt-7 inline-flex h-12 cursor-pointer items-center gap-2 bg-[#214f86] px-6 text-[15px] font-semibold text-white disabled:opacity-60"
                        >
                            <FiCheckCircle /> {isSubmitting ? "Adding..." : "Add Admin"}
                        </button>
                    </form>
                </section>
            </main>
            {toast ? <Toast {...toast} onClose={() => setToast(null)} /> : null}
        </div>
    );
}

export default AddAdmin;
