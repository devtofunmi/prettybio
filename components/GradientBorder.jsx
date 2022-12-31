import React from "react";

const GradientBorder = ({ children }) => {
  return (
    <div
      className="rounded-full p-0.5 fit-content flex items-center justify-center w-fit"
      style={{
        background: "linear-gradient(275.79deg,#d83c8d 5.39%,#e51bde   80.00%)",
      }}
    >
      <div className=" rounded-full flex items-center">{children}</div>
    </div>
  );
};

export default GradientBorder;
