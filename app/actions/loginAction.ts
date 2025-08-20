"use server"

import { redirect } from "next/navigation";
import {signIn } from "@/auth"
import { LoginSchema } from "../utils/userSchemas";
import z from "zod";
import { prisma } from "@/prisma/prisma";
import { AuthError } from "next-auth";

export const LoginAction = async ( data : z.infer<typeof LoginSchema>) => {


   const validateData = LoginSchema.parse(data);
   if (!validateData) {
     return { error: "Invalid login data" };
   }

   let {email , password} = validateData

   email = email.toLowerCase()

   const userExist = await prisma.user.findUnique({
       where: { email }
   })

   if (!userExist) {
       return { error: "User not found" }
   }
  try {
   await signIn("credentials", {
       email,
       password,
       redirectTo: "/dashboard",
    });

    return { success: "Login successful" };

  } catch (error) { 
    if (error instanceof AuthError) {
     switch (error.type) {
       case "CredentialsSignin":
         return { error: "Invalid email or password" }
       default:
         return { error: "Login failed" }
     }
   }
   throw error
}
}