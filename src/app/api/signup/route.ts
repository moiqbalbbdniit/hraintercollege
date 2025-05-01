import dbConnect from "@/lib/dbConnect";
import StudentModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { fullName, email, mobileNo, password, studentClass, gender,section,rollNo } =
      await request.json();
    const existingUserByEmail = await StudentModel.findOne({
      email,
      isVerified: true,
    });

    //code for otp generation
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    if (existingUserByEmail) {
      return Response.json(
        {
          success: false,
          message: "User already exists with this email",
        },
        { status: 400 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
      const newStudent = await StudentModel.create({
        fullName,
        email,
        mobileNo,
        password: hashedPassword,
        studentClass,
        gender,
        section,
        rollNo,
        isVerified: false,
        verificationCode: verificationCode,
        verificationCodeExpiry: verificationCodeExpiry,
      });
      await newStudent.save();

      return Response.json(
        {
          success: true,
          message: "User created successfully verify your email",
          data: newStudent,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error While registering User", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
