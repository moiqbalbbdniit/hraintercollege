import mongoose, { Schema } from 'mongoose';
export interface Attendance extends Document {
    _id: string;
    studentId: mongoose.Schema.Types.ObjectId;
    date: string; // YYYY-MM-DD
    present: boolean;
    
}
const AttendanceSchema = new Schema<Attendance>({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  date: {
    type: String, // YYYY-MM-DD
    required: true,
  },
  present: {
    type: Boolean,
    required: true,
  },
},{
  timestamps: true,});

export default mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);