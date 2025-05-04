import dbConnect from "@/lib/dbConnect";  // Adjust path based on your setup
import StudentModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  const students = [];

  for (let i = 1; i <= 50; i++) {
    const hashedPassword = await bcrypt.hash("password123", 10); // Hashing password

    students.push({
      fullName: `Student ${i}`,
      email: `student${i}@gmail.com`,
      mobileNo: `8601490${100 + i}`,
      password: hashedPassword,
      gender: i % 2 === 0 ? "Female" : "Male",
      studentClass: "12th",
      section: "C",
      rollNo: `20251069${i}`,
      isVerified: true,
      verificationCode: `3150${i}`,
      verificationCodeExpiry: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      createdAt: new Date(),
    });
  }

  try {
    const result = await StudentModel.insertMany(students);
    return new Response(JSON.stringify({ message: "50 dummy students added", data: result }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error adding dummy students:", error);
    return new Response(JSON.stringify({ message: "Error adding dummy students", error }), {
      status: 500,
    });
  }
}
