
'use client';

import React, { useState, useEffect } from 'react';
import SuperAdminTable from '@/components/super-admin/SuperAdminTable';
import CrudModal from '@/components/super-admin/CrudModal';
import { getAllSchools, addSchool, updateSchool, deleteSchool } from '@/services/schoolService';
import { getAllHometowns } from '@/services/hometownService';

const SchoolsPage = () => {
  const [schools, setSchools] = useState([]);
  const [hometowns, setHometowns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<any>(null);

  const fetchSchools = async () => {
    try {
      const data = await getAllSchools();
      setSchools(data);
    } catch (error) {
      // console.error("Failed to fetch schools:", error);
    }
  };

  const fetchHometowns = async () => {
    try {
      const data = await getAllHometowns();
      setHometowns(data);
    } catch (error) {
      // console.error("Failed to fetch hometowns:", error);
    }
  };

  useEffect(() => {
    fetchSchools();
    fetchHometowns();
  }, []);

  const handleCreate = () => {
    setModalType('create');
    setSelectedSchool(null);
    setIsModalOpen(true);
  };

  const handleEdit = (school: any) => {
    setModalType('edit');
    setSelectedSchool(school);
    setIsModalOpen(true);
  };

  const handleDelete = (school: any) => {
    setModalType('delete');
    setSelectedSchool(school);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (modalType === 'create') {
        await addSchool(selectedSchool);
      } else if (modalType === 'edit') {
        await updateSchool(selectedSchool);
      } else if (modalType === 'delete') {
        await deleteSchool(selectedSchool.id);
      }
      fetchSchools();
    } catch (error) {
      // console.error(`Failed to ${modalType} school:`, error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const columns = ['ID', 'Name', 'Hometown'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">School Management</h2>
      <SuperAdminTable
        title="Schools"
        data={schools}
        columns={columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={`${modalType?.charAt(0).toUpperCase()}${modalType?.slice(1)} School`}
      >
        {modalType === 'delete' ? (
          <p>Are you sure you want to delete this school?</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="School Name"
              className="w-full p-2 border rounded-md mb-4"
              value={selectedSchool?.name || ''}
              onChange={(e) => setSelectedSchool({ ...selectedSchool, name: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded-md"
              value={selectedSchool?.hometownId || ''}
              onChange={(e) => setSelectedSchool({ ...selectedSchool, hometownId: e.target.value })}
            >
              <option value="">Select Hometown</option>
              {hometowns.map((hometown: any) => (
                <option key={hometown.id} value={hometown.id}>
                  {hometown.name}
                </option>
              ))}
            </select>
          </>
        )}
      </CrudModal>
    </div>
  );
};

export default SchoolsPage;