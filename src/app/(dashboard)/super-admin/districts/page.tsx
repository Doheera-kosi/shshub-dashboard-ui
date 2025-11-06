'use client';

import React, { useState, useEffect } from 'react';
import SuperAdminTable from '@/components/super-admin/SuperAdminTable';
import CrudModal from '@/components/super-admin/CrudModal';
import { getAllDistricts, addDistrict, updateDistrict, deleteDistrict, uploadDistricts } from '@/services/districtService';
import UploadExcelModal from '@/components/UploadExcelModal';

const DistrictsPage = () => {
  const [districts, setDistricts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);

  const fetchDistricts = async () => {
    try {
      const data = await getAllDistricts();
      setDistricts(data);
    } catch (error) {
      // console.error("Failed to fetch districts:", error);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  const handleCreate = () => {
    setModalType('create');
    setSelectedDistrict(null);
    setIsModalOpen(true);
  };

  const handleEdit = (district: any) => {
    setModalType('edit');
    setSelectedDistrict(district);
    setIsModalOpen(true);
  };

  const handleDelete = (district: any) => {
    setModalType('delete');
    setSelectedDistrict(district);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (modalType === 'create') {
        await addDistrict(selectedDistrict.regionId, { name: selectedDistrict.name });
      } else if (modalType === 'edit') {
        await updateDistrict({ id: selectedDistrict.id, name: selectedDistrict.name, updatedBy: 'user' });
      } else if (modalType === 'delete') {
        await deleteDistrict(selectedDistrict.id);
      }
      fetchDistricts();
    } catch (error) {
      // console.error(`Failed to ${modalType} district:`, error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const filteredDistricts = districts.filter(
    (district) =>
      (district.id?.toString().toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (district.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (district.regionId?.toString().toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const columns = ['ID', 'Name', 'Region ID'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">District Management</h2>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsUploadModalOpen(true)}
        >
          Upload Districts
        </button>
      </div>
      <SuperAdminTable
        title="Districts"
        data={filteredDistricts}
        columns={columns}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={`${modalType?.charAt(0).toUpperCase()}${modalType?.slice(1)} District`}
      >
        {modalType === 'delete' ? (
          <p>Are you sure you want to delete this district?</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="ID"
              className="w-full p-2 border rounded-md mb-2 bg-gray-100"
              value={selectedDistrict?.id || ''}
              disabled
            />
            <input
              type="text"
              placeholder="District Name"
              className="w-full p-2 border rounded-md mb-2"
              value={selectedDistrict?.name || ''}
              onChange={(e) => setSelectedDistrict({ ...selectedDistrict, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Region ID"
              className="w-full p-2 border rounded-md bg-gray-100"
              value={selectedDistrict?.regionId || ''}
              disabled
            />
          </>
        )}
      </CrudModal>
      <UploadExcelModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={async (file) => {
          try {
            await uploadDistricts(file);
            fetchDistricts();
          } catch (error) {
            console.error("Failed to upload districts:", error);
          }
        }}
      />
    </div>
  );
};

export default DistrictsPage;