import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import GradientBorder from "./GradientBorder";
import { BsCamera } from "react-icons/bs";
import { supabase } from "../supabaseClient";
import LoadingSpinner from "./LoadingSpinner";

const Bio = () => {
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");

  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const save = async () => {
    setLoading(true);

    const updates = {};

    if (image) {
      updates.image = image;
    }
    if (name) {
      updates.name = name;
    }
    if (bio) {
      updates.bio = bio;
    }

    if (Object.keys(updates).length === 0) {
      setError("Please fill at least one field");
      setLoading(false);
      return;
    }

    try {
      const storedData = localStorage.getItem("data");
      const dataArray = JSON.parse(storedData);
      const userId = dataArray[0]?.id;

      // Fetch the existing user data from the database
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select()
        .eq("id", userId)
        .single();

      if (userError) {
        console.error("Error fetching user data:", userError.message);
        setError("Settings not successful");
        setLoading(false);
        return;
      }

      // Merge the existing user data with the updates
      const mergedData = { ...userData, ...updates };

      // Store the merged data in the database
      const { data, error } = await supabase
        .from("users")
        .update(mergedData)
        .eq("id", userId);

      console.log("User data response:", data, error);

      if (error) {
        console.error("Error setting up user:", error.message);
        setError("Settings not successful");
      } else {
        setSuccess("Settings saved successfully");
        setTimeout(() => {
          setSuccess("");
          setImage("");
          setBio("");
          setName("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during setup:", error);
      setError("Error during setup");
    }

    setLoading(false);
  };

  function handleSubmit() {
    save();
  }

  function uploadImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // Set the image URL to the result of FileReader
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
        const imageUrl = new CloudinaryImage(data.public_id)
          .resize(
            fill().width(300).height(300).gravity(gravity().focusOn(face()))
          )
          .roundCorners(roundCorners().max())
          .toURL();

        return imageUrl; // Return the transformed image URL
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="w-full text-text ">
      {error && (
        <div className="flex justify-center md:w-[300px] w-[200px] m-auto rounded-lg  items-center bg-red-500 text-white p-1 md:text-[15px] text-[12px] mb-0 ">
          <div className="flex justify-between items-center">
            <p>{error}</p>
            <button className=" px-2 py-1" onClick={() => setError("")}>
              X
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="flex justify-center md:w-[300px] w-[200px] m-auto rounded-lg  items-center bg-green-500 text-white p-1 md:text-[15px] text-[12px] mb-0 ">
          <div className="text-center">
            <p>{success}</p>
          </div>
        </div>
      )}
      <div className="lg:w-4/6 w-full md:w-5/6 rounded-xl p-5 md:p-10  mt-2">
        <div>
          <h1
            className={`${
              currentTheme === "dark" ? "text-text" : "text-black"
            }`}
          >
            Bio
          </h1>
          <div
            className={`${
              currentTheme === "dark"
                ? "w-28 h-28 m-auto border-8 border-text border-dotted rounded-full flex justify-center"
                : "w-28 h-28 m-auto border-8 border-black border-dotted rounded-full flex justify-center"
            }`}
          >
            <div className=" text-3xl  flex justify-center">
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
                      currentTheme === "dark"
                        ? "text-white"
                        : "text-black"
                    }`}
                  />
                </button>
              )}
              <div className="hidden">
                <input type="file" ref={fileInputRef} onChange={uploadImage} />
              </div>
            </div>
          </div>
          <input
          autocomplete="off"
            type="text"
            className={`${
              currentTheme === "dark"
                ? "bg-[#202125]  focus:border-[#effbce] text-text border border-gray-400 rounded-md py-3 px-4 block w-full mt-3"
                : "bg-transparent  focus:border-[#effbce]  border border-gray-400 rounded-md py-3 px-4 block w-full mt-3 text-black"
            }`}
            placeholder="change Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name} // Add value prop to bind the input value
          />
        </div>

        <div className="mt-4">
          <input
          autocomplete="off"
            type="text"
            className={`${
              currentTheme === "dark"
                ? "bg-[#202125]  focus:border-[#effbce] text-text border border-gray-400 rounded-md py-3 px-4 block w-full mt-3"
                : "bg-transparent  focus:border-[#effbce]  border border-gray-400 rounded-md py-3 px-4 block w-full mt-3 text-black"
            }`}
            placeholder="change Bio"
            onChange={(e) => {
              setBio(e.target.value);
            }}
            value={bio} // Add value prop to bind the input value
          />
        </div>

        <div className="mt-5 justify-center items-center flex ">
          <GradientBorder>
            <button
              className=" px-16  lg:px-32 md:px-20 py-2 bg-transparent  text-btntext text-base rounded-full "
              onClick={handleSubmit}
            >
              {loading ? <LoadingSpinner /> : <p>Save</p>}
            </button>
          </GradientBorder>
        </div>
      </div>
    </div>
  );
};

export default Bio;
