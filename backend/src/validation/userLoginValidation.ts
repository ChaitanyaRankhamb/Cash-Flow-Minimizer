import { z, ZodError } from "zod"

// Define validation schema using zod
const registrationSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(64, { message: "Password must be at most 64 characters." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character.",
    }),
})

export const userLoginValidation = async (
  email: string,
  password: string,
): Promise<true | Error> => {
  try {
    registrationSchema.parse({ email, password })
    return true
  } catch (err) {
    if (err instanceof ZodError) {
      const msg = err.issues.map((e) => e.message).join(" ")
      return new Error(msg)
    }
    return new Error("Unknown validation error")
  }
}
