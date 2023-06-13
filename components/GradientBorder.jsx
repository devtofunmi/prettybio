import React from "react";

const GradientBorder = ({ children }) => {
  return (
    <div
      className="rounded-full p-0.5 fit-content flex items-center justify-center w-fit"
      style={{
        background:
          "linear-gradient(275.79deg, #e3d4ff  5.39%,#effbce   70.00%)",
      }}
    >
      <div className=" rounded-full flex items-center">{children}</div>
    </div>
  );
};

export default GradientBorder;
