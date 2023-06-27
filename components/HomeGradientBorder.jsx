import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const HomeGradientBorder = ({ children }) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  const gradientStyle = {
    background: "linear-gradient(275.79deg, #93c3c4 5.39%, #f2cfad 70.00%)",
  };
  const whiteGradientStyle = {
    background: "linear-gradient(275.79deg, #d758bc  70.0%, #e8588e  30.39%)",
  };

  return (
    <div
      className={`style ${
        currentTheme === "dark" ? "dark" : "light"
      } rounded-md p-0.5 fit-content flex items-center justify-center w-fit`}
      style={currentTheme === "dark" ? gradientStyle : whiteGradientStyle}
    >
      <div className="rounded-full flex items-center">{children}</div>
    </div>
  );
};

export default HomeGradientBorder;
