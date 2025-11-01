
'use client';

import React, { useState, useEffect } from 'react';
import SuperAdminTable from '@/components/super-admin/SuperAdminTable';
import CrudModal from '@/components/super-admin/CrudModal';
import { getAllAccommodations, addAccommodation, updateAccommodation, deleteAccommodation } from '@/services/accommodationService';
import { getAllSchools } from '@/services/schoolService';

const AccommodationsPage = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [schools, setSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState<any>(null);

  const fetchAccommodations = async () => {
    try {
      const data = await getAllAccommodations();
      setAccommodations(data);
    } catch (error) {
      // console.error("Failed to fetch accommodations:", error);
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
    fetchAccommodations();
    fetchSchools();
  }, []);

  const handleCreate = () => {
    setModalType('create');
    setSelectedAccommodation(null);
    setIsModalOpen(true);
  };

  const handleEdit = (accommodation: any) => {
    setModalType('edit');
    setSelectedAccommodation(accommodation);
    setIsModalOpen(true);
  };

  const handleDelete = (accommodation: any) => {
    setModalType('delete');
    setSelectedAccommodation(accommodation);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (modalType === 'create') {
        await addAccommodation(selectedAccommodation);
      } else if (modalType === 'edit') {
        await updateAccommodation(selectedAccommodation);
      } else if (modalType === 'delete') {
        await deleteAccommodation(selectedAccommodation.id);
      }
      fetchAccommodations();
    } catch (error) {
      // console.error(`Failed to ${modalType} accommodation:`, error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const columns = ['ID', 'Name', 'School'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Accommodation Management</h2>
      <SuperAdminTable
        title="Accommodations"
        data={accommodations}
        columns={columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={`${modalType?.charAt(0).toUpperCase()}${modalType?.slice(1)} Accommodation`}
      >
        {modalType === 'delete' ? (
          <p>Are you sure you want to delete this accommodation?</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Accommodation Name"
              className="w-full p-2 border rounded-md mb-4"
              value={selectedAccommodation?.name || ''}
              onChange={(e) => setSelectedAccommodation({ ...selectedAccommodation, name: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded-md"
              value={selectedAccommodation?.schoolId || ''}
              onChange={(e) => setSelectedAccommodation({ ...selectedAccommodation, schoolId: e.target.value })}
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

export default AccommodationsPage;