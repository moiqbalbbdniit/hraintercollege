import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import StudentModel from "@/model/User";

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
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required");
        }
      
        await dbConnect();
        const user = await StudentModel.findOne({ email: credentials.email }).select("+password");
      
        if (!user) {
          throw new Error("No account found with this email");
        }
      
        if (!user.isVerified) {
          throw new Error("Account not verified. Please verify your email.");
        }
      
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
          isVerified: user.isVerified,
          fullName: user.fullName,
          studentClass: user.studentClass,
          rollNo: user.rollNo,
          section: user.section,
        };
      }
      
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.email = user.email;
        token.fullName = user.fullName;
        token.studentClass = user.studentClass;
        token.rollNo = user.rollNo; 
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
        session.user.isVerified = token.isVerified;
        session.user.email = token.email;
        session.user.fullName = token.fullName;
        session.user.studentClass = token.studentClass;
        session.user.rollNo = token.rollNo;
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
    signIn: "/studentSignin",
  },
};
