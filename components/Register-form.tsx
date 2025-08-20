"use client";
import { userRegistrationSchema } from "@/app/utils/userSchemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "./ui/form";
import { Loader } from "lucide-react";
import { RegisterAction } from "@/app/actions/register";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useState } from "react";
import LoginGoogle from "./LoginGoogle";

export function Register({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof userRegistrationSchema>>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [error , setError] = useState<string | null>(null);

  async function handleSubmit(data: z.infer<typeof userRegistrationSchema>) {
    const response = await RegisterAction(data);
    setError(null); // Reset error state
    if (response.error) {
      toast.error(response.error);
      setError(response.error);
    } else {
      toast.success(response.success);
      redirect("/auth/login");
    }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>Login with your Github account</CardDescription>
        </CardHeader>
        <CardContent>
           {
              error && (
                <p className="text-red-600 bg-red-100 border border-red-500 p-2 rounded mb-4">{error}</p>
              )}
          <Form {...form}>
           
            <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                   
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm your password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
                   <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
  {form.formState.isSubmitting ? <span className="flex space-x-2"><Loader className="animate-spin"/> Registering...</span> : "Register"}
</Button>
            </form>
          </Form>

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t pt-4 pb-4">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <div className="flex flex-col gap-4">
             <LoginGoogle />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
