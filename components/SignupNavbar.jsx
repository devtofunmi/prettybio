import Link from "next/link";
import React from "react";
import GradientBorder from "./GradientBorder";

const SignupNavbar = () => {
  return (
    <div className="flex items-center justify-between p-4 lg:p-8">
      <div>
        <Link href="/">
          <h2 className="text-2xl lg:text-3xl">PrettyBio</h2>
        </Link>
      </div>
      <div>
        <GradientBorder>
          <Link href="/Login">
            <button className="bg-transparent text-sm lg:text-lg px-8 py-2 text-white">
              Log in
            </button>
          </Link>
        </GradientBorder>
      </div>
    </div>
  );
};

export default SignupNavbar;
