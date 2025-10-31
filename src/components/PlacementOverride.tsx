
const PlacementOverride = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">Placement Override</h2>
      <div className="flex gap-4">
        <input type="text" placeholder="Enter Student ID" className="border border-gray-300 p-2 rounded-md w-full" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Find Student</button>
      </div>
    </div>
  );
};

export default PlacementOverride;