import Link from "next/link";
import React  from "react";


const SignupNavbar = () => {
  return (
    <div
      className="flex bg-white p-4 lg:p-8 "
    >
      <div>
        <Link href="/">
        <h2 className="text-3xl font-bold text-gray-800">PrettyBio</h2>
        </Link>
      </div>
    
    </div>
  );
};

export default SignupNavbar;
