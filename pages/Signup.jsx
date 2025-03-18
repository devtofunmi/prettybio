import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import GradientBorder from "../components/GradientBorder"; 
import { supabase } from "../supabaseClient";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  const isValidEmail = (value) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const SignUp = async () => {
    
    if (!supabase) {
      console.error("Supabase client is not defined.");
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      
      if (!email) {
        setError("Please enter your email");
      } else if (!isValidEmail(email)) {
        setError("Please enter a valid email address");
      } else if (!username) {
        setError("Please enter your username");
      } else if (!password) {
        setError("Please enter your password");
      } else if (password.length < 6) {
        setError("Password must be at least 6 characters long");
      } else if (!confirmPassword) {
        setError("Please confirm your password");
      } else if (password !== confirmPassword) {
        setError("Password does not match the confirmed password");
      } else {
        try {
          const { data: existingUsernames, error: existingUsernamesError } =
            await supabase.from("users").select().eq("username", username);

          const { data: existingEmails, error: existingEmailsError } =
            await supabase.from("users").select().eq("email", email);

          if (existingUsernamesError || existingEmailsError) {
            setError("Error checking existing usernames and emails");
          } else if (existingUsernames.length > 0) {
            setError("Username is already registered");
          } else if (existingEmails.length > 0) {
            setError("Email is already registered");
          } else {
            const { data: insertedData, error: insertError } = await supabase
              .from("users")
              .insert({
                email: email,
                username: username,
                password: password,
              });

            if (insertError) {
              setError(insertError.message);
            } else {
              setSuccess("Signup successful");
              setTimeout(() => {
                setSuccess("");
              }, 2000);
              router.push("/Login");
            }
          }
        } catch (error) {
          setError(error.message);
        }
      }

      setLoading(false);
    }, 1000);
  };

  function handleSubmit() {
    setError("");
    SignUp();
  }
  return (
    <div>
       <div className="absolute top-2 left-5">
          <Navbar />
      </div>
    <div className="min-h-screen bg-white text-gray-900 flex">
      <div className="w-full lg:w-1/2 flex flex-col mt-28 md:mt-10 items-center px-8">
        {error && (
          <div className="flex justify-center w-full max-w-md m-auto rounded-lg items-center bg-red-500 text-white p-2 mb-5">
            <p className="flex-1">{error}</p>
            <button className="px-2 py-1" onClick={() => setError("")}>
              X
            </button>
          </div>
        )}

        {success && (
          <div className="flex justify-center w-full max-w-md m-auto rounded-lg items-center bg-green-500 text-white p-2 mb-5">
            <p>{success}</p>
          </div>
        )}
        

        <h1 className="text-4xl font-bold text-gray-900 mt-0 md:mt-16">Join PrettyBio</h1>
        <p className="text-gray-600 mt-3">Sign up for free!</p>

        <div className="w-full max-w-md mt-5">
          <input
            autoComplete="off"
            type="email"
            className="bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full text-black"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            autoComplete="off"
            type="text"
            className="bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full mt-5 text-black"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            autoComplete="off"
            type="password"
            className="bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full mt-5 text-black"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            autoComplete="off"
            type="password"
            className="bg-transparent focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full mt-5 text-black"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="mt-5 w-full">
            <GradientBorder>
              <button
                className="w-full px-24 py-4 bg-transparent text-gray-800 font-bold text-base"
                onClick={handleSubmit}
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
    </div>
  );
};

export default Signup;
