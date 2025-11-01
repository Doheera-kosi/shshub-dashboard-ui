
import React from 'react';

interface CrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  children: React.ReactNode;
}

const CrudModal: React.FC<CrudModalProps> = ({ isOpen, onClose, onSave, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrudModal;