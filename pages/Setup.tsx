import React, { useEffect, useState, useRef } from "react";
import { BsCamera } from "react-icons/bs";
import { useRouter } from "next/router";
import GradientBorder from "../components/GradientBorder";
import { supabase } from "../supabaseClient";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import Image from "next/image";

const Setup: React.FC = () => {
  const [image, setImage] = useState<string>(""); 
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [userLinkName, setUserLinkName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

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
      setError("Failed to upload image");
    }
  };
  const setUp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (!image) {
      setError("Please upload an image");
      setLoading(false);
      return;
    }
    if (!name) {
      setError("Please enter your name");
      setLoading(false);
      return;
    }
    if (!userLinkName) {
      setError("Please enter a link name");
      setLoading(false);
      return;
    }
    if (!bio) {
      setError("Please enter your bio");
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

      const { data, error } = await supabase
        .from("users")
        .update({
          name,
          userlink_name: userLinkName,
          bio,
          image,
          setup_complete: true,
        })
        .eq("id", userId);

      if (error) {
        console.error("Error setting up user:", error.message);
        setError("Error setting up user");
      } else {
        setSuccess("Setup successful");
        setTimeout(() => {
          router.push("/Dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during setup:", error);
      setError("Error during setup");
    }

    setLoading(false);
  };

  const handleSubmit = () => {
    setUp();
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-gray-900">
      <div className="absolute top-2 left-5 z-10">
        <Navbar />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-20">
        <h1 className="text-4xl font-bold text-gray-900 text-center mt-20 md:mt-5 mb-10">
          Setup Your Page
        </h1>
        {error && (
          <div className="w-full max-w-md mx-auto mb-4">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
              <p>{error}</p>
            </div>
          </div>
        )}
        {success && (
          <div className="w-full max-w-md mx-auto mb-4">
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-md">
              <p>{success}</p>
            </div>
          </div>
        )}
        <div className="w-full max-w-lg mx-auto">
          <div className="flex justify-center">
            <div
              className="relative w-32 h-32 border-4 border-dashed rounded-full flex items-center justify-center cursor-pointer"
              onClick={handleButtonClick}
            >
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <BsCamera className="text-gray-600 text-4xl" />
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
              className="w-full bg-white px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex items-center border rounded-md px-4">
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
              className="w-full bg-white px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
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



