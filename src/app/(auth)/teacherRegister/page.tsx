"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { teacherSignUpSchema } from "@/schema/techersignUpSchema";
import { toast } from "sonner";

// Define the form validation schema using Zod

export default function TeacherSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedClass, setSelectedClass] = useState(""); // Track selected class
  const router = useRouter();

  // Subjects based on classes
  const subjectsByClass: { [key: string]: string[] } = {
    nursery: ["General Knowledge", "Storytelling"],
    lkg: ["General Knowledge", "Arts and Craft"],
    ukg: ["General Knowledge", "Storytelling"],
    "1st": ["Mathematics", "English", "Science", "Hindi"],
    "2nd": ["Mathematics", "English", "Science", "Hindi"],
    "3rd": ["Mathematics", "English", "Science", "Hindi"],
    "4th": ["Mathematics", "English", "Science", "Hindi"],
    "5th": ["Mathematics", "English", "Science", "Hindi"],
    "6th": ["Mathematics", "English", "Science", "Hindi", "Social Studies"],
    "7th": ["Mathematics", "English", "Science", "Hindi", "Social Studies"],
    "8th": ["Mathematics", "English", "Science", "Hindi", "Social Studies"],
    "9th": [
      "Mathematics",
      "English",
      "Science",
      "Hindi",
      "Social Studies",
      "Sanskrit",
    ],
    "10th": [
      "Mathematics",
      "English",
      "Science",
      "Hindi",
      "Social Studies",
      "Sanskrit",
    ],
    "11th": [
      "Mathematics",
      "English",
      "Physics",
      "Chemistry",
      "Biology",
      "Hindi",
    ],
    "12th": [
      "Mathematics",
      "English",
      "Physics",
      "Chemistry",
      "Biology",
      "Hindi",
    ],
  };

  // Initialize react-hook-form
  const form = useForm<z.infer<typeof teacherSignUpSchema>>({
    resolver: zodResolver(teacherSignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      assignedClass: "",
      gender: "",
      subject: "",
      section: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: z.infer<typeof teacherSignUpSchema>) => {
    try {
      const response = await axiosInstance.post("/api/signup/teacherRegister", data);
      if (response.data.success) {
        toast.success(response.data.message || "Account Created Successfully. Login to continue.");
        router.replace("/sign-in");
      } else {
        toast.error(response.data.message || "Error creating account.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Image
              src="/images/logo.png"
              alt="HRA Inter College Logo"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-teal-800 mb-2">
              Teacher Registration
            </h1>
            <p className="text-gray-600">
              Create your Teacher account to access students' academic progress.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Full Name <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Email Address <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="assignedClass"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Assigned Class <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={(value) => {
                                setSelectedClass(value);
                                field.onChange(value);
                              }}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.keys(subjectsByClass).map((className) => (
                                  <SelectItem key={className} value={className}>
                                    {className}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Subject Selection based on Class */}
                      {selectedClass && (
                        <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Subject <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                              <FormControl>
                                <SelectTrigger>
                                  {/* The value is now bound to the field value */}
                                  <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {subjectsByClass[selectedClass]?.map((subject) => (
                                  <SelectItem key={subject} value={subject}>
                                    {subject}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      
                      )}

                      <FormField
                        control={form.control}
                        name="section"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Section <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Section" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="A">Section A</SelectItem>
                                <SelectItem value="B">Section B</SelectItem>
                                <SelectItem value="C">Section C</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      

                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Gender <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Account Security */}
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Password <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Create a password"
                                  {...field}
                                />
                                <button
                                  type="button"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                              </div>
                            </FormControl>
                            <FormDescription>Password must be at least 6 characters long</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-teal-700 hover:bg-teal-800"
                  >
                    Create Account
                  </Button>

                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link href="/login" className="text-teal-700 hover:underline font-medium">
                        Log in
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
