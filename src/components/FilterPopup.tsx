
'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';
import SearchableSelect from './SearchableSelect';

interface FilterPopupProps {
    regions: any[];
    districts: any[];
    schools: any[];
    selectedRegion: any;
    setSelectedRegion: (region: any) => void;
    selectedDistrict: any;
    setSelectedDistrict: (district: any) => void;
    selectedSchool: any;
    setSelectedSchool: (school: any) => void;
    onClose: () => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({
    regions,
    districts,
    schools,
    selectedRegion,
    setSelectedRegion,
    selectedDistrict,
    setSelectedDistrict,
    selectedSchool,
    setSelectedSchool,
    onClose,
}) => {
    return (
        <div className="absolute top-12 right-0 z-10 w-72 p-4 bg-white rounded-md shadow-lg">
            <div className="flex flex-col gap-4">
                <SearchableSelect
                    options={regions.map((region) => ({
                        value: region.id,
                        label: region.name,
                    }))}
                    value={selectedRegion}
                    onChange={setSelectedRegion}
                    placeholder="Select Region"
                />
                <SearchableSelect
                    options={districts.map((district) => ({
                        value: district.id,
                        label: district.name,
                    }))}
                    value={selectedDistrict}
                    onChange={setSelectedDistrict}
                    placeholder="Select District"
                />
                <SearchableSelect
                    options={schools.map((school) => ({
                        value: school.id,
                        label: school.name,
                    }))}
                    value={selectedSchool}
                    onChange={setSelectedSchool}
                    placeholder="Select School"
                />
            </div>
        </div>
    );
};

export default FilterPopup;