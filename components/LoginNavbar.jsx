import Link from "next/link";
import React from "react";
import GradientBorder from "./GradientBorder";

const LoginNavbar = () => {
  return (
    <div className="flex items-center justify-between p-4 lg:p-8">
      <div>
        <Link href="/">
          <h2 className="text-2xl lg:text-3xl">PrettyBio</h2>
        </Link>
      </div>
      <div>
        <GradientBorder>
          <Link href="/Signup">
            <button className="bg-white rounded-full text-sm lg:text-lg px-6 lg:px-4 py-2 ">
              Sign up
            </button>
          </Link>
        </GradientBorder>
      </div>
    </div>
  );
};

export default LoginNavbar;
