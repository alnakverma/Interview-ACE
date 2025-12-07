import { NextResponse } from "next/server";
import { signOut } from "@/lib/actions/auth.action";

export async function POST() {
  try {
    await signOut();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("/api/auth/signout error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to sign out" },
      { status: 500 }
    );
  }
}
