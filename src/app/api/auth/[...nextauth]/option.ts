import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import StudentModel from "@/model/User";
import TeacherModel from "@/model/Teacher";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter yourPassword",
        },
        role:{
          label:"Are you a Student/Teacher?",
          type:"select",
          options:[
            "Student",
            "Teacher"
          ]
        }
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password || !credentials?.role) {
          throw new Error("Email, Password and Role are required");
        }
      
        await dbConnect();
        let user;
        if (credentials.role === "Student") {
          user = await StudentModel.findOne({ email: credentials.email }).select("+password");
        } else if (credentials.role === "Teacher") {
          user = await TeacherModel.findOne({ email: credentials.email }).select("+password");
        } else {
          throw new Error("Invalid role selected");
        }
 
        
      
        if (!user) {
          throw new Error("No account found with this email");
        }
      
        // if (!user.isVerified) {
        //   throw new Error("Account not verified. Please verify your email.");
        // }
      
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
      
        if (!isPasswordCorrect) {
          throw new Error("Incorrect password. Please try again.");
        }
      
        return {
          id: user._id.toString(),
          email: user.email,
          role: credentials.role,
          isVerified: user.isVerified,
          fullName: user.fullName,
          studentClass: user.studentClass || null, // Only for students
          assignedClass: user.assignedClass || null, // Only for teachers
          rollNo: user.rollNo,
          subject: user.subject,
          section: user.section,
        };
      }
      
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      if (user) {
        token._id = user._id?.toString();
        token.role = user.role;
        token.isVerified = user.isVerified;
        token.email = user.email;
        token.fullName = user.fullName;
        token.studentClass = user.studentClass;
        token.assignedClass = user.assignedClass;
        token.rollNo = user.rollNo; 
        token.subject = user.subject;
        token.section = user.section;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token) {
        session.user._id = token._id;
        session.user.role = token.role;
        session.user.isVerified = token.isVerified;
        session.user.email = token.email;
        session.user.fullName = token.fullName;
        session.user.studentClass = token.studentClass;
        session.user.assignedClass = token.assignedClass;
        session.user.rollNo = token.rollNo;
        session.user.subject = token.subject;
        session.user.section = token.section;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
