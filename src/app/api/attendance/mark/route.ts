import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/model/AttendanceModel";

export async function POST(req: Request) {
  await dbConnect();
  const { date, records } = await req.json();

  if (!date || !Array.isArray(records)) {
    return NextResponse.json(
      { success: false, message: "Invalid request data" },
      { status: 400 }
    );
  }

  try {
    // Parse and normalize the date
    const attendanceDate = new Date(date);
    attendanceDate.setUTCHours(0, 0, 0, 0);

    // Bulk update operation for efficiency
    const bulkOps = records.map(record => ({
      updateOne: {
        filter: { 
          studentId: record.studentId, 
          date: attendanceDate 
        },
        update: { 
          $set: { 
            present: record.present,
            date: attendanceDate
          } 
        },
        upsert: true
      }
    }));

    await AttendanceModel.bulkWrite(bulkOps);

    return NextResponse.json({ 
      success: true, 
      message: "Attendance marked successfully" 
    });
  } catch (error) {
    console.error("Attendance error:", error);
    return NextResponse.json(
      { success: false, message: "Error marking attendance" },
      { status: 500 }
    );
  }
}