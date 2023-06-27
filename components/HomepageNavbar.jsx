import React, { useEffect, useState } from "react";
import Link from "next/link";
import GradientBorder from "./GradientBorder";
import { useTheme } from "next-themes";
import Image from "next/image";


const HomepageNavbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <div
      className={`text ${
        currentTheme === "dark" ? "text" : "black"
      } flex items-center justify-between p-4 lg:p-8 font-abc mt-3 md:mt-0`}
    >
      <div>
        <Link href="/">
          <h2 className="text-[20px] md:text-3xl">PrettyBio</h2>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <div>
          <button
            className={`bg-${
              currentTheme === "dark" ? "black" : "gray"
            }-700 hover:bg-${
              currentTheme === "dark" ? "white" : "gray"
            } w-[15px] md:w-[20px] rounded-md`}
            onClick={toggleTheme}
          >
            <Image
              src={`/assets/${currentTheme === "dark" ? "sun" : "moon"}.svg`}
              alt="logo"
              height={20}
              width={20}
            />
          </button>
        </div>
        <div>
          <Link href="/Login">
            <button className="bg-transparent rounded-full text-sm lg:text-lg px-1 lg:px-4 py-2 ">
              Login
            </button>
          </Link>
        </div>
        <GradientBorder>
          <Link href="/Signup">
            <button className="bg-transparent rounded-full text-sm lg:text-lg px-1 lg:px-4 py-2 text-btntext ">
              Sign up
            </button>
          </Link>
        </GradientBorder>
      </div>
    </div>
  );
};

export default HomepageNavbar;
