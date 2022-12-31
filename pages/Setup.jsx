import Link from "next/link";
import React, { useRef, useState } from "react";

import { BsCamera } from "react-icons/bs";
import DashBoardNav from "../components/DashBoardNav";
import GradientBorder from "../components/GradientBorder";
const Setup = () => {
  const [image, setImage] = useState("");
  const fileInputRef = useRef(null);
  function uploadImage(e) {
    setImage(e.target.files[0]);
    console.log(e.target.files);
  }
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="font-abc">
      <Link href="/">
        <div className="text-3xl p-8">PrettyBio</div>
      </Link>
      <div className="text-center">
        <h1 className="text-3xl">Setup your page</h1>
      </div>

      <div className=" w-11/12 md:w-2/4   lg:w-4/12 rounded-xl  m-auto p-14  mt-2">
        <div className="flex flex-col mt-3 justify-center">
          <div className=" w-28 h-28 m-auto border-8 border-pink-500  border-dotted rounded-full flex justify-center">
            <div className=" text-3xl  flex justify-center">
              <button className="cursor-pointer" onClick={handleButtonClick}>
                <BsCamera />
              </button>
            </div>
            <div className="hidden">
              <input type="file" ref={fileInputRef} onChange={uploadImage} />
            </div>
          </div>
          <div className="flex flex-col mt-7 text-sm ">
            <input
              type="password"
              class="placeholder-black focus:outline-none focus:border-blue-700  border border-gray-400 rounded-md py-2 px-4 block w-full"
              placeholder="Name"
            />
            <div className="flex text-sm items-center text-black bg-white mt-5 border pl-4 rounded-md ">
              <p>prettybio.com/</p>
              <input
                type="text"
                placeholder="your name"
                className="py-2 bg-transparent outline-none "
              />
            </div>

            <div className="mt-5">
              <input
                type="password"
                class="placeholder-black focus:outline-none focus:border-blue-700  border border-gray-400 rounded-md py-2 px-4 block w-full"
                placeholder="Bio"
              />
            </div>
          </div>
          <div className="mt-5 justify-center items-center flex ">
            <Link href="/Dashboard">
              <GradientBorder>
                <button className=" px-14  lg:px-32 md:px-20 py-2 bg-transparent  text-white text-base rounded-full ">
                  Continue
                </button>
              </GradientBorder>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;
