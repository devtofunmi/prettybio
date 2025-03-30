import React, { useEffect, useState, useRef } from "react";
import { MdOutlinePhotoCameraBack } from "react-icons/md";
import { useRouter } from "next/router";
import GradientBorder from "../../components/GradientBorder";
import LoadingSpinner from "../../components/LoadingSpinner";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";

const Setup: React.FC = () => {
  const [image, setImage] = useState<string>("");
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
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    }
  };

  const setUp = async () => {
    setLoading(true);

    if (!image) {
      toast.error("Please upload an image.");
      setLoading(false);
      return;
    }
    if (!name) {
      toast.error("Please enter your name.");
      setLoading(false);
      return;
    }
    if (!userLinkName) {
      toast.error("Please enter your link name.");
      setLoading(false);
      return;
    }
    if (!bio) {
      toast.error("Please enter your bio.");
      setLoading(false);
      return;
    }

    try {
      const storedData = localStorage.getItem("data");
      const dataArray = storedData ? JSON.parse(storedData) : [];
      const userId = dataArray[0]?.id;

      if (!userId) {
        throw new Error("User ID not found");
      }


      toast.success("Setup successful!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

    } catch (error) {
      console.error("Error during setup:", error);
      toast.error("Error during setup.");
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
                disabled={loading}
              >
                {loading ? <LoadingSpinner /> : "Continue"}
              </button>
            </GradientBorder>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="https://media.istockphoto.com/id/2174175055/photo/a-businessman-use-generative-engine-optimization-on-his-smartphone-to-view-search-results.webp?s=1024x1024&w=is&k=20&c=HCEOpEPqIJq8a0awaQlbKOVu5eFg4TYkhr9hmHYKD0A="
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




