import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FiArrowLeft, FiEdit3, FiFileText, FiImage, FiPlus, FiSave, FiTrash2, FiUpload } from 'react-icons/fi'
import { serverUrl } from '../App'
import Navabar from './components/Navabar'
import Toast from './components/Toast'

const emptySection = () => ({ text: '', points: [''] })
const emptyDocument = () => ({ title: '', name: '', file: null })
const emptySubcategory = () => ({
    heading: '',
    text: '',
    points: [''],
    extraSections: [],
    image: { name: '' },
    imageFile: null,
    documents: [emptyDocument()],
})

const initialForm = {
    name: '',
    slug: '',
    categoryImage: { name: '' },
    categoryImageFile: null,
    bannerImage: { name: '' },
    bannerImageFile: null,
    bannerLines: ['', ''],
    heading: '',
    text: '',
    points: [''],
    extraSections: [],
    hasSubcategories: false,
    documents: [emptyDocument()],
    subcategories: [emptySubcategory()],
}

const slugify = (value) =>
    value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

const stripFiles = (form) => ({
    name: form.name,
    slug: form.slug,
    categoryImage: form.categoryImage,
    bannerImage: form.bannerImage,
    bannerLines: form.bannerLines,
    heading: form.heading,
    text: form.text,
    points: form.points,
    extraSections: form.extraSections,
    hasSubcategories: form.hasSubcategories,
    documents: form.documents.map(({ title, name }) => ({ title, name })),
    subcategories: form.subcategories.map((subcategory) => ({
        heading: subcategory.heading,
        text: subcategory.text,
        points: subcategory.points,
        extraSections: subcategory.extraSections,
        image: subcategory.image,
        documents: subcategory.documents.map(({ title, name }) => ({ title, name })),
    })),
})

const toEditableForm = (category) => ({
    ...initialForm,
    ...category,
    categoryImageFile: null,
    bannerImageFile: null,
    bannerLines: category.bannerLines?.length ? [...category.bannerLines, ''].slice(0, 2) : ['', ''],
    points: category.points?.length ? category.points : [''],
    extraSections: category.extraSections?.length ? category.extraSections : [],
    documents: category.documents?.length ? category.documents.map((document) => ({ ...document, file: null })) : [emptyDocument()],
    subcategories: category.subcategories?.length
        ? category.subcategories.map((subcategory) => ({
            ...subcategory,
            imageFile: null,
            points: subcategory.points?.length ? subcategory.points : [''],
            extraSections: subcategory.extraSections?.length ? subcategory.extraSections : [],
            documents: subcategory.documents?.length
                ? subcategory.documents.map((document) => ({ ...document, file: null }))
                : [emptyDocument()],
        }))
        : [emptySubcategory()],
})

