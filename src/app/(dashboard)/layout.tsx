'use client';

import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();



  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-1/5 p-4 bg-white text-black">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2 mb-8"
        >
          <Image src="/logos/MOE-logo.png" alt="MOE Logo" width={150} height={150} />
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-4/5 bg-background overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}