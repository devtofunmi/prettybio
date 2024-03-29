import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import GradientBorder from "../components/GradientBorder";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/LoadingSpinner";
import SignupNavbar from "../components/SignupNavbar";

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
    <div className="font-abc">
      <SignupNavbar />
      {error && (
        <div className="flex justify-center md:w-[300px] w-[200px] m-auto rounded-lg  items-center bg-red-500 text-white p-1 md:text-[15px] text-[12px] mb-5 ">
          <div className="flex justify-between items-center">
            <p>{error}</p>
            <button className=" px-2 py-1" onClick={() => setError("")}>
              X
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="flex justify-center md:w-[300px] w-[200px] m-auto rounded-lg  items-center bg-green-500 text-white p-1 md:text-[15px] text-[12px] mb-5 ">
          <div className="text-center">
            <p>{success}</p>
          </div>
        </div>
      )}

      <h1
        className={`${
          currentTheme === "dark"
            ? "text-text text-3xl flex justify-center"
            : "text-black text-3xl flex justify-center"
        }`}
      >
        Sign up
      </h1>

      <div className=" w-full md:w-2/4 text-sm  lg:w-4/12 rounded-xl  m-auto p-10 md:p-[14]  mt-2">
        <div className="flex flex-col mt-3 justify-center ">
          <input
          autocomplete="off"
            type="email"
            className={`${
              currentTheme === "dark"
                ? "bg-[#202125]  focus:border-[#effbce] text-text border border-gray-400 rounded-md py-4 px-4 block w-full mt-3"
                : "bg-transparent  focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full mt-3 text-black"
            }`}
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <div className="mt-5">
            <input
            autocomplete="off"
              type="text"
              className={`${
                currentTheme === "dark"
                  ? "bg-[#202125]  focus:border-[#effbce] text-text border border-gray-400 rounded-md py-4 px-4 block w-full mt-3"
                  : "bg-transparent  focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full mt-3 text-black"
              }`}
              placeholder="username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>

          <div className="mt-5">
            <input
            autocomplete="off"
              type="password"
              className={`${
                currentTheme === "dark"
                  ? "bg-[#202125]  focus:border-[#effbce] text-text border border-gray-400 rounded-md py-4 px-4 block w-full mt-3"
                  : "bg-transparent  focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full mt-3 text-black"
              }`}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="mt-5">
            <input
            autocomplete="off"
              type="password"
              className={`${
                currentTheme === "dark"
                  ? "bg-[#202125]  focus:border-[#effbce] text-text border border-gray-400 rounded-md py-4 px-4 block w-full mt-3"
                  : "bg-transparent  focus:border-[#effbce] border border-gray-400 rounded-md py-4 px-4 block w-full mt-3 text-black"
              }`}
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
              className={`${
                currentTheme === "dark"
                  ? "px-14  lg:px-32 md:px-20 py-2 bg-transparent  text-btntext text-base rounded-full"
                  : "px-14  lg:px-32 md:px-20 py-2 bg-transparent  text-black text-base rounded-full"
              }`}
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
