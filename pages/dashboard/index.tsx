import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import {
  FaYoutube, FaPinterest, FaTwitter, FaReddit, FaInstagram,
  FaTiktok, FaLinkedin, FaFacebook, FaGithub, FaWhatsapp, FaTimes, FaTrash,
  FaLink, FaShareAlt
} from "react-icons/fa";
import GradientBorder from "../../components/HomeGradientBorder";
import GradientBorderr from "../../components/GradientBorder";
import { Toaster, toast } from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useUser } from "../../context/UserContext";


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

const api = "https://prettybioo.up.railway.app";

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
  { name: "WhatsApp", icon: <FaWhatsapp className="text-green-500 text-3xl" />, urlPrefix: "https://wa.me/" },
];

const LinksPage: React.FC = () => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loadingLinks, setLoadingLinks] = useState<boolean>(false);
  const [loadingSocials, setLoadingSocials] = useState<boolean>(false);
  const [links, setLinks] = useState<Link[]>([]);
  const [socials, setSocials] = useState<Social[]>([]);
  const { token, loading } = useUser();
  const { user } = useUser();
  const [deletedLinkId, setDeletedLinkId] = useState<string | null>(null);
  const [deletedSocialId, setDeletedSocialId] = useState<string | null>(null);



  const fetchLinks = async () => {
    if (loading) return;
    if (!token) {
      toast.error("Not authenticated.");
      return;
    }
  
    try {
      const res = await fetch(`${api}/links`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error("Failed to fetch links.");
      
      const data = await res.json();
      console.log("Fetched links data:", data);
  
      const fetchedLinks = Array.isArray(data) ? data : data.links ?? [];
  
      if (!Array.isArray(fetchedLinks)) {
        throw new Error("Response does not contain a valid links array.");
      }
  
      setLinks(fetchedLinks);
    } catch (err) {
      console.error("Error fetching links:", err);
      toast.error("Failed to fetch links.");
      setLinks([]); // prevent map() from crashing
    }
  };
    
  const fetchSocials = async () => {
    if (!token) return toast.error("You must be logged in.");
  
    setLoadingSocials(true);
    try {
      const res = await fetch(`${api}/sociallinks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
  
      if (Array.isArray(data.socialLinks)) {
        setSocials(data.socialLinks);
      } else {
        setSocials([]);
        console.error("Invalid social links response:", data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch social links.");
    } finally {
      setLoadingSocials(false);
    }
  };
  
  useEffect(() => {
    if (!loading && token) {
      fetchLinks();
      fetchSocials();
    }
  }, [token, loading]);
  
  const toggleLinkModal = () => setIsLinkModalOpen((prev) => !prev);

  const toggleSocialModal = () => {
    setIsSocialModalOpen((prev) => !prev);
    setSelectedPlatform(null);
    setUsername("");
  };

  const handleAddLink = async () => {
    if (loading) return;
    if (!token) {
      toast.error("Not authenticated.");
      return;
    }
  
    if (title && url) {
      setLoadingLinks(true);
      try {
        const res = await fetch(`${api}/links`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, url }),
        });
        if (!res.ok) throw new Error("Failed to add link.");
        await res.json();
        await fetchLinks(); // 🔁 fetch fresh list
        setTitle("");
        setUrl("");
        toggleLinkModal();
        toast.success("Link added!");
      } catch (err) {
        toast.error("Failed to add link.");
      } finally {
        setLoadingLinks(false);
      }
    }
  };
  
  // Handle Adding Socials
  const handleSelectPlatform = (platform: string) => {
    setSelectedPlatform(platform);
  };

  const handleAddSocialLink = async () => {
    if (!token) return toast.error("You must be logged in.");
  
    if (username && selectedPlatform) {
      const platformData = socialMediaPlatforms.find(p => p.name === selectedPlatform);
      if (platformData) {
        const fullUrl = `${platformData.urlPrefix}${username}`;
        setLoadingSocials(true);
        try {
          const res = await fetch(`${api}/sociallinks`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              platform: selectedPlatform,
              username,
              url: fullUrl,
            }),
          });
  
          if (!res.ok) {
            throw new Error("Failed to add social link.");
          }
  
          await res.json();
          await fetchSocials(); // 🔁 fetch fresh list
          setUsername("");
          toggleSocialModal();
          toast.success("Social link added!");
        } catch {
          toast.error("Failed to add social link.");
        } finally {
          setLoadingSocials(false);
        }
      }
    }
  };
  
  
  const handleDeleteLink = async (id: string) => {
    if (!token) return toast.error("You must be logged in.");
  
    setDeletedLinkId(id); // trigger fade-out animation
  
    // wait for the animation to complete (300ms)
    setTimeout(async () => {
      setLoadingLinks(true);
      try {
        const res = await fetch(`${api}/links/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) {
          throw new Error("Failed to delete link.");
        }
  
        await fetchLinks();
        toast.success("Link deleted!");
      } catch (err) {
        toast.error("Failed to delete link.");
      } finally {
        setLoadingLinks(false);
        setDeletedLinkId(null); // clear the animation state
      }
    }, 300); // duration matches the CSS animation
  };
  
  
  type Social = {
    id: string;
    url: string;
    clickCount: number;
    platform: string;
    username: string;
  };
  

  const handleDeleteSocialLink = async (id: string) => {
    if (!token) return toast.error("You must be logged in.");
  
    setDeletedSocialId(id); // 🔥 triggers fade-out CSS animation
  
    setTimeout(async () => {
      setLoadingSocials(true);
      try {
        const res = await fetch(`${api}/sociallinks/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) {
          throw new Error("Failed to delete social link.");
        }
  
        setSocials((prev: Social[]) => prev.filter((link) => link.id !== id));
        toast.success("Social link deleted!");
      } catch (err) {
        toast.error("Failed to delete social link.");
      } finally {
        setLoadingSocials(false);
        setDeletedSocialId(null); // reset after delete
      }
    }, 300); // wait for animation to finish
  };
  
  
  
  const currentUrl = `https://prettybio.netlify.app/${user?.userLinkName}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success("URL copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy URL.");
    });
  };

  const handleShareUrl = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out my PrettyBio profile",
        url: currentUrl,
      }).then(() => {
        toast.success("Link shared!");
      }).catch(() => {
        toast.error("Failed to share.");
      });
    } else {
      toast.error("Sharing not supported.");
    }
  };

  return (
     <DashboardLayout showMobilePreview={true} userLinkName="${user?.userLinkName}">
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
                  <div
                    key={String(link.id)}
                    className={`flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-all duration-300 ${
                      deletedLinkId === String(link.id) ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
                    }`}
                  >
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">{link.title}</h2>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {link.url}
                      </a>
                    </div>
                    <button
                      onClick={() => handleDeleteLink(link.id.toString())}
                      className="text-red-500 hover:text-red-600"
                    >
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
                  <div key={String(social.id)} 
                  className={`flex text-gray-800 justify-between items-center p-4 border rounded-lg hover:shadow-md transition-all duration-300 ${
                    deletedSocialId === social.id ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
                  }`}
                  >
                    <div className="flex items-center gap-4">
                      {socialMediaPlatforms.find((p) => p.name === social.platform)?.icon}
                      <div>
                        <h2 className="text-lg font-bold">{social.platform}</h2>
                        <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          {social.username}
                        </a>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteSocialLink(social.id.toString())} className=" text-red-500 hover:text-red-600">
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
                  <button onClick={handleAddLink} className=" text-white py-2">
                     {loadingLinks ? <LoadingSpinner /> : "S A V E"}
                  </button>
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
                          
                           {loadingSocials ? <LoadingSpinner /> : `Add ${selectedPlatform}`}
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