import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/model/AttendanceModel";

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) return NextResponse.json({ error: "Missing Email" }, { status: 400 });

  try {
    const history = await AttendanceModel.find({ email }).sort({ date: -1 });
    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error("Error fetching attendance history:", error); 
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}