import { NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/model/AttendanceModel";
import StudentModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function POST(request: Request) {
  await dbConnect();

  try {
    // Get the server session
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { date, records } = await request.json();

    if (!date || !Array.isArray(records) || records.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid input data" },
        { status: 400 }
      );
    }

    // Fetch all matching students
    const students = await StudentModel.find({
      email: { $in: records.map((r: { email: string }) => r.email) }
    });

    if (students.length === 0) {
      return NextResponse.json(
        { success: false, message: "No students found for the provided records" },
        { status: 404 }
      );
    }

    // Create a map for quick lookup
    const studentMap = new Map(
      students.map((s) => [s.email, { fullName: s.fullName, rollNo: s.rollNo }])
    );

    // Build bulk operations
    const bulkOps = records
    .map((record: { email: string; present: boolean }) => {
      const student = studentMap.get(record.email);
      if (!student) return null;
  
      return {
        updateOne: {
          filter: {
            email: record.email,
            date,
          },
          update: {
            $set: {
              present: record.present,
              fullName: student.fullName,
              rollNo: student.rollNo,
              date,
            },
          },
          upsert: true,
        },
      };
    })
    .filter((op): op is NonNullable<typeof op> => op !== null);
  


    if (bulkOps.length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid records to update" },
        { status: 400 }
      );
    }

    await AttendanceModel.bulkWrite(bulkOps);

    return NextResponse.json({
      success: true,
      message: "Bulk attendance marked successfully",
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
