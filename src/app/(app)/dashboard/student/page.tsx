"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, BookOpen, Bell, LogOut, Clock } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import dayjs from "dayjs";

const COLORS = ["#0f766e", "#f87171"]; // Teal for present, Red for absent

interface AttendanceRecord {
  date: string;
  present: boolean;
}

interface TimetableItem {
  time: string;
  subject: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timetable, setTimetable] = useState<TimetableItem[]>([]);

  // Fetch attendance data
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get("/api/attendance/student");
        setAttendanceData(res.data.attendance || []);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        toast.error("Failed to load attendance data");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTimetable = async () => {
      try {
        const res = await axios.get("/api/timetable");
        setTimetable(res.data.timetable || []);
      } catch (error) {
        console.error("Error fetching timetable:", error);
        toast.error("Failed to load timetable");
      }
    };

    fetchAttendance();
    fetchTimetable();
  }, []);

  // Calculate attendance stats
  const totalDays = attendanceData.length;
  const presentDays = attendanceData.filter(day => day.present).length;
  const absentDays = totalDays - presentDays;
  const attendancePercentage = totalDays > 0 
    ? Math.round((presentDays / totalDays) * 100) 
    : 0;

  const doughnutData = [
    { name: "Present", value: presentDays },
    { name: "Absent", value: absentDays },
  ];

  return (
    <main className="min-h-screen bg-teal-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-teal-800">
            Welcome, {session?.user?.fullName || "Student"} 🎓
          </h1>
          <p className="text-teal-700 mt-1">
            Here&#39;s your academic dashboard overview.
          </p>
        </header>

        <section className="mb-6 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-teal-800 mb-4">
            Student Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-700 text-lg">
              Name: <span className="font-medium">{session?.user?.fullName || "N/A"}</span>
            </p>
            <p className="text-gray-700 text-lg">
              Class: <span className="font-medium">{session?.user?.studentClass || "N/A"}</span>
            </p>
            <p className="text-gray-700 text-lg">
              Section: <span className="font-medium">{session?.user?.section || "N/A"}</span>
            </p>
            <p className="text-gray-700 text-lg">
              Roll No: <span className="font-medium">{session?.user?.rollNo || "N/A"}</span>
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-white shadow-md rounded-2xl hover:shadow-lg transition col-span-1 md:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-teal-800 mb-4 flex items-center gap-2">
                <CalendarDays className="text-teal-600 h-6 w-6" /> Attendance
                Overview
              </h2>
              {isLoading ? (
                <div className="h-60 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                </div>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={doughnutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {doughnutData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [`${value} days`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Percentage</p>
                      <p className="text-teal-700 font-medium">{attendancePercentage}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Classes</p>
                      <p className="text-teal-700 font-medium">{totalDays}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Present</p>
                      <p className="text-teal-700 font-medium">{presentDays}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Absent</p>
                      <p className="text-teal-700 font-medium">{absentDays}</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-2xl hover:shadow-lg transition">
            <CardContent className="p-6">
              <BookOpen className="text-teal-600 h-8 w-8 mb-4" />
              <h2 className="text-xl font-semibold text-teal-800">
                View Results
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                See your academic results and progress reports.
              </p>
              <Button
                variant="outline"
                className="text-teal-700 border-teal-700 hover:bg-teal-100 w-full"
                asChild
              >
                <Link href="/dashboard/results">Go to Results</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="bg-white shadow-md rounded-2xl hover:shadow-lg transition">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-teal-800 mb-4 flex items-center gap-2">
                <Clock className="text-teal-600 h-6 w-6" /> Daily Timetable
              </h2>
              {timetable.length > 0 ? (
                <ul className="space-y-2">
                  {timetable.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-700 flex justify-between border-b pb-2"
                    >
                      <span>{item.time}</span>
                      <span className="font-medium text-teal-700">
                        {item.subject}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">No timetable available</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-2xl hover:shadow-lg transition">
            <CardContent className="p-6">
              <Bell className="text-teal-600 h-8 w-8 mb-4" />
              <h2 className="text-xl font-semibold text-teal-800">
                Notices & Updates
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Stay informed with the latest college announcements.
              </p>
              <Button
                variant="outline"
                className="text-teal-700 border-teal-700 hover:bg-teal-100 w-full"
                asChild
              >
                <Link href="/dashboard/notice">View Notices</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <div className="mt-10 flex justify-end">
          <Button
            onClick={() => signOut()}
            className="bg-teal-700 text-white hover:bg-teal-800 flex gap-2"
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </div>
    </main>
  );
}