import React from "react";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = async () => {
  const session = await auth();
  let displayName = "there";
  if (session?.user?.name) {
    displayName = session.user.name;
  } else if (session?.user?.email) {
    displayName = session.user.email.split("@")[0];
  }

  return (
    
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-purple-100 dark:from-[#18181b] dark:via-[#232336] dark:to-[#232336] transition-colors">
      <div className="bg-white/80 dark:bg-[#232336]/80 rounded-3xl shadow-2xl px-8 py-12 flex flex-col items-center max-w-lg w-full border border-blue-100 dark:border-zinc-800">
        <h1 className="text-xl md:text-2xl font-extrabold text-center bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 bg-clip-text text-transparent mb-4">
          Welcome, {displayName}!
        </h1>
        <p className="text-lg text-center text-zinc-600 dark:text-zinc-300 mb-8">
          🎉 You’ve arrived at your{" "} 
          <span className="font-semibold text-blue-500">Taskflow</span> dashboard.
          <br />
          Here you can manage your tasks, track progress, and boost your
          productivity.
        </p>
        <div className="flex flex-col gap-4 w-full">
          <Button asChild size="lg" className="w-full rounded-xl text-base">
            <Link href="/dashboard/kanban">Go to Kanban Board</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full rounded-xl text-base"
          >
            <Link href="/dashboard/reports">View Task Reports</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;