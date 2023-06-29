import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { BsCamera } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import GradientBorder from "../components/GradientBorder";
import { supabase } from "../supabaseClient";
import LoadingSpinner from "../components/LoadingSpinner";

const Setup = () => {
  const [image, setImage] = useState("");
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [userLinkName, setUserLinkName] = useState("");
  const [bio, setBio] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  function uploadImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // Set the image URL to the result of FileReader
      uploadToCloudinary(file); // Pass the file to the uploadToCloudinary function
    };

    reader.readAsDataURL(file);

    console.log("Selected file:", file);
    console.log("File reader result:", reader.result);
  }

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const uploadToCloudinary = async (file) => {
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
      console.log("Cloudinary upload response:", data);

      if (response.ok) {
        return data.secure_url; // Return the uploaded image URL
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

  const setUp = async () => {
    setLoading(true);

    if (!image) {
      setError("Please insert your image");
      setLoading(false);
      return;
    }
    if (!name) {
      setError("Please enter your name");
      setLoading(false);
      return;
    }
    if (!userLinkName) {
      setError("Please insert your linkname");
      setLoading(false);
      return;
    }
    if (!bio) {
      setError("Please enter your bio");
      setLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadToCloudinary(image);
      const storedData = localStorage.getItem("data");
      const dataArray = JSON.parse(storedData);
      const userId = dataArray[0]?.id;
      // Store user information in the database, including the image URL
      const { data, error } = await supabase
        .from("users")
        .update({
          name: name,
          userlink_name: userLinkName,
          bio: bio,
          image: imageUrl, // Store the image URL in the database
          setup_complete: true,
        })
        .eq("id", userId);

      console.log("User data response:", data, error);

      if (error) {
        console.error("Error setting up user:", error.message);
        setError("Error setting up user");
      } else {
        setSuccess("Setup successful");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
        router.push("/Dashboard");
      }
    } catch (error) {
      console.error("Error during setup:", error);
      setError("Error during setup");
    }

    setLoading(false);
  };

  function handleSubmit() {
    setUp();
  }

  return (
    <div className="font-abc">
      <Link href="/">
        <div
          className={`${
            currentTheme === "dark"
              ? "text-3xl p-8 text-text"
              : "text-3xl p-8 text-black"
          }`}
        >
          PrettyBio
        </div>
      </Link>
      <div className="text-center">
        <h1
          className={`${
            currentTheme === "dark"
              ? "text-2xl md:text-3xl text-text"
              : "text-2xl md:text-3xl text-black"
          }`}
        >
          Setup your page
        </h1>
      </div>

      {error && (
        <div className="fixed top-0 left-0 right-0 items-center bg-red-500 text-white p-4 ">
          <div className="flex justify-between">
            <p>{error}</p>
            <button className="px-2 py-1" onClick={() => setError("")}>
              X
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed top-0 left-0 right-0 items-center bg-green-500 text-white p-4 ">
          <div className="text-center">
            <p>{success}</p>
          </div>
        </div>
      )}

      <div className="w-full md:w-2/4 text-sm lg:w-4/12 rounded-xl m-auto p-10 md:p-[14] mt-2">
        <div className="flex flex-col mt-3 justify-center">
          <div
            className={`${
              currentTheme === "dark"
                ? "w-28 h-28 m-auto border-8 border-text border-dotted rounded-full flex justify-center"
                : "w-28 h-28 m-auto border-8 border-black border-dotted rounded-full flex justify-center"
            }`}
          >
            {image ? (
              <img
                src={image}
                alt="User's uploaded image"
                className="w-full h-full rounded-full"
              />
            ) : (
              <button className="cursor-pointer" onClick={handleButtonClick}>
                <BsCamera
                  className={`${
                    currentTheme === "dark" ? "text-white" : "text-black"
                  }`}
                />
              </button>
            )}
            <div className="hidden">
              <input type="file" ref={fileInputRef} onChange={uploadImage} />
            </div>
          </div>
          <div className="flex flex-col mt-7 text-sm">
            <input
            autocomplete="off"
              type="text"
              className={`${
                currentTheme === "dark"
                  ? "bg-[#202125] focus:outline-none focus:border-black border border-gray-400 rounded-md py-4 px-4 block w-full"
                  : "bg-transparent focus:outline-none focus:border-black border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
              }`}
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div
              className={`${
                currentTheme === "dark"
                  ? "flex items-center border  pl-4  mt-3  text-sm  text-black bg-transparent   rounded-md"
                  : "flex items-center  pl-4  mt-3  text-sm  text-black bg-white border  rounded-md"
              }`}
            >
              <p
                className={`${
                  currentTheme === "dark" ? "text-text" : "text-black"
                }`}
              >
                prettybio.com/
              </p>
              <input
              autocomplete="off"
                type="text"
                placeholder="yourname"
                className={`${
                  currentTheme === "dark"
                    ? "py-3 px-0 w-[120px] bg-transparent outline-none text-text"
                    : "py-3 px-0 w-[120px] bg-transparent outline-none text-black"
                }`}
                onChange={(e) => {
                  setUserLinkName(e.target.value);
                }}
              />
            </div>

            <div className="mt-5">
              <input
              autocomplete="off"
                type="text"
                className={`${
                  currentTheme === "dark"
                    ? "bg-[#202125] focus:outline-none focus:border-black border border-gray-400 rounded-md py-4 px-4 block w-full"
                    : "bg-transparent focus:outline-none focus:border-white border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
                }`}
                placeholder="Bio"
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mt-5 justify-center items-center flex">
            <GradientBorder>
              <button
                className={`${
                  currentTheme === "dark"
                    ? "px-14 lg:px-32 md:px-20 py-2 bg-transparent text-btntext text-base rounded-full"
                    : "px-14 lg:px-32 md:px-20 py-2 bg-transparent text-black text-base rounded-full"
                }`}
                onClick={handleSubmit}
              >
                {loading ? <LoadingSpinner /> : <p>Continue</p>}
              </button>
            </GradientBorder>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;
