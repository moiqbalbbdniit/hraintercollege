import {z} from "zod"

export const studentSignUpSchema = z.object({
        fullName: z.string().min(1, { message: "FUll name is required" }),
        
        email: z.string().email({ message: "Please enter a valid email address" }),
        mobileNo: z
          .string()
          .min(10, { message: "Phone number must be at least 10 digits" })
          .regex(/^[6-9]\d{9}$/, {
            message: "Please enter a valid phone number",
          }),
        password: z
          .string()
          .min(6, { message: "Password must be at least 6 characters long" }),
        
        studentClass: z.string().min(1, { message: "Please select your grade" }),
        gender:z.string(),
        section: z.string().min(1, { message: "Please select your section" }),
        rollNo: z.string().min(1, { message: "Please enter your roll number" }),
        
})