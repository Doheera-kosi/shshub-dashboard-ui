import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function AdmissionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The following layout was previously used:
  // <div className="h-screen flex">
  //   <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
  //     <Navbar />
  //     {children}
  //   </div>
  // </div>
  return (
    <div className='bg-[#F7F8FA]'>
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Image src="/logos/MOE-logo.png" alt="MOE Logo" width={200} height={200} />
              </div>
              {children}
            </div>
        </div>
    </div>
  );
}
