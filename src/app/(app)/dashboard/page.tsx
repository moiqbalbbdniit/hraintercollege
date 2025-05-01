"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, BookOpen, Bell, LogOut, Clock } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {Student} from "@/model/User";
import { useEffect, useState } from "react";
import axios from "axios";

const attendanceData = [
  { date: "Mon", present: 1 },
  { date: "Tue", present: 1 },
  { date: "Wed", present: 0 },
  { date: "Thu", present: 1 },
  { date: "Fri", present: 1 },
  { date: "Sat", present: 1 },
];
//logic from attendanceData to calculate percentage
const totalDays = attendanceData.length;
const presentDays = attendanceData.filter((day) => day.present === 1).length;
const absentDays = totalDays - presentDays;
const attendancePercentage = Math.round((presentDays / totalDays) * 100);

const doughnutData = [
  { name: "Present", value: presentDays },
  { name: "Absent", value: absentDays },
];

const COLORS = ["#0f766e", "#f87171"]; // Teal for present, Red for absent

const timetable = [
  { time: "08:00 AM", subject: "Math" },
  { time: "09:00 AM", subject: "Science" },
  { time: "10:00 AM", subject: "English" },
  { time: "11:00 AM", subject: "Break" },
  { time: "11:30 AM", subject: "History" },
  { time: "12:30 PM", subject: "Computer" },
];

export default function Dashboard() {
  const { data: session } = useSession();
  

 ;


  return (
    <main className="min-h-screen bg-teal-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-teal-800">
            Welcome, {session?.user?.fullName || "Student"} 🎓
          </h1>
          <p className="text-teal-700 mt-1">
            Here's your academic dashboard overview.
          </p>
        </header>

        <section className="mb-6 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-teal-800 mb-4">
            Student Information
          </h2>
          <p className="text-gray-700 text-lg">
            Name: <span className="font-medium">{session?.user?.fullName || "Student"}</span>
          </p>
          <p className="text-gray-700 text-lg">
            Class: <span className="font-medium">{session?.user?.studentClass || "Student Class"}</span>
          </p>
          <p className="text-gray-700 text-lg">
            Section: <span className="font-medium">{session?.user?.section || "Student Section"}</span>
          </p>
          <p className="text-gray-700 text-lg">
            Roll Number: <span className="font-medium">{session?.user?.rollNo || "Student Roll Number"}</span>
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-white shadow-md rounded-2xl hover:shadow-lg transition col-span-1 md:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-teal-800 mb-4 flex items-center gap-2">
                <CalendarDays className="text-teal-600 h-6 w-6" /> Attendance
                Overview
              </h2>
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
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center text-teal-700 font-medium mt-2">
                Attendance: {attendancePercentage}%
              </p>
              <p className="text-center text-teal-700 font-medium mt-2">
                Total Class: {totalDays}
              </p>
              <p className="text-center text-teal-700 font-medium mt-2">
                Total Present: {presentDays}
              </p>
              <p className="text-center text-teal-700 font-medium mt-2">
                Total Absent: {absentDays}
              </p>
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
                className="text-teal-700 border-teal-700 hover:bg-teal-100"
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
              <ul className="space-y-2">
                {timetable.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-700 flex justify-between border-b pb-1"
                  >
                    <span>{item.time}</span>
                    <span className="font-medium text-teal-700">
                      {item.subject}
                    </span>
                  </li>
                ))}
              </ul>
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
                className="text-teal-700 border-teal-700 hover:bg-teal-100"
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
