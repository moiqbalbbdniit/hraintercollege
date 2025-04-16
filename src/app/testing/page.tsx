"use client"
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const students = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  class: `Class ${Math.floor(Math.random() * 12) + 1}`,
  roll: Math.floor(Math.random() * 1000),
  marks: Math.floor(Math.random() * 100),
}));

const StudentTable: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 print:p-0">
      <Card className="max-w-6xl mx-auto">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Student List</h1>
            <Button onClick={handlePrint} className="print:hidden">
              Print
            </Button>
          </div>

          {/* Additional Print Info (hidden on screen, visible on print) */}
          <div className="hidden print:block mb-4 text-center">
          <Image
          src="/images/logo.png"
          width={100} 
          height={100}
          className="mx-auto mb-2"  
          alt="School Logo"
          />
            <h2 className="text-xl font-semibold">HRA Inter College</h2>
            <p>Affiliated to XYZ Board | School Code: 123456</p>
            <p>Address: Main Road, Utraula, Balrampur, UP - 271604</p>
            <p>Contact: +91-12345-67890 | Email: info@hraintercollege.com</p>
            <hr className="my-2" />
          </div>

          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Class</th>
                <th className="border p-2">Roll No</th>
                <th className="border p-2">Marks</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="border p-2 text-center">{student.id}</td>
                  <td className="border p-2">{student.name}</td>
                  <td className="border p-2 text-center">{student.class}</td>
                  <td className="border p-2 text-center">{student.roll}</td>
                  <td className="border p-2 text-center">{student.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\:p-0, .print\:p-0 * {
            visibility: visible;
          }
          .print\:p-0 {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            margin: 0;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentTable;
