"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.replace("/dashboard");
    } else {
      router.replace("/auth");
    }
  }, [router]);

  return null;
}
