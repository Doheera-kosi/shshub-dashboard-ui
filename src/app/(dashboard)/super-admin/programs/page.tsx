
'use client';

import React, { useState, useEffect } from 'react';
import SuperAdminTable from '@/components/super-admin/SuperAdminTable';
import CrudModal from '@/components/super-admin/CrudModal';
import { getAllPrograms, addProgram, updateProgram, deleteProgram } from '@/services/programService';
import { getAllSchools } from '@/services/schoolService';

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [schools, setSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  const fetchPrograms = async () => {
    try {
      const data = await getAllPrograms();
      setPrograms(data);
    } catch (error) {
      // console.error("Failed to fetch programs:", error);
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
    fetchPrograms();
    fetchSchools();
  }, []);

  const handleCreate = () => {
    setModalType('create');
    setSelectedProgram(null);
    setIsModalOpen(true);
  };

  const handleEdit = (program: any) => {
    setModalType('edit');
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const handleDelete = (program: any) => {
    setModalType('delete');
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (modalType === 'create') {
        await addProgram(selectedProgram);
      } else if (modalType === 'edit') {
        await updateProgram(selectedProgram);
      } else if (modalType === 'delete') {
        await deleteProgram(selectedProgram.id);
      }
      fetchPrograms();
    } catch (error) {
      // console.error(`Failed to ${modalType} program:`, error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const columns = ['ID', 'Name', 'School'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Program Management</h2>
      <SuperAdminTable
        title="Programs"
        data={programs}
        columns={columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={`${modalType?.charAt(0).toUpperCase()}${modalType?.slice(1)} Program`}
      >
        {modalType === 'delete' ? (
          <p>Are you sure you want to delete this program?</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Program Name"
              className="w-full p-2 border rounded-md mb-4"
              value={selectedProgram?.name || ''}
              onChange={(e) => setSelectedProgram({ ...selectedProgram, name: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded-md"
              value={selectedProgram?.schoolId || ''}
              onChange={(e) => setSelectedProgram({ ...selectedProgram, schoolId: e.target.value })}
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

export default ProgramsPage;