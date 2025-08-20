"use server"
import { signIn } from "@/auth"
import { AuthError } from "next-auth";


export const GoogleAuthenticate = async () => {
    try {
        await signIn("google",
            { redirectTo: "/dashboard" }
        );
       
    } catch (error) {
        if (error instanceof AuthError) {
           return { error: error.message };
        }
        throw error
    }
  
}
        

