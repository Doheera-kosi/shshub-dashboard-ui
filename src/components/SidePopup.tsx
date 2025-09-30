'use client';

import { X, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SidePopupProps {
  status: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const SidePopup: React.FC<SidePopupProps> = ({ status, message, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (status === 'success') {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 20);

      return () => clearInterval(timer);
    }
  }, [status, onClose]);

  const isSuccess = status === 'success';

  return (
    <div
  className={`fixed top-5 right-5 w-80 z-50 p-1 rounded-md shadow-lg text-white ${
    isSuccess ? 'bg-green-500' : 'bg-red-500'
  }`}
>
  <div className="flex items-start">
    {/* Icon */}
    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-md bg-white mr-3">
      {isSuccess ? (
        <Check size={42} className="text-green-500" />
      ) : (
        <X size={42} className="text-red-500" />
      )}
    </div>

    {/* Text Content */}
    <div className="flex-grow flex flex-col self-center mr-1">
      {/* Title row */}
      <div className="flex justify-between items-start">
        <p className="font-bold">
          {isSuccess ? 'Success' : 'Error'}
        </p>
      </div>

      {/* Message */}
      <p className="text-sm mt-1">{message}</p>

      {/* Progress bar only for success */}
      {isSuccess && (
        <div className="relative pt-2">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-800"
            ></div>
          </div>
        </div>
      )}
    </div>
    
    {/* Close Button */}
    <div className="flex-shrink-0 mr-1">
      {!isSuccess && (
          <button onClick={onClose} className="ml-2 text-xl leading-none">
            &times;
          </button>
        )}
    </div>
  </div>
</div>
  );
};

export default SidePopup;