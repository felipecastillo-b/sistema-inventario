// app/login/page.tsx (Next.js 13+ con app dir)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/state/api"; // Ajusta la ruta si es diferente

export default function LoginPage() {
    const router = useRouter();
    const [login, { isLoading, error }] = useLoginMutation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await login({ email, password }).unwrap();
            localStorage.setItem("token", response.token); // Guarda token

            router.push("/dashboard"); // Redirige a ruta protegida
        } catch (err: any) {
            console.error("Error logging in:", err);
            setFormError("Credenciales inválidas o su cuenta esta Inactiva.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border rounded bg-white"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border rounded bg-white"
                    required
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 text-white py-2 rounded"
                >
                    {isLoading ? "Loading..." : "Sign in"}
                </button>
                {formError && <p className="text-red-500">{formError}</p>}
            </form>
        </div>
    );
}
