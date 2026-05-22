import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { serverUrl } from "../../App"

const AdminAuthContext = createContext(null)

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAdmin = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/admin/get-current-admin`, { withCredentials: true })

                setAdmin(result.data.admin)
            } catch {
                setAdmin(null)
            } finally {
                setLoading(false)
            }
        }

        getAdmin()
    }, [])

    return (
        <AdminAuthContext.Provider value={{ admin, setAdmin, loading }}>
            {children}
        </AdminAuthContext.Provider>
    )
}

export const useAdminAuth = () => useContext(AdminAuthContext)