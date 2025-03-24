import DashboardLayout from "../DashboardLayout";

const LinksPage: React.FC = () => {
  return (
    <DashboardLayout showMobilePreview={true} userLinkName="your-username">
      <section  className="min-h-screen text-gray-800">
        <div className="space-y-6">
          <div className="p-4 border rounded-lg hover:shadow-md">
            <h2 className="text-lg font-bold">Website</h2>
            <input
              type="text"
              placeholder="https://yourwebsite.com"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="p-4 border rounded-lg hover:shadow-md">
            <h2 className="text-lg font-bold">Instagram</h2>
            <input
              type="text"
              placeholder="https://instagram.com/yourprofile"
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default LinksPage;






