import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiCheckCircle, FiImage, FiUpload } from "react-icons/fi";
import Navabar from "./components/Navabar";
import Toast from "./components/Toast";
import { serverUrl } from "../App";

function EditSubcategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const imageInputRef = useRef(null);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        Promise.all([
            axios.get(`${serverUrl}/api/subcategories/fetch-subcategory/${id}`, {
                withCredentials: true,
            }),
            axios.get(`${serverUrl}/api/categories/fetch-category`, {
                withCredentials: true,
            }),
        ])
        .then(([subcategoryResponse, categoryResponse]) => {
            const subcategory = subcategoryResponse.data.subcategory;
            setName(subcategory.name || "");
            setCategory(subcategory.category || "");
            setImagePreview(
                subcategory.image?.name
                    ? `${serverUrl}/subcategoryImages/${subcategory.image.name}`
                    : "",
            );
            setCategories(
                (Array.isArray(categoryResponse.data)
                    ? categoryResponse.data
                    : []
                ).filter((item) => item.hasSubcategories),
            );
        })
        .catch((error) =>
            setToast({
                message:
                    error?.response?.data?.message || "Unable to load subcategory.",
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
            data.append("name", name);
            data.append("category", category);
            if (image) data.append("image", image);
            const response = await axios.put(
                `${serverUrl}/api/subcategories/update-subcategory/${id}`,
                data,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                },
            );
            setToast({
                message: response.data?.message || "Subcategory updated successfully.",
                type: "success",
            });
            setTimeout(() => navigate("/subcategories"), 700);
        } catch (error) {
            setToast({
                message:
                error?.response?.data?.message || "Unable to update subcategory.",
                type: "error",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fbfd]">
            <Navabar />
            <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
                <div className="mb-7 flex items-end justify-between border-b border-[#d8e6ef] pb-6">
                    <h1 className="text-[34px] font-semibold text-[#214f86]">
                        Edit Subcategory
                    </h1>
                    <Link
                        to="/subcategories"
                        className="inline-flex h-11 items-center gap-2 border border-[#d7e5ee] bg-white px-4 font-semibold text-[#214f86]"
                    >
                        <FiArrowLeft /> Subcategories
                    </Link>
                </div>
                {loading ? (
                    <p className="text-[#526b80]">Loading subcategory...</p>
                ) : (
                    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 border border-[#d7e5ee] bg-white p-6 shadow-sm"
                        >
                            <label className="block text-[14px] font-semibold text-[#214f86]">
                                Subcategory Name
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-2 h-12 w-full border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 text-[#23384d] outline-none focus:border-[#214f86]"
                                />
                            </label>
                            <label className="block text-[14px] font-semibold text-[#214f86]">
                                Parent Category
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="mt-2 h-12 w-full border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 text-[#23384d] outline-none focus:border-[#214f86]"
                                >
                                    {categories.map((item) => (
                                        <option key={item._id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
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
                                {submitting ? "Updating..." : "Update Subcategory"}
                            </button>
                        </form>
                        <aside className="border border-[#d7e5ee] bg-white p-5 shadow-sm">
                            <p className="mb-3 font-semibold text-[#214f86]">Image Preview</p>
                            <div className="flex aspect-[4/3] items-center justify-center border border-[#d7e5ee] bg-[#f8fbfd]">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Subcategory preview"
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

export default EditSubcategory;
