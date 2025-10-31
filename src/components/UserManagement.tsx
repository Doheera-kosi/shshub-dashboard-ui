'use client';

import { Users, Map, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAllStudents } from '@/services/studentService';
import { getAllRegions } from '@/services/regionService';

const UserManagement = () => {
  const router = useRouter();
  const [studentCount, setStudentCount] = useState(0);
  const [regionCount, setRegionCount] = useState(0);

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const students = await getAllStudents();
        setStudentCount(students.length);
      } catch (error) {
        console.error('Failed to fetch students', error);
      }
    };

    const fetchRegionCount = async () => {
      try {
        const regions = await getAllRegions();
        setRegionCount(regions.length);
      } catch (error) {
        console.error('Failed to fetch regions', error);
      }
    };

    fetchStudentCount();
    fetchRegionCount();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">User Management</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Shield size={24} className="text-purple-500 mr-3" />
            <div>
              <h3 className="text-md font-semibold">Users</h3>
              <p className="text-sm text-gray-500">50</p>
            </div>
          </div>
          <button onClick={() => router.push('/super-admin/users')} className="bg-purple-500 text-white px-3 py-1 rounded-md text-sm">Manage</button>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Map size={24} className="text-blue-500 mr-3" />
            <div>
              <h3 className="text-md font-semibold">Regions</h3>
              <p className="text-sm text-gray-500">{regionCount > 0 ? regionCount : 'No regions yet'}</p>
            </div>
          </div>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
            onClick={() => router.push('/super-admin/regions')}
          >
            Manage
          </button>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Users size={24} className="text-green-500 mr-3" />
            <div>
              <h3 className="text-md font-semibold">Districts</h3>
              <p className="text-sm text-gray-500">275</p>
            </div>
          </div>
          <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">Manage</button>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Users size={24} className="text-yellow-500 mr-3" />
            <div>
              <h3 className="text-md font-semibold">Students</h3>
              <p className="text-sm text-gray-500">{studentCount > 0 ? studentCount : 'No students yet'}</p>
            </div>
          </div>
          <button onClick={() => router.push('/super-admin/students')} className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm">Manage</button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;