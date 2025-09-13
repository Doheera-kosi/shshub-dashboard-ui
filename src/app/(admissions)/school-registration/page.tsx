'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AdmissionConfirmationModal from '@/components/modals/AdmissionConfirmationModal';

const regions = [
  { name: 'Greater Accra', districts: ['Accra', 'Tema', 'Ga East'] },
  { name: 'Ashanti', districts: ['Kumasi', 'Obuasi', 'Ejisu'] },
  { name: 'Eastern', districts: ['Koforidua', 'Aburi', 'Nkawkaw'] },
];

interface School {
  name: string;
  district: string;
  description: string;
  category: string;
  coverImage: string;
  logoImage: string;
  indexNumber: string;
}

const schools: School[] = [
  { name: 'Accra Academy', district: 'Accra', description: 'A premier secondary school.', category: 'A', coverImage: '/prempeh-college-ad-2.jpg', logoImage: '/accra-academy.jpg', indexNumber: 'AA123' },
  { name: 'Tema Senior High School', district: 'Tema', description: 'An international baccalaureate school.', category: 'B/C', coverImage: '/temasco-ad-1.jpg', logoImage: '/temasco.png', indexNumber: 'TS456' },
  { name: "Aburi Girls' Senior High School", district: 'Aburi', description: "A leading girls' school.", category: 'A', coverImage: '/aburi-girls-ad-2.jpg', logoImage: '/aburi-girls.jpeg', indexNumber: 'AG789' },
  { name: 'Prempeh College', district: 'Kumasi', description: "A prestigious boys' school.", category: 'A', coverImage: '/prempeh-college-ad-1.jpg', logoImage: '/prempeh-col-logo-2.png', indexNumber: 'PC101' },
  { name: 'St. Roses Senior High', district: 'Nkawkaw', description: 'A well-regarded secondary school.', category: 'A', coverImage: '/temasco-ad-1.jpg', logoImage: '/temasco.png', indexNumber: 'SR112' },
];

type CustomSelectOption = { value: string; label: string };

interface CustomSelectProps {
    value: string;
    onChange: (e: { target: { value: string } }) => void;
    options: CustomSelectOption[];
    placeholder?: string;
    disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, placeholder, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (optionValue: string) => {
        const event = { target: { value: optionValue } };
        onChange(event);
        setIsOpen(false);
    };
    
    const selectedOption = options.find(o => o.value === value);

    return (
        <div className="relative">
            <button
                type="button"
                className={`w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
            >
                <span className={value ? 'text-black' : 'text-gray-500'}>{selectedOption ? selectedOption.label : placeholder}</span>
                <svg className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {placeholder && !options.find(o => o.value === '') &&
                        <li
                            className="p-3 hover:bg-gray-100 cursor-pointer text-gray-500"
                            onClick={() => handleSelect('')}
                        >
                            {placeholder}
                        </li>
                    }
                    {options.map(option => (
                        <li
                            key={option.value}
                            className="p-3 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const SchoolRegistration = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleRegionChange = (e: React.ChangeEvent<HTMLButtonElement> | { target: { value: string } }) => {
    setSelectedRegion(e.target.value);
    setSelectedDistrict('');
  };

  const filteredDistricts = regions.find(r => r.name === selectedRegion)?.districts || [];

  const filteredSchools = schools.filter(school => {
    return (
      (!selectedRegion || regions.find(r => r.name === selectedRegion)?.districts.includes(school.district)) &&
      (!selectedDistrict || school.district === selectedDistrict) &&
      school.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  const regionOptions = regions.map(region => ({ value: region.name, label: region.name }));
  const districtOptions = filteredDistricts.map(district => ({ value: district, label: district }));

  return (
        <div className="">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-blue-700">Welcome to the Admission Registration Portal</h1>
            <p className="text-gray-700 my-6">
              We’ve made it simple for you to begin your admission process. Just select your Region and District, then search for your assigned school. Enter your Index Number to verify your placement, and once confirmed, hit Proceed to continue with your admission form.
            </p>
          </div>
          
          <div className="relative z-20 bg-blue-600 backdrop-blur-sm p-4 rounded-2xl shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CustomSelect
                value={selectedRegion}
                onChange={handleRegionChange}
                options={regionOptions}
                placeholder="Select Region"
              />

              <CustomSelect
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                options={districtOptions}
                placeholder="Select District"
                disabled={!selectedRegion}
              />

              <input
                type="text"
                placeholder="Search for a school..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSchools.map(school => (
              <div key={school.name} className="relative bg-white rounded-2xl shadow-sm">
                <div className="h-40 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${school.coverImage})` }}></div>
                <div className="absolute top-40 left-[15%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center">
                        <Image src={school.logoImage} alt={`${school.name} logo`} width={40} height={40} objectFit="contain" />
                    </div>
                </div>
                <div className="pt-12 p-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{school.name}</h3>
                        <p className="text-gray-600 mb-4">Category: <span className="font-semibold">{school.category}</span></p>
                    </div>
                    <div className="flex justify-end">
                        <button onClick={() => {
                          setSelectedSchool(school);
                          setIsModalOpen(true);
                        }} className="bg-gray-400 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105">
                            start here
                        </button>
                    </div>
                </div>
              </div>
            ))}
          </div>

          {selectedSchool && isModalOpen && (
            <AdmissionConfirmationModal
              school={{
                name: selectedSchool.name,
                indexNumber: selectedSchool.indexNumber,
              }}
              onClose={() => setIsModalOpen(false)}
              onConfirm={() => {
                // Add your confirm logic here, e.g., navigate to the next step
                setIsModalOpen(false);
                // router.push('/next-step'); // Uncomment and set the correct route if needed
              }}
            />
          )}
        </div>
  );
};

export default SchoolRegistration;