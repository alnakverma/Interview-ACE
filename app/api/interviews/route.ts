import { NextResponse } from "next/server";
import { db } from "@/firebase/admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      role,
      level,
      techstack,
      questions,
      userId,
      type,
      yearsOfExperience,
      resumeFileName,
    } = body;

    if (!role || !questions) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const docRef = db.collection("interviews").doc();

    const interview = {
      role,
      level: level || "",
      techstack: Array.isArray(techstack) ? techstack : [],
      questions: Array.isArray(questions) ? questions : [],
      yearsOfExperience: yearsOfExperience || 0,
      resumeFileName: resumeFileName || null,
      createdAt: new Date().toISOString(),
      userId: userId || null,
      type: type || "interview",
      finalized: true,
    };

    await docRef.set(interview);

    return NextResponse.json({ id: docRef.id });
  } catch (err: any) {
    console.error("/api/interviews error:", err);
    return NextResponse.json(
      { error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}
