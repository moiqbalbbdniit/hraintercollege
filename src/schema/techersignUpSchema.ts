import {z} from "zod"

export const teacherSignUpSchema = z.object({
        fullName: z.string().min(1, { message: "FUll name is required" }),
        
        email: z.string().email({ message: "Please enter a valid email address" }),
        
        password: z
          .string()
          .min(6, { message: "Password must be at least 6 characters long" }),
        
        assignedClass: z.string().min(1, { message: "Please select your Class" }),
        gender:z.string(),
        subject: z.string().min(1, { message: "Please select yourSubject" }),
        section: z.string().min(1, { message: "Please select your Section" }),
        
})