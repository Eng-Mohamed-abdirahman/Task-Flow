// RelativeTime.tsx
"use client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);

export default function RelativeTime({ date }: { date: string }) {
  // Use dummy state to trigger re-render every minute
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => forceUpdate((n) => n + 1), 60000);
    return () => clearInterval(interval);
  }, []);
  return <span>{dayjs(date).fromNow()}</span>;
}