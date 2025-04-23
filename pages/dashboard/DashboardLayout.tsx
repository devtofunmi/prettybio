import Sidebar from '../../components/Sidebar';
import MobilePreview from '../../components/MobilePreview';
import { ReactNode } from 'react';
import Navbar from './navbar';
import { useUser } from '../../context/UserContext';
import LoadingSpinner from '../../components/LoadingSpinner';

interface DashboardLayoutProps {
  children: ReactNode;
  showMobilePreview?: boolean;
  userLinkName?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  showMobilePreview = false,
}) => {
  const { user, loading } = useUser();
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <Sidebar />
      <Navbar />

      <div className={`flex-1 lg:ml-64 ${showMobilePreview ? 'lg:mr-80' : ''} px-4 sm:px-6 md:px-8 mt-20`}>
        <div className="flex flex-col lg:flex-row">

          {/* Mobile Preview on Small Screens */}
          {showMobilePreview && (
            <div>
              <div className="lg:hidden order-1 mb-8 bg-gray-50">
                <div className='mt-5'>
                  <MobilePreview userLinkName={user?.userLinkName} />
                </div>
              </div>
            </div>
          )}

          <div className="order-2 flex-1 p-4">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Preview Sidebar (large screens only) */}
      {showMobilePreview && (
        <div className="hidden lg:block w-80 h-screen text-gray-800 bg-white shadow-md fixed right-0 top-0 z-10">
          <div className="p-4 h-full flex flex-col">
            <div className="flex-1 mt-5">
              <MobilePreview userLinkName={user?.userLinkName} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;








