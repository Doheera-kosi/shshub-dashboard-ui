'use client';

import React, { useState, useEffect } from 'react';
import SuperAdminTable from '@/components/super-admin/SuperAdminTable';
import CrudModal from '@/components/super-admin/CrudModal';
import { getAllRegions, createRegion, updateRegion, deleteRegion, uploadRegions } from '@/services/regionService';
import UploadExcelModal from '@/components/UploadExcelModal';

const RegionsPage = () => {
  const [regions, setRegions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<any>(null);

  const fetchRegions = async () => {
    try {
      const data = await getAllRegions();
      setRegions(data);
    } catch (error) {
      // console.error("Failed to fetch regions:", error);
    }
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  const handleCreate = () => {
    setModalType('create');
    setSelectedRegion(null);
    setIsModalOpen(true);
  };

  const handleEdit = (region: any) => {
    setModalType('edit');
    setSelectedRegion(region);
    setIsModalOpen(true);
  };

  const handleDelete = (region: any) => {
    setModalType('delete');
    setSelectedRegion(region);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (modalType === 'create') {
        await createRegion({ name: selectedRegion.name });
      } else if (modalType === 'edit') {
        await updateRegion({ id: selectedRegion.id, name: selectedRegion.name, updatedBy: 'user' });
      } else if (modalType === 'delete') {
        await deleteRegion(selectedRegion.id);
      }
      fetchRegions();
    } catch (error) {
      // console.error(`Failed to ${modalType} region:`, error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const columns = ['ID', 'Name'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Region Management</h2>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={() => setIsUploadModalOpen(true)}
        >
          Upload Regions
        </button>
      </div>
      <SuperAdminTable
        title="Regions"
        data={regions}
        columns={columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={`${modalType?.charAt(0).toUpperCase()}${modalType?.slice(1)} Region`}
      >
        {modalType === 'delete' ? (
          <p>Are you sure you want to delete this region?</p>
        ) : (
          <input
            type="text"
            placeholder="Region Name"
            className="w-full p-2 border rounded-md"
            value={selectedRegion?.name || ''}
            onChange={(e) => setSelectedRegion({ ...selectedRegion, name: e.target.value })}
          />
        )}
      </CrudModal>
      <UploadExcelModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={async (file) => {
          try {
            await uploadRegions(file);
            fetchRegions();
          } catch (error) {
            console.error("Failed to upload regions:", error);
          }
        }}
      />
    </div>
  );
};

export default RegionsPage;