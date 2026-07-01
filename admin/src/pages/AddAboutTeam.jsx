import { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    FiArrowLeft,
    FiFileText,
    FiPlus,
    FiTrash2,
    FiUpload,
    FiUserPlus,
} from "react-icons/fi";
import Navabar from "./components/Navabar";
import Toast from "./components/Toast";
import { serverUrl } from "../App";

function AddAboutTeam() {
    const imageInputRef = useRef(null);
    const [form, setForm] = useState({ name: "", role: "", displayOrder: "", about: "" });
    const [bulletPoints, setBulletPoints] = useState([""]);
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!image)
            return setToast({
                type: "error",
                message: "Upload a team member image.",
            });
        setIsSubmitting(true);
        try {
            const data = new FormData();
            Object.entries(form).forEach(([key, value]) => data.append(key, value));
            data.append("bulletPoints", JSON.stringify(bulletPoints));
            data.append("image", image);
            const response = await axios.post(`${serverUrl}/api/team-members`, data, {
                withCredentials: true,
            });
            setToast({ type: "success", message: response.data.message });
            setForm({ name: "", role: "", displayOrder: "", about: "" });
            setBulletPoints([""]);
            setImage(null);
            if (imageInputRef.current) imageInputRef.current.value = "";
        } catch (error) {
            setToast({
                type: "error",
                message: error.response?.data?.message || "Unable to add team member.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fbfd]">
            <Navabar />
            <main className="px-4 pb-12 md:px-6 lg:px-10">
                <section className="mx-auto max-w-5xl py-8">
                    <div className="flex items-end justify-between border-b border-[#d8e6ef] pb-7">
                        <div>
                            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6a9ab1]">
                                About Content
                            </p>
                            <h1 className="mt-2 text-[36px] font-semibold text-[#214f86]">
                                Add About Team
                            </h1>
                        </div>
                        <Link
                            to="/admin-panel"
                            className="inline-flex h-11 items-center gap-2 border border-[#d7e5ee] bg-white px-4 font-semibold text-[#214f86]"
                        >
                            <FiArrowLeft /> Dashboard
                        </Link>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="mt-7 grid gap-6 border border-[#d7e5ee] bg-white p-6 shadow-[0_18px_45px_rgba(33,79,134,0.13)] lg:grid-cols-[1fr_300px] sm:p-8"
                    >
                        <div>
                            {[
                                ["name", "Name"],
                                ["role", "Role"],
                                ["displayOrder", "Order Number"],
                            ].map(([key, label]) => (
                                <label key={key} className="mb-5 block">
                                    <span className="mb-2 block font-semibold text-[#214f86]">
                                        {label}
                                    </span>
                                    <input
                                        required
                                        type={key === "displayOrder" ? "number" : "text"}
                                        min={key === "displayOrder" ? "1" : undefined}
                                        step={key === "displayOrder" ? "1" : undefined}
                                        value={form[key]}
                                        onChange={(e) =>
                                            setForm((current) => ({
                                                ...current,
                                                [key]: e.target.value,
                                            }))
                                        }
                                        className="h-13 w-full border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 outline-none focus:border-[#214f86]"
                                    />
                                </label>
                            ))}
                            <label className="mb-5 block">
                                <span className="mb-2 block font-semibold text-[#214f86]">
                                    About Him / Her{" "}
                                    <span className="font-normal text-[#526b80]">(Optional)</span>
                                </span>
                                <textarea
                                    rows="5"
                                    value={form.about}
                                    onChange={(e) =>
                                        setForm((current) => ({
                                        ...current,
                                        about: e.target.value,
                                        }))
                                    }
                                    className="w-full border-2 border-[#d6e4ed] bg-[#f8fbfd] p-4 outline-none focus:border-[#214f86]"
                                    placeholder="Write the introductory text..."
                                />
                            </label>
                            <div>
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="font-semibold text-[#214f86]">
                                        Bullet Points{" "}
                                        <span className="font-normal text-[#526b80]">
                                            (Optional)
                                        </span>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                        setBulletPoints((current) => [...current, ""])
                                        }
                                        className="inline-flex cursor-pointer items-center gap-2 text-[14px] font-semibold text-[#214f86]"
                                    >
                                        <FiPlus /> Add Point
                                    </button>
                                </div>
                                {bulletPoints.map((point, index) => (
                                    <div key={index} className="mb-3 flex gap-2">
                                        <input
                                            value={point}
                                            onChange={(e) =>
                                                setBulletPoints((current) =>
                                                    current.map((item, itemIndex) =>
                                                        itemIndex === index ? e.target.value : item,
                                                    ),
                                                )
                                            }
                                            className="h-11 flex-1 border border-[#d6e4ed] px-3 outline-none focus:border-[#214f86]"
                                            placeholder={`Bullet point ${index + 1}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setBulletPoints((current) =>
                                                current.length === 1
                                                    ? [""]
                                                    : current.filter(
                                                        (_, itemIndex) => itemIndex !== index,
                                                    ),
                                                )
                                            }
                                            className="h-11 w-11 cursor-pointer border border-red-200 text-red-600"
                                        >
                                            <FiTrash2 className="mx-auto" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                disabled={isSubmitting}
                                className="mt-7 inline-flex h-12 cursor-pointer items-center gap-2 bg-[#214f86] px-6 font-semibold text-white disabled:opacity-60"
                            >
                                <FiUserPlus /> {isSubmitting ? "Adding..." : "Add Team Member"}
                            </button>
                        </div>
                        <aside>
                            <p className="mb-3 font-semibold text-[#214f86]">Person Image</p>
                            <button
                                type="button"
                                onClick={() => imageInputRef.current?.click()}
                                className="flex aspect-[4/5] w-full cursor-pointer items-center justify-center overflow-hidden border-2 border-dashed border-[#d6e4ed] bg-[#f8fbfd]"
                            >
                                {image ? (
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                    ) : (
                                    <span className="text-center text-[#526b80]">
                                        <FiUpload className="mx-auto mb-2 text-[28px]" />
                                        Upload image
                                    </span>
                                )}
                            </button>
                            <input
                                ref={imageInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files?.[0] || null)}
                                className="hidden"
                            />
                        </aside>
                    </form>
                </section>
            </main>
            {toast ? <Toast {...toast} onClose={() => setToast(null)} /> : null}
        </div>
    );
}

export default AddAboutTeam;
