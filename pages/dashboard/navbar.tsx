import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<string>('Dashboard');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pathToTitle: Record<string, string> = {
      '/dashboard': 'Manage Your Links',
      '/dashboard/analytics': 'Analytics',
      '/dashboard/settings': 'Settings',            
      '/dashboard/accountsettings': 'Account Settings', 
      '/dashboard/settings/account-info': 'Account Info',
      '/dashboard/settings/preferences': 'Preferences',
      '/logout': 'Logout',
    };

    setCurrentSection(pathToTitle[router.pathname] || 'Dashboard');
  }, [router.pathname]);

  interface UserData {
    username: string;
    userImage: string;
    userLinkName: string;
  }
  

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        const res = await fetch(`http://localhost:5000/api/profile/${userId}`);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error('Error fetching user data', err);
      }
    };

    fetchUserData();
  }, []);
  

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="fixed top-0 left-0 w-full text-gray-800 z-20 bg-white shadow-sm p-4 flex justify-between items-center lg:ml-64 lg:mr-80">
      <h1 className="text-xl font-bold">{currentSection}</h1>

      <div className="flex justify-center items-center">
        
        <div
          ref={imageRef}
          className="flex items-center gap-2 cursor-pointer lg:mr-64 lg:ml-80"
          onClick={toggleModal}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden  border-2  hover:scale-105 transition hover:border-pink-500">
            <Image
              src={userData?.userImage || '/assets/jay.jpg'}
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
            className="absolute bg-white shadow-lg border border-gray-300 rounded-lg p-4 w-64 z-30 lg:mr-64 lg:ml-80"
            style={{ top: '60px', right: 15 }}
          >
            <div className="block md:hidden">
                      <Link href="/" >
                      <h2 className="text-lg font-bold mb-2">PrettyBio</h2>
                        </Link>
                        </div>
            <div className="flex">
              <div className="flex gap-2">
                <div className="w-10 h-10 cursor-pointer rounded-full overflow-hidden border-2 border-transparent hover:border-gray-800">
                  <Image
                    src="/assets/jay.jpg"
                    alt="User Image"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">{userData?.username}</p>
                  <Link
                    className="text-[12px] cursor-pointer"
                    href="https://prettybio.netlify.app/okay"
                    target="_blank"
                  >
                    <p className="text-blue-500 hover:underline cursor-pointer">
                     {`https://prettybio.netlify.app/${userData?.userLinkName}`}
                    </p>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-5">
              <button
                onClick={() => router.push('/dashboard/settings/subscription-plan')}
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
              >
                Subscription Plan
              </button>

              <button
                onClick={() => router.push('/logout')}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;



