import React, { useState } from "react";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import GradientBorder from "../../components/GradientBorder";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../../context/UserContext";
import api from "../../lib/api";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { refetchUser } = useUser();

  const router = useRouter();

  const validateForm = () => {
    if (!username || !password) {
      toast.error("Username and password are required.");
      return false;
    }
    return true;
  };

  type TokenPayload = {
    sub: string;
    exp: number;
  };

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }
  
    const loginPromise = api.post("/auth/login", {
      username,
      password,
    }).then((res) => {
      const { accessToken } = res.data;
  
      if (
        !accessToken ||
        typeof accessToken !== "string" ||
        accessToken.split(".").length !== 3
      ) {
        throw new Error("Received malformed or missing access token.");
      }
  
      let decoded: TokenPayload;
      try {
        decoded = jwtDecode(accessToken);
      } catch (err) {
        throw new Error("Failed to decode access token.");
      }
  
      const userId = decoded.sub;
      if (!userId) {
        throw new Error("User ID not found in token.");
      }
  
      localStorage.setItem("accessToken", accessToken);
  
      return { accessToken, userId };
    });
  
    toast
      .promise(loginPromise, {
        loading: "Logging in...",
        success: "Login successful! Redirecting...",
        error: (err) => err.message || "Login failed. Please try again.",
      })
      .then(async ({ accessToken }) => {
        try {
          //  Call refetchUser to update context before routing
          await refetchUser();
  
          // Optional: If needed, re-fetch or rely on context
          const profileRes = await api.get(`/account`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
  
          const user = profileRes.data.user;
  
          setTimeout(() => {
            if (!user?.setup_complete) {
              router.push("/authentication/Setup");
            } else {
              router.push("/dashboard");
            }
          }, 1500);
        } catch (err) {
          toast.error("Failed to fetch user profile.");
          console.error("Fetch profile error:", err);
        }
      });
  };
  
  
  const handleSubmit = () => {
    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      handleLogin();
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
          src="/assets/linkbio.png"
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




