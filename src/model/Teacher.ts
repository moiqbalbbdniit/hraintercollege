import { Schema, Document, models, model } from "mongoose";

export interface Teacher extends Document {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    gender: "Male" | "Female";
    subject: string;
    section: string;
    assignedClass: string;
    createdAt: Date;
}

const TeacherSchema = new Schema<Teacher>({
    fullName: {
        type: String,
        required: [true, "Teacher name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
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
    subject: {
        type: String,
        required: [true, "Subject is required"],
    },
    section: {
        type: String,
        required: [true, "Section is required"],
    },
    assignedClass: {
        type: String,
        required: [true, "Assigned class is required"],
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const TeacherModel = models.Teacher || model<Teacher>("Teacher", TeacherSchema);
export default TeacherModel;
