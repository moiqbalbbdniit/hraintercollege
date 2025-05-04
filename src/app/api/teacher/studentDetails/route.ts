import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import StudentModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function GET(request: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "Teacher") {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      { status: 401 }
    );
  }

  const assignedClass = session.user.assignedClass;

  try {
    const students = await StudentModel.find({ studentClass: assignedClass }).select("-password");
   
    return new Response(JSON.stringify({ success: true, students }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching students" }),
      { status: 500 }
    );
  }
}
