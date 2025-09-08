"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // always redirect to login first
    router.push("/login");
  }, [router]);

  return null; // nothing to render, just redirect
}
