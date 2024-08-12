// app/components/Navbar.js
"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-white text-2xl font-bold"
        >
          E-Learning Platform
        </Link>
        <div className="space-x-4">
          <Link
            href="/courses"
            className="text-white hover:underline"
          >
            Courses
          </Link>
          {isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                className="text-white hover:underline"
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <Link
              href="/sign-in"
              className="text-white hover:underline"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
