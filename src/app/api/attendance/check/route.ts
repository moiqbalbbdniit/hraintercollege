import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/model/AttendanceModel";

export async function GET(request: Request) {
  await dbConnect();
  
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { success: false, message: "Date parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Changed to count actual student records for the date
    const count = await AttendanceModel.countDocuments({ date });
    
    return NextResponse.json({
      success: true,
      exists: count > 0,
      count  // Return the actual count for debugging
    });
  } catch (error) {
    console.error("Error checking attendance:", error);
    return NextResponse.json(
      { success: false, message: "Error checking attendance" },
      { status: 500 }
    );
  }
}