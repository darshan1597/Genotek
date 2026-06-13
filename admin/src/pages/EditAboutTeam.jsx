import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    FiArrowLeft,
    FiEdit2,
    FiPlusCircle,
    FiTrash2,
    FiUsers,
} from "react-icons/fi";
import Navabar from "./components/Navabar";
import Toast from "./components/Toast";
import { serverUrl } from "../App";

function EditAboutTeam() {
    const [members, setMembers] = useState([]);
    const [editing, setEditing] = useState(null);
    const [replacementImage, setReplacementImage] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [toast, setToast] = useState(null);

    const fetchMembers = async () => {
        try {
            const { data } = await axios.get(`${serverUrl}/api/team-members`);
            setMembers(Array.isArray(data) ? data : []);
        } catch (error) {
            setToast({
                type: "error",
                message:
                error.response?.data?.message || "Unable to load team members.",
            });
        }
    };
    useEffect(() => {
        fetchMembers();
    }, []);

    const saveMember = async (event) => {
        event.preventDefault();
        try {
            const data = new FormData();
            ["name", "role", "about"].forEach((key) =>
                data.append(key, editing[key]),
            );
            data.append("bulletPoints", JSON.stringify(editing.bulletPoints));
            if (replacementImage) data.append("image", replacementImage);
            const response = await axios.put(
                `${serverUrl}/api/team-members/${editing._id}`,
                data,
                { withCredentials: true },
            );
            setToast({ type: "success", message: response.data.message });
            setEditing(null);
            setReplacementImage(null);
            fetchMembers();
        } catch (error) {
            setToast({
                type: "error",
                message:
                error.response?.data?.message || "Unable to update team member.",
            });
        }
    };

    const deleteMember = async () => {
        try {
            const { data } = await axios.delete(
                `${serverUrl}/api/team-members/${deleteTarget._id}`,
                { withCredentials: true },
            );
            setToast({ type: "success", message: data.message });
            setDeleteTarget(null);
            fetchMembers();
        } catch (error) {
            setToast({
                type: "error",
                message:
                error.response?.data?.message || "Unable to delete team member.",
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fbfd]">
            <Navabar />
            <main className="px-4 pb-12 md:px-6 lg:px-10">
                <section className="mx-auto max-w-6xl py-8">
                    <div className="flex items-end justify-between border-b border-[#d8e6ef] pb-7">
                        <div>
                            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6a9ab1]">
                                About Content
                            </p>
                            <h1 className="mt-2 text-[36px] font-semibold text-[#214f86]">
                                Edit About Team
                            </h1>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                to="/admin-panel"
                                className="inline-flex h-11 items-center gap-2 border border-[#d7e5ee] bg-white px-4 font-semibold text-[#214f86]"
                            >
                                <FiArrowLeft /> Dashboard
                            </Link>
                            <Link
                                to="/add-about-team"
                                className="inline-flex h-11 items-center gap-2 bg-[#214f86] px-4 font-semibold text-white"
                            >
                                <FiPlusCircle /> Add Member
                            </Link>
                        </div>
                    </div>
                    <div className="mt-7 space-y-4">
                        {members.length ? (
                            members.map((member) => (
                                <article
                                    key={member._id}
                                    className="flex flex-col gap-4 border border-[#d7e5ee] bg-white p-5 sm:flex-row sm:items-center"
                                >
                                    <img
                                        src={`${serverUrl}/teamImages/${member.image.name}`}
                                        alt={member.name}
                                        className="h-24 w-24 shrink-0 object-cover"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <h2 className="text-[20px] font-semibold text-[#214f86]">
                                            {member.name}
                                        </h2>
                                        <p className="text-[#526b80]">{member.role}</p>
                                        <p className="mt-2 line-clamp-2 text-[14px] text-[#526b80]">
                                            {member.about}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                setEditing({
                                                ...member,
                                                bulletPoints: member.bulletPoints?.length
                                                    ? member.bulletPoints
                                                    : [""],
                                                })
                                            }
                                            className="h-10 w-10 cursor-pointer border border-[#d7e5ee] text-[#214f86]"
                                        >
                                            <FiEdit2 className="mx-auto" />
                                        </button>
                                        <button
                                            onClick={() => setDeleteTarget(member)}
                                            className="h-10 w-10 cursor-pointer border border-red-200 text-red-600"
                                        >
                                            <FiTrash2 className="mx-auto" />
                                        </button>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="py-16 text-center text-[#526b80]">
                                <FiUsers className="mx-auto mb-3 text-[32px]" />
                                No team members found.
                            </div>
                        )}
                    </div>
                </section>
            </main>
            {editing ? (
                <div className="fixed inset-0 z-[999] overflow-y-auto bg-black/60 p-4">
                    <form
                        onSubmit={saveMember}
                        className="mx-auto my-6 max-w-3xl bg-white p-6"
                    >
                        <h2 className="text-[26px] font-semibold text-[#214f86]">
                            Edit {editing.name}
                        </h2>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            {[
                                ["name", "Name"],
                                ["role", "Role"],
                            ].map(([key, label]) => (
                                <label key={key}>
                                {label}
                                <input
                                    required
                                    value={editing[key]}
                                    onChange={(e) =>
                                        setEditing((current) => ({
                                            ...current,
                                            [key]: e.target.value,
                                        }))
                                    }
                                    className="mt-2 h-11 w-full border px-3"
                                />
                                </label>
                            ))}
                        </div>
                        <label className="mt-4 block">
                            About <span className="text-[#526b80]">(Optional)</span>
                            <textarea
                                rows="5"
                                value={editing.about}
                                onChange={(e) =>
                                    setEditing((current) => ({
                                        ...current,
                                        about: e.target.value,
                                    }))
                                }
                                className="mt-2 w-full border p-3"
                            />
                        </label>
                        <div className="mt-4">
                            <p className="mb-2">
                                Bullet Points <span className="text-[#526b80]">(Optional)</span>
                            </p>
                            {editing.bulletPoints.map((point, index) => (
                                <input
                                    key={index}
                                    value={point}
                                    onChange={(e) =>
                                        setEditing((current) => ({
                                        ...current,
                                        bulletPoints: current.bulletPoints.map(
                                            (item, itemIndex) =>
                                            itemIndex === index ? e.target.value : item,
                                        ),
                                        }))
                                    }
                                    className="mb-2 h-11 w-full border px-3"
                                />
                            ))}
                            <button
                                type="button"
                                onClick={() =>
                                setEditing((current) => ({
                                    ...current,
                                    bulletPoints: [...current.bulletPoints, ""],
                                }))
                                }
                                className="text-[#214f86] cursor-pointer"
                            >
                                + Add bullet point
                            </button>
                        </div>
                        <label className="mt-4 block cursor-pointer">
                            Replace Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setReplacementImage(e.target.files?.[0] || null)
                                }
                                className="mt-2 block cursor-pointer"
                            />
                        </label>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setEditing(null);
                                    setReplacementImage(null);
                                }}
                                className="h-11 border px-5 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button className="h-11 bg-[#214f86] px-5 font-semibold text-white cursor-pointer">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            ) : null}
            {deleteTarget ? (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-md bg-white p-6">
                        <h2 className="text-[24px] font-semibold text-[#214f86]">
                            Delete team member?
                        </h2>
                        <p className="mt-3 text-[#526b80]">
                            Delete <strong>{deleteTarget.name}</strong>?
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={() => setDeleteTarget(null)}
                                className="h-11 border px-5 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteMember}
                                className="h-11 bg-red-600 px-5 font-semibold text-white cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            {toast ? <Toast {...toast} onClose={() => setToast(null)} /> : null}
        </div>
    );
}

export default EditAboutTeam;
