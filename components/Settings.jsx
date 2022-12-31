import React from "react";
import GradientBorder from "./GradientBorder";

const Settings = () => {
  return (
    <div className="w-full ">
      <div className="lg:w-4/6 w-4/5 md:w-5/6 rounded-xl    p-14  mt-2">
        <div>
          <h1>Accounts</h1>
          <div className="flex items-center border bg-white pl-2 rounded-md mt-3">
            <p>prettybio.com/</p>
            <input
              type="text"
              placeholder="your name"
              className="py-2 bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="mt-4">
          <input
            type="text"
            className="placeholder-black focus:outline-none  focus:border-blue-700  border border-gray-400 rounded-md py-2 px-4 block w-full mt-3"
            placeholder="change Gmail"
          />
        </div>

        <div className="mt-4">
          <input
            type="text"
            className="placeholder-black focus:outline-none  focus:border-blue-700  border border-gray-400 rounded-md py-2 px-4 block w-full mt-3"
            placeholder="change password"
          />
        </div>

        <div className="mt-5 justify-center items-center flex ">
          <GradientBorder>
            <button className=" px-16  lg:px-32 md:px-20 py-2 bg-transparent  text-white text-base rounded-full ">
              SAVE
            </button>
          </GradientBorder>
        </div>
      </div>
    </div>
  );
};

export default Settings;
