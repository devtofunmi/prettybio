import React, { useState } from "react";
import GradientBorder from "./GradientBorder";
import { supabase } from "../supabaseClient";

const Settings = () => {
  const [link, setLink] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");
 const save = async () => {
   setLoading(true);

   try {
     const storedData = localStorage.getItem("data");
     const dataArray = JSON.parse(storedData);
     const userId = dataArray[0]?.id;
     // Store user information in the database, including the image URL
     const { data, error } = await supabase
       .from("users")
       .update({
         email: gmail,
         password: password,
         link: link,
       })
       .eq("id", userId);

     console.log("User data response:", data, error);

     if (error) {
       console.error("Error setting up user:", error.message);
       setError("settings not successful");
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

      <div className="lg:w-4/6 w-4/5 md:w-5/6 rounded-xl    p-14  mt-2">
        <div>
          <h1>Accounts</h1>
          <div className="flex items-center border bg-white pl-2 rounded-md mt-3">
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
        </div>

        <div className="mt-4">
          <input
            type="text"
            className="placeholder-black focus:outline-none  focus:border-blue-700  border border-gray-400 rounded-md py-2 px-4 block w-full mt-3"
            placeholder="change Gmail"
            onChange={(e) => {
              setGmail(e.target.value);
            }}
          />
        </div>

        <div className="mt-4">
          <input
            type="text"
            className="placeholder-black focus:outline-none  focus:border-blue-700  border border-gray-400 rounded-md py-2 px-4 block w-full mt-3"
            placeholder="change password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="mt-5 justify-center items-center flex ">
          <GradientBorder>
            <button
              className=" px-16  lg:px-32 md:px-20 py-2 bg-transparent  text-white text-base rounded-full "
              onClick={handleSubmit}
            >
              {loading ? <p>loading...</p> : <p>Save</p>}
            </button>
          </GradientBorder>
        </div>
      </div>
    </div>
  );
};

export default Settings;
