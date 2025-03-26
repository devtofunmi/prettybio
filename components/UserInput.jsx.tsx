import Link from "next/link";
import React, { useEffect, useState, FC } from "react";
import HomeGradientBorder from "./HomeGradientBorder";

const UserInput: FC = () => {


  return (
    <div className="my-10">
      <div
        data-aos="fade-up-right"
        className="flex w-full justify-center items-center m-auto"
      >
        <div className="flex items-center text-btntext justify-center w-full md:w-[500px] lg:w-1/2 px-5 my-auto mx-auto text-sm lg:text-lg rounded-md mt-10">
          <HomeGradientBorder>
            <div className="bg-[#f8f8f8] text-gray-800 flex items-center ml-1 pl-2 md:my-[2px] xm:text-[10px] text-sm">
              <p className="py-3 md:text-base lg:text-xl">
                prettybio.com/
              </p>
              <input
                autoComplete="off"
                type="text"
                placeholder="yourname"
                className="h-[2rem] md:h-[3rem] text-gray-800 rounded-full outline-none w-[50%] md:w-[60%] lg:w-[70%] text-[10px] lg:text-base bg-transparent px-0 md:px-0 text-black flex items-center ml-1 pl-2 md:my-[2px] xm:text-[10px] text-sm"
              />
            </div>
            <Link href="/Signup">
              <button className="text-[12px] text-gray-800 w-[100px] md:w-full md:text-base py-2 lg:px-4 px-0 rounded-sm">
                Claim my link
              </button>
            </Link>
          </HomeGradientBorder>
        </div>
      </div>
      <p className="text-center mt-5 text-gray-600">
        It’s free and takes just a minute to get started.
      </p>
    </div>
  );
};

export default UserInput;

