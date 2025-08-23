"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// import { createTaskAction } from "@/app/actions/createTask";
import { createTaskAction } from "@/app/actions/createTask";
import { TaskSchema } from "@/app/utils/TaskSchema";
import { redirect } from "next/navigation";
import { toast } from "sonner";



export default function NewTask() {
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "Pending",
    },
  });

  async function onSubmit(values: z.infer<typeof TaskSchema>) {

    const result = await createTaskAction(values);

    if (!result) {
      // Handle error
      console.error("Failed to create task");
    }

    if (result.error) {
      toast.error("Failed to create task");
      console.error(result.error);
    }

    if (result.success) {
      toast.success("Task created successfully");
      // redirect("/dashboard/taskList");
    }

    //  toast.success("Task created successfully");
    //   // redirect("/dashboard/taskList");
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh]  w-full"> 
      <Card className="w-full max-w-lg shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-2xl ">Create New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your task..." rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
              
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                    onValueChange={field.onChange} defaultValue={field.value}
                    
                 >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full  text-white "
                disabled={form.formState.isSubmitting}
              >
               {form.formState.isSubmitting ? "Submitting..." : "Create Task"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}