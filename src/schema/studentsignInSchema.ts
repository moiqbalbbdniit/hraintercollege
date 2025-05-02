import {z} from "zod"

export const studentsignInSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(["Teacher", "Student"], { errorMap: () => ({ message: "Invalid role" }) }), // Added role validation
})


