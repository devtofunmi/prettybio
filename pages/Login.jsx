import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import GradientBorder from "../components/GradientBorder";
import LoginNavbar from "../components/LoginNavbar";
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
       setSuccess("Login successful");
       setTimeout(() => {
         setSuccess("");
       }, 2000);

       const setupComplete = user.setup_complete;

       if (setupComplete === false) {
         const userId = user.id;

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
      <LoginNavbar />
      {error && (
        <div className="flex justify-center md:w-[300px] w-[200px] m-auto rounded-lg  items-center bg-red-500 text-white p-1 md:text-[15px] text-[12px] mb-5 ">
          <div className="flex justify-between items-center">
            <p>{error}</p>
            <button className="px-2 py-1" onClick={() => setError("")}>
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
      <h1 className="text-text text-3xl flex justify-center">Log in</h1>

      <div className="w-full md:w-2/4 text-sm lg:w-4/12 rounded-xl m-auto p-10 md:p-[14] mt-2">
        <div className="flex flex-col mt-3 ">
          <input
            type="text"
            className="bg-[#202125]  focus:border-[#effbce] text-text border border-gray-400 rounded-md py-4 px-4 block w-full mt-3"
            placeholder="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

          <div className="mt-5">
            <input
              type="password"
              className="bg-[#202125]  focus:border-[#effbce] text-text border border-gray-400 rounded-md py-4 px-4 block w-full mt-3"
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
              className="text-btntext px-14 lg:px-32 md:px-20 py-3 bg-transparent  text-base rounded-full"
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
