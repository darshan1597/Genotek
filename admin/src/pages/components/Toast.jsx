import { useEffect } from "react"
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from "react-icons/fi"

const Toast = ({ message, type = "success", onClose }) => {
    const toastStyles = {
        success: {
            icon: FiCheckCircle,
            border: "border-green-200",
            accent: "bg-green-600",
            iconColor: "text-green-600",
            title: "Success",
        },
        error: {
            icon: FiAlertCircle,
            border: "border-red-200",
            accent: "bg-red-600",
            iconColor: "text-red-600",
            title: "Error",
        },
        info: {
            icon: FiInfo,
            border: "border-[#d7e5ee]",
            accent: "bg-[#214f86]",
            iconColor: "text-[#214f86]",
            title: "Notice",
        },
    }

    const style = toastStyles[type] || toastStyles.info
    const Icon = style.icon

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose?.()
        }, 3000)

        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div
            className={`fixed right-4 top-5 z-[9999] flex w-[calc(100vw-32px)] max-w-sm overflow-hidden border ${style.border} bg-white shadow-[0_18px_45px_rgba(33,79,134,0.16)] sm:right-5`}
            role="status"
            aria-live="polite"
        >
            <div className={`w-1.5 shrink-0 ${style.accent}`} />
            <div className="flex min-w-0 flex-1 gap-3 px-4 py-3">
                <Icon className={`mt-0.5 shrink-0 text-[21px] ${style.iconColor}`} />
                <div className="min-w-0">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#6a9ab1]">
                        {style.title}
                    </p>
                    <p className="mt-1 text-[14px] leading-5 text-[#23384d]">{message}</p>
                </div>
            </div>
            <button
                type="button"
                aria-label="Close notification"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center text-[#6a9ab1] transition-colors duration-200 hover:bg-[#f8fbfd] hover:text-[#214f86] cursor-pointer"
            >
                <FiX className="text-[18px]" />
            </button>
        </div>
    )
}

export default Toast
