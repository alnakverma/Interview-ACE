"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  userId?: string;
}

export default function InterviewForm({ userId }: Props) {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");
  const [techstack, setTechstack] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [numQuestions, setNumQuestions] = useState("5");
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Generate placeholder questions based on count
      const questionCount = parseInt(numQuestions) || 5;
      const placeholderQuestions = Array.from(
        { length: questionCount },
        (_, i) => `Question ${i + 1}`
      );

      const payload = {
        role,
        level,
        techstack: techstack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        yearsOfExperience: parseInt(yearsOfExperience) || 0,
        questions: placeholderQuestions,
        resumeFileName: resume?.name || null,
        userId: userId ?? null,
        type: "interview",
      };

      const res = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create interview");

      const data = await res.json();
      const id = data.id;
      router.push(`/interview/${id}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <p className="text-sm text-muted-foreground mb-4">
        Fill the form to create a mock interview. After creation you can start
        the interview.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Role */}
        <div>
          <label className="block text-sm font-medium">Role</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="e.g. Frontend Developer"
            required
          />
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium">Level</label>
          <input
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="e.g. Junior, Mid, Senior"
          />
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-sm font-medium">
            Years of Experience
          </label>
          <input
            type="number"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="e.g. 3"
            min="0"
          />
        </div>

        {/* Number of Questions */}
        <div>
          <label className="block text-sm font-medium">
            Number of Questions
          </label>
          <input
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="e.g. 5"
            min="1"
            max="20"
          />
        </div>
      </div>

      {/* Tech stack */}
      <div>
        <label className="block text-sm font-medium">
          Tech Stack (comma separated)
        </label>
        <input
          value={techstack}
          onChange={(e) => setTechstack(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          placeholder="React, Node.js, TypeScript"
        />
      </div>

      {/* Resume Upload */}
      <div>
        <label className="block text-sm font-medium">
          Upload Resume (PDF/DOC)
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
          className="mt-1 block w-full"
        />
        {resume && (
          <p className="text-sm text-green-600 mt-1">
            ✓ {resume.name} selected
          </p>
        )}
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating…" : "Create & Start Interview"}
        </button>
      </div>
    </form>
  );
}
