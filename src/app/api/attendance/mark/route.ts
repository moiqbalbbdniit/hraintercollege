import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/model/AttendanceModel";

export async function POST(req: Request) {
  await dbConnect();
  const { records } = await req.json();

  if (!Array.isArray(records)) {
    return NextResponse.json({ success: false, message: "Invalid records" }, { status: 400 });
  }

  const today = new Date().toISOString().split("T")[0];
  try {
    for (const record of records) {
      await AttendanceModel.findOneAndUpdate(
        { studentId: record.studentId, date: today },
        { present: record.present },
        { upsert: true, new: true }
      );
      
    }
    return NextResponse.json({ success: true, message: "Attendance marked" });
  } catch (error) {
    console.error("Attendance error:", error);
    return NextResponse.json({ success: false, message: "Error marking attendance" }, { status: 500 });
  }
}