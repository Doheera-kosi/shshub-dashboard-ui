'use client';

import { useEffect, useState } from 'react';
import { getAllRegions, createRegion } from '@/services/regionService';

const RegionManagementPage = () => {
  const [regions, setRegions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRegionName, setNewRegionName] = useState('');

  const fetchRegions = async () => {
    try {
      const regionsData = await getAllRegions();
      setRegions(regionsData);
    } catch (error) {
      console.error('Failed to fetch regions', error);
    }
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  const handleCreateRegion = async () => {
    try {
      await createRegion({ name: newRegionName });
      setNewRegionName('');
      setIsModalOpen(false);
      fetchRegions(); // Refresh the list of regions
    } catch (error) {
      console.error('Failed to create region', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Region Management</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Create Region
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Create New Region</h2>
            <input
              type="text"
              placeholder="Region Name"
              className="w-full p-2 border rounded-md mb-4"
              value={newRegionName}
              onChange={(e) => setNewRegionName(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleCreateRegion}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-md shadow-md">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Created By</th>
              <th className="text-left py-2">Updated By</th>
              <th className="text-left py-2">Date Created</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((region: any) => (
              <tr key={region.id}>
                <td className="py-2">{region.name}</td>
                <td className="py-2">{region.createdBy}</td>
                <td className="py-2">{region.updatedBy}</td>
                <td className="py-2">{new Date(region.createdAt).toLocaleDateString()}</td>
                <td className="py-2">
                  <a href="#" className="text-blue-500 hover:underline">Edit</a>
                  <a href="#" className="text-red-500 hover:underline ml-4">Delete</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegionManagementPage;