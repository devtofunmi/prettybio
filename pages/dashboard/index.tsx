import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import {
  FaYoutube, FaPinterest, FaTwitter, FaReddit, FaInstagram,
  FaTiktok, FaLinkedin, FaFacebook, FaGithub, FaWhatsapp, FaTimes, FaTrash,
  FaLink,
  FaShareAlt
} from "react-icons/fa";
import GradientBorder from "../../components/HomeGradientBorder";
import GradientBorderr from "../../components/GradientBorder";
import { Toaster, toast } from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";

interface Link {
  id: number;
  title: string;
  url: string;
  type: "link";
}

interface Social {
  id: number;
  platform: string;
  username: string;
  url: string;
  type: "social";
}

const socialMediaPlatforms = [
  { name: "YouTube", icon: <FaYoutube className="text-red-500 text-3xl" />, urlPrefix: "https://youtube.com/" },
  { name: "Pinterest", icon: <FaPinterest className="text-red-600 text-3xl" />, urlPrefix: "https://pinterest.com/" },
  { name: "Twitter", icon: <FaTwitter className="text-blue-400 text-3xl" />, urlPrefix: "https://twitter.com/" },
  { name: "Reddit", icon: <FaReddit className="text-orange-500 text-3xl" />, urlPrefix: "https://reddit.com/user/" },
  { name: "Instagram", icon: <FaInstagram className="text-pink-500 text-3xl" />, urlPrefix: "https://instagram.com/" },
  { name: "TikTok", icon: <FaTiktok className="text-black text-3xl" />, urlPrefix: "https://www.tiktok.com/@" },
  { name: "LinkedIn", icon: <FaLinkedin className="text-blue-700 text-3xl" />, urlPrefix: "https://linkedin.com/in/" },
  { name: "Facebook", icon: <FaFacebook className="text-blue-600 text-3xl" />, urlPrefix: "https://facebook.com/" },
  { name: "GitHub", icon: <FaGithub className="text-gray-800 text-3xl" />, urlPrefix: "https://github.com/" },
  { name: "WhatsApp", icon: <FaWhatsapp className="text-green-500 text-3xl" />, urlPrefix: "https://wa.me/" }, // Added WhatsApp
];

