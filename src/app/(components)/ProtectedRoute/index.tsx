"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"

interface ProtectedRouteProps {
    children: React.ReactNode;
}

interface JwtPayload {
    exp: number; // tiempo en segundos desde epoch
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/auth/login");
            return;
        }

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const currentTime = Date.now() / 1000; // en segundos

            if (decoded.exp < currentTime) {
                localStorage.removeItem("token");
                router.push("/auth/login");
                return;
            }

            setLoading(false);
        } catch (error) {
            console.error("Token inválido:", error);
            localStorage.removeItem("token");
            router.push("/auth/login");
        }
    }, [router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
