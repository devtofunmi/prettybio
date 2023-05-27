import { useState, useRef } from "react";
import { BsCamera } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import GradientBorder from "../components/GradientBorder";
import { supabase } from "../supabaseClient";

const Setup = () => {
  const [image, setImage] = useState("");
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [bio, setBio] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const setUp = async () => {
    setLoading(true);

    try {
      const imageUrl = await uploadToCloudinary(image);

      // Store user information in the database, including the image URL
      const { data, error } = await supabase.from("users").insert({
        name: name,
        link: link,
        bio: bio,
        image: imageUrl, // Store the image URL in the database
      });

      console.log("User data response:", data, error);

      if (error) {
        console.error("Error setting up user:", error.message);
        setError("Error setting up user");
      } else {
        setSuccess("Setup successful");
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
        <div className="text-3xl p-8">PrettyBio</div>
      </Link>
      <div className="text-center">
        <h1 className="text-3xl">Setup your page</h1>
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

      <div className="w-11/12 md:w-2/4 lg:w-4/12 rounded-xl m-auto p-14 mt-2">
        <div className="flex flex-col mt-3 justify-center">
          <div className="w-28 h-28 m-auto border-8 border-pink-500 border-dotted rounded-full flex justify-center">
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
          <div className="flex flex-col mt-7 text-sm">
            <input
              type="text"
              className="placeholder-black focus:outline-none focus:border-blue-700 border border-gray-400 rounded-md py-2 px-4 block w-full"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="flex text-sm items-center text-black bg-white mt-5 border pl-4 rounded-md">
              <p>prettybio.com/</p>
              <input
                type="text"
                placeholder="your name"
                className="py-2 bg-transparent outline-none"
                onChange={(e) => {
                  setLink(e.target.value);
                }}
              />
            </div>

            <div className="mt-5">
              <input
                type="text"
                className="placeholder-black focus:outline-none focus:border-blue-700 border border-gray-400 rounded-md py-2 px-4 block w-full"
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
                className="px-14 lg:px-32 md:px-20 py-2 bg-transparent text-white text-base rounded-full"
                onClick={handleSubmit}
              >
                {loading ? <p>loading...</p> : <p>Continue</p>}
              </button>
            </GradientBorder>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;
