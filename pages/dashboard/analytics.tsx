import DashboardLayout from '../DashboardLayout';

const AnalyticsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Analytics</h1>
      <div className="space-y-6">
        <div className="p-4 border rounded-lg hover:shadow-md">
          <h2 className="text-lg font-bold text-gray-800">Total Views</h2>
          <p className="text-gray-600">123,456</p>
        </div>

        <div className="p-4 border rounded-lg hover:shadow-md">
          <h2 className="text-lg font-bold text-gray-800">Link Clicks</h2>
          <p className="text-gray-600">78,910</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;


