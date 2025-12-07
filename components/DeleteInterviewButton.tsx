"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  interviewId: string;
}

export default function DeleteInterviewButton({ interviewId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this interview?")) return;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/interviews/${interviewId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      // refresh server components
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-2">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-3 py-1 bg-sky-300 text-white rounded"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
