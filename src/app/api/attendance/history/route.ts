import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/model/AttendanceModel";

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  if (!studentId) return NextResponse.json({ error: "Missing studentId" }, { status: 400 });

  try {
    const history = await AttendanceModel.find({ studentId }).sort({ date: -1 });
    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error("Error fetching attendance history:", error); 
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}