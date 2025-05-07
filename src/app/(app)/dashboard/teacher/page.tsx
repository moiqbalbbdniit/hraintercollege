"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Bell,
  LogOut,
  CalendarDays,
  Eye,
  Users,
  
  XCircle,
  Edit,
  Save,
  Loader2,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Student } from "@/model/User";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

dayjs.extend(utc);

interface AttendanceRecord {
  studentId: string;
  present: boolean | null;
  fullName: string;
  rollNo: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [numberofstudents, setNumberofstudents] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [viewAttendanceModal, setViewAttendanceModal] = useState(false);
  const [checkedStudents, setCheckedStudents] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [editModeStudentId, setEditModeStudentId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);

  const isToday = (date: Date) => dayjs(date).isSame(dayjs(), 'day');

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/teacher/studentDetails");
      setStudents(res.data.students);
      setFilteredStudents(res.data.students);
      setNumberofstudents(res.data.students.length);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAttendanceByDate = async () => {
    if (!selectedDate) return;
    setIsLoading(true);
    try {
      const res = await axios.get(
        `/api/attendance/view?date=${dayjs(selectedDate).format("YYYY-MM-DD")}`
      );
      
      if (res.data.success) {
        setAttendanceData(res.data.data);
        // Update the marked status based on actual data
        const allStudentsMarked = res.data.data.length >= students.length;
        setIsAttendanceMarked(allStudentsMarked);
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      toast.error("Failed to load attendance data");
      setIsAttendanceMarked(false);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAttendanceStatus = async () => {
    try {
      const res = await axios.get(
        `/api/attendance/check?date=${dayjs(selectedDate).format("YYYY-MM-DD")}`
      );
      
      // Only mark as attended if we have records for ALL students
      if (res.data.success) {
        const allStudentsMarked = res.data.count >= students.length;
        setIsAttendanceMarked(allStudentsMarked);
      }
    } catch (error) {
      console.error("Error checking attendance:", error);
      setIsAttendanceMarked(false); // Default to false on error
    }
  };

  const updateAttendance = async (studentId: string, present: boolean) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/attendance/mark", {
        date: dayjs(selectedDate).format("YYYY-MM-DD"),
        records: [{ studentId, present }]
      });
      
      if (response.data.success) {
        await fetchAttendanceByDate();
        toast.success("Attendance updated!");
        setEditModeStudentId(null);
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      toast.error("Failed to update attendance");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (day: Date | undefined) => {
    if (day) setSelectedDate(day);
  };

  const markAllAttendance = (present: boolean) => {
    setCheckedStudents(present ? students.map(student => student._id) : []);
  };

  const markAttendance = async () => {
    setIsLoading(true);
    try {
      // First verify no attendance exists
      const checkRes = await axios.get(
        `/api/attendance/check?date=${dayjs(selectedDate).format("YYYY-MM-DD")}`
      );
      
      if (checkRes.data.exists) {
        toast.warning("Attendance already marked for today!");
        setIsAttendanceMarked(true);
        return;
      }
  
      // Mark attendance for selected students
      const response = await axios.post("/api/attendance/mark", {
        date: dayjs(selectedDate).format("YYYY-MM-DD"),
        records: students.map(student => ({
          studentId: student._id,
          present: checkedStudents.includes(student._id),
          fullName: student.fullName,  // Include student details
          rollNo: student.rollNo
        })),
      });
  
      if (response.data.success) {
        toast.success("Attendance marked successfully!");
        setOpenModal(false);
        // Refresh the data
        await fetchAttendanceByDate();
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance");
      setIsAttendanceMarked(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (viewAttendanceModal) fetchAttendanceByDate();
  }, [selectedDate, viewAttendanceModal]);

  useEffect(() => {
    checkAttendanceStatus();
  }, [selectedDate]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFilteredStudents(
      students.filter(student =>
        student.fullName.toLowerCase().includes(term) ||
        student.rollNo.toString().includes(term)
    ));
  }, [searchTerm, students]);

  return (
    <main className="min-h-screen bg-teal-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-teal-800">
              Welcome, {session?.user?.fullName || "Teacher"} 🧑🏻‍🏫
            </h1>
            <p className="text-teal-700 mt-1">Here&#39;s your dashboard overview.</p>
          </div>
          <Button
            onClick={() => signOut()}
            variant="ghost"
            className="text-teal-700 hover:bg-teal-100 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </header>

        <section className="grid md:grid-cols-2 gap-4 md:gap-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg md:text-xl font-semibold text-teal-800">
                Teacher Information
              </h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{session?.user?.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Class:</span>
                <span className="font-medium">{session?.user?.assignedClass}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Section:</span>
                <span className="font-medium">{session?.user?.section}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subject:</span>
                <span className="font-medium">{session?.user?.subject}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg md:text-xl font-semibold text-teal-800 flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Attendance Date
              </h2>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Selected Date:</p>
                <p className="font-medium text-teal-700">
                  {dayjs(selectedDate).format("MMMM D, YYYY")}
                </p>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                className="rounded-md border"
              />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button
                  onClick={() => setOpenModal(true)}
                  className="bg-teal-700 hover:bg-teal-800 text-white"
                  disabled={!isToday(selectedDate) || isAttendanceMarked}
                >
                  {isAttendanceMarked ? "Attendance Marked" : "Mark Attendance"}
                </Button>
                {!isToday(selectedDate) && (
                  <div className="flex items-center gap-2 rounded-md bg-red-50 p-2 text-red-700 border border-red-200">
                    <XCircle className="w-4 h-4" />
                    <span className="text-sm">Only today&#39;s attendance can be marked</span>
                  </div>
                )}
                <Button
                  onClick={() => setViewAttendanceModal(true)}
                  variant="outline"
                  className="text-teal-700 border-teal-700 hover:bg-teal-50"
                >
                  <Eye className="w-4 h-4 md:mr-2" />
                  <span className="hidden sm:inline">View Records</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-teal-600" />
                <h2 className="text-lg md:text-xl font-semibold text-teal-800">
                  Class {session?.user?.assignedClass} Students
                </h2>
                <Badge variant="outline" className="text-teal-700">
                  {numberofstudents} students
                </Badge>
              </div>
              <div className="w-full md:w-auto">
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-teal-50">
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => {
                    const record = attendanceData.find(a => a.studentId === student._id);
                    const isPresent = record?.present ?? null;
                    return (
                      <TableRow key={student._id}>
                        <TableCell className="font-medium">{student.fullName}</TableCell>
                        <TableCell>{student.rollNo}</TableCell>
                        <TableCell>
                          {isPresent !== null ? (
                            <Badge variant={isPresent ? "default" : "destructive"}>
                              {isPresent ? "Present" : "Absent"}
                            </Badge>
                          ) : (
                            <Badge variant="outline">Not Marked</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {editModeStudentId === student._id ? (
                            <div className="flex gap-2 justify-end">
                              <select
                                value={editStatus ? "present" : "absent"}
                                onChange={(e) => setEditStatus(e.target.value === "present")}
                                className="border rounded px-2 py-1 text-sm"
                              >
                                <option value="present">Present</option>
                                <option value="absent">Absent</option>
                              </select>
                              <Button
                                size="sm"
                                onClick={() => updateAttendance(student._id, editStatus)}
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Save className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const record = attendanceData.find(a => a.studentId === student._id);
                                setEditModeStudentId(student._id);
                                setEditStatus(record?.present ?? true);
                              }}
                            >
                              <Edit className="h-4 w-4 md:mr-1" />
                              <span className="hidden md:inline">Edit</span>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={viewAttendanceModal} onOpenChange={setViewAttendanceModal}>
          <DialogContent className="w-full max-w-[95vw] sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Attendance for {dayjs(selectedDate).format("MMMM D, YYYY")}
              </DialogTitle>
              <DialogDescription>
                {dayjs(selectedDate).isAfter(dayjs())
                  ? "Future date - No records available"
                  : attendanceData.length === 0
                  ? "No attendance records found"
                  : "Viewing attendance records"}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.length > 0 ? (
                    attendanceData.map((record) => (
                      <TableRow key={record.studentId}>
                        <TableCell className="font-medium">{record.fullName}</TableCell>
                        <TableCell>{record.rollNo}</TableCell>
                        <TableCell>
                          <Badge variant={record.present ? "default" : "destructive"}>
                            {record.present ? "Present" : "Absent"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                        {dayjs(selectedDate).isAfter(dayjs())
                          ? "Cannot view attendance for future dates"
                          : "No attendance records found"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
            <DialogFooter>
              <Button onClick={() => setViewAttendanceModal(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="w-full max-w-[95vw] sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Mark Attendance for {dayjs(selectedDate).format("MMMM D, YYYY")}
              </DialogTitle>
              <DialogDescription>
                {isAttendanceMarked
                  ? "Attendance already marked for today"
                  : "Select students who are present today"}
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => markAllAttendance(true)}
                disabled={isAttendanceMarked}
              >
                Mark All Present
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => markAllAttendance(false)}
                disabled={isAttendanceMarked}
              >
                Mark All Absent
              </Button>
            </div>
            <ScrollArea className="max-h-[60vh]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Present</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll No</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>
                        <Checkbox
                          checked={checkedStudents.includes(student._id)}
                          onCheckedChange={(checked) => {
                            if (isAttendanceMarked) return;
                            setCheckedStudents(prev =>
                              checked
                                ? [...prev, student._id]
                                : prev.filter(id => id !== student._id)
                            );
                          }}
                          disabled={isAttendanceMarked}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{student.fullName}</TableCell>
                      <TableCell>{student.rollNo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
            <DialogFooter>
              <Button
                onClick={markAttendance}
                disabled={isLoading || isAttendanceMarked}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : isAttendanceMarked ? (
                  "Attendance Marked"
                ) : (
                  "Save Attendance"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <section className="grid md:grid-cols-2 gap-4 md:gap-6">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-teal-600 h-6 w-6" />
                <h2 className="text-lg md:text-xl font-semibold text-teal-800">
                  Student Results
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                View and manage academic results and progress reports.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/results">View Results</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="text-teal-600 h-6 w-6" />
                <h2 className="text-lg md:text-xl font-semibold text-teal-800">
                  Notices & Announcements
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                View important college announcements and updates.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/notice">View Notices</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}