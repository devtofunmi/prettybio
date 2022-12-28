import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import GradientBorder from "./GradientBorder";
import Links from "./Links";
const AddLinkModal = ({ showModal, closeModal }) => {
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [links, setLinks] = useState([]);

  const handleSubmit = () => {
    if (!linkName) {
      setErrorMessage("Enter link name");
    } else if (!linkUrl) {
      setErrorMessage("Enter link url");
    } else {
      closeModal();
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 1000);
  };

  return (
    <>
      <div
        className={`fixed w-full h-full top-0 left-0 backdrop-blur-sm items-center z-50 ${
          showModal ? "flex" : "hidden"
        }`}
      >
        <div className="w-4/5 md:w-2/4   lg:w-2/5  rounded-xl bg-white  m-auto p-14  mt-40">
          <div className="flex justify-between items-center text-base lg:text-xl md:text-sm">
            <h1>Add Link</h1>
            <div>
              <button onClick={() => closeModal()}>
                <MdOutlineClose />
              </button>
            </div>
          </div>
          <div className="text-red-700">
            {errorMessage ? <p>{errorMessage}</p> : null}
          </div>
          <input
            onChange={(e) => {
              setLinkName(e.target.value);
            }}
            type="text"
            className="placeholder-black focus:outline-none  focus:border-blue-700  border border-gray-400 rounded-md py-2 px-4 block w-full mt-5"
            placeholder="Link Name"
          />

          <div className="mt-4">
            <input
              onChange={(e) => {
                setLinkUrl(e.target.value);
              }}
              type="text"
              className="placeholder-black focus:outline-none  focus:border-blue-700  border border-gray-400 rounded-md py-2 px-4 block w-full"
              placeholder="link url(https://twitter.com/yourname)"
            />
          </div>
          <div className="mt-5 justify-center items-center flex ">
            <Link href="/Dashboard">
              <GradientBorder>
                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="px-20  lg:px-32 md:px-20 py-2 text-center justify-center text-white text-xl rounded-full bo focus:border-blue-700 "
                >
                  SAVE
                </button>
              </GradientBorder>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLinkModal;
