import { NextResponse } from "next/server";
import { db } from "@/firebase/admin";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await db.collection("interviews").doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE /api/interviews/[id] error:", err);
    return NextResponse.json(
      { error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}
