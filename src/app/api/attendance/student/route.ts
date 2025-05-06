import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/model/AttendanceModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const attendanceRecords = await AttendanceModel.find({
      studentId: session.user._id
    }).sort({ date: -1 });

    return NextResponse.json({
      success: true,
      attendance: attendanceRecords.map(record => ({
        date: record.date.toISOString().split('T')[0],
        present: record.present
      }))
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching attendance records" },
      { status: 500 }
    );
  }
}