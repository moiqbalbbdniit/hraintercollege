import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/model/AttendanceModel";
import StudentModel from "@/model/User";
export async function POST(request: Request) {
  await dbConnect();
  
  try {
    const { date, records } = await request.json();

    // Get student details first
    const studentDetails = await StudentModel.find({
      _id: { $in: records.map((r: { studentId: string }) => r.studentId) }
    });

    // Prepare bulk operations
    const bulkOps = records.map((record: { studentId: string; present: boolean }) => ({
      updateOne: {
        filter: {
          studentId: record.studentId,
          date: date
        },
        update: {
          $set: {
            present: record.present,
            fullName: studentDetails.find(s => s._id.equals(record.studentId))?.fullName,
            rollNo: studentDetails.find(s => s._id.equals(record.studentId))?.rollNo
          }
        },
        upsert: true
      }
    }));

    // Execute bulk write
    await AttendanceModel.bulkWrite(bulkOps);

    return NextResponse.json({
      success: true,
      message: "Attendance marked successfully"
    });

  } catch (error) {
    console.error("Error marking attendance:", error);
    return NextResponse.json(
      { success: false, message: "Error marking attendance" },
      { status: 500 }
    );
  }
}