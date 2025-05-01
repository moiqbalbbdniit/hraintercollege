import  { Schema, Document, models, model} from "mongoose";

export interface Student extends Document {
    _id: string;
    fullName: string;
    email: string;
    mobileNo: string;
    password: string;
    gender: "Male" | "Female";
    studentClass: string;
    section: string;
    rollNo: string;
    isVerified: boolean;
    verificationCode: string;
    verificationCodeExpiry: Date;
    createdAt: Date;
}

const StudentSchema = new Schema<Student>({
    fullName: {
        type: String,
        required: [true, "Student name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
    },
    mobileNo: {
        type: String,
        required: [true, "Mobile number is required"],
        match: [/^[6-9]\d{9}$/, "Invalid mobile number"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: [true, "Gender is required"],
    },
    studentClass: {
        type: String,
        required: [true, "Class is required"],
        trim: true,
    },
    section:{
        type: String,
        required: [true, "Section is required"],
        trim: true,
    },
    rollNo: {
        type: String,
        required: [true, "Roll number is required"],
        unique: true,
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        required: [true, "Verification code is required"],
    },
    verificationCodeExpiry: {
        type: Date,
        required: [true, "Verification code expiry is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const StudentModel = models.Student || model<Student>("Student", StudentSchema);
export default StudentModel;
