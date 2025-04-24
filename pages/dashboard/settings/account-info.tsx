import { useRouter } from 'next/router';
import DashboardLayout from '../DashboardLayout';
import GradientBorder from '../../../components/GradientBorder';
import { MdOutlinePhotoCameraBack } from "react-icons/md";
import { useRef, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Image from 'next/image';

const AccountInfoPage: React.FC = () => {
  const router = useRouter();
  const [image, setImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("");
  const [userLinkName, setUserLinkName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUserName] = useState<string>("");

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
    setLoading(true);

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
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    const updates: Record<string, string> = {};
  
    if (name.trim()) updates.name = name.trim();
    if (bio.trim()) updates.bio = bio.trim();
    if (userLinkName.trim()) updates.userLinkName = userLinkName.trim();
    if (image.trim()) updates.image = image.trim();
    if (username.trim()) updates.username = username.trim();
  
    if (password.trim()) {
      if (password.length < 6) {
        return toast.error("Password must be at least 6 characters.");
      }
  
      const hasNumber = /\d/.test(password);
      const hasLetter = /[a-zA-Z]/.test(password);
  
      if (!hasNumber || !hasLetter) {
        return toast.error("Password must contain at least one letter and one number.");
      }
  
      updates.password = password;
    }
  
    if (Object.keys(updates).length === 0) {
      return toast.error("No changes made.");
    }
  
    setLoading(true);
  
    try {
      const token = localStorage.getItem("accessToken");
  
      if (!token) {
        throw new Error("No token found.");
      }
  
      const res = await fetch(`https://prettybioo.up.railway.app/account`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
  
      if (!res.ok) throw new Error("Failed to update account.");
  
      const data = await res.json();
      toast.success(data.message || "Changes saved!");
  
      //  Reset only updated fields
      if (updates.name) setName("");
      if (updates.bio) setBio("");
      if (updates.userLinkName) setUserLinkName("");
      if (updates.image) setImage("");
      if (updates.password) setPassword("");

    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes.");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <DashboardLayout>
      <Toaster />
      <button
        onClick={() => router.push('/dashboard/settings/settings')}
        className="text-blue-600 hover:underline flex items-center"
      >
        ← Back to Settings
      </button>

      <div className="flex justify-center">
        <div className="text-gray-800 w-full md:w-[400px]">
          <div className="mt-5">
            
            <div className="flex justify-center">
              <div
                className="relative w-32 h-32 border-2 border-dashed border-pink-400 rounded-full flex items-center justify-center cursor-pointer"
                onClick={handleButtonClick}
              >
                {image ? (
                  <Image
                    width={100}
                    height={100}
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
                placeholder="Change name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
              />
            </div>

          

            
            <div className="border p-4 rounded-lg hover:shadow-md mt-5">
              <input
                type="text"
                placeholder="Change bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-2 bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
              />
            </div>

            <div className="border p-4 rounded-lg hover:shadow-md mt-5">
              <input
                type="text"
                placeholder="Change userlinkname"
                value={userLinkName}
                onChange={(e) => setUserLinkName(e.target.value.toLowerCase())}
                className="mt-2 bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
              />
            </div>
            
            <div className="border p-4 rounded-lg hover:shadow-md mt-5">
              <input
                type="text"
                placeholder="Change username"
                value={name}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                className="mt-2 bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
              />
            </div>

            

            <div className="border p-4 rounded-lg hover:shadow-md mt-5">
              <input
                type="password"
                placeholder="Change password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
              />
            </div>

           

           

          
            <div className="mb-20 mt-5">
              <GradientBorder>
                <button
                  className="text-gray-800 font-bold hover:text-white px-4 py-2 rounded-lg flex items-center justify-center w-full"
                  onClick={handleSaveChanges}
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner /> : "Save Changes"}
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

