import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import GradientBorder from "./GradientBorder";

const SignupNavbar = () => {
   const { systemTheme, theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
     setMounted(true);
   }, []);

   if (!mounted) return null;
   const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <div
      className={`${
        currentTheme === "dark"
          ? "flex items-center justify-between p-4 lg:p-8 text-text"
          : "flex items-center justify-between p-4 lg:p-8 text-black"
      }`}
    >
      <div>
        <Link href="/">
          <h2 className="text-2xl lg:text-3xl">PrettyBio</h2>
        </Link>
      </div>
      <div>
        <GradientBorder>
          <Link href="/Login">
            <button
              className={`${
                currentTheme === "dark"
                  ? "bg-transparent text-sm lg:text-lg px-8 py-2 text-btntext"
                  : "bg-transparent text-sm lg:text-lg px-8 py-2 text-black"
              }`}
            
            >
              Log in
            </button>
          </Link>
        </GradientBorder>
      </div>
    </div>
  );
};

export default SignupNavbar;
