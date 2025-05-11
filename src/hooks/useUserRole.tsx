"use client"

import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

type TokenPayload = {
    roleId: number
}

export const useUserRole = () => {
    const [roleId, setRoleId] = useState<number | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const decoded = jwtDecode<TokenPayload>(token)
                setRoleId(decoded.roleId)
            } catch (err) {
                console.error("Invalid token", err)
                setRoleId(null)
            }
        }
    }, [])

    return roleId
}