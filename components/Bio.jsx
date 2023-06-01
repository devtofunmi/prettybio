import React, { useRef, useState } from "react";
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
 const save = async () => {
   setLoading(true);

   const updates = {};

   if (image !== "") {
     updates.image = image;
   }
   if (name !== "") {
     updates.name = name;
   }
   if (bio !== "") {
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
     // Store user information in the database, including the image URL
     const { data, error } = await supabase
       .from("users")
       .update(updates)
       .eq("id", userId);

     console.log("User data response:", data, error);

     if (error) {
       console.error("Error setting up user:", error.message);
       setError("Settings not successful");
     } else {
       setSuccess("Settings successful");
       setTimeout(() => {
         setSuccess("");
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
    formData.append("upload_preset", "profile_image");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/phantom1245/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Cloudinary upload response:", data);

      if (response.ok) {
        return data.secure_url; // Return the secure URL of the uploaded image
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

  return (
    <div className="w-full ">
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
      <div className="lg:w-4/6 w-11/12 md:w-5/6 rounded-xl p-5 md:p-10  mt-2">
        <div>
          <h1>Bio</h1>
          <div className=" w-28 h-28 m-auto border-8 border-pink-500  border-dotted rounded-full flex justify-center">
            <div className=" text-3xl  flex justify-center">
              {image ? (
                <img
                  src={image}
                  alt="User's uploaded image"
                  className="w-full h-full rounded-full"
                />
              ) : (
                <button className="cursor-pointer" onClick={handleButtonClick}>
                  <BsCamera />
                </button>
              )}
              <div className="hidden">
                <input type="file" ref={fileInputRef} onChange={uploadImage} />
              </div>
            </div>
          </div>
          <input
            type="text"
            className="placeholder-black focus:outline-none  focus:border-blue-700  border border-gray-400 rounded-md py-2 px-4 block w-full mt-7"
            placeholder="change Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="mt-4">
          <input
            type="text"
            className="placeholder-black focus:outline-none  focus:border-blue-700  border border-gray-400 rounded-md py-2 px-4 block w-full mt-3"
            placeholder="change Bio"
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
        </div>

        <div className="mt-5 justify-center items-center flex ">
          <GradientBorder>
            <button
              className=" px-16  lg:px-32 md:px-20 py-2 bg-transparent  text-white text-base rounded-full "
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
