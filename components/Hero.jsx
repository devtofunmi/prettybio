import React from "react";
import UserInput from "./UserInput.jsx";

const Hero = () => {
  return (
    <div className="mt-20">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-abc font-bold mx-auto text-center">
        Plenty links <br /> is s*#t
      </h1>
      <UserInput />
      <p className="px-[30px] text-[18px] md:text-lg mt-6 text-center">
        Effortlessly share all your online links in one place
      </p>
    </div>
  );
};

export default Hero;
