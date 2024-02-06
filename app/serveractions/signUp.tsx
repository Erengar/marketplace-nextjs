"use server";
import mongoose from "mongoose";
import { z } from "zod";
import { User } from "../../mongoDB/schema";

const user = z
    .object({
        username: z
            .string({
                required_error: "Username is required.",
                invalid_type_error: "Invalid Username.",
            })
            .min(5, "Username must contain at least 5 character(s).")
            .max(20, "Username must contain at most 20 character(s)."),
        password: z
            .string({
                required_error: "Password is required.",
                invalid_type_error: "Invalid Password.",
            })
            .min(8, "Password must contain at least 8 character(s).")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
            ),
        confirmpassword: z.string({
            required_error: "Confirm Password is required.",
            invalid_type_error: "Invalid Confirm Password.",
        }),
        email: z
            .string({
                required_error: "Email is required.",
                invalid_type_error: "Invalid Email.",
            })
            .email("Invalid Email Address."),
    })
    .refine((data) => data.password === data.confirmpassword, {
        message: "Passwords do not match.",
        path: ["confirmpassword"],
    });

export async function signUp(prevState: any, formData: FormData) {
    const data = user.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
        confirmpassword: formData.get("confirmpassword"),
        email: formData.get("email"),
    });
    if (!data.success) {
        return { error: data.error.flatten().fieldErrors };
    }
    return { success: "Not Implemented Yet." };
    /*
    await mongoose.connect(process.env.MONGODB_URI!);
    const newUser = new User({
        username: data.data.username,
        password: data.data.password,
        email: data.data.email,
    });
    await newUser.save();
    await mongoose.connection.close();*/
}
