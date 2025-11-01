
'use client';

import React, { useState, useEffect } from 'react';
import SuperAdminTable from '@/components/super-admin/SuperAdminTable';
import CrudModal from '@/components/super-admin/CrudModal';
import { getAllHometowns, addHometown, updateHometown, deleteHometown } from '@/services/hometownService';
import { getAllDistricts } from '@/services/districtService';

const HometownsPage = () => {
  const [hometowns, setHometowns] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedHometown, setSelectedHometown] = useState<any>(null);

  const fetchHometowns = async () => {
    try {
      const data = await getAllHometowns();
      setHometowns(data);
    } catch (error) {
      // console.error("Failed to fetch hometowns:", error);
    }
  };

  const fetchDistricts = async () => {
    try {
      const data = await getAllDistricts();
      setDistricts(data);
    } catch (error) {
      // console.error("Failed to fetch districts:", error);
    }
  };

  useEffect(() => {
    fetchHometowns();
    fetchDistricts();
  }, []);

  const handleCreate = () => {
    setModalType('create');
    setSelectedHometown(null);
    setIsModalOpen(true);
  };

  const handleEdit = (hometown: any) => {
    setModalType('edit');
    setSelectedHometown(hometown);
    setIsModalOpen(true);
  };

  const handleDelete = (hometown: any) => {
    setModalType('delete');
    setSelectedHometown(hometown);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (modalType === 'create') {
        await addHometown(selectedHometown);
      } else if (modalType === 'edit') {
        await updateHometown(selectedHometown);
      } else if (modalType === 'delete') {
        await deleteHometown(selectedHometown.id);
      }
      fetchHometowns();
    } catch (error) {
      // console.error(`Failed to ${modalType} hometown:`, error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const columns = ['ID', 'Name', 'District'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Hometown Management</h2>
      <SuperAdminTable
        title="Hometowns"
        data={hometowns}
        columns={columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={`${modalType?.charAt(0).toUpperCase()}${modalType?.slice(1)} Hometown`}
      >
        {modalType === 'delete' ? (
          <p>Are you sure you want to delete this hometown?</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Hometown Name"
              className="w-full p-2 border rounded-md mb-4"
              value={selectedHometown?.name || ''}
              onChange={(e) => setSelectedHometown({ ...selectedHometown, name: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded-md"
              value={selectedHometown?.districtId || ''}
              onChange={(e) => setSelectedHometown({ ...selectedHometown, districtId: e.target.value })}
            >
              <option value="">Select District</option>
              {districts.map((district: any) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </>
        )}
      </CrudModal>
    </div>
  );
};

export default HometownsPage;