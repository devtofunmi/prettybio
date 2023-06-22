import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import FeaturesItem from "./FeaturesItem";

const FeaturesCard = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;
  
  return (
    <div className={`text-${currentTheme === "dark" ? "text" : "black"} mt-20 flex flex-col  items-center px-5 md:px-10`}
    
    >
      {FeaturesItem.map((card, i) => (
        <div
          className={`flex flex-col lg:flex-row ${
            card.isInverted
              ? "flex-row-reverse lg:flex-row-reverse"
              : "flex-row"
          }`}
          key={i}
        >
          <div
            data-aos="zoom-in-right"
            className="flex flex-col mt-28 w-full lg:w-5/6"
          >
            <div className="text-4xl md:text-6xl">{card.heading}</div>
            <div className=" mt-8 text-xl">{card.subheading}</div>
          </div>
          <div data-aos="zoom-in-left" className="w-5/6">
            {card.image}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesCard;
