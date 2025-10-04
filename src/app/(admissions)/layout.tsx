"use client";

import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdmissionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className='bg-[#F7F8FA]'>
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <Image src="/logos/MOE-logo.png" alt="MOE Logo" width={200} height={200} />
                {pathname === '/school-registration' && (
                  <Link href="/login">
                    <button className="bg-blue-500 text-white rounded-lg py-2 px-4 font-semibold hover:bg-blue-600 transition cursor-pointer">
                      Login
                    </button>
                  </Link>
                )}
              </div>
              {children}
            </div>
        </div>
    </div>
  );
}