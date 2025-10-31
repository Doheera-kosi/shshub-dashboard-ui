
const NationalStats = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">National-Level Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">Regional Distribution</h3>
          <p className="text-2xl font-bold">10 Regions</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">Gender Categorization</h3>
          <p className="text-2xl font-bold">55% Male, 45% Female</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">Boarding Status</h3>
          <p className="text-2xl font-bold">70% Boarding, 30% Day</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">Numerical Breakdown</h3>
          <p className="text-2xl font-bold">100,000 Applicants</p>
        </div>
      </div>
    </div>
  );
};

export default NationalStats;