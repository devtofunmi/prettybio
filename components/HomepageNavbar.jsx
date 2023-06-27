import React, { useEffect, useState } from "react";
import Link from "next/link";
import GradientBorder from "./GradientBorder";
import { useTheme } from "next-themes";

const HomepageNavbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div
      className={`text ${
        currentTheme === "dark" ? "text" : "black"
      } flex items-center justify-between p-4 lg:p-8 font-abc mt-3 md:mt-0`}
    >
      <div>
        <Link href="/">
          <h2 className="text-2xl lg:text-3xl">
            PrettyBio
          </h2>
        </Link>
      </div>
      <div className="flex items-center justify-center">
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
