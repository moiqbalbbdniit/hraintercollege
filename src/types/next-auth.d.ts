import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    fullName?: string;
    email?: string;
    studentClass?: string;
    assignedClass?: string;
    role?: string;
    section?: string;
    subject?: string;
    rollNo?: string;
  }
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      fullName?: string;
      email?: string;
      studentClass?: string;
      assignedClass?: string;
      role?: string;
      section?: string;
      rollNo?: string;
      subject?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    fullName?: string;
    email?: string;
    studentClass?: string;
    assignedClass?: string;
    role?: string;
    section?: string;
    subject?: string;
    rollNo?: string;
  }
}
