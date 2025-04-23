import { useRouter } from 'next/router';
import DashboardLayout from '../DashboardLayout';
import {
  FaArrowLeft,
  FaCheckCircle,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from 'react-icons/fa';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useUser } from '../../../context/UserContext';
import LoadingSpinner from '../../../components/LoadingSpinner';

const PreferencesPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

  const userId = user?.id;

  const [selectedTheme, setSelectedTheme] = useState<string>('light');
  const [socialPosition, setSocialPosition] = useState<'top' | 'bottom'>('top');
  const [isLoading, setIsLoading] = useState<boolean>(false);

 
  //   if (!userId) return;
  //   const fetchPreferences = async () => {
  //     try {
  //       const res = await axios.get(`https://prettybioo.up.railway.app/preferences/${userId}`);
  //       setSelectedTheme(res.data.theme || 'light');
  //       setSocialPosition(res.data.socialPosition || 'top');
  //     } catch (error) {
  //       toast.error('Failed to fetch preferences');
  //       console.error(error);
  //     }
  //   };

  //   fetchPreferences();
  // }, [userId]);

  const handleSavePreferences = async () => {
    if (!userId) {
      toast.error('User not found');
      return;
    }
  
    const accessToken = localStorage.getItem('accessToken');
  
    if (!accessToken) {
      toast.error('You are not logged in');
      return;
    }
  
    setIsLoading(true);
    try {
      await axios.put(
        `https://prettybioo.up.railway.app/preferences/${userId}`,
        {
          theme: selectedTheme,
          socialPosition,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success('Preferences saved!');
    } catch (error) {
      toast.error('Failed to save preferences');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <DashboardLayout>
      <div className="text-gray-800 min-h-screen px-4 md:px-10">
        <button
          onClick={() => router.push('/dashboard/settings/settings')}
          className="flex items-center text-blue-600 hover:underline mt-4"
        >
          <FaArrowLeft className="mr-2" /> Back to Settings
        </button>

        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Themes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[ 
              { name: 'Light', id: 'light', bg: 'bg-white', text: 'text-black', preview: 'bg-gray-100' },
              { name: 'Dark', id: 'dark', bg: 'bg-[#202125] text-white', text: 'text-white', preview: 'bg-[#202125]' },
              { name: 'Ocean', id: 'ocean', bg: 'bg-teal-700 text-white', text: 'text-white', preview: 'bg-teal-600' },
              { name: 'Forest', id: 'forest', bg: 'bg-green-800 text-white', text: 'text-white', preview: 'bg-green-700' },
              { name: 'Sunset', id: 'sunset', bg: 'bg-red-600 text-white', text: 'text-white', preview: 'bg-red-700' },
              { name: 'Lavender', id: 'lavender', bg: 'bg-indigo-600 text-white', text: 'text-white', preview: 'bg-indigo-500' },
            ].map(({ name, id, bg, text, preview }) => (
              <div
                key={id}
                className={`border rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform ${
                  selectedTheme === id ? 'border-2 border-blue-600' : ''
                }`}
                onClick={() => setSelectedTheme(id)}
              >
                <div className={`${bg} h-40 flex flex-col justify-between p-2`}>
                  <h2 className="text-lg font-bold">{name} Mode</h2>
                  <p className={text}>Preview description</p>
                </div>
                <div className={`${preview} p-2 flex justify-between items-center`}>
                  <span className="text-white">Preview</span>
                  <FaCheckCircle className={selectedTheme === id ? 'text-blue-600' : 'text-gray-400'} size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Position to display socials</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {[ 
              { id: 'top', title: 'Top', description: 'Socials will appear at the top', iconPos: 'top' },
              { id: 'bottom', title: 'Bottom', description: 'Socials will appear at the bottom', iconPos: 'bottom' },
            ].map(({ id, title, description, iconPos }) => (
              <div
                key={id}
                className={`border w-[300px] rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform ${
                  socialPosition === id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSocialPosition(id as 'top' | 'bottom')}
              >
                <div className="bg-gray-100 p-4 flex flex-col items-center h-40 justify-between">
                  {iconPos === 'top' && (
                    <div className="flex gap-4">
                      <FaTwitter className="text-blue-500" size={30} />
                      <FaInstagram className="text-pink-500" size={30} />
                      <FaFacebook className="text-blue-700" size={30} />
                    </div>
                  )}
                  <h2 className="text-lg font-bold">{title}</h2>
                  <p className="text-gray-600 text-center">{description}</p>
                  {iconPos === 'bottom' && (
                    <div className="flex gap-4">
                      <FaTwitter className="text-blue-500" size={30} />
                      <FaInstagram className="text-pink-500" size={30} />
                      <FaFacebook className="text-blue-700" size={30} />
                    </div>
                  )}
                  <FaCheckCircle className={socialPosition === id ? 'text-blue-600' : 'text-gray-400'} size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="mt-10 mb-20 flex justify-center">
          <button
            onClick={handleSavePreferences}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:bg-blue-700 text-white  px-6 py-2 rounded-full hover:scale-105 transition shadow-md disabled:opacity-50"
          >
            {isLoading ? <LoadingSpinner /> : 'Save Preferences'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PreferencesPage;
