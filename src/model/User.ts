import { Schema, Document, models, model, Types } from "mongoose";

// Extend Document to include _id as a string (since it's a MongoDB ObjectId, we want it as a string in the interface)
export interface Student extends Document {
  _id: Types.ObjectId; // Explicitly type _id as ObjectId
  id: string; // Virtual property
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
  section: {
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
}, {
  toJSON: {
    virtuals: true, // This will ensure virtuals are included in the JSON output
  },
});

// Virtual property to map _id to id
StudentSchema.virtual('id').get(function () {
  return this._id.toString(); // Convert MongoDB's _id to string and use it as 'id'
});

// Export the model
const StudentModel = models.Student || model<Student>("Student", StudentSchema);
export default StudentModel;
