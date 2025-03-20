import React, { useEffect, useState } from "react";

interface HomeGradientBorderProps {
  children: React.ReactNode;
}

const HomeGradientBorder: React.FC<HomeGradientBorderProps> = ({ children }) => {


  const gradientStyle = {
    background: "linear-gradient(275.79deg, #93c3c4 5.39%, #f2cfad 70.00%)",
  };

  const whiteGradientStyle = {
    background: "linear-gradient(275.79deg, #d758bc 70.0%, #e8588e 30.39%)",
  };

  return (
    <div
      className="rounded-md p-0.5 fit-content flex items-center justify-center w-fit"
      style={gradientStyle} 
    >
      <div className="rounded-full flex items-center">{children}</div>
    </div>
  );
};

export default HomeGradientBorder;

