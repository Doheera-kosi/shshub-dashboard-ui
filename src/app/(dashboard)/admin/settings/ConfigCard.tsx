'use client';
import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface ConfigCardProps {
  title: string;
  fields: string[];
  apiEndpoint: string;
}

const ConfigCard: React.FC<ConfigCardProps> = ({ title, fields, apiEndpoint }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any | null>(null);
  const [programs, setPrograms] = useState<any[]>([]);
  const [schools, setSchools] = useState<any[]>([]);
  const mainURL = 'https://84.247.136.103'

  useEffect(() => {
    fetchData();
    fetchPrograms();
    //fetchSchools();
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalOpen]);

  const fetchData = async () => {
    try {
      const response = await fetch(apiEndpoint);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await fetch(`${mainURL}/api/v1/programs`);
      const result = await response.json();
      setPrograms(result);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  const fetchSchools = async () => {
    try {
      const response = await fetch(`${mainURL}/api/v1/schools`);
      const result = await response.json();
      setSchools(result);
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  const handleAddItem = () => {
    setCurrentItem(null);
    setModalOpen(true);
  };

  const handleEditItem = (item: any) => {
    setCurrentItem(item);
    setModalOpen(true);
  };

  const handleDeleteClick = (item: any) => {
    setCurrentItem(item);
    setDeleteModalOpen(true);
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await fetch(`${apiEndpoint}/${id}`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    setDeleteModalOpen(false);
  };

  const handleSaveItem = async (item: any) => {
    const method = item.id ? 'PUT' : 'POST';
    const url = item.id ? `${apiEndpoint}/${item.id}` : apiEndpoint;

    const itemToSend = { ...item };
    if (itemToSend.numberOfSpaces) {
      itemToSend.numberOfSpaces = parseInt(itemToSend.numberOfSpaces, 10);
    }
    if (itemToSend.programId) {
      itemToSend.programId = parseInt(itemToSend.programId, 10);
    }
    if (itemToSend.schoolId) {
      itemToSend.schoolId = parseInt(itemToSend.schoolId, 10);
    }

    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemToSend),
      });
      fetchData();
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700"
          onClick={handleAddItem}
        >
          Add New
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                {fields
                  .filter((field) => !(title === 'Classes Configuration' && field === 'programId'))
                  .map((field) => (
                    <th key={field} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </th>
                  ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id}>
                  {fields
                    .filter((field) => !(title === 'Classes Configuration' && field === 'programId'))
                    .map((field) => (
                      <td key={field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {field === 'programId'
                          ? programs.find((p) => p.id === item[field])?.name
                          : field === 'schoolId'
                          ? schools.find((s) => s.id === item[field])?.name
                          : item[field]}
                      </td>
                    ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEditItem(item)} className="text-blue-600 hover:text-blue-800 mr-4">
                      <Edit size={20} />
                    </button>
                    <button onClick={() => handleDeleteClick(item)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <Modal
          fields={fields}
          item={currentItem}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveItem}
          programs={programs}
          schools={schools}
        />
      )}

      {deleteModalOpen && (
        <DeleteConfirmationModal
          item={currentItem}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteItem}
        />
      )}
    </div>
  );
};

interface ModalProps {
  fields: string[];
  item: any | null;
  onClose: () => void;
  onSave: (item: any) => void;
  programs: any[];
  schools: any[];
}

const Modal: React.FC<ModalProps> = ({ fields, item, onClose, onSave, programs, schools }) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      const initialData: { [key: string]: any } = {};
      fields.forEach((field) => {
        initialData[field] = '';
      });
      setFormData(initialData);
    }
  }, [item, fields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">{item ? 'Edit' : 'Add'} Item</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </label>
              {field === 'programId' ? (
                <select
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Program</option>
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              ) : field === 'schoolId' ? (
                <select
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select School</option>
                  {schools.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field === 'numberOfSpaces' ? 'number' : 'text'}
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  min={field === 'numberOfSpaces' ? '0' : undefined}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface DeleteConfirmationModalProps {
  item: any;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ item, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this item?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(item.id)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigCard;