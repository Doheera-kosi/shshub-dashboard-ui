
import React from 'react';

interface SuperAdminTableProps {
  title: string;
  data: any[];
  columns: string[];
  onCreate: () => void;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

const SuperAdminTable: React.FC<SuperAdminTableProps> = ({ title, data, columns, onCreate, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={onCreate}
        >
          Create
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {column}
              </th>
            ))}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item[column.toLowerCase()]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => onEdit(item)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperAdminTable;