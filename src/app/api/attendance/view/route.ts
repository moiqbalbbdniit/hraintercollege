import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/model/AttendanceModel";

export async function GET(request: Request) {
  await dbConnect();
  
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  try {
    const records = await AttendanceModel.find({ date })
      .populate('studentId', 'fullName rollNo');

    return NextResponse.json({
      success: true,
      data: records.map(record => ({
        studentId: record.studentId._id,
        present: record.present,
        fullName: record.studentId.fullName,
        rollNo: record.studentId.rollNo
      }))
    });

  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching attendance" },
      { status: 500 }
    );
  }
}