'use client';

import { Search } from 'lucide-react';

const PlacementOverride = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Placement Override</h2>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input type="text" placeholder="Enter Student ID" className="border border-gray-200 p-2 pl-10 rounded-lg w-full" />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mt-3">Find Student</button>
    </div>
  );
};

export default PlacementOverride;