import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import GradientBorder from '../../components/GradientBorder';
import HomeGradientBorder from '../../components/HomeGradientBorder';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<string>('Dashboard');

  useEffect(() => {
    const pathToTitle: Record<string, string> = {
      '/dashboard': 'Manage Your Links',
      '/dashboard/analytics': 'Analytics',
      '/dashboard/settings': 'Settings',
      '/logout': 'Logout',
    };

    setCurrentSection(pathToTitle[router.pathname] || 'Dashboard');
  }, [router.pathname]);

  return (
    <div className="fixed top-0 left-0 w-full text-gray-800 z-20 bg-white shadow-md p-4 flex justify-between items-center lg:ml-64 lg:mr-80">
      <h1 className="text-xl font-bold ">{currentSection}</h1>

      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
        <Image
          src="/../public/assets/jay.jpg"
          alt="User Image"
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
    
      <h1 className='text-black'>hiii</h1>

    </div>
  );
};

export default Navbar;

