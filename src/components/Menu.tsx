"use client";

import { useEffect, useState } from "react";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import UploadExcelModal from "./UploadExcelModal";
import SidePopup from "./SidePopup";

type MenuItem =
  | { icon: string; label: string; href: string; visible: string[] }
  | { icon: string; label: string; onClick: () => void; visible: string[] };

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupStatus, setPopupStatus] = useState<"success" | "error" | null>(
    null
  );
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const menuItems = [
    {
      title: "MENU",
      items: [
        /* {
          icon: "/home.png",
          label: "Home",
          href: "/",
          visible: ["admin", "teacher", "student", "parent"],
        }, */
        {
          icon: "/home.png",
          label: "Home",
          href: "/student-dashboard",
          visible: ["student"],
        },
        {
          icon: "/home.png",
          label: "Home",
          href: "/admin",
          visible: ["admin"],
        },
        {
          icon: "/teacher.png",
          label: "Teachers",
          href: "/list/management/teachers",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/student.png",
          label: "Students",
          href: "/list/management/students",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/admission.png",
          label: "New Admission", // Quick access from menu
          href: "/admissions", // Direct top-level route
          visible: ["admin", "teacher"],
        },
        {
          icon: "/parent.png",
          label: "Parents",
          href: "/list/management/parents",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/subject.png",
          label: "Subjects",
          href: "/list/academics/subjects",
          visible: ["admin"],
        },
        {
          icon: "/class.png",
          label: "Classes",
          href: "/list/academics/classes",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/lesson.png",
          label: "Lessons",
          href: "/list/academics/lessons",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/exam.png",
          label: "Exams",
          href: "/list/academics/exams",
          visible: ["teacher", "student"],
        },
        {
          icon: "/assignment.png",
          label: "Assignments",
          href: "/list/academics/assignments",
          visible: ["teacher", "student", "parent"],
        },
        {
          icon: "/result.png",
          label: "Results",
          href: "/list/academics/results",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/attendance.png",
          label: "Attendance",
          href: "/list/attendance",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/calendar.png",
          label: "Events",
          href: "/list/communications/events",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/message.png",
          label: "Messages",
          href: "/list/communications/messages",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/announcement.png",
          label: "Announcements",
          href: "/list/communications/announcements",
          visible: ["teacher", "student", "parent"],
        },
      ],
    },
    {
      title: "ACTIONS",
      items: [
        {
          icon: "/upload.png",
          label: "Upload Excel",
          onClick: () => setIsModalOpen(true),
          visible: ["admin"],
        },
      ],
    },
    {
      title: "OTHER",
      items: [
        {
          icon: "/profile.png",
          label: "Profile",
          href: "/profile",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/setting.png",
          label: "Settings",
          href: "/settings",
          visible: ["teacher", "student", "parent"],
        },
        {
          icon: "/setting.png",
          label: "Settings",
          href: "/admin/settings",
          visible: ["admin"],
        },
        {
          icon: "/logout.png",
          label: "Logout",
          href: "/logout",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/admin.png",
          label: "Super Admin",
          href: "/super-admin",
          visible: ["admin"],
        },
      ],
    },
  ];
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserType(userType ?? "");
  }, []);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setIsModalOpen(false);

    try {
      const response = await fetch(
        "https://84.247.136.103/api/v1/admissions/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      // const response = { ok: true };
      // const result = { status: "success", message: "File uploaded successfully" };

      if (response.ok && (result.status === "success" || result.count > 0)) {
        setPopupStatus("success");
        setPopupMessage(result.message || "File uploaded successfully");
      } else {
        setPopupStatus("error");
        setPopupMessage(result.message || "File upload failed");
      }
    } catch (error) {
      setPopupStatus("error");
      setPopupMessage("Error uploading file: An unexpected error occurred; " + error);
    }
  };

  return (
    <div className="mt-4 text-sm">
      {popupStatus && (
        <SidePopup
          status={popupStatus}
          message={popupMessage || ""}
          onClose={() => setPopupStatus(null)}
        />
      )}
      <UploadExcelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleFileUpload}
      />
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(userType)) {
              // Type guard to check if item has onClick
              if ("onClick" in item && typeof item.onClick === "function") {
                return (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight w-full"
                  >
                    <Image src={item.icon} alt="" width={20} height={20} />
                    <span className="hidden lg:block">{item.label}</span>
                  </button>
                );
              }
              return (
                <Link
                  href={(item as { href: string }).href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;