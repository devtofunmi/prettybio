import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaTwitter, FaFacebook, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';


interface ShareModalProps {
  onClose: () => void;
  shareUrl: string;
  theme: {
    bg: string;
    text: string;
    linkBg: string;
    linkText: string;
  };
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose, shareUrl, theme }) => {
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
    <AnimatePresence>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
       className={`md:w-96 w-80 rounded-lg shadow-lg p-6 relative ${theme.bg} ${theme.text}`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <AiOutlineClose size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Share this biolink</h2>

        <div className={`flex items-center justify-between border p-3 rounded-md shadow-sm ${theme.linkBg}`}>
          <input
            type="text"
            readOnly
            value={shareUrl}
            className={`w-full ${theme.bg} text-sm p-2 outline-none ${theme.text}`}
          />
          <button
            className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="flex justify-between mt-4  gap-2">
          <button
            onClick={shareOnTwitter}
            className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            <FaTwitter />
          </button>

          <button
            onClick={shareOnFacebook}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <FaFacebook /> 
          </button>

          <button
            onClick={shareViaEmail}
            className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            <FaEnvelope />
          </button>
        </div>
      </motion.div>
    </motion.div>
    </AnimatePresence>
    
  );
};

export default ShareModal;
