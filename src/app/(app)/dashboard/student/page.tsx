"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, BookOpen, Bell, LogOut, Clock } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios"; // Import Axios

const COLORS = ["#0f766e", "#f87171"]; // Teal for present, Red for absent

interface AttendanceStats {
  totalDays: number;
  presentDays: number;
  absentDays: number;
}

interface TimetableItem {
  time: string;
  subject: string;
}

export default function StudentDashboard() {
  const { data: session } = useSession();
  const [attendance, setAttendance] = useState<AttendanceStats>({
    totalDays: 0,
    presentDays: 0,
    absentDays: 0,
  });
  const [timetable, setTimetable] = useState<TimetableItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch attendance with Axios
        const attendanceRes = await axios.get("/api/attendance/student", {
          withCredentials: true, // Include credentials in the request (like cookies)
        });
        setAttendance({
          totalDays: attendanceRes.data.totalDays || 0,
          presentDays: attendanceRes.data.presentDays || 0,
          absentDays: attendanceRes.data.absentDays || 0,
        });

        // Fetch timetable with Axios
        const timetableRes = await axios.get("/api/timetable", {
          withCredentials: true,
        });
        setTimetable(timetableRes.data.timetable || []);
      } catch (err) {
        console.error(err);
        toast.error(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const doughnutData = [
    { name: "Present", value: attendance.presentDays },
    { name: "Absent", value: attendance.absentDays },
  ];

  const percentage = attendance.totalDays
    ? Math.round((attendance.presentDays / attendance.totalDays) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-teal-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-teal-800">
            Welcome, {session?.user?.fullName || "Student"} 🎓
          </h1>
          <p className="text-teal-700 mt-1 text-lg">
            Track your attendance and academic progress.
          </p>
        </header>
        {session?.user && (
          <Card className="mb-6 bg-white shadow-md rounded-2xl">
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-semibold text-teal-800">
                  {session.user.fullName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Roll Number</p>
                <p className="font-semibold text-teal-800">
                  {session.user.rollNo}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Class</p>
                <p className="font-semibold text-teal-800">
                  {session.user.studentClass}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Section</p>
                <p className="font-semibold text-teal-800">
                  {session.user.section}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="col-span-1 md:col-span-2 bg-white shadow-md rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-teal-800 mb-4 flex items-center gap-2">
                <CalendarDays className="text-teal-600 h-6 w-6" />
                Attendance Summary
              </h2>
              {isLoading ? (
                <p className="text-gray-500">Loading attendance...</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={doughnutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
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
                      <Tooltip formatter={(value: number) => `${value} days`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-4">
                    <Stat label="Total Classes" value={attendance.totalDays} />
                    <Stat label="Present" value={attendance.presentDays} />
                    <Stat label="Absent" value={attendance.absentDays} />
                    <Stat label="Percentage" value={`${percentage}%`} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-2xl">
            <CardContent className="p-6">
              <BookOpen className="text-teal-600 h-8 w-8 mb-4" />
              <h2 className="text-xl font-semibold text-teal-800 mb-2">
                View Results
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Check your grades and performance.
              </p>
              <Button
                variant="outline"
                className="w-full border-teal-700 text-teal-700 hover:bg-teal-100"
                asChild
              >
                <Link href="/dashboard/results">Go to Results</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="bg-white shadow-md rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-teal-800 mb-4 flex items-center gap-2">
                <Clock className="text-teal-600 h-6 w-6" />
                Timetable
              </h2>
              {timetable.length > 0 ? (
                <ul className="space-y-2">
                  {timetable.map((item, i) => (
                    <li
                      key={i}
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
                <p className="text-gray-500">No timetable available.</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-2xl">
            <CardContent className="p-6">
              <Bell className="text-teal-600 h-8 w-8 mb-4" />
              <h2 className="text-xl font-semibold text-teal-800 mb-2">
                Notices & Updates
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                View announcements and important updates.
              </p>
              <Button
                variant="outline"
                className="w-full border-teal-700 text-teal-700 hover:bg-teal-100"
                asChild
              >
                <Link href="/dashboard/notice">View Notices</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={() => signOut()}
            className="bg-teal-700 text-white hover:bg-teal-800"
          >
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-teal-700 text-lg font-bold">{value}</p>
    </div>
  );
}
