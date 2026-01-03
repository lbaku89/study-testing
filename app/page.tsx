"use client";

import { LoginButton } from "@/components/LoginButton";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoginButton />
      <ThemeToggle />
    </div>
  );
}
