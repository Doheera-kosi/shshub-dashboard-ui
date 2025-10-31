
const UserManagement = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">Schools</h3>
          <p className="text-2xl font-bold">1,000</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Manage Schools</button>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">Zones</h3>
          <p className="text-2xl font-bold">10</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Manage Zones</button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;