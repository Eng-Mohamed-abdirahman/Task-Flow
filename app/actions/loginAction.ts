"use server"

import { redirect } from "next/navigation";
import {signIn , signOut} from "../auth"

export const loginGithub = async () => {
  try {
    const result = await signIn("github");
    if (result) {
      redirect("/dashboard");
    }
    return result;
  } catch (error) {
    console.error("Error logging in with GitHub:", error);
    return null;
  }
}

export const logout = async () => {
  try {
    const result = await signOut();
    return result;
  } catch (error) {
    console.error("Error logging out:", error);
    return null;
  }
};
