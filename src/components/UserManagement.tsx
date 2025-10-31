'use client';

import { Users, Map, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

const UserManagement = () => {
  const router = useRouter();

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
              <p className="text-sm text-gray-500">16</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">Manage</button>
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
      </div>
    </div>
  );
};

export default UserManagement;