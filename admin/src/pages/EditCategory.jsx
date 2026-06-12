import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiCheckCircle, FiImage, FiUpload } from "react-icons/fi";
import Navabar from "./components/Navabar";
import Toast from "./components/Toast";
import { serverUrl } from "../App";

function EditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const imageInputRef = useRef(null);
    const [form, setForm] = useState({
        name: "",
        description: "",
        hasSubcategories: false,
        isStandalone: false,
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        axios.get(`${serverUrl}/api/categories/fetch-category/${id}`, {
            withCredentials: true,
        })
        .then(({ data }) => {
            const category = data.category;
            setForm({
                name: category.name || "",
                description: category.description || "",
                hasSubcategories: Boolean(category.hasSubcategories),
                isStandalone: Boolean(category.isStandalone),
            });
            setImagePreview(
                category.image?.name
                    ? `${serverUrl}/categoryImages/${category.image.name}`
                    : "",
            );
        })
        .catch((error) =>
            setToast({
                message: error?.response?.data?.message || "Unable to load category.",
                type: "error",
            }),
        )
        .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (!image) return undefined;
        const url = URL.createObjectURL(image);
        setImagePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [image]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        try {
            const data = new FormData();
            Object.entries(form).forEach(([key, value]) => data.append(key, value));
            if (image) data.append("image", image);
            const response = await axios.put(
                `${serverUrl}/api/categories/update-category/${id}`,
                data,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                },
            );
            setToast({
                message: response.data?.message || "Category updated successfully.",
                type: "success",
            });
            setTimeout(() => navigate("/categories"), 700);
        } catch (error) {
        setToast({
            message: error?.response?.data?.message || "Unable to update category.",
            type: "error",
        });
        } finally {
        setSubmitting(false);
        }
    };

    const setField = (field, value) =>
        setForm((current) => ({ ...current, [field]: value }));

    return (
        <div className="min-h-screen bg-[#f8fbfd]">
            <Navabar />
            <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
                <div className="mb-7 flex items-end justify-between border-b border-[#d8e6ef] pb-6">
                    <h1 className="text-[34px] font-semibold text-[#214f86]">
                        Edit Category
                    </h1>
                    <Link
                        to="/categories"
                        className="inline-flex h-11 items-center gap-2 border border-[#d7e5ee] bg-white px-4 font-semibold text-[#214f86]"
                    >
                        <FiArrowLeft /> Categories
                    </Link>
                </div>
                {loading ? (
                    <p className="text-[#526b80]">Loading category...</p>
                ) : (
                <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 border border-[#d7e5ee] bg-white p-6 shadow-sm"
                    >
                        <label className="block text-[14px] font-semibold text-[#214f86]">
                            Category Name
                            <input
                                value={form.name}
                                onChange={(e) => setField("name", e.target.value)}
                                className="mt-2 h-12 w-full border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 text-[#23384d] outline-none focus:border-[#214f86]"
                            />
                        </label>
                        <label className="block text-[14px] font-semibold text-[#214f86]">
                            Description
                            <textarea
                                value={form.description}
                                onChange={(e) => setField("description", e.target.value)}
                                className="mt-2 min-h-32 w-full border-2 border-[#d6e4ed] bg-[#f8fbfd] p-4 text-[#23384d] outline-none focus:border-[#214f86]"
                            />
                        </label>
                        {[
                            ["hasSubcategories", "This category has subcategories"],
                            ["isStandalone", "Genotek Exclusice"],
                        ].map(([field, label]) => (
                            <label
                                key={field}
                                className="flex cursor-pointer items-center gap-3 border border-[#d7e5ee] bg-[#f8fbfd] p-4 font-semibold text-[#214f86]"
                            >
                                <input
                                    type="checkbox"
                                    checked={form[field]}
                                    onChange={(e) => setField(field, e.target.checked)}
                                    className="h-5 w-5 accent-[#214f86]"
                                />{" "}
                                {label}
                            </label>
                        ))}
                        <button
                            type="button"
                            onClick={() => imageInputRef.current?.click()}
                            className="flex min-h-24 w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[#d6e4ed] bg-[#f8fbfd] text-[#214f86]"
                        >
                            <FiUpload className="mb-2 text-[24px]" />{" "}
                            {image ? image.name : "Upload replacement image"}
                        </button>
                        <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            onChange={(e) => setImage(e.target.files?.[0] || null)}
                            className="hidden"
                        />
                        <button
                            disabled={submitting}
                            className="inline-flex h-12 items-center gap-2 bg-[#214f86] px-5 font-semibold text-white disabled:bg-[#8aa7be]"
                        >
                            <FiCheckCircle />{" "}
                            {submitting ? "Updating..." : "Update Category"}
                        </button>
                    </form>
                    <aside className="border border-[#d7e5ee] bg-white p-5 shadow-sm">
                        <p className="mb-3 font-semibold text-[#214f86]">Image Preview</p>
                        <div className="flex aspect-[4/3] items-center justify-center border border-[#d7e5ee] bg-[#f8fbfd]">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Category preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <FiImage className="text-[32px] text-[#6a9ab1]" />
                            )}
                        </div>
                    </aside>
                </div>
                )}
            </main>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}

export default EditCategory;
