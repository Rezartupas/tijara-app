"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/ui/FormField";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login gagal.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Terjadi kesalahan jaringan.");
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-premium">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Tijara Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            id="username"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            required
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          {error && <p className="text-sm font-medium text-red-600 animate-fade-in-up">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-primary-600 px-4 py-3 font-semibold text-white shadow-soft transition-all hover:bg-primary-700"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
