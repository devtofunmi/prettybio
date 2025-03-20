import Link from "next/link";
import React, { FC } from "react";

const Navbar: FC = () => {
  return (
    <div className="flex bg-white">
      <div>
        <Link href="/">
          <h2 className="text-2xl font-bold text-gray-800">PrettyBio</h2>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
