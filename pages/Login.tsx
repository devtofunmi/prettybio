import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../supabaseClient";
import GradientBorder from "../components/GradientBorder";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import Image from "next/image";
import Link from "next/link";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const router = useRouter();

  const logIn = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    // Form validation
    if (!username || !password) {
      setError("Please enter both username and password.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("id, image, userlink_name, username, bio, setup_complete")
      .eq("username", username)
      .eq("password", password);

    if (error) {
      setError(error.message);
    } else if (data.length === 0) {
      setError("Incorrect username or password.");
    } else {
      const user = data[0];

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        setSuccess("");
      }, 2000);

      const userData = JSON.stringify([{ id: user.id }]);
      localStorage.setItem("data", userData);

      router.push(user.setup_complete ? "/Dashboard" : "/Setup");
    }

    setLoading(false);
  };

  const handleSubmit = () => {
    logIn();
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900 flex">
      <div className="absolute top-2 left-5">
        <Navbar />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col mt-28 md:mt-10 items-center px-8">
        
        {error && (
          <div className="flex justify-center items-center w-full max-w-md p-4 mb-4 rounded-lg bg-red-100 text-red-700 border border-red-400">
            <p>{error}</p>
            <button className="ml-4 text-sm font-bold" onClick={() => setError("")}>
              ✕
            </button>
          </div>
        )}
        
        {success && (
          <div className="flex justify-center items-center w-full max-w-md p-4 mb-4 rounded-lg bg-green-100 text-green-700 border border-green-400">
            <p>{success}</p>
          </div>
        )}

        <h1 className="text-4xl mt-20 font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600 mt-3">Log in to your account</p>

        <div className="w-full max-w-md mt-5">
          <input
            type="text"
            className="bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full mt-3 text-black"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full mt-5 text-black"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-5 w-full">
            <GradientBorder>
              <button
                className="w-full px-24 py-4 bg-transparent text-gray-800 font-bold text-base"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <LoadingSpinner /> : "LOG IN"}
              </button>
            </GradientBorder>
          </div>


          <div className="mt-5 flex justify-center text-center text-gray-600">
            <p>
              Don’t have an account?{" "}
              <Link href="/Signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>


      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="https://media.istockphoto.com/id/2174175055/photo/a-businessman-use-generative-engine-optimization-on-his-smartphone-to-view-search-results.webp?s=1024x1024&w=is&k=20&c=HCEOpEPqIJq8a0awaQlbKOVu5eFg4TYkhr9hmHYKD0A="
          alt="Login Illustration"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
};

export default Login;

