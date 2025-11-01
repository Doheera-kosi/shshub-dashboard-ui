
'use client';

import React, { useState, useEffect } from 'react';
import SuperAdminTable from '@/components/super-admin/SuperAdminTable';
import CrudModal from '@/components/super-admin/CrudModal';
import { getAllClasses, addClass, updateClass, deleteClass } from '@/services/classService';
import { getAllSchools } from '@/services/schoolService';

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [schools, setSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const fetchClasses = async () => {
    try {
      const data = await getAllClasses();
      setClasses(data);
    } catch (error) {
      // console.error("Failed to fetch classes:", error);
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
    fetchClasses();
    fetchSchools();
  }, []);

  const handleCreate = () => {
    setModalType('create');
    setSelectedClass(null);
    setIsModalOpen(true);
  };

  const handleEdit = (classItem: any) => {
    setModalType('edit');
    setSelectedClass(classItem);
    setIsModalOpen(true);
  };

  const handleDelete = (classItem: any) => {
    setModalType('delete');
    setSelectedClass(classItem);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (modalType === 'create') {
        await addClass(selectedClass);
      } else if (modalType === 'edit') {
        await updateClass(selectedClass);
      } else if (modalType === 'delete') {
        await deleteClass(selectedClass.id);
      }
      fetchClasses();
    } catch (error) {
      // console.error(`Failed to ${modalType} class:`, error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const columns = ['ID', 'Name', 'School'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Class Management</h2>
      <SuperAdminTable
        title="Classes"
        data={classes}
        columns={columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={`${modalType?.charAt(0).toUpperCase()}${modalType?.slice(1)} Class`}
      >
        {modalType === 'delete' ? (
          <p>Are you sure you want to delete this class?</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Class Name"
              className="w-full p-2 border rounded-md mb-4"
              value={selectedClass?.name || ''}
              onChange={(e) => setSelectedClass({ ...selectedClass, name: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded-md"
              value={selectedClass?.schoolId || ''}
              onChange={(e) => setSelectedClass({ ...selectedClass, schoolId: e.target.value })}
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

export default ClassesPage;