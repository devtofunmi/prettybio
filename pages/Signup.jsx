import React, { useState } from "react";
import GradientBorder from "../components/GradientBorder";
import Navbar from "../components/Navbar";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/LoadingSpinner";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const SignUp = async () => {
    if (!supabase) {
      console.error("Supabase client is not defined.");
      return;
    }


setLoading(true);
setTimeout(async () => {
  if (!email) {
    setError("Please enter your email");
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
    <div className="font-abc">
      <Navbar />
      <h1 className="text-black text-3xl  flex justify-center">Sign up</h1>

      {error && (
        <div className="fixed top-0 left-0 right-0 items-center bg-red-500 text-white p-4 ">
          <div className="flex justify-between">
            <p>{error}</p>
            <button className=" px-2 py-1" onClick={() => setError("")}>
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

      <div className=" w-[450px] md:w-2/4 text-sm  lg:w-4/12 rounded-xl  m-auto p-14  mt-2">
        <div className="flex flex-col mt-3 justify-center ">
          <input
            type="email"
            className="placeholder-black focus:outline-none focus:border-blue-700  border border-gray-400 rounded-md py-3 px-4 block w-full "
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <div className="mt-5">
            <input
              type="text"
              className="placeholder-black focus:outline-none focus:border-blue-700  border border-gray-400 rounded-md py-3 px-4 block w-full mt-3"
              placeholder="username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>

          <div className="mt-5">
            <input
              type="password"
              className="placeholder-black focus:outline-none focus:border-blue-700  border border-gray-400 rounded-md py-3 px-4 block w-full mt-3"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="mt-5">
            <input
              type="password"
              className="placeholder-black focus:outline-none focus:border-blue-700  border border-gray-400 rounded-md py-3 px-4 block w-full mt-3"
              placeholder="confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mt-5 justify-center items-center flex ">
          <GradientBorder>
            <button
              className=" px-14  lg:px-32 md:px-20 py-2 bg-transparent  text-white text-base rounded-full "
              onClick={handleSubmit}
            >
              {loading ? <LoadingSpinner /> : <p>SIGN UP </p>}
            </button>
          </GradientBorder>
        </div>
      </div>
    </div>
  );
};

export default Signup;
