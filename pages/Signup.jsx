import Link from "next/link";
import React from "react";
import GradientBorder from "../components/GradientBorder";
import Navbar from "../components/Navbar";

const Signup = () => {
  return (
    <div className="font-abc">
      <Navbar />
      <h1 className="text-black text-3xl  flex justify-center">Sign up</h1>

      <div className=" w-5/6 md:w-2/4 text-sm  lg:w-4/12 rounded-xl  m-auto p-14  mt-2">
        <div className="flex flex-col mt-3 justify-center ">
          <input
            type="email"
            class="placeholder-black focus:outline-none focus:border-blue-700  border border-gray-400 rounded-md py-2 px-4 block w-full "
            placeholder="Email"
          />

          <div className="mt-5">
            <input
              type="password"
              class="placeholder-black focus:outline-none focus:border-blue-700  border border-gray-400 rounded-md py-2 px-4 block w-full mt-3"
              placeholder="Password"
            />
          </div>

          <div className="mt-5">
            <input
              type="password"
              class="placeholder-black focus:outline-none focus:border-blue-700  border border-gray-400 rounded-md py-2 px-4 block w-full mt-3"
              placeholder="confirm Password"
            />
          </div>
        </div>
        <div className="mt-5 justify-center items-center flex ">
          <Link href="/Otp">
            <GradientBorder>
              <button className=" px-14  lg:px-32 md:px-20 py-2 bg-transparent  text-white text-base rounded-full ">
                SIGN UP
              </button>
            </GradientBorder>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
