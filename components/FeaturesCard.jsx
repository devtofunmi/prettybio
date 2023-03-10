import React from "react";
import FeaturesItem from "./FeaturesItem";

const FeaturesCard = () => {
  return (
    <div className="flex flex-col  items-center mt-20 px-10 lg:px-20">
      {FeaturesItem.map((card, i) => (
        <div
          className={`flex flex-col lg:flex-row ${
            card.isInverted
              ? "flex-row-reverse lg:flex-row-reverse"
              : "flex-row"
          }`}
        >
          <div className="flex flex-col mt-28 w-full lg:w-5/6">
            <div className="text-5xl lg:text-6xl">{card.heading}</div>
            <div className=" mt-8 text-xl">{card.subheading}</div>
          </div>
          <div className="w-5/6">{card.image}</div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesCard;
