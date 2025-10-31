'use client';

import { Settings, Calendar } from 'lucide-react';

const Configuration = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Configuration</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Settings size={24} className="text-purple-500 mr-3" />
            <div>
              <h3 className="text-md font-semibold">Intake Settings</h3>
              <p className="text-sm text-gray-500">2024-2025</p>
            </div>
          </div>
          <button className="bg-purple-500 text-white px-3 py-1 rounded-md text-sm">Manage</button>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Calendar size={24} className="text-red-500 mr-3" />
            <div>
              <h3 className="text-md font-semibold">Application Windows</h3>
              <p className="text-sm text-gray-500">Open</p>
            </div>
          </div>
          <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">Manage</button>
        </div>
      </div>
    </div>
  );
};

export default Configuration;