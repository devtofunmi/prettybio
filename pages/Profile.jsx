import React, { useState } from 'react'
import ProfileLinks from '../components/ProfileLinks';
import GradientBorder from '../components/GradientBorder';
import ShareLinkModal from '../components/ShareLinkModal';
import { GrShare } from "react-icons/gr";
import Image from 'next/image';

const Profile = () => {
    const [shareModal, setShareModal] = useState(false);

    const closeModal = () => {
      setShareModal(false);
    };
  return (
    <div className=" w-[80%]md:w-[60%] text-sm  lg:w-[50%] rounded-xl  m-auto p-8  mt-2 font-abc ">
      <ShareLinkModal closeModal={closeModal} shareModal={shareModal} />

      <div className="flex justify-start">
        <button
          className="text-xl text-whi px-10"
          onClick={() => {
            setShareModal(!shareModal);
          }}
        >
          <div>
            <GrShare className="text-[15px] md:text-[20px] hover:bg-gray-200 " />
          </div>
        </button>
      </div>
      <div className="flex flex-col items-center mt-5 md:mt-0">
        <GradientBorder>
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full">
            <Image
              src={"/assets/blur.png"}
              alt="features image"
              width={500}
              height={500}
            />
          </div>
        </GradientBorder>

        <h1 className="text-[20px] my-2 md:my-3">Tofunmi</h1>
        <p className="text-[15px]">Frontend Developer</p>
      </div>

      <div className="mt-5 ">
        {ProfileLinks.map((data, k) => (
          <div
            className="bg-gray-200 my-5 p-5 rounded-xl cursor-pointer hover:bg-pink-500 hover:text-white  text-center"
            key={k}
          >
            <a href={data.linkUrl} target="_blank" rel="noreferrer">
              <h1>{data.linkName}</h1>
            </a>
          </div>
        ))}
      </div>

      <div>
        <a href="prettybio.com">
          <h1 className="text-center mt-10">PreetyBio</h1>
        </a>
      </div>
    </div>
  );
}

export default Profile