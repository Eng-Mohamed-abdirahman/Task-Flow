"use client";
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
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "./ui/form";
import { LoginSchema } from "@/app/utils/userSchemas";
import { LoginAction } from "@/app/actions/loginAction";
import { toast } from "sonner";
import LoginGoogle from "./LoginGoogle";
import { redirect } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // function handleSubmit(data: z.infer<typeof UserSchema>) {

  //   console.log(data);
  // }

  const handleSubmit = async (value: z.infer<typeof LoginSchema>) => {
    const response = await LoginAction(value);
   if (response.error) {
     toast.error(response.error);
   }
   if (response.success) {
     toast.success("Login successful");
     redirect("/dashboard");
   }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Github account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
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
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
  {form.formState.isSubmitting ? <span className="flex space-x-2"><Loader className="animate-spin"/> Logging in...</span> : "Login"}
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

