import React from 'react'
import { MdOutlineClose } from "react-icons/md";

const ShareLinkModal = ({ shareModal, closeModal }) => {
  return (
    <div>
      <div
        className={`fixed w-full h-full top-0 left-0 backdrop-blur-sm items-center z-50 ${
          shareModal ? "flex" : "hidden"
        }`}
      >
        <div className="w-4/5 md:w-2/4   lg:w-[40%]  rounded-xl bg-white  m-auto p-8  mt-40">
          <div className="flex justify-end">
            <button onClick={() => closeModal()}>
              <MdOutlineClose className='text-[20px] hover:bg-gray-200' />
            </button>
          </div>
          <div>
            <p className="text-center text-[18px] md:text-[20px] mt-3 ">Share this Bio Link</p>
            <div>
              <p className="bg-gray-200 my-5 p-5 rounded-xl cursor-pointer hover:bg-pink-500 hover:text-white  text-center">
                Share on Twitter
              </p>
              <p className="bg-gray-200 my-5 p-5 rounded-xl cursor-pointer hover:bg-pink-500 hover:text-white  text-center">
                Share on Facebook
              </p>
              <p className="bg-gray-200 my-5 p-5 rounded-xl cursor-pointer hover:bg-pink-500 hover:text-white  text-center">
                Share via Email
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareLinkModal