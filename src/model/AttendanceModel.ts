import mongoose, { Schema } from 'mongoose';

export interface Attendance extends Document {
    studentId: mongoose.Schema.Types.ObjectId;
    date: string; // YYYY-MM-DD
    present: boolean;
    fullName: string;
    rollNo: string;
}

const AttendanceSchema = new Schema<Attendance>({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  present: {
    type: Boolean,
    required: true,
  },
  fullName: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

// Add compound index
AttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export default mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);