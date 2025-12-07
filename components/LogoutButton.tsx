"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signout", { method: "POST" });
      if (!res.ok) throw new Error("Failed to sign out");
      router.push("/sign-in");
    } catch (err) {
      console.error(err);
      router.push("/sign-in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1 rounded bg-transparent border border-gray-200 hover:bg-gray-100"
      aria-label="Sign out"
      title="Sign out"
    >
      {loading ? "Signing out…" : "Logout"}
    </button>
  );
}
