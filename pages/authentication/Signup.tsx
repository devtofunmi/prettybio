import React, { useState } from "react";
import { useRouter } from "next/router";
import GradientBorder from "../../components/GradientBorder";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner";
import Image from "next/image";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const isValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validateForm = () => {
    if (!email) {
      toast.error("Please enter your email.");
      return false;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!username) {
      toast.error("Please enter your username.");
      return false;
    }
    if (!password) {
      toast.error("Please enter your password.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    if (!confirmPassword) {
      toast.error("Please confirm your password.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const SignUp = () => {
    if (!validateForm()) return;

    setLoading(true);

    // Simulating an async request (replace with your actual API call)
    const signUpPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("Signup successful!");
      }, 1500);
    });

    toast.promise(signUpPromise, {
      loading: "Signing up...",
      success: () => {
        setTimeout(() => {
          router.push("/authentication/Login");
        }, 2000);
        return "Signup successful! Redirecting...";
      },
      error: "Signup failed. Please try again.",
    });

    setLoading(false);
  };

  const handleSubmit = () => {
    SignUp();
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900 flex">

      
      <div className="absolute top-2 left-5">
        <Navbar />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col mt-28 md:mt-10 items-center px-8">
      <Toaster reverseOrder={false} />

        <h1 className="text-4xl font-bold text-gray-900">Join PrettyBio</h1>
        <p className="text-gray-600 mt-3">Sign up for free!</p>

        <div className="w-full max-w-md mt-5">
        
          <div className="mb-5">
            <input
              type="email"
              className="bg-transparent border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          
          <div className="mb-5">
            <input
              type="text"
              className="bg-transparent border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

        
          <div className="mb-5">
            <input
              type="password"
              className="bg-transparent border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          
          <div className="mb-5">
            <input
              type="password"
              className="bg-transparent border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          
          <div className="mt-5 w-full">
            <GradientBorder>
              <button
                className="w-full px-24 py-4 bg-transparent text-gray-800 hover:text-white font-bold text-base"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <LoadingSpinner /> : "SIGN UP"}
              </button>
            </GradientBorder>
          </div>

          
          <div className="mt-5 flex justify-center text-center text-gray-600">
            <p>
              Already have an account?{" "}
              <Link href="/authentication/Login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      
      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="https://media.istockphoto.com/id/2174175055/photo/a-businessman-use-generative-engine-optimization-on-his-smartphone-to-view-search-results.webp?s=1024x1024&w=is&k=20&c=HCEOpEPqIJq8a0awaQlbKOVu5eFg4TYkhr9hmHYKD0A="
          alt="Signup Illustration"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
};

export default Signup;


