"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifySchema } from "@/schema/verifySchema";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";

export default function VerifyOTPPage() {
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 2 minutes in seconds
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState(""); // This would normally come from a previous step or context
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  // Timer for OTP expiration
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle OTP submission
  const onSubmit = async () => {
    const otp = form.getValues('verificationCode');
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/api/verifyCode", {
        email,
        verificationCode: otp,
      });
  
      if (response.data.success) {
        toast.success(response.data.message || "OTP Verified! Please login.");
        setIsSuccess(true);
      } else {
        toast.error(response.data.message || "OTP Verification failed");
      }
  
    } catch (error) {
      // const axiosError = error as AxiosError<ApiResponse>;
      // toast.error(axiosError.response?.data.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // Handle resend OTP
  const handleResendOTP = () => {
    setIsResending(true);

    // Simulate API call for resending OTP
    setTimeout(() => {
      console.log("Resending OTP to:", email);
      setIsResending(false);
      setTimeLeft(120); // Reset timer to 2 minutes
      form.setValue("verificationCode", ""); // Clear form value
    }, 1500);
  };

  //logic display email from URL dynamically
  const params = useParams();
  // decodeURIComponent to fix %40 for @ etc.
  useEffect(() => {
    const emailFromParams = params?.email ? decodeURIComponent(params.email as string) : "";

    // Simple regex to check if it is a valid email
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (emailFromParams && isValidEmail(emailFromParams)) {
      setEmail(emailFromParams);
    } else {
      // Invalid or missing email ➔ Redirect to signup
      router.push("/studentRegister");
    }
  }, [params, router]);

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-4 rounded-full">
                    <CheckCircle className="h-16 w-16 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-teal-800 mb-2">
                  Verification Successful!
                </CardTitle>
                <CardDescription className="text-gray-600 mb-6">
                  Please login to your account to continue.
                  with your email and password.
                </CardDescription>
                <Button className="bg-teal-700 hover:bg-teal-800 w-full">
                  <Link href="/studentSignin">Continue to Login Page</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="/images/logo.png"
            alt="HRA Inter College Logo"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Verify Your Account
            </CardTitle>
            <CardDescription className="text-center">
              We've sent a 6-digit verification code to 
              <span className="font-bold ml-2">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="verificationCode" // Adjust this to match your schema
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Verification Code</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                          value={field.value}
                          onChange={field.onChange}
                          disabled={isSubmitting}
                          className="justify-center"
                        >
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={0}
                              className="w-12 h-12 text-center text-xl font-bold"
                            />
                            <InputOTPSlot
                              index={1}
                              className="w-12 h-12 text-center text-xl font-bold"
                            />
                            <InputOTPSlot
                              index={2}
                              className="w-12 h-12 text-center text-xl font-bold"
                            />
                            <InputOTPSlot
                              index={3}
                              className="w-12 h-12 text-center text-xl font-bold"
                            />
                            <InputOTPSlot
                              index={4}
                              className="w-12 h-12 text-center text-xl font-bold"
                            />
                            <InputOTPSlot
                              index={5}
                              className="w-12 h-12 text-center text-xl font-bold"
                            />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Timer */}
                <div className="text-center">
                  {timeLeft > 0 ? (
                    <p className="text-sm text-gray-500">
                      Code expires in{" "}
                      <span className="font-medium">
                        {formatTime(timeLeft)}
                      </span>
                    </p>
                  ) : (
                    <p className="text-sm text-red-500">
                      The verification code has expired. Please request a new
                      one.
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-teal-700 hover:bg-teal-800"
                  disabled={
                    isSubmitting ||
                    timeLeft <= 0 ||
                    (form.getValues("verificationCode") || "").length !== 6
                  }
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    "Verify Account"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center w-full">
              <Button
                variant="outline"
                onClick={handleResendOTP}
                disabled={isResending || timeLeft > 0}
                className="w-full"
              >
                {isResending ? (
                  <span className="flex items-center justify-center">
                    <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                    Resending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Resend Verification Code
                  </span>
                )}
              </Button>
            </div>
            <div className="text-center">
              <Button variant="link" className="text-teal-700 p-0">
                <Link href="/signup/student" className="flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Registration
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <Link
              href="/contact"
              className="text-teal-700 hover:underline font-medium"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
