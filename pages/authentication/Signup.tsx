import React, { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../supabaseClient";
import GradientBorder from "../../components/GradientBorder";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner";
import Image from "next/image";
import Link from "next/link";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const isValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setError("Please enter your email.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      isValid = false;
    } else if (!username) {
      setError("Please enter your username.");
      isValid = false;
    } else if (!password) {
      setError("Please enter your password.");
      isValid = false;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      isValid = false;
    } else if (!confirmPassword) {
      setError("Please confirm your password.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
      isValid = false;
    } else {
      setError("");
    }

    return isValid;
  };

  const SignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const { data: existingUsernames, error: existingUsernamesError } =
        await supabase.from("users").select().eq("username", username);

      const { data: existingEmails, error: existingEmailsError } =
        await supabase.from("users").select().eq("email", email);

      if (existingUsernamesError || existingEmailsError) {
        setError("Error checking existing usernames and emails.");
      } else if (existingUsernames.length > 0) {
        setError("Username is already registered.");
      } else if (existingEmails.length > 0) {
        setError("Email is already registered.");
      } else {
        const { error: insertError } = await supabase
          .from("users")
          .insert({
            email: email,
            username: username,
            password: password,
          });

        if (insertError) {
          setError(insertError.message);
        } else {
          setSuccess("Signup successful! Redirecting...");
          setTimeout(() => {
            router.push("/Login");
          }, 1500);
        }
      }
    } catch (error: any) {
      setError(error.message);
    }

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
        {success && (
          <div className="w-full max-w-md mb-5 rounded-lg bg-green-100 border-l-4  border-green-400 p-4 text-green-700">
            <p className="flex items-center gap-2">{success}</p>
          </div>
        )}
        {error && (
          <div className="w-full max-w-md mb-5 rounded-lg bg-red-100 border-l-4  border-red-400 p-4 text-red-700">
            <p className="flex items-center gap-2">{error}</p>
          </div>
        )}

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
              <Link href="/Login" className="text-blue-500 hover:underline">
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
