import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative w-12 h-12">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-full"
            style={{ transform: `rotate(${i * 30}deg)` }}
          >
            <div
              className={`w-3 h-6 ${i % 2 === 0 ? 'bg-blue-600' : 'bg-blue-300'} rounded-full mx-auto`}
              style={{ animation: `spinner-fade 1.2s linear ${i * 0.1 - 1.2}s infinite` }}
            ></div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes spinner-fade {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;