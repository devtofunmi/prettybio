import React, { useRef, useState } from "react";

import GradientBorder from "./GradientBorder";
import { BsCamera } from "react-icons/bs";

const Bio = () => {
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
    <div className="w-full ">
      <div className="lg:w-4/6 w-11/12 md:w-5/6 rounded-xl    p-14  mt-2">
        <div>
          <h1>Bio</h1>
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
          <input
            type="text"
            className="placeholder-black focus:outline-none  focus:border-blue-700  border border-gray-400 rounded-md py-2 px-4 block w-full mt-7"
            placeholder="change Name"
          />
        </div>

        <div className="mt-4">
          <input
            type="text"
            className="placeholder-black focus:outline-none  focus:border-blue-700  border border-gray-400 rounded-md py-2 px-4 block w-full mt-3"
            placeholder="change Bio"
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

export default Bio;
