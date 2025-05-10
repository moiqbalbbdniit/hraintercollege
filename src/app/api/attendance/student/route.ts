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

  console.log("session", session.user.email); // Use the email to fetch attendance

  try {
    // Fetch the student's attendance records based on their email (using email in the `studentId` field)
    const attendanceRecords = await AttendanceModel.find({
      email: session.user.email,  // Using the email as studentId
    });

    const totalDays = attendanceRecords.length;
    const presentDays = attendanceRecords.filter((r) => r.present).length;
    const absentDays = totalDays - presentDays;

    return NextResponse.json({
      totalDays,
      presentDays,
      absentDays,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching attendance records" },
      { status: 500 }
    );
  }
}
