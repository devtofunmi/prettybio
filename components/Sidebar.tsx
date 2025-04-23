import Link from 'next/link';
import { FaLink, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import router from 'next/router';
import toast from 'react-hot-toast';

const Sidebar: React.FC = () => {
  return (
    <>
      {/* Sidebar for large screens */}
      <aside className="hidden lg:flex lg:w-64 bg-gray-900 text-white h-screen fixed left-0 top-0">
        <div className="p-6 w-full">
        <Link href="/" >
          <h2 className="text-2xl font-bold mb-6">PrettyBio</h2>
            </Link>
          <nav className="space-y-4">
            <Link href="/dashboard" className="flex items-center gap-4 py-3 hover:bg-gray-700 px-4 rounded-lg">
              <FaLink /> Links
            </Link>
            <Link href="/dashboard/analytics" className="flex items-center gap-4 py-3 hover:bg-gray-700 px-4 rounded-lg">
              <FaChartBar /> Analytics
            </Link>
            <Link href="/dashboard/settings/settings" className="flex items-center gap-4 py-3 hover:bg-gray-700 px-4 rounded-lg">
              <FaCog /> Settings
            </Link>
            <Link 
              onClick={() => {
                    localStorage.removeItem('accessToken');
                    toast.success('You’ve been logged out!');
                    router.push('/authentication/Login');
                  }}
               href="/authentication/Login" className="flex items-center gap-4 py-3 hover:bg-red-600 px-4 rounded-lg">
              <FaSignOutAlt /> Logout
            </Link>
          </nav>
        </div>
      </aside>

      {/* Mobile Footer Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-gray-900 text-white shadow-md z-50 flex justify-around py-4">
        <Link href="/dashboard" className="flex flex-col items-center">
          <FaLink className="text-lg" />
          <span className="text-xs">Links</span>
        </Link>
        <Link href="/dashboard/analytics" className="flex flex-col items-center">
          <FaChartBar className="text-lg" />
          <span className="text-xs">Analytics</span>
        </Link>
        <Link href="/dashboard/settings/settings" className="flex flex-col items-center">
          <FaCog className="text-lg" />
          <span className="text-xs">Settings</span>
        </Link>
      </nav>
    </>
  );
};

export default Sidebar;


