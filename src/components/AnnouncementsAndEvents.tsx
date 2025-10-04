import React from "react";
import { Megaphone, Calendar, ChevronRight } from "lucide-react";

const announcements = [
  { title: "Midterm Exams start next week.", date: "Oct 7, 2025" },
  { title: "No classes on Founders’ Day.", date: "Oct 21, 2025" },
  { title: "Submit Machetes before Friday.", date: "Oct 10, 2025" },
  { title: "Sunday House inspections.", date: "Oct 12, 2025" },
];

const events = [
  { title: "Cultural Day", day: "15", month: "OCT", location: "Assembly Hall" },
  { title: "Inter-house Sports", day: "20", month: "OCT", location: "Sports Field" },
  { title: "Science Fair", day: "25", month: "OCT", location: "Lab Block" },
  { title: "Career Seminar", day: "05", month: "NOV", location: "Auditorium" },
];

export default function AnnouncementsAndEvents() {
  return (
    <div className="grid md:grid-cols-2 gap-6 w-full">
      {/* Announcements Card */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg flex items-center font-bold text-blue-600"><Megaphone size={18} className="mr-2 text-blue-600"/> Announcements</h2>
          <button className="text-sm text-blue-600 flex items-center font-semibold rounded-xs px-4 py-2 bg-blue-100 hover:underline">View all<ChevronRight className="ml-1 w-4 h-4 font-bold text-blue-600" /></button>
        </div>
        <div className="flex flex-col gap-4">
          {announcements.map((a, idx) => (
            <div key={idx} className="border-l-4 border-blue-600 pl-3">
              <div className="text-blue-600 font-semibold">{a.title}</div>
              <div className="text-gray-500 text-xs mt-1">{a.date}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Events Card */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg flex items-center font-bold text-blue-600"><Calendar size={18} className="mr-2 text-blue-600"/> Upcoming Events</h2>
          <button className="text-sm text-blue-600 flex items-center font-semibold rounded-xs px-4 py-2 bg-blue-100 hover:underline">See calendar<ChevronRight className="ml-1 w-4 h-4 font-bold text-blue-600" /></button>
        </div>
        <div className="flex flex-col gap-4">
          {events.map((e, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="bg-blue-600 text-white rounded-lg w-12 h-12 flex flex-col items-center justify-center">
                <span className="text-lg font-bold leading-none">{e.day}</span>
                <span className="text-xs font-medium leading-none">{e.month}</span>
              </div>
              <div>
                <div className="text-blue-600 font-semibold">{e.title}</div>
                <div className="text-gray-500 text-xs mt-1">{e.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}