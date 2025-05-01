import dbConnect from "@/lib/dbConnect";
import StudentModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const email = body?.email;
    const verificationCode = body?.verificationCode;
    console.log("email: ", email, "code: ", verificationCode);
    if (!email || !verificationCode) {
      return Response.json(
        { success: false, message: "Email and verification code are required" },
        { status: 400 }
      );
    }

    
    const decodedEmail = decodeURIComponent(email);
    
    const user = await StudentModel.findOne({ email: decodedEmail });
   
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Check if the verification code matches and is not expired
    const isCodeValid = user.verificationCode === verificationCode;
    
    const isCodeNotExpired = new Date(user.verificationCodeExpiry) > new Date();
    
    if (isCodeValid && isCodeNotExpired) {
      // Update the user's verification status
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "Email verified successfully",
        },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      //code expired
      return Response.json(
        {
          success: false,
          message: "Verification code expired",
        },
        { status: 400 }
      );
    } else {
      //code not valid
      return Response.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    return Response.json(
      { success: false, message: "Error verifying user" },
      { status: 500 }
    );
  }
}
