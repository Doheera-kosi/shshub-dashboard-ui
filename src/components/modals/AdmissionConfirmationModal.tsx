
'use client';

import { useState, useRef, useEffect } from 'react';

interface AdmissionConfirmationModalProps {
  school: {
    name: string;
    indexNumber: string;
  };
  onClose: () => void;
  onConfirm: () => void;
}

const AdmissionConfirmationModal: React.FC<AdmissionConfirmationModalProps> = ({ school, onClose, onConfirm }) => {
  const [indexNumber, setIndexNumber] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  const handleConfirm = () => {
    if (indexNumber === school.indexNumber) {
      setIsConfirmed(true);
      setError('');
    } else {
      setError('This index number was not posted to this school. Please apply to the school you were posted to.');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Confirm Admission for {school.name}</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-grow">
            <label htmlFor="indexNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Index Number
            </label>
            <input
              type="text"
              id="indexNumber"
              value={indexNumber}
              onChange={(e) => setIndexNumber(e.target.value)}
              disabled={isConfirmed}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
          <button
            onClick={handleConfirm}
            disabled={isConfirmed}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed self-end"
          >
            Confirm
          </button>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        {isConfirmed && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
            Your Index Number has been successfully confirmed for this school.
          </div>
        )}
        {isConfirmed && (
          <div className="text-center">
            <button
              onClick={onConfirm}
              className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-green-700 transition-transform duration-300 transform hover:scale-105"
            >
              Proceed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionConfirmationModal;