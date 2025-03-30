import { useRouter } from 'next/router';
import DashboardLayout from '../DashboardLayout';
import { FaArrowLeft, FaCheckCircle, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { useState } from 'react';

const PreferencesPage: React.FC = () => {
  const router = useRouter();

  // State for selected theme and social position
  const [selectedTheme, setSelectedTheme] = useState<string>('light');
  const [socialPosition, setSocialPosition] = useState<'top' | 'bottom'>('top');

  return (
    <DashboardLayout>
      <div className=" text-gray-800 min-h-screen">
        {/* Back Button */}
        <button 
          onClick={() => router.push('/dashboard/settings/settings')}
          className="flex items-center text-blue-600 hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Back to Settings
        </button>



        {/* Theme Preview Section */}
        <div className="mt-5">
          <h2 className="text-xl font-semibold mb-4">Themes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
            
            {/* Light Mode */}
            <div 
              className={`border rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform ${
                selectedTheme === 'light' ? 'border-2 border-blue-600' : ''
              }`}
              onClick={() => setSelectedTheme('light')}
            >
              <div className="bg-white h-40 flex flex-col justify-between p-2">
                <h2 className="text-lg font-bold">Light Mode</h2>
                <p className="text-gray-600">Clean and minimalistic</p>
              </div>
              <div className="bg-gray-100 p-2 flex justify-between items-center">
                <span className="text-gray-700">Preview</span>
                <FaCheckCircle className={selectedTheme === 'light' ? 'text-blue-600' : 'text-gray-400'} size={20} />
              </div>
            </div>

            {/* Dark Mode */}
            <div 
              className={`border rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform ${
                selectedTheme === 'dark' ? 'border-2 border-blue-600' : ''
              }`}
              onClick={() => setSelectedTheme('dark')}
            >
              <div className="bg-gray-900 text-white h-40 flex flex-col justify-between p-2">
                <h2 className="text-lg font-bold">Dark Mode</h2>
                <p className="text-gray-400">Sleek and modern</p>
              </div>
              <div className="bg-gray-800 p-2 flex justify-between items-center">
                <span className="text-gray-300">Preview</span>
                <FaCheckCircle className={selectedTheme === 'dark' ? 'text-blue-600' : 'text-gray-400'} size={20} />
              </div>
            </div>

            {/* Ocean Theme */}
            <div 
              className={`border rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform  ${
                selectedTheme === 'ocean' ? 'border-2 border-blue-600' : ''
              }`}
              onClick={() => setSelectedTheme('ocean')}
            >
              <div className="bg-blue-500 text-white h-40 flex flex-col justify-between p-2">
                <h2 className="text-lg font-bold">Ocean Theme</h2>
                <p className="text-blue-200">Cool and calming</p>
              </div>
              <div className="bg-blue-600 p-2 flex justify-between items-center">
                <span className="text-blue-100">Preview</span>
                <FaCheckCircle className={selectedTheme === 'ocean' ? 'text-blue-600' : 'text-gray-400'} size={20} />
              </div>
            </div>

            {/* Forest Theme */}
            <div 
              className={`border rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform  ${
                selectedTheme === 'forest' ? 'border-2 border-blue-600' : ''
              }`}
              onClick={() => setSelectedTheme('forest')}
            >
              <div className="bg-green-600 text-white h-40 flex flex-col justify-between p-2">
                <h2 className="text-lg font-bold">Forest Theme</h2>
                <p className="text-green-200">Earthy and vibrant</p>
              </div>
              <div className="bg-green-700 p-2 flex justify-between items-center">
                <span className="text-green-100">Preview</span>
                <FaCheckCircle className={selectedTheme === 'forest' ? 'text-blue-600' : 'text-gray-400'} size={20} />
              </div>
            </div>

            {/* Sunset Theme */}
            <div 
              className={`border rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform  ${
                selectedTheme === 'sunset' ? 'border-2 border-blue-600' : ''
              }`}
              onClick={() => setSelectedTheme('sunset')}
            >
              <div className="bg-orange-500 text-white h-40 flex flex-col justify-between p-2">
                <h2 className="text-lg font-bold">Sunset Theme</h2>
                <p className="text-orange-200">Warm and cozy</p>
              </div>
              <div className="bg-orange-600 p-2 flex justify-between items-center">
                <span className="text-orange-100">Preview</span>
                <FaCheckCircle className={selectedTheme === 'sunset' ? 'text-blue-600' : 'text-gray-400'} size={20} />
              </div>
            </div>

            {/* Lavender Theme */}
            <div 
              className={`border rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform  ${
                selectedTheme === 'lavender' ? 'border-2 border-blue-600' : ''
              }`}
              onClick={() => setSelectedTheme('lavender')}
            >
              <div className="bg-purple-500 text-white h-40 flex flex-col justify-between p-2">
                <h2 className="text-lg font-bold">Lavender Theme</h2>
                <p className="text-purple-200">Calm and elegant</p>
              </div>
              <div className="bg-purple-600 p-2 flex justify-between items-center">
                <span className="text-purple-100">Preview</span>
                <FaCheckCircle className={selectedTheme === 'lavender' ? 'text-blue-600' : 'text-gray-400'} size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Social Position Section */}
        <div className='mt-10 md:mb-10 mb-20'>
          <h2 className="text-xl font-semibold mb-4">Position to display socials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Top Position */}
            <div 
              className={`border w-[300px] rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform  ${
                socialPosition === 'top' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSocialPosition('top')}
            >
              <div className="bg-gray-100 p-4 flex flex-col items-center h-40 justify-between">
                <div className="flex gap-4">
                  <FaTwitter className="text-blue-500" size={30} />
                  <FaInstagram className="text-pink-500" size={30} />
                  <FaFacebook className="text-blue-700" size={30} />
                </div>
                <h2 className="text-lg font-bold">Top</h2>
                <p className="text-gray-600">Socials will appear at the top</p>
                <div className="flex items-center justify-center">
                  <FaCheckCircle 
                    className={socialPosition === 'top' ? 'text-blue-600' : 'text-gray-400'} 
                    size={20} 
                  />
                </div>
              </div>
            </div>

            {/* Bottom Position */}
            <div 
              className={`border w-[300px] rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform  ${
                socialPosition === 'bottom' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSocialPosition('bottom')}
            >
              <div className="bg-gray-100 p-4 flex flex-col items-center h-40 justify-between">
                <h2 className="text-lg font-bold">Bottom</h2>
                <p className="text-gray-600">Socials will appear at the bottom</p>
                <div className="flex gap-4">
                  <FaTwitter className="text-blue-500" size={30} />
                  <FaInstagram className="text-pink-500" size={30} />
                  <FaFacebook className="text-blue-700" size={30} />
                </div>
                <div className="flex items-center justify-center">
                  <FaCheckCircle 
                    className={socialPosition === 'bottom' ? 'text-blue-600' : 'text-gray-400'} 
                    size={20} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </DashboardLayout>
  );
};

export default PreferencesPage;


