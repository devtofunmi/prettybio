import React, { useState } from "react";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import GradientBorder from "../../components/GradientBorder";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner";
import Image from "next/image";
import Link from "next/link";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const validateForm = () => {
    if (!username || !password) {
      toast.error("Username and password are required.");
      return false;
    }
    return true;
  };

  const mockLogin = () => {
    const mockUser = {
      id: "1",
      username: "tofunmi",
      password: "123456",
      setup_complete: true,
    };

    if (username === mockUser.username && password === mockUser.password) {
      toast.success("Login successful! Redirecting...");

      const userData = JSON.stringify([{ id: mockUser.id }]);
      localStorage.setItem("data", userData);

      setTimeout(() => {
        router.push(mockUser.setup_complete ? "/dashboard" : "/authentication/Setup");
      }, 1500);
    } else {
      toast.error("Incorrect username or password.");
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      mockLogin();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900 flex">
      <Toaster />
      <div className="absolute top-2 left-5">
        <Navbar />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col mt-28 md:mt-10 items-center px-8">
        <h1 className="text-4xl font-bold text-gray-900 mt-0 md:mt-20">
          Welcome back!
        </h1>
        <p className="text-gray-600 mt-3">Log in to your account</p>

        <div className="w-full max-w-md mt-5">
          <div className="mb-5">
            <input
              type="text"
              className="bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <input
              type="password"
              className="bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full">
            <GradientBorder>
              <button
                className="w-full hover:text-white px-24 py-4 bg-transparent text-gray-800 font-bold text-base"
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
              <Link href="/authentication/Signup" className="text-blue-500 hover:underline">
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




