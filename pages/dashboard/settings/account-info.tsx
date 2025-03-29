import { useRouter } from 'next/router';
import DashboardLayout from '../DashboardLayout';
import GradientBorder from '../../../components/GradientBorder';
import { MdOutlinePhotoCameraBack } from "react-icons/md";
import { useRef, useState } from 'react';


const AccountInfoPage: React.FC = () => {
  const router = useRouter();
    const [image, setImage] = useState<string>(""); 
      const fileInputRef = useRef<HTMLInputElement | null>(null);

      const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      const reader = new FileReader();
  
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result); 
          uploadToCloudinary(file);
        } else {
          console.error("Unexpected result type:", typeof reader.result);
        }
      };
  
      reader.readAsDataURL(file);
    };
  
    const handleButtonClick = () => {
      fileInputRef.current?.click();
    };
    const uploadToCloudinary = async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "users_avater");
  
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/drirsnp0c/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
  
        const data = await response.json();
  
        if (response.ok) {
          setImage(data.secure_url);
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        // setError("Failed to upload image");
      }
    };

  return (
    <DashboardLayout>
      <button 
          onClick={() => router.push('/dashboard/settings')}
          className="text-blue-600 hover:underline flex items-center"
        >
          ← Back to Settings
        </button>
      <div className="flex justify-center">
        
      <div className=" text-gray-800 w-full md:w-[400px]  ">
        

        <div className="mt-5">
         <div className="flex justify-center">
                     <div
                       className="relative w-32 h-32 border-2 border-dashed border-pink-400 rounded-full flex items-center justify-center cursor-pointer"
                       onClick={handleButtonClick}
                     >
                       {image ? (
                         <img
                           src={image}
                           alt="Uploaded"
                           className="w-full h-full rounded-full object-cover"
                         />
                       ) : (
                         <MdOutlinePhotoCameraBack className="text-pink-400 text-4xl" />
                       )}
                       <input
                         type="file"
                         ref={fileInputRef}
                         onChange={uploadImage}
                         className="hidden"
                       />
                     </div>
                   </div>

          <div className="border p-4 rounded-lg hover:shadow-md mt-5">
  
            <input
              type="text"
               placeholder='change bio'
              className="mt-2 bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
            />
          </div>

          <div className="border p-4 rounded-lg hover:shadow-md mt-5">
            
            <input
              type="text"
               placeholder='change username'
              className="mt-2 bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
            />
          </div>

          <div className="border p-4 rounded-lg hover:shadow-md mt-5">
      
            <input
              type="text"
               placeholder='change email'
              className="mt-2 bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
            />
          </div>

          <div className="border p-4 rounded-lg hover:shadow-md mt-5">
            
            <input
              type="text"
               placeholder='change password'
              className="mt-2 bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
            />
          </div>

          <div className="border p-4 rounded-lg hover:shadow-md mt-5">
    
            <input
              type="text"
              placeholder='change name'
              className="mt-2 bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
            />
          </div>
          <div className='mb-20 mt-5'>
          <GradientBorder>
          <button className="text-gray-800 font-bold hover:text-white px-4 py-2 rounded-lg">
            Save Changes
          </button>
          </GradientBorder>
          </div>
         
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountInfoPage;
