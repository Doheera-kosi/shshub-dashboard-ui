
'use client';

import React, { useState, useEffect } from 'react';
import SuperAdminTable from '@/components/super-admin/SuperAdminTable';
import CrudModal from '@/components/super-admin/CrudModal';
import { getAllHouses, addHouse, updateHouse, deleteHouse } from '@/services/houseService';
import { getAllSchools } from '@/services/schoolService';

const HousesPage = () => {
  const [houses, setHouses] = useState([]);
  const [schools, setSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<any>(null);

  const fetchHouses = async () => {
    try {
      const data = await getAllHouses();
      setHouses(data);
    } catch (error) {
      // console.error("Failed to fetch houses:", error);
    }
  };

  const fetchSchools = async () => {
    try {
      const data = await getAllSchools();
      setSchools(data);
    } catch (error) {
      // console.error("Failed to fetch schools:", error);
    }
  };

  useEffect(() => {
    fetchHouses();
    fetchSchools();
  }, []);

  const handleCreate = () => {
    setModalType('create');
    setSelectedHouse(null);
    setIsModalOpen(true);
  };

  const handleEdit = (house: any) => {
    setModalType('edit');
    setSelectedHouse(house);
    setIsModalOpen(true);
  };

  const handleDelete = (house: any) => {
    setModalType('delete');
    setSelectedHouse(house);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (modalType === 'create') {
        await addHouse(selectedHouse);
      } else if (modalType === 'edit') {
        await updateHouse(selectedHouse);
      } else if (modalType === 'delete') {
        await deleteHouse(selectedHouse.id);
      }
      fetchHouses();
    } catch (error) {
      // console.error(`Failed to ${modalType} house:`, error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const columns = ['ID', 'Name', 'School'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">House Management</h2>
      <SuperAdminTable
        title="Houses"
        data={houses}
        columns={columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={`${modalType?.charAt(0).toUpperCase()}${modalType?.slice(1)} House`}
      >
        {modalType === 'delete' ? (
          <p>Are you sure you want to delete this house?</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="House Name"
              className="w-full p-2 border rounded-md mb-4"
              value={selectedHouse?.name || ''}
              onChange={(e) => setSelectedHouse({ ...selectedHouse, name: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded-md"
              value={selectedHouse?.schoolId || ''}
              onChange={(e) => setSelectedHouse({ ...selectedHouse, schoolId: e.target.value })}
            >
              <option value="">Select School</option>
              {schools.map((school: any) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </>
        )}
      </CrudModal>
    </div>
  );
};

export default HousesPage;