import dbConnect from "@/lib/dbConnect";
import TeacherModel from "@/model/Teacher";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { fullName, email, assignedClass, password, section, gender,subject} =
      await request.json();
    const existingUserByEmail = await TeacherModel.findOne({
      email
    });

    //code for otp generation
    // const verificationCode = Math.floor(
    //   100000 + Math.random() * 900000
    // ).toString();

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
    //   const verificationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
      const newTeacher = await TeacherModel.create({
        fullName,
        email,
        subject,
        password: hashedPassword,
        assignedClass,
        gender,
        section,
        
      });
      await newTeacher.save();

      return Response.json(
        {
          success: true,
          message: "User created successfully Login to continue",
          data: newTeacher,
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
