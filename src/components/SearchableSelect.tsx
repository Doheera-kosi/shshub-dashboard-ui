import React from 'react';
import Select from 'react-select';

const SearchableSelect = ({ options, value, onChange, placeholder }) => {
    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '2px',
        }),
    };

    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            isClearable
            isSearchable
            styles={customStyles}
        />
    );
};

export default SearchableSelect;