import Link from "next/link";
import React from "react";
import GradientBorder from "./GradientBorder";

const UserInput = () => {
  return (
    <div
      data-aos="fade-up-right"
      className="my-10 flex w-full justify-center items-center m-auto"
    >
      <div className="flex items-center text-black justify-center w-full  md:w-[500px] lg:w-1/2  px-5  my-auto mx-auto text-sm  lg:text-lg rounded-md mt-10">
        <GradientBorder>
          <div className="flex items-center bg-white ml-1 pl-2 md:py-1 xm:text-[10px]  text-sm rounded-full">
            <p className="py-3  text-[12px] md:text-base lg:text-xl ">
              prettybio.com/
            </p>
            <input
              type="text"
              placeholder="yourname"
              className="h-[2rem] md:h-[3rem] rounded-full  outline-none w-[50%] md:w-[60%] lg:w-[70%] text-[10px] lg:text-base bg-transparent px-0 md:px-0"
            />
          </div>
          <Link href="/Signup">
            <button className="text-[12px] w-[100px] md:w-full md:text-base  py-2 lg:px-4 px-0 rounded-sm">
              Claim my bio
            </button>
          </Link>
        </GradientBorder>
      </div>
    </div>
  );
};

export default UserInput;
