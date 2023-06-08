import React from "react";
import { MdOutlineClose } from "react-icons/md";

const ShareLinkModal = ({ shareModal, closeModal, userLinkName }) => {
  const handleTwitterShare = () => {
    const pageLink = `https://prettybio.netlify.app/${userLinkName}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      pageLink
    )}`;
    window.open(twitterUrl, "_blank");
  };

  const handleEmailShare = () => {
    const pageLink = `https://prettybio.netlify.app/${userLinkName}`;
    const subject = "Check out this page";
    const emailBody = `I wanted to share this page with you: ${pageLink}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = emailUrl;
  };

  const handleFacebookShare = () => {
    const pageLink = `https://prettybio.netlify.app/${userLinkName}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      pageLink
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const handleWhatsAppShare = () => {
    const pageLink = `https://prettybio.netlify.app/${userLinkName}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      pageLink
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div>
      <div
        className={`fixed w-full h-full top-0 left-0 backdrop-blur-sm items-center z-50 ${
          shareModal ? "flex" : "hidden"
        }`}
      >
        <div className="w-4/5 md:w-2/4 lg:w-[40%] rounded-xl bg-white m-auto p-8 mt-40">
          <div className="flex justify-end">
            <button onClick={() => closeModal()}>
              <MdOutlineClose className="text-[20px] hover:bg-gray-200" />
            </button>
          </div>
          <div>
            <p className="text-center text-[18px] md:text-[20px] mt-3 ">
              Share this Bio Link
            </p>
            <div>
              <p
                className="bg-gray-200 my-5 p-5 rounded-xl cursor-pointer hover:bg-pink-500 hover:text-white text-center"
                onClick={handleTwitterShare}
              >
                Share on Twitter
              </p>
              <p
                className="bg-gray-200 my-5 p-5 rounded-xl cursor-pointer hover:bg-pink-500 hover:text-white text-center"
                onClick={handleWhatsAppShare}
              >
                Share on WhatsApp
              </p>
              <p
                className="bg-gray-200 my-5 p-5 rounded-xl cursor-pointer hover:bg-pink-500 hover:text-white text-center"
                onClick={handleFacebookShare}
              >
                Share on Facebook
              </p>
              <p
                className="bg-gray-200 my-5 p-5 rounded-xl cursor-pointer hover:bg-pink-500 hover:text-white text-center"
                onClick={handleEmailShare}
              >
                Share via Email
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareLinkModal;
