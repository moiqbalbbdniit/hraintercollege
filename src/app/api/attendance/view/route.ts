import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/model/AttendanceModel";
import StudentModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function GET(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const dateParam = req.nextUrl.searchParams.get("date");

  if (!session || session.user.role !== "Teacher") {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!dateParam) {
    return Response.json(
      { success: false, message: "Date parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Parse and validate date
    const dateObj = new Date(dateParam);
    if (isNaN(dateObj.getTime())) {
      return Response.json(
        { success: false, message: "Invalid date format" },
        { status: 400 }
      );
    }

    // Normalize date to UTC midnight
    const normalizedDate = new Date(dateObj);
    normalizedDate.setUTCHours(0, 0, 0, 0);

    const assignedClass = session.user.assignedClass;

    // Get students and attendance in parallel
    const [students, attendanceRecords] = await Promise.all([
      StudentModel.find({ studentClass: assignedClass })
        .select("_id fullName rollNo"),
      AttendanceModel.find({ date: normalizedDate })
    ]);

    // Prepare response data
    const data = students.map(student => {
      const attendance = attendanceRecords.find(a => 
        a.studentId.toString() === student._id.toString()
      );
      return {
        studentId: student._id.toString(),
        fullName: student.fullName,
        rollNo: student.rollNo,
        present: attendance ? attendance.present : null // Use null for no record
      };
    });

    return Response.json({
      success: true,
      data,
      date: normalizedDate.toISOString().split('T')[0]
    });
    
  } catch (err) {
    console.error("Error viewing attendance:", err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}