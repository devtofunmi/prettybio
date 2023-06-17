import React from "react";

const HomeGradientBorder = ({ children }) => {
  return (
    <div
      className="rounded-md p-0.5 fit-content flex items-center justify-center w-fit"
      style={{
        background:
          "linear-gradient(275.79deg, #93c3c4  5.39%,#f2cfad   70.00%)",
      }}
    >
      <div className=" rounded-full flex items-center">{children}</div>
    </div>
  );
};

export default HomeGradientBorder;
