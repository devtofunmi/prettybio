import Link from "next/link";
import React from "react";
import GradientBorder from "./GradientBorder";

const DashBoardNav = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0">
      <div>
        <Link href="/">
          <h2 className="text-3xl">PrettyBio</h2>
        </Link>
      </div>

      <GradientBorder>
        <div className="w-10 h-10 rounded-full">
          <img src={"./assets/blur.png"} alt="features image" />
        </div>
      </GradientBorder>
    </div>
  );
};

export default DashBoardNav;