function TextInput({ label, value, onChange, placeholder = '', icon: Icon = FiFileText }) {
    return (
        <label className="block">
            <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">{label}</span>
            <span className="flex min-h-12 items-center border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 focus-within:border-[#214f86]">
                <Icon className="mr-3 shrink-0 text-[19px] text-[#6a9ab1]" />
                <input
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-[15px] text-[#23384d] outline-none placeholder:text-[#98aab8]"
                />
            </span>
        </label>
    )
}

function TextArea({ label, value, onChange, placeholder = '' }) {
    return (
        <label className="block">
            <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">{label}</span>
            <span className="flex min-h-[120px] items-start border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4 py-4 focus-within:border-[#214f86]">
                <FiFileText className="mr-3 mt-1 shrink-0 text-[19px] text-[#6a9ab1]" />
                <textarea
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    className="min-h-[90px] w-full resize-y bg-transparent text-[15px] leading-6 text-[#23384d] outline-none placeholder:text-[#98aab8]"
                />
            </span>
        </label>
    )
}

function PointsEditor({ label, points, onChange }) {
    const updatePoint = (index, value) => onChange(points.map((point, pointIndex) => pointIndex === index ? value : point))
    const removePoint = (index) => onChange(points.filter((_, pointIndex) => pointIndex !== index))

    return (
        <div>
            <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-[14px] font-semibold text-[#214f86]">{label}</span>
                <button
                    type="button"
                    onClick={() => onChange([...points, ''])}
                    className="inline-flex items-center gap-2 bg-[#eef5f9] px-3 py-2 text-[13px] font-semibold text-[#214f86] cursor-pointer"
                >
                    <FiPlus /> Add point
                </button>
            </div>
            <div className="space-y-2">
                {points.map((point, index) => (
                    <div key={index} className="flex gap-2">
                        <input
                            value={point}
                            onChange={(event) => updatePoint(index, event.target.value)}
                            placeholder={`Point ${index + 1}`}
                            className="min-h-11 flex-1 border-2 border-[#d6e4ed] bg-[#f8fbfd] px-3 text-[14px] text-[#23384d] outline-none focus:border-[#214f86]"
                        />
                        {points.length > 1 ? (
                            <button
                                type="button"
                                onClick={() => removePoint(index)}
                                className="flex h-11 w-11 items-center justify-center bg-red-50 text-red-600 cursor-pointer"
                                aria-label="Remove point"
                            >
                                <FiTrash2 />
                            </button>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    )
}

function ExtraSectionsEditor({ sections, onChange }) {
    const updateSection = (index, nextSection) => onChange(sections.map((section, sectionIndex) => sectionIndex === index ? nextSection : section))

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-[17px] font-semibold text-[#214f86]">Another paragraph with points?</h3>
                <button
                    type="button"
                    onClick={() => onChange([...sections, emptySection()])}
                    className="inline-flex items-center gap-2 bg-[#214f86] px-4 py-2 text-[13px] font-semibold text-white cursor-pointer"
                >
                    <FiPlus /> Add paragraph
                </button>
            </div>
            {sections.map((section, index) => (
                <div key={index} className="space-y-4 border border-[#d7e5ee] bg-[#f8fbfd] p-4">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-[#214f86]">Extra paragraph {index + 1}</p>
                        <button
                            type="button"
                            onClick={() => onChange(sections.filter((_, sectionIndex) => sectionIndex !== index))}
                            className="text-red-600 cursor-pointer"
                        >
                            Remove
                        </button>
                    </div>
                    <TextArea
                        label="Paragraph text"
                        value={section.text}
                        onChange={(value) => updateSection(index, { ...section, text: value })}
                    />
                    <PointsEditor
                        label="Paragraph points"
                        points={section.points?.length ? section.points : ['']}
                        onChange={(points) => updateSection(index, { ...section, points })}
                    />
                </div>
            ))}
        </div>
    )
}

function DocumentsEditor({ documents, onChange, title }) {
    const updateDocument = (index, nextDocument) => onChange(documents.map((document, documentIndex) => documentIndex === index ? nextDocument : document))

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-[17px] font-semibold text-[#214f86]">{title}</h3>
                <button
                    type="button"
                    onClick={() => onChange([...documents, emptyDocument()])}
                    className="inline-flex items-center gap-2 bg-[#eef5f9] px-3 py-2 text-[13px] font-semibold text-[#214f86] cursor-pointer"
                >
                    <FiPlus /> Add PDF
                </button>
            </div>
            {documents.map((document, index) => (
                <div key={index} className="grid gap-3 border border-[#d7e5ee] bg-white p-3 md:grid-cols-[1fr_1fr_auto]">
                    <input
                        value={document.title}
                        onChange={(event) => updateDocument(index, { ...document, title: event.target.value })}
                        placeholder="PDF title"
                        className="min-h-11 border-2 border-[#d6e4ed] bg-[#f8fbfd] px-3 text-[14px] outline-none focus:border-[#214f86]"
                    />
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(event) => updateDocument(index, { ...document, file: event.target.files?.[0] || null })}
                        className="min-h-11 border-2 border-[#d6e4ed] bg-[#f8fbfd] px-3 py-2 text-[13px]"
                    />
                    <button
                        type="button"
                        onClick={() => onChange(documents.filter((_, documentIndex) => documentIndex !== index))}
                        className="flex h-11 items-center justify-center bg-red-50 px-3 text-red-600 cursor-pointer"
                    >
                        <FiTrash2 />
                    </button>
                    {document.name ? (
                        <p className="text-[12px] text-[#526b80] md:col-span-3">Current file: {document.name}</p>
                    ) : null}
                </div>
            ))}
        </div>
    )
}

function ManageChromatography() {
    const [categories, setCategories] = useState([])
    const [categoryLimit, setCategoryLimit] = useState(null)
    const [form, setForm] = useState(initialForm)
    const [editingId, setEditingId] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toast, setToast] = useState(null)

    const loadCategories = async () => {
        const [{ data: categoriesData }, { data: limitData }] = await Promise.all([
            axios.get(`${serverUrl}/api/chromatography-categories`),
            axios.get(`${serverUrl}/api/categories/category-limit`, { withCredentials: true }),
        ])
        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
        setCategoryLimit(limitData)
    }

    useEffect(() => {
        loadCategories().catch((error) => {
            console.error('Error loading chromatography categories:', error)
            setToast({ message: 'Unable to load chromatography categories', type: 'error' })
        })
    }, [])

    const updateForm = (updates) => setForm((current) => ({ ...current, ...updates }))

    const submitForm = async (event) => {
        event.preventDefault()
        if (!editingId && categoryLimit?.canAdd === false) {
            setToast({ message: `Maximum of ${categoryLimit.limit} product categories reached`, type: 'error' })
            return
        }
        setIsSubmitting(true)

        try {
            const payload = stripFiles(form)
            const formData = new FormData()
            formData.append('payload', JSON.stringify(payload))

            if (form.categoryImageFile) formData.append('categoryImage', form.categoryImageFile)
            if (form.bannerImageFile) formData.append('bannerImage', form.bannerImageFile)
            form.documents.forEach((document, index) => {
                if (document.file) formData.append(`categoryDocument-${index}`, document.file)
            })
            form.subcategories.forEach((subcategory, subcategoryIndex) => {
                if (subcategory.imageFile) formData.append(`subcategoryImage-${subcategoryIndex}`, subcategory.imageFile)
                subcategory.documents.forEach((document, documentIndex) => {
                    if (document.file) formData.append(`subcategory-${subcategoryIndex}Document-${documentIndex}`, document.file)
                })
            })

            if (editingId) {
                await axios.put(`${serverUrl}/api/chromatography-categories/${editingId}`, formData, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
            } else {
                await axios.post(`${serverUrl}/api/chromatography-categories`, formData, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
            }

            setToast({ message: editingId ? 'Chromatography category updated' : 'Chromatography category added', type: 'success' })
            setForm(initialForm)
            setEditingId('')
            await loadCategories()
        } catch (error) {
            setToast({ message: error?.response?.data?.message || 'Unable to save chromatography category', type: 'error' })
        } finally {
            setIsSubmitting(false)
        }
    }

    const deleteCategory = async (category) => {
        if (!window.confirm(`Delete ${category.name}?`)) return

        try {
            await axios.delete(`${serverUrl}/api/chromatography-categories/${category._id}`, { withCredentials: true })
            setToast({ message: 'Chromatography category deleted', type: 'success' })
            await loadCategories()
        } catch (error) {
            setToast({ message: error?.response?.data?.message || 'Unable to delete category', type: 'error' })
        }
    }

    return (
        <div className="min-h-screen bg-[#f8fbfd]">
            <Navabar />
            {toast ? <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null}
            <main className="px-4 pb-12 md:px-6 lg:px-10">
                <section className="mx-auto max-w-6xl py-8 lg:py-10">
                    <div className="mb-8 flex flex-col gap-5 border-b border-[#d8e6ef] pb-7 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6a9ab1]">
                                Chromatography Solutions
                            </p>
                            <h1 className="text-[32px] font-semibold leading-tight text-[#214f86] sm:text-[42px]">
                                Manage Dynamic Pages
                            </h1>
                            {categoryLimit ? (
                                <p className="mt-3 text-[14px] font-semibold text-[#526b80]">
                                    Product categories: {categoryLimit.count} / {categoryLimit.limit}
                                </p>
                            ) : null}
                        </div>
                        <Link to="/admin-panel" className="inline-flex h-11 items-center justify-center gap-2 border border-[#d7e5ee] bg-white px-4 text-[14px] font-semibold text-[#214f86] hover:bg-[#eef5f9]">
                            <FiArrowLeft /> Dashboard
                        </Link>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                        <form onSubmit={submitForm} className="space-y-6 border border-[#d7e5ee] bg-white p-5 shadow-[0_18px_45px_rgba(33,79,134,0.13)] sm:p-7">
                            <div className="grid gap-5 md:grid-cols-2">
                                <TextInput label="Category name" value={form.name} onChange={(value) => updateForm({ name: value, slug: form.slug ? form.slug : slugify(value) })} placeholder="GC Columns" />
                                <TextInput label="Page URL after /products/" value={form.slug} onChange={(value) => updateForm({ slug: slugify(value) })} placeholder="gc-columns" />
                            </div>

                            <TextInput label="Main heading" value={form.heading} onChange={(value) => updateForm({ heading: value })} placeholder="Fast, Selective & High-Efficiency GC Solutions" />

                            <div className="grid gap-5 md:grid-cols-2">
                                <label className="block">
                                    <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">Category image</span>
                                    <span className="flex min-h-12 items-center border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4">
                                        <FiImage className="mr-3 text-[#6a9ab1]" />
                                        <input type="file" accept="image/*" onChange={(event) => updateForm({ categoryImageFile: event.target.files?.[0] || null })} />
                                    </span>
                                    {form.categoryImage?.name ? <span className="mt-1 block text-[12px] text-[#526b80]">Current: {form.categoryImage.name}</span> : null}
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">Banner image</span>
                                    <span className="flex min-h-12 items-center border-2 border-[#d6e4ed] bg-[#f8fbfd] px-4">
                                        <FiUpload className="mr-3 text-[#6a9ab1]" />
                                        <input type="file" accept="image/*" onChange={(event) => updateForm({ bannerImageFile: event.target.files?.[0] || null })} />
                                    </span>
                                    {form.bannerImage?.name ? <span className="mt-1 block text-[12px] text-[#526b80]">Current: {form.bannerImage.name}</span> : null}
                                </label>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <TextInput label="Banner text line 1" value={form.bannerLines[0] || ''} onChange={(value) => updateForm({ bannerLines: [value, form.bannerLines[1] || ''] })} placeholder="GC" />
                                <TextInput label="Banner text line 2" value={form.bannerLines[1] || ''} onChange={(value) => updateForm({ bannerLines: [form.bannerLines[0] || '', value] })} placeholder="Columns" />
                            </div>

                            <TextArea label="Main text" value={form.text} onChange={(value) => updateForm({ text: value })} />
                            <PointsEditor label="Main points" points={form.points} onChange={(points) => updateForm({ points })} />
                            <ExtraSectionsEditor sections={form.extraSections} onChange={(extraSections) => updateForm({ extraSections })} />

                            <label className="flex cursor-pointer items-start gap-4 border border-[#d7e5ee] bg-[#f8fbfd] p-4">
                                <input
                                    type="checkbox"
                                    checked={form.hasSubcategories}
                                    onChange={(event) => updateForm({ hasSubcategories: event.target.checked })}
                                    className="mt-1 h-5 w-5 accent-[#214f86]"
                                />
                                <span>
                                    <span className="block text-[15px] font-semibold text-[#214f86]">Has subcategory?</span>
                                    <span className="mt-1 block text-[13px] text-[#526b80]">
                                        Yes uses the GC/HPLC Columns layout. No uses the HPLC Pumps/Method Transfer layout.
                                    </span>
                                </span>
                            </label>

                            {form.hasSubcategories ? (
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between gap-3">
                                        <h2 className="text-[22px] font-semibold text-[#214f86]">Subcategories</h2>
                                        <button
                                            type="button"
                                            onClick={() => updateForm({ subcategories: [...form.subcategories, emptySubcategory()] })}
                                            className="inline-flex items-center gap-2 bg-[#214f86] px-4 py-2 text-[13px] font-semibold text-white cursor-pointer"
                                        >
                                            <FiPlus /> Add subcategory
                                        </button>
                                    </div>
                                    {form.subcategories.map((subcategory, index) => (
                                        <div key={index} className="space-y-4 border border-[#d7e5ee] bg-[#f8fbfd] p-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <h3 className="text-[18px] font-semibold text-[#214f86]">Subcategory {index + 1}</h3>
                                                <button
                                                    type="button"
                                                    onClick={() => updateForm({ subcategories: form.subcategories.filter((_, subcategoryIndex) => subcategoryIndex !== index) })}
                                                    className="text-red-600 cursor-pointer"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <TextInput
                                                label="Heading"
                                                value={subcategory.heading}
                                                onChange={(value) => {
                                                    const next = [...form.subcategories]
                                                    next[index] = { ...subcategory, heading: value }
                                                    updateForm({ subcategories: next })
                                                }}
                                            />
                                            <label className="block">
                                                <span className="mb-2 block text-[14px] font-semibold text-[#214f86]">Image</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(event) => {
                                                        const next = [...form.subcategories]
                                                        next[index] = { ...subcategory, imageFile: event.target.files?.[0] || null }
                                                        updateForm({ subcategories: next })
                                                    }}
                                                    className="w-full border-2 border-[#d6e4ed] bg-white px-3 py-2"
                                                />
                                                {subcategory.image?.name ? <span className="mt-1 block text-[12px] text-[#526b80]">Current: {subcategory.image.name}</span> : null}
                                            </label>
                                            <TextArea
                                                label="Text"
                                                value={subcategory.text}
                                                onChange={(value) => {
                                                    const next = [...form.subcategories]
                                                    next[index] = { ...subcategory, text: value }
                                                    updateForm({ subcategories: next })
                                                }}
                                            />
                                            <PointsEditor
                                                label="Points"
                                                points={subcategory.points}
                                                onChange={(points) => {
                                                    const next = [...form.subcategories]
                                                    next[index] = { ...subcategory, points }
                                                    updateForm({ subcategories: next })
                                                }}
                                            />
                                            <ExtraSectionsEditor
                                                sections={subcategory.extraSections}
                                                onChange={(extraSections) => {
                                                    const next = [...form.subcategories]
                                                    next[index] = { ...subcategory, extraSections }
                                                    updateForm({ subcategories: next })
                                                }}
                                            />
                                            <DocumentsEditor
                                                title="Subcategory documents"
                                                documents={subcategory.documents}
                                                onChange={(documents) => {
                                                    const next = [...form.subcategories]
                                                    next[index] = { ...subcategory, documents }
                                                    updateForm({ subcategories: next })
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <DocumentsEditor title="Upload PDF for this category" documents={form.documents} onChange={(documents) => updateForm({ documents })} />
                            )}

                            <div className="flex flex-wrap gap-3 border-t border-[#d8e6ef] pt-5">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || (!editingId && categoryLimit?.canAdd === false)}
                                    className="inline-flex h-11 items-center justify-center gap-2 bg-[#214f86] px-5 text-[14px] font-semibold text-white disabled:opacity-60 cursor-pointer"
                                >
                                    <FiSave /> {isSubmitting ? 'Saving...' : editingId ? 'Update page' : categoryLimit?.canAdd === false ? 'Category limit reached' : 'Create page'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setForm(initialForm)
                                        setEditingId('')
                                    }}
                                    className="h-11 border border-[#d7e5ee] bg-white px-5 text-[14px] font-semibold text-[#214f86] cursor-pointer"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>

                        <aside className="space-y-4">
                            <h2 className="text-[22px] font-semibold text-[#214f86]">Existing pages</h2>
                            {categories.length ? categories.map((category) => (
                                <article key={category._id} className="border border-[#d7e5ee] bg-white p-4 shadow-[0_12px_28px_rgba(33,79,134,0.08)]">
                                    <p className="font-semibold text-[#214f86]">{category.name}</p>
                                    <p className="mt-1 text-[13px] text-[#526b80]">/products/{category.slug}</p>
                                    <p className="mt-1 text-[13px] text-[#526b80]">
                                        {category.hasSubcategories ? `${category.subcategories?.length || 0} subcategories` : `${category.documents?.length || 0} category PDFs`}
                                    </p>
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingId(category._id)
                                                setForm(toEditableForm(category))
                                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                            }}
                                            className="inline-flex items-center gap-2 bg-[#eef5f9] px-3 py-2 text-[13px] font-semibold text-[#214f86] cursor-pointer"
                                        >
                                            <FiEdit3 /> Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteCategory(category)}
                                            className="inline-flex items-center gap-2 bg-red-50 px-3 py-2 text-[13px] font-semibold text-red-600 cursor-pointer"
                                        >
                                            <FiTrash2 /> Delete
                                        </button>
                                    </div>
                                </article>
                            )) : (
                                <p className="border border-[#d7e5ee] bg-white p-4 text-[14px] text-[#526b80]">
                                    No chromatography pages created yet.
                                </p>
                            )}
                        </aside>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default ManageChromatography
