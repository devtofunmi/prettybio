import React, { useEffect, useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/router";
import ShareModal from "../components/ShareModal";
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const mockUser = {
  username: "Jay",
  bio: "Building awesome things with code 🚀",
  image: "/assets/jay.jpg",
  links: [
    { id: "1", link_name: "GitHub", link_url: "https://github.com" },
    { id: "2", link_name: "LinkedIn", link_url: "https://linkedin.com" },
    { id: "3", link_name: "Portfolio", link_url: "https://johndoe.com" },
  ],
  socials: [
    { id: "1", platform: "Twitter", url: "https://twitter.com/codebreak_er", icon: <FaTwitter /> },
    { id: "2", platform: "Instagram", url: "https://instagram.com/iamnattyjay", icon: <FaInstagram /> },
    { id: "3", platform: "Facebook", url: "https://facebook.com/jay", icon: <FaFacebook /> },
    { id: "4", platform: "LinkedIn", url: "https://linkedin.com/in/jay", icon: <FaLinkedin /> },
    { id: "5", platform: "GitHub", url: "https://github.com/devtofunmi", icon: <FaGithub /> },
  ],
};

const Profile: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;

  const [shareModal, setShareModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const shareUrl = `https://prettybio.netlify.app/${mockUser.username}`;

  return (
    <div className="h-screen  md:h-full bg-gray-100 flex md:justify-center p-5">
      <div className="w-full max-w-xl p-6 text-center">

     
        <div className="bg-white rounded-full flex justify-center shadow-md w-10 h-10">
          <button
            className="text-black hover:scale-105 transition"
            onClick={() => setShareModal(true)}
          >
            <AiOutlineShareAlt size={24} />
          </button>
        </div>

        
        {shareModal && (
          <ShareModal
            onClose={() => setShareModal(false)}
            shareUrl={shareUrl}
          />
        )}

        
        <div className="w-28 h-28 rounded-full shadow-md overflow-hidden mx-auto mt-8">
          <Image
            src={mockUser.image}
            alt="User"
            width={112}
            height={112}
            className="object-cover"
          />
        </div>

        <h1 className="text-2xl text-black font-bold mt-4">
          {mockUser.username}
        </h1>
        <p className="text-black mt-2">{mockUser.bio}</p>

        
        <div className="flex justify-center space-x-4 mt-4">
          {mockUser.socials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="text-black hover:scale-110 transition transform duration-300"
            >
              <span className="text-3xl">{social.icon}</span>
            </a>
          ))}
        </div>

       
        <div className="mt-6 space-y-4">
          {mockUser.links.map((link) => (
            <a
              key={link.id}
              href={link.link_url}
              target="_blank"
              rel="noreferrer"
              className="block bg-white shadow-md text-black py-3 px-6 rounded-full text-[18px] hover:scale-105 transition duration-300"
            >
              {link.link_name}
            </a>
          ))}
        </div>

       
        <footer className="mt-20">
          <a
            href="http://prettybio.netlify.app"
            className="text-sm text-gray-500 hover:text-black"
          >
            PrettyBio
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Profile;



