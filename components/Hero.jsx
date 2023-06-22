import React, { useEffect, useState } from "react";
import UserInput from "./UserInput.jsx";
import { useTheme } from "next-themes";

const Hero = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;


  return (
    <div className={`text-${currentTheme === "dark" ? "text" : "black"} mt-20`}>
      <h1
        data-aos="zoom-in"
        className="text-5xl md:text-7xl lg:text-8xl font-abc font-bold mx-auto text-center"
      >
        Plenty links <br /> is s*#t
      </h1>

      <UserInput />
      <p
        data-aos="fade-down"
        className="px-[30px] text-[18px] md:text-lg mt-6 text-center"
      >
        Effortlessly share all your online links in one place
      </p>
    </div>
  );
};

export default Hero;
