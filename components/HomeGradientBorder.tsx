import React, { ReactNode } from "react";

interface GradientBorderProps {
  children: ReactNode;
}

const GradientBorder: React.FC<GradientBorderProps> = ({ children }) => {
  const whiteGradientStyle: React.CSSProperties = {
    background: "linear-gradient(275.79deg, #d758bc  5.39%, #e8588e  70.39%)",
  };

  return (
    <div
      className="p-0.5 fit-content flex items-center justify-center rounded-md w-fit"
      style={whiteGradientStyle}
    >
      <div className="flex items-center">{children}</div>
    </div>
  );
};

export default GradientBorder;

