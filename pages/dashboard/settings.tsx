import DashboardLayout from '../DashboardLayout';

const SettingsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 text-gray-800">
        <div className="p-4 border rounded-lg hover:shadow-md">
          <h2 className="text-lg font-bold">Account Info</h2>
          <p className="text-gray-600">Edit your profile information</p>
        </div>

        <div className="p-4 border rounded-lg hover:shadow-md">
          <h2 className="text-lg font-bold">Preferences</h2>
          <p className="text-gray-600">Customize your dashboard appearance</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;

