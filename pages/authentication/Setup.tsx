import React, {  useState, useRef } from "react";
import { MdOutlinePhotoCameraBack } from "react-icons/md";
import { useRouter } from "next/router";
import GradientBorder from "../../components/GradientBorder";
import LoadingSpinner from "../../components/LoadingSpinner";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const Setup: React.FC = () => {
  const [image, setUserImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [userLinkName, setUserLinkName] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const router = useRouter();

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setUserImage(reader.result);
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
        setUserImage(data.secure_url);
        toast.success("Image uploaded successfully!");
        console.log(data.secure_url);
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    }
  };

   const api = axios.create({
      baseURL: "https://prettybioo.up.railway.app",
    });

    const setUp = async () => {
      setLoading(true);
    
      if (!image || !name || !userLinkName || !bio) {
        toast.error("All fields are required.");
        setLoading(false);
        return;
      }
    
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("No access token found.");
    
        const response = await api.patch("/auth/setup", {
          image,
          name,
          bio,
          userLinkName,
          setup_complete: true,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        toast.success("Setup successful!");
    
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } catch (error: any) {
        console.error("Error during setup:", error);
        toast.error(error.response?.data?.error || "Error during setup.");
      }
    
      setLoading(false);
    };
      
  const handleSubmit = () => {
    setUp();
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-gray-900">
      <Toaster />
      <div className="absolute top-2 left-5 z-10">
        <Navbar />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-20">
        <h1 className="text-4xl font-bold text-gray-900 text-center mt-20 md:mt-5 mb-10">
          Setup Your Page
        </h1>
        <div className="w-full max-w-lg mx-auto">
          <div className="flex justify-center">
            <div
              className="relative w-32 h-32 border-2 border-pink-400 border-dashed rounded-full flex items-center justify-center cursor-pointer"
              onClick={handleButtonClick}
            >
              {image ? (
                <Image
                  src={image}
                  width={100} height={100}
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

          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-white px-4 py-3 border rounded-md focus:border-[#effbce]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex items-center border rounded-md px-4 focus:border-[#effbce]">
              <span className="text-gray-500">prettybio.com/</span>
              <input
                type="text"
                placeholder="yourname"
                className="flex-1 py-3 bg-transparent focus:outline-none"
                value={userLinkName}
                onChange={(e) => setUserLinkName(e.target.value)}
              />
            </div>

            <input
              type="text"
              placeholder="Bio"
              className="w-full bg-white px-4 py-3 border rounded-md"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <GradientBorder>
              <button
                className="w-full px-6 py-3 bg-transparent text-lg font-bold text-gray-800 hover:text-white"
                onClick={handleSubmit}
                disabled={loading || !image || !name || !bio || !userLinkName}
              >
                {loading ? <LoadingSpinner /> : "Continue"}
              </button>
            </GradientBorder>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="/assets/auth.png"
          alt="Setup Illustration"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
};

export default Setup;




