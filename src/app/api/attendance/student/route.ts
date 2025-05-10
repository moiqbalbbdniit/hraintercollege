// /app/api/attendance/student/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import { NextResponse } from "next/server";
import StudentModel from "@/model/User";
import AttendanceModel from "@/model/AttendanceModel";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const student = await StudentModel.findOne({ email: session.user.email });
  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const attendanceRecords = await AttendanceModel.find({ email: student.email });

  const totalDays = attendanceRecords.length;
  const presentDays = attendanceRecords.filter((r) => r.present).length;
  const absentDays = totalDays - presentDays;

  return NextResponse.json({
    totalDays,
    presentDays,
    absentDays,
  });
}
