"use client";

import { useState } from 'react';

interface UploadExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

const UploadExcelModal: React.FC<UploadExcelModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-lg font-bold mb-4">Upload Excel File</h2>
                <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
          <button onClick={handleUpload} className="px-4 py-2 bg-blue-600 text-white rounded-md" disabled={!file}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default UploadExcelModal;