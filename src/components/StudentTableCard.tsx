'use client';

import { useState } from 'react';
import { X, Expand } from 'lucide-react';
import { useEffect } from 'react';

const students = [
  { name: 'Kwame Mensah', id: 'S001', gender: 'Male', type: 'Day', house: 'Afado House', course: 'General Arts' },
  { name: 'Akosua Boateng', id: 'S002', gender: 'Female', type: 'Boarding', house: 'Nyarko House', course: 'Science' },
  { name: 'Kojo Owusu', id: 'S003', gender: 'Male', type: 'Boarding', house: 'Aglionby House', course: 'Business' },
  { name: 'Abena Asante', id: 'S004', gender: 'Female', type: 'Day', house: 'Elsie Dadzie House', course: 'Visual Arts' },
  { name: 'Yaw Agyeman', id: 'S005', gender: 'Male', type: 'Day', house: 'Siwdu McCarthy House', course: 'Visual Arts' },
  { name: 'Efua Sarpong', id: 'S006', gender: 'Female', type: 'Boarding', house: 'Kyidoman House', course: 'Science' },
  { name: 'Kofi Adjei', id: 'S007', gender: 'Male', type: 'Boarding', house: 'Afado House', course: 'Home Economics' },
  { name: 'Ama Boadu', id: 'S008', gender: 'Female', type: 'Day', house: 'Nyarko House', course: 'Home Economics' },
  { name: 'Kwabena Ofori', id: 'S009', gender: 'Male', type: 'Day', house: 'Mensah Kane House', course: 'General Arts' },
  { name: 'Afia Nyarko', id: 'S010', gender: 'Female', type: 'Boarding', house: 'Aberdeen House', course: 'Business' },
  { name: 'Selorm Dzidzor', id: 'S011', gender: 'Male', type: 'Boarding', house: 'Afado House', course: 'Business' },
  { name: 'Esi Quansah', id: 'S012', gender: 'Female', type: 'Day', house: 'Kyidoman House', course: 'General Arts' },
  { name: 'Kwesi Appiah', id: 'S013', gender: 'Male', type: 'Boarding', house: 'Aglionby House', course: 'General Arts' },
  { name: 'Naana Addo', id: 'S014', gender: 'Female', type: 'Boarding', house: 'Nyarko House', course: 'General Arts' },
  { name: 'Nii Armah', id: 'S015', gender: 'Male', type: 'Day', house: 'Siwdu McCarthy House', course: 'Science' },
  { name: 'Akua Mensima', id: 'S016', gender: 'Female', type: 'Boarding', house: 'Aberdeen House', course: 'Science' },
  { name: 'Yaw Tetteh', id: 'S017', gender: 'Male', type: 'Boarding', house: 'Siwdu McCarthy House', course: 'Home Economics' },
  { name: 'Adwoa Serwaa', id: 'S018', gender: 'Female', type: 'Day', house: 'Elsie Dadzie House', course: 'Visual Arts' },
  { name: 'Fuseini Alhassan', id: 'S019', gender: 'Male', type: 'Boarding', house: 'Afado House', course: 'Home Economics' },
  { name: 'Zainab Mohammed', id: 'S020', gender: 'Female', type: 'Boarding', house: 'Aberdeen House', course: 'Science' },
  { name: 'Kelvin Kpeglo', id: 'S021', gender: 'Male', type: 'Day', house: 'Aglionby House', course: 'Science' },
  { name: 'Dora Aidoo', id: 'S022', gender: 'Female', type: 'Day', house: 'Aberdeen House', course: 'General Arts' },
  { name: 'Kwaku Addae', id: 'S023', gender: 'Male', type: 'Boarding', house: 'Aglionby House', course: 'Business' },
  { name: 'Mariam Yakubu', id: 'S024', gender: 'Female', type: 'Boarding', house: 'Elsie Dadzie House', course: 'Business' },
  { name: 'Kojo Quaye', id: 'S025', gender: 'Male', type: 'Day', house: 'Siwdu McCarthy House', course: 'Visual Arts' },
];

export default function StudentTableCard() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm w-full h-[400px] p-4 flex flex-col relative">
        {/* Expand Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={() => setModalOpen(true)}
          aria-label="Expand Table"
        >
          <Expand size={24} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Recent Onboarding Records</h2>
        <div className="flex-1">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-2">Student Name</th>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Day/Boarding</th>
                <th className="px-4 py-2">House Assigned</th>
                <th className="px-4 py-2">Course</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 4).map((student, idx) => (
                <tr key={student.id} className="bg-white border-b">
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.id}</td>
                  <td className="px-4 py-2">{student.gender}</td>
                  <td className="px-4 py-2">{student.type}</td>
                  <td className="px-4 py-2">{student.house}</td>
                  <td className="px-4 py-2">{student.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal for full table */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setModalOpen(false)}
              aria-label="Close Modal"
            >
              <X size={28} />
            </button>
            <h2 className="text-xl font-bold mb-4">Student Table</h2>
            <div className="overflow-auto max-h-[70vh]">
              <table className="min-w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-2">Student Name</th>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Gender</th>
                    <th className="px-4 py-2">Day/Boarding</th>
                    <th className="px-4 py-2">House Assigned</th>
                    <th className="px-4 py-2">Course</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, idx) => (
                    <tr key={student.id} className="bg-white border-b">
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2">{student.id}</td>
                      <td className="px-4 py-2">{student.gender}</td>
                      <td className="px-4 py-2">{student.type}</td>
                      <td className="px-4 py-2">{student.house}</td>
                      <td className="px-4 py-2">{student.course}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}