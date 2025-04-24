'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '../../context/UserContext';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  const [currentSection, setCurrentSection] = useState<string>('Dashboard');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pathToTitle: Record<string, string> = {
      '/dashboard': 'Manage Your Links',
      '/dashboard/analytics': 'Analytics',
      '/dashboard/settings': 'Settings',
      '/dashboard/accountsettings': 'Account Settings',
      '/dashboard/settings/account-info': 'Account Info',
      '/dashboard/settings/preferences': 'Preferences',
      '/authentication/login': 'Logout',
    };

    setCurrentSection(pathToTitle[router.pathname] || 'Dashboard');
  }, [router.pathname]);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    toast.success('You’ve been logged out!');
    router.push('/authentication/Login');
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full z-20 bg-white shadow-sm p-4 flex justify-between items-center lg:ml-64 lg:mr-80">
        <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    );
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-white shadow-sm p-4 flex justify-between items-center lg:ml-64 lg:mr-80">
      <h1 className="text-xl font-bold">{currentSection}</h1>

      <div className="relative lg:absolute lg:top-3 lg:right-[280px] flex items-center">
        <div
          ref={imageRef}
          className="flex items-center gap-2 cursor-pointer "
          onClick={toggleModal}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 hover:scale-105 transition hover:border-pink-500">
            <Image
              src={user?.image || '/assets/default.jpg'}
              alt="User Image"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <span
            className={`text-gray-600 transition-transform ${
              isModalOpen ? 'rotate-180' : 'rotate-0'
            }`}
          >
            ▼
          </span>
        </div>

        {isModalOpen && (
          <div
            className="absolute top-14 right-0 w-72 bg-white shadow-xl border border-gray-200 rounded-lg p-4 z-30"
          >
            <div className="block md:hidden mb-2">
              <Link href="/">
                <h2 className="text-lg font-bold">PrettyBio</h2>
              </Link>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-pink-500">
                <Image
                  src={user?.image || '/assets/default.jpg'}
                  alt="User Image"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="text-sm">
                <p className="font-bold">{user?.name}</p>
                <Link
                  href={`https://prettybio.netlify.app/${user?.userLinkName}`}
                  target="_blank"
                  className="text-blue-500 hover:underline text-xs break-all"
                >
                  https://prettybio.netlify.app/{user?.userLinkName}
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-5">
              <button
                onClick={() => router.push('/dashboard/settings/subscription-plan')}
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
              >
                Subscription Plan
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;