"use server"
import bcrypt from "bcryptjs"
import { prisma } from "@/prisma/prisma"
import { userRegistrationSchema } from "../utils/userSchemas"
import z from "zod"
import { error } from "console"
import { redirect } from "next/navigation"

export const RegisterAction = async (data : z.infer<typeof userRegistrationSchema>)=>{

    try {

        const validateData = userRegistrationSchema.parse(data)

    if (!validateData) {
        return { error   : "invalid user data"}
    }

    let {name , email , password , confirmPassword} = validateData

    email = email.toLowerCase()

    const existingEmail = await prisma.user.findFirst({
        where: { email },
    })

    if (existingEmail) {
      return { error: "Email already in use" }
    }

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" }
    }

    password = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
            
        },
    })



    return { success: "User registered successfully" }
    
        
    } catch (error) {
        console.error("Error registering user:", error)
        return { error: "User registration failed" }
        
    }

    
}