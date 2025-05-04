import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/model/AttendanceModel";
import StudentModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";

// Keep your existing imports and dbConnect
export async function GET(req: NextRequest) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const date = req.nextUrl.searchParams.get("date");
  
    if (!session || session.user.role !== "Teacher") {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
  
    if (!date) {
      return Response.json({ success: false, message: "Date required" }, { status: 400 });
    }
  
    try {
      const assignedClass = session.user.assignedClass;
  
      const students = await StudentModel.find({ studentClass: assignedClass })
        .select("_id fullName rollNo");
      const attendanceRecords = await AttendanceModel.find({ date });
  
      const data = students.map((student) => {
        const attendance = attendanceRecords.find((a) => 
          a.studentId.toString() === student._id.toString()
        );
        return {
          studentId: student._id.toString(), // Ensure string ID
          fullName: student.fullName,
          rollNo: student.rollNo,
          present: attendance ? attendance.present : false,
        };
      });
  
      // Return just the array of attendance data
      return Response.json(data, { status: 200 });
      
    } catch (err) {
      console.error("Error viewing attendance:", err);
      // Return empty array on error
      return Response.json([], { status: 500 });
    }
  }
