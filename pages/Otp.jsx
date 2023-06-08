import Link from "next/link";
import React from "react";
import GradientBorder from "../components/GradientBorder";
import Otpp from "../components/Otpp";
// import Navbar from "../components/Navbar";

const Otp = () => {
  return (
    <div className="font-abc">
      {/* <Navbar /> */}
      <div className="text-black flex flex-col text-center justify-center">
        <h1 className=" text-3xl">ENTER YOUR OTP</h1>
        <p className="mt-2">Pls enter the otp we send to your email</p>
      </div>

      <div className=" w-5/6 md:w-2/4 text-sm  lg:w-4/12 rounded-xl  m-auto p-14 ">
        <div className="flex flex-col mt-3 justify-center items-center ">
          <Otpp />
        </div>
        <div className="mt-5 justify-center items-center flex flex-col ">
          <Link href="/Login">
            <GradientBorder>
              <button className=" px-14  lg:px-32 md:px-20 py-2 bg-transparent  text-white text-base rounded-full ">
                Enter
              </button>
            </GradientBorder>
          </Link>
          <p className="mt-3">Dont receive the OTP? RESEND</p>
        </div>
      </div>
    </div>
  );
};

export default Otp;
