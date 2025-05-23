import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/model/AttendanceModel";


export async function POST(request: Request) {
  await dbConnect();
  
  try {
    const { date, email, present } = await request.json();

    // Validate input
    if (!date || !email || present === undefined) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert to proper types
    // const studentObjectId = new mongoose.Types.ObjectId(studentId);

    // Update or create attendance record
    const result = await AttendanceModel.findOneAndUpdate(
      {
        email: email,
        date: date // YYYY-MM-DD format
      },
      {
        $set: { present }
      },
      {
        upsert: true,
        new: true
      }
    );

    return NextResponse.json({
      success: true,
      message: "Attendance updated successfully",
      data: result
    });

  } catch (error) {
    console.error("Error updating attendance:", error);
    return NextResponse.json(
      { success: false, message: "Error updating attendance" },
      { status: 500 }
    );
  }
}