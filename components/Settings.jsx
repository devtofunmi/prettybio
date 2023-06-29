import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import GradientBorder from "./GradientBorder";
import { supabase } from "../supabaseClient";
import LoadingSpinner from "./LoadingSpinner";

const Settings = () => {
  const [userLinkName, setUserLinkName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
   const { systemTheme, theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

  const save = async () => {
    if (email === "" && password === "" && userLinkName === "") {
      setError("Please fill at least one field");
      return;
    }

    setLoading(true);

    try {
      const storedData = localStorage.getItem("data");
      const dataArray = JSON.parse(storedData);
      const userId = dataArray[0]?.id;

      const updates = {};

      if (email !== "") {
        updates.email = email;
      }
      if (password !== "") {
        updates.password = password;
      }
      if (userLinkName !== "") {
        updates.userlink_name = userLinkName;
      }

      if (Object.keys(updates).length === 0) {
        setError("Please fill at least one field");
        setLoading(false);
        return;
      }

      // Store user information in the database, including the updated fields
      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", userId);

      console.log("User data response:", data, error);

      if (error) {
        console.error("Error setting up user:", error.message);
        setError("Settings not successful");
      } else if (password !== "" && password.length < 6) {
        setError("Password must be at least 6 characters long");
      } else {
        setSuccess("Settings saved successfully");
        setTimeout(() => {
          setSuccess("");
          setPassword(""); // Clear password value
          setUserLinkName(""); // Clear userLinkName value
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
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="w-full">
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

      <div className="lg:w-4/6 w-full md:w-5/6 rounded-xl text-text p-5 md:p-10 mt-2">
        <div>
          <h1
            className={`${
              currentTheme === "dark" ? "text-text" : "text-black"
            }`}
          >
            Accounts
          </h1>
          <div
            className={`${
              currentTheme === "dark"
                ? "flex items-center   pl-2  mt-3  text-sm text-black bg-transparent border  rounded-md"
                : "flex items-center   pl-2  mt-3  text-sm  text-black bg-white border  rounded-md"
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
              value={userLinkName} // Add value prop to bind the input value
            />
          </div>
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
            placeholder="change email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email} // Add value prop to bind the input value
          />
        </div>

        <div className="mt-4">
          <input
          autocomplete="off"
            type="password"
            className={`${
              currentTheme === "dark"
                ? "bg-[#202125]  focus:border-[#effbce] text-text border border-gray-400 rounded-md py-3 px-4 block w-full mt-3"
                : "bg-transparent  focus:border-[#effbce]  border border-gray-400 rounded-md py-3 px-4 block w-full mt-3 text-black"
            }`}
            placeholder="change password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password} // Add value prop to bind the input value
          />
        </div>

        <div className="mt-5 justify-center items-center flex ">
          <GradientBorder>
            <button
              className="px-16 lg:px-32 md:px-20 py-2 bg-transparent text-btntext text-base rounded-full"
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

export default Settings;
