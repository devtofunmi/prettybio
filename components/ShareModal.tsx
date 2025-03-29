import React, { useState } from "react";
import { AiOutlineClose, AiOutlineLink } from "react-icons/ai";
import { FaTwitter, FaFacebook, FaEnvelope } from "react-icons/fa";

interface ShareModalProps {
  onClose: () => void;
  shareUrl: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose, shareUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=Check out this profile&body=${encodeURIComponent(
      shareUrl
    )}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white text-black w-96 rounded-lg shadow-lg p-6 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Share this biolink</h2>

        <div className="flex items-center justify-between border p-3 rounded-md shadow-sm">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full bg-white text-sm p-2 outline-none"
          />
          <button
            className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={shareOnTwitter}
            className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            <FaTwitter /> Twitter
          </button>

          <button
            onClick={shareOnFacebook}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <FaFacebook /> Facebook
          </button>

          <button
            onClick={shareViaEmail}
            className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            <FaEnvelope /> Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
