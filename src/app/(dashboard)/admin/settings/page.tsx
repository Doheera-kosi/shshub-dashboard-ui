'use client';
import React, { useState } from 'react';
import ConfigCard from './ConfigCard';

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('Accommodations');
  const mainURL = 'https://84.247.136.103'

  return (
    <div className="w-full bg-[#F7F8FA] overflow-scroll flex flex-col">
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-sm w-full">
            <div className="border-b border-gray-200">
              <div className="px-4">
                <nav className="-mb-px flex space-x-8">
                  <TabButton
                    title="Accommodations"
                    isActive={activeTab === 'Accommodations'}
                    onClick={() => setActiveTab('Accommodations')}
                  />
                  <TabButton
                    title="Programs"
                    isActive={activeTab === 'Programs'}
                    onClick={() => setActiveTab('Programs')}
                  />
                  <TabButton
                    title="Classes"
                    isActive={activeTab === 'Classes'}
                    onClick={() => setActiveTab('Classes')}
                  />
                  <TabButton
                    title="Houses"
                    isActive={activeTab === 'Houses'}
                    onClick={() => setActiveTab('Houses')}
                  />
                  
                </nav>
              </div>
            </div>

            <div className="p-4">
              {activeTab === 'Classes' && (
                <ConfigCard
                  title="Classes Configuration"
                  fields={['className', 'numberOfSpace', 'programId']}
                  apiEndpoint={`${mainURL}/api/v1/classes`}
                />
              )}

              {activeTab === 'Accommodations' && (
                <ConfigCard
                  title="Accommodations Configuration"
                  fields={['name', 'numberOfSpace', 'schoolId']}
                  apiEndpoint={`${mainURL}/api/v1/accommodations`}
                />
              )}

              {activeTab === 'Houses' && (
                <ConfigCard
                  title="Houses Configuration"
                  fields={['houseName', 'numberOfSpace', 'schoolId']}
                  apiEndpoint={`${mainURL}/api/v1/houses`}
                />
              )}

              {activeTab === 'Programs' && (
                <ConfigCard
                  title="Programs Configuration"
                  fields={['name']}
                  apiEndpoint={`${mainURL}/api/v1/programs`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${isActive
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
    >
      {title}
    </button>
  );
};

export default AdminSettingsPage;