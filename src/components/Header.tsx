"use client";

import { useAuth } from "@/contexts/AuthContext";
import { validateToken } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Header() {
  const { isLoggedIn, username, setAuthInfo } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setAuthInfo(false, "");
    router.push("/");
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const { isValid, user } = await validateToken();
          if (isValid) {
            setAuthInfo(true, user.username);
          } else {
            handleLogout();
          }
        }
      } catch (error) {
        handleLogout();
      }
    };

    checkAuth();
  }, []);

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Board
        </Link>
        <div>
          {isLoggedIn ? (
            <>
              <span className="mr-4">Welcome, {username}!</span>
              <Link href="/posts/new" className="mr-4">
                New Post
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="mr-4">
                Login
              </Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
