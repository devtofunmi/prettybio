import Link from "next/link";
import React from "react";
import GradientBorder from "./GradientBorder";

const UserInput = () => {
  return (
    <div className="flex items-center text-black justify-center w-full  md:w-4/5 lg:w-1/2  mx-auto my-auto text-sm  lg:text-lg rounded-md mt-10">
      <GradientBorder>
        <div className="flex items-center bg-white ml-1 pl-2  text-sm rounded-full">
          <p>prettybio.com/</p>
          <input
            type="text"
            placeholder="your name"
            className="py-2 bg-transparent outline-none"
          />
        </div>
        <Link href="/Signup">
          <button
            className="py-2 h-full px-2 text-white  rounded-full text-sm lg:text-base"
            //   style={{
            //     background:
            //       "linear-gradient(275.79deg,#06ffa8 5.39%,#ffeb3c 31.4%,#febb3f 70.92%,#c95afd 99.68%)",
            //   }}
          >
            Claim my bio
          </button>
        </Link>
      </GradientBorder>
    </div>
  );
};

export default UserInput;
