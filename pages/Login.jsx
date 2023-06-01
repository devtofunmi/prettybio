import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import GradientBorder from "../components/GradientBorder";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const logIn = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("id, image, userlink_name, username, bio, setup_complete")
      .eq("username", username)
      .eq("password", password);

    setLoading(true);
    setTimeout(async () => {
      if (!username) {
        setError("Enter your email");
      } else if (!password) {
        setError("Enter your password");
      } else if (error) {
        setError(error.message);
      } else if (data.length === 0) {
        setError("Incorrect username or password");
      } else if (data.length === 1) {
        const user = data[0];
        // console.log("User data:", user);
        setSuccess("Login successful");
        setTimeout(() => {
          setSuccess("");
        }, 2000);

        const setupComplete = user.setup_complete;

        if (setupComplete === false) {
          const userId = user.id;

          const { data, error } = await supabase
            .from("users")
            .update({ setup_complete: true })
            .eq("id", userId);

          if (error) {
            console.error("Error updating setup status:", error);
            return;
          }

          console.log("Setup status updated successfully");

          // Store user data in localStorage
          const userData = JSON.stringify([{ id: userId }]);
          localStorage.setItem("data", userData);

          router.push("/Setup");
        } else if (setupComplete === true) {
          // Store user data in localStorage
          const userData = JSON.stringify([{ id: user.id }]);
          localStorage.setItem("data", userData);

          router.push("/Dashboard");
        }
      } else {
        console.log("Multiple users found with the same username and password");
      }

      setLoading(false);
    }, 1000);
  };

  function handleSubmit() {
    setError("");
    logIn();
  }

  return (
    <div className="font-abc">
      <Navbar />
      <h1 className="text-black text-3xl flex justify-center">Log in</h1>

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

      <div className="w-[450px] md:w-2/4 text-sm lg:w-4/12 rounded-xl m-auto p-14 mt-2">
        <div className="flex flex-col mt-3 ">
          <input
            type="text"
            className="placeholder-black focus:outline-none focus:border-blue-700 border border-gray-400 rounded-md py-3 px-4 block w-full"
            placeholder="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

          <div className="mt-5">
            <input
              type="password"
              className="placeholder-black focus:outline-none focus:border-blue-700 border border-gray-400 rounded-md py-3 px-4 block w-full mt-3"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mt-5 justify-center items-center flex">
          <GradientBorder>
            <button
              className="px-14 lg:px-32 md:px-20 py-3 bg-transparent text-white text-base rounded-full"
              onClick={handleSubmit}
            >
              {loading ? <LoadingSpinner /> : <p>LOG IN</p>}
            </button>
          </GradientBorder>
        </div>
      </div>
    </div>
  );
};

export default Login;
