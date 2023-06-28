import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import HomeGradientBorder from "./HomeGradientBorder";

const UserInput = () => {
   const { systemTheme, theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
     setMounted(true);
   }, []);

   if (!mounted) return null;
   const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div
      data-aos="fade-up-right"
      className="my-10 flex w-full justify-center items-center m-auto"
    >
      <div className="flex items-center text-btntext  justify-center w-full  md:w-[500px] lg:w-1/2  px-5  my-auto mx-auto text-sm  lg:text-lg rounded-md mt-10">
        <HomeGradientBorder>
          <div
            className={`${
              currentTheme === "dark"
                ? "bg-[#0c0c0c] text-text"
                : "bg-[#f8f8f8] text-black"
            } flex items-center  ml-1 pl-2 md:my-[2px] xm:text-[10px]  text-sm`}
          >
            <p className="py-3  text-[12px] md:text-base lg:text-xl ">
              prettybio.com/
            </p>
            <input
              type="text"
              placeholder="yourname"
              className={`${
                currentTheme === "dark"
                  ? "h-[2rem] md:h-[3rem] rounded-full  outline-none w-[50%] md:w-[60%] lg:w-[70%] text-[10px] lg:text-base bg-transparent px-0 md:px-0 text-text"
                  : "h-[2rem] md:h-[3rem] rounded-full  outline-none w-[50%] md:w-[60%] lg:w-[70%] text-[10px] lg:text-base bg-transparent px-0 md:px-0 text-black"
              } flex items-center  ml-1 pl-2 md:my-[2px] xm:text-[10px]  text-sm`}
            />
          </div>
          <Link href="/Signup">
            <button className="text-[12px] text-black w-[100px] md:w-full md:text-base  py-2 lg:px-4 px-0 rounded-sm">
              Claim my link
            </button>
          </Link>
        </HomeGradientBorder>
      </div>
    </div>
  );
};

export default UserInput;
