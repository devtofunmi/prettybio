import React, { useEffect, useState } from "react";
import GradientBorder from "../components/GradientBorder";
import AddLinkModal from "./AddLinkModal";
import LinkDisplay from "./LinkDisplay";
const Links = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="mt-5 lg:mt-0 md:mt-0">
      <AddLinkModal closeModal={closeModal} showModal={showModal} />
      <div className="flex justify-center">
        <GradientBorder>
          <button
            className="text-xl text-white px-10"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            Add Link
          </button>
        </GradientBorder>
      </div>

      <div className="mt-5 ">
        {LinkDisplay.map((data) => (
          <div className="bg-gray-200 my-5 p-6">
            <h1>{data.linkName}</h1>
            <p>{data.linkUrl}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
