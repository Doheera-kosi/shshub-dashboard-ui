"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "adminpassword";
  const STUDENT_USERNAME = "student";
  const STUDENT_PASSWORD = "studentpassword";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      router.push("/admin");
    } else if (username === STUDENT_USERNAME && password === STUDENT_PASSWORD) {
      router.push("/stud-dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className='bg-[#F7F8FA]'>
            <div className="min-h-screen p-6">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-center gap-4 mb-6">
                    <Image src="/logos/MOE-logo.png" alt="MOE Logo" width={200} height={200} />
                  </div>
                  <div className="flex items-center justify-center bg-[#F6FBF9]">
                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                      <h1 className="text-2xl font-bold text-blue-500 mb-6 text-center">School Portal Login</h1>
                      <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <input
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        <button
                          type="submit"
                          className="bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 transition"
                        >
                          Login
                        </button>
                      </form>
                      <div className="mt-6 text-center text-gray-500 text-sm">
                        Demo:
                        <br />
                        Admin: <span className="font-bold text-blue-500">admin</span> / <span className="font-bold text-blue-500">adminpassword</span>
                        <br />
                        Student: <span className="font-bold text-blue-500">student</span> / <span className="font-bold text-blue-500">studentpassword</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
  );
}