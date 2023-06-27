import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdOutlineClose } from "react-icons/md";

const ShareLinkModal = ({ shareModal, closeModal, userLinkName }) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;


  return (
    <div>
      <div
        className={`fixed w-full h-full top-0 left-0 backdrop-blur-sm items-center z-50 ${
          shareModal ? "flex" : "hidden"
        }`}
      >
        <div
          className={`${
            currentTheme === "dark"
              ? "w-4/5 md:w-2/4 lg:w-[40%] rounded-xl bg-[#202125] text-text m-auto p-8 mt-40"
              : "w-4/5 md:w-2/4 lg:w-[40%] rounded-xl bg-[#f7f7f7] text-black m-auto p-8 mt-40"
          } `}
        >
          <div className="flex justify-end">
            <button onClick={() => closeModal()}>
              <MdOutlineClose
                className={`${
                  currentTheme === "dark"
                    ? "text-[20px] hover:bg-btntext"
                    : "text-[20px]"
                } `}
              />
            </button>
          </div>
          <div>
            <p className="text-center text-[18px] md:text-[20px] mt-3 ">
              Share this Bio Link
            </p>
            <div>
              <p
                className={`${
                  currentTheme === "dark"
                    ? "bg-[#303135] my-5 p-5 rounded-xl cursor-pointer hover:bg-btntext hover:text-white text-center"
                    : "bg-[#f7f7f7] shadow-md my-5 p-5 rounded-xl cursor-pointer text-center"
                } `}
                onClick={handleTwitterShare}
              >
                Share on Twitter
              </p>
              <p
                className={`${
                  currentTheme === "dark"
                    ? "bg-[#303135] my-5 p-5 rounded-xl cursor-pointer hover:bg-btntext hover:text-white text-center"
                    : "bg-[#f7f7f7] shadow-md my-5 p-5 rounded-xl cursor-pointer text-center"
                } `}
                onClick={handleWhatsAppShare}
              >
                Share on WhatsApp
              </p>
              <p
                className={`${
                  currentTheme === "dark"
                    ? "bg-[#303135] my-5 p-5 rounded-xl cursor-pointer hover:bg-btntext hover:text-white text-center"
                    : "bg-[#f7f7f7] shadow-md my-5 p-5 rounded-xl cursor-pointer text-center"
                } `}
                onClick={handleFacebookShare}
              >
                Share on Facebook
              </p>
              <p
                className={`${
                  currentTheme === "dark"
                    ? "bg-[#303135] my-5 p-5 rounded-xl cursor-pointer hover:bg-btntext hover:text-white text-center"
                    : "bg-[#f7f7f7] shadow-md my-5 p-5 rounded-xl cursor-pointer text-center"
                } `}
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
