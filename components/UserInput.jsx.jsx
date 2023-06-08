import Link from "next/link";
import React from "react";
import GradientBorder from "./GradientBorder";

const UserInput = () => {
  return (
    <div className="flex items-center text-black justify-center w-full  md:w-[500px] lg:w-1/2  px-5  my-auto mx-auto text-sm  lg:text-lg rounded-md mt-10">
      <GradientBorder>
        <div className="flex items-center bg-white ml-1 pl-2 xm:text-[10px]  text-sm rounded-full">
          <p>prettybio.com/</p>
          <input
            type="text"
            placeholder="your name"
            className="py-2 px-0 bg-transparent outline-none xm:w-[80px w-[100px] md:w-[150px]"
          />
        </div>
        <Link href="/Signup">
          <button
            className="py-2 h-full px-0 w-[120px] md:w-[150px] text-white  rounded-full text-sm lg:text-base"
          
          >
            Claim my bio
          </button>
        </Link>
      </GradientBorder>
    </div>
  );
};

export default UserInput;
