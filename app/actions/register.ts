"use server"
import bcrypt from "bcryptjs"
import { prisma } from "@/prisma/prisma"
import { userRegistrationSchema } from "../utils/userSchemas"
import z from "zod"


export const RegisterAction = async (data : z.infer<typeof userRegistrationSchema>)=>{

    try {

        const validateData = userRegistrationSchema.parse(data)

    if (!validateData) {
        return { error   : "invalid user data"}
    }

    const {name , email , password , confirmPassword} = validateData

    

    const existingEmail = await prisma.user.findFirst({
        where: { email },
    })

    if (existingEmail) {
      return { error: "Email already in use" }
    }

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const emailToLower = email.toLowerCase();

    await prisma.user.create({
        data: {
            name,
            email: emailToLower,
            password: hashedPassword,
            
        },
    })



    return { success: "User registered successfully" }
    
        
    } catch (error) {
        console.error("Error registering user:", error)
        return { error: "User registration failed" }
        
    }

    
}