const LinksPage: React.FC = () => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [socialUrl, setSocialUrl] = useState("");
  const [loadingLinks, setLoadingLinks] = useState<boolean>(false); 
  const [loadingSocials, setLoadingSocials] = useState<boolean>(false);
  const [links, setLinks] = useState<Link[]>([
    { id: 1, title: "My Website", url: "https://mywebsite.com", type: "link" },
    { id: 2, title: "Portfolio", url: "https://myportfolio.com", type: "link" },
  ]);
  const [socials, setSocials] = useState<Social[]>([
    { id: 1, platform: "Twitter", username: "example", url: "https://twitter.com/example", type: "social" },
    { id: 2, platform: "Instagram", username: "example", url: "https://instagram.com/example", type: "social" },
  ]);


  const toggleLinkModal = () => setIsLinkModalOpen((prev) => !prev);

  const toggleSocialModal = () => {
    setIsSocialModalOpen((prev) => !prev);
    setSelectedPlatform(null);
    setUsername("");
    setSocialUrl("");
  };

  // Handle Adding Links
  const handleAddLink = () => {
    if (title && url) {
      const newLink: Link = {
        id: Date.now(),
        title,
        url,
        type: "link",
      };
      setLinks((prev) => [...prev, newLink]);
      setTitle("");
      setUrl("");
      setLoadingLinks(false);
      toggleLinkModal();
    }
  };

  // Handle Adding Socials
  const handleSelectPlatform = (platform: string) => {
    setSelectedPlatform(platform);
  };

  const handleAddSocialLink = () => {
    if (username && selectedPlatform) {
      const platformData = socialMediaPlatforms.find((p) => p.name === selectedPlatform);
      if (platformData) {
        const newSocial: Social = {
          id: Date.now(),
          platform: selectedPlatform,
          username,
          url: `${platformData.urlPrefix}${username}`,
          type: "social",
        };
        setSocials((prev) => [...prev, newSocial]);
        setUsername("");
        setSocialUrl("");
        setLoadingSocials(false);
        toggleSocialModal();
      }
    }
  };

  

  const currentUrl = "https://prettybio.com/devtofunmi"; 

   //  Copy URL function
   const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success("URL copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy URL.");
    });
  };

  //  Share URL function 
  const handleShareUrl = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out my PrettyBio profile",
        url: currentUrl,
      }).then(() => {
        toast.success("Link shared successfully!");
      }).catch(() => {
        toast.error("Failed to share link.");
      });
    } else {
      toast.error("Web Share API not supported in this browser.");
    }
  };


  const handleDeleteLink = (id: number) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
    toast.success("Link deleted!");
  };

  const handleDeleteSocial = (id: number) => {
    setSocials((prev) => prev.filter((social) => social.id !== id));
    toast.success("Social link deleted!");
  };

  return (
    <DashboardLayout showMobilePreview={true} userLinkName="your-username">
      <Toaster />
      <section className="min-h-screen text-gray-800">
      <div className="flex justify-between items-center text-gray-700 p-4 border rounded-lg bg-blue-100">
          <h1>🔥 Your Link is live  
            <span className="hidden md:inline ml-2 underline cursor-pointer">{currentUrl}</span> 
          </h1>
          <div className="flex gap-5">
            <button onClick={handleCopyUrl} className="bg-white p-2 rounded-full">
              <FaLink size={20} />
            </button>
            <button onClick={handleShareUrl} className="bg-white p-2 rounded-full">
              <FaShareAlt size={20} />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6 mt-5">
          <h1 className="text-2xl font-bold">Your Links</h1>

          <div className="">
            <GradientBorder>
            <button onClick={toggleLinkModal} className=" text-white px-4 py-2 rounded-md transition">
              + Add Link
            </button>
            </GradientBorder>
           
          </div>
        </div>

        
        <div className="space-y-6">
        {loadingLinks ? (
            <div className="text-center">
              <LoadingSpinner />
            </div>
          ) : links.length === 0 ? (
            <div className="text-gray-500 text-center">No links added yet. Click + Add Link to add your links.</div>
          ) : (
            links.map((link) => (
              <div key={link.id} className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md">
                <div>
                  <h2 className="text-lg font-bold">{link.title}</h2>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {link.url}
                  </a>
                </div>
                <button onClick={() => handleDeleteLink(link.id)} className=" text-red-500 hover:text-red-600">
                  <FaTrash size={15} />
                </button>
              </div>
            ))
          )}
        </div>

      
        <div className="flex justify-between items-center mt-5 mb-6">
          <h1 className="text-2xl font-bold">Social Links</h1>
          <GradientBorder>
          <button onClick={toggleSocialModal} className=" text-white px-4 py-2 rounded-md transition">
            + Add Social
          </button>
          </GradientBorder>
          
        </div>
        <div className="space-y-6 mt-4">
          {loadingSocials ? (
            <div className="text-center">
              <LoadingSpinner />
            </div>
          ) : socials.length === 0 ? (
            <div className="text-gray-500 text-center">No social links added yet. Click + Add Social to add your social profiles.</div>
          ) : (
            socials.map((social) => (
              <div key={social.id} className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md">
                <div className="flex items-center gap-4">
                  {socialMediaPlatforms.find((p) => p.name === social.platform)?.icon}
                  <div>
                    <h2 className="text-lg font-bold">{social.platform}</h2>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {social.username}
                    </a>
                  </div>
                </div>
                <button onClick={() => handleDeleteSocial(social.id)} className=" text-red-500 hover:text-red-600">
                  <FaTrash size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        
        {isLinkModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <div className="flex justify-between items-center">
                <h2 className="text-lg">Add Link</h2>
                <FaTimes
                  className="cursor-pointer text-gray-600 hover:text-gray-800"
                  size={18}
                  onClick={toggleLinkModal}
                />
              </div>
              <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-transparent border p-2 rounded mt-4" />
              <input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full bg-transparent  border p-2 rounded mt-4" />
              <div className="mt-4">
              <GradientBorderr>
              <button onClick={handleAddLink} className=" text-white py-2">S A V E</button>
              </GradientBorderr>
              </div>
              
            </div>
          </div>
        )}

        
        {isSocialModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <div className="flex justify-between items-center">
                <h2 className="text-lg">Add Social Link</h2>
                <FaTimes
                  className="cursor-pointer text-gray-600 hover:text-gray-800"
                  size={18}
                  onClick={toggleSocialModal}
                />
              </div>
              <div className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  {socialMediaPlatforms.map((platform) => (
                    <button
                      key={platform.name}
                      onClick={() => handleSelectPlatform(platform.name)}
                      className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                    >
                      {platform.icon}
                    </button>
                  ))}
                </div>

                {selectedPlatform && (
                  <div>
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full border p-2 bg-transparent rounded mt-4"
                    />
                    <div className="mt-4">
                    <GradientBorderr>
                    <button
                      onClick={handleAddSocialLink}
                      className=" text-white py-2"
                    >
                      Add {selectedPlatform}
                    </button>
                    </GradientBorderr>
                    </div>
                   
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default LinksPage;










