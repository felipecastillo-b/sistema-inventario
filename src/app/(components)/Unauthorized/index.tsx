"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

const Unauthorized = () => {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/dashboard")
        }, 5000)

        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Acceso no autorizado</h1>
            <p className="text-gray-600">Serás redirigido al Dashboard en 5 segundos...</p>
        </div>
    )
}

export default Unauthorized