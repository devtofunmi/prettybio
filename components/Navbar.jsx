import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-between align-middle bg-white w-10/12 rounded-full py-3 mt-6 px-5 text-black text-3xl">
        <div>PrettyBio</div>
        <div className="text-xl space-x-5">
          <button>Log in</button>
          <button>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
