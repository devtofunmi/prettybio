import React, { JSX, useEffect, useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/router";
import ShareModal from "../components/ShareModal";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaYoutubeSquare,
  FaPinterest,
  FaReddit,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

const platformIcons: Record<string, JSX.Element> = {
  Twitter: <FaTwitter />,
  Instagram: <FaInstagram />,
  Facebook: <FaFacebook />,
  LinkedIn: <FaLinkedin />,
  GitHub: <FaGithub />,
  Youtube: <FaYoutubeSquare />,
  Pinterest: <FaPinterest />,
  Reddit: <FaReddit />,
  TikTok: <FaTiktok />,
  WhatsApp: <FaWhatsapp />,
};

const themes: Record<
  string,
  { bg: string; text: string; linkBg: string; linkText: string }
> = {
  light: {
    bg: "bg-white",
    text: "text-black",
    linkBg: "bg-gray-100",
    linkText: "text-black",
  },
  dark: {
    bg: "bg-[#202125]",
    text: "text-white",
    linkBg: "bg-[#202125]",
    linkText: "text-white",
  },
  ocean: {
    bg: "bg-teal-700",
    text: "text-white",
    linkBg: "bg-teal-600",
    linkText: "text-white",
  },
  forest: {
    bg: "bg-green-800",
    text: "text-white",
    linkBg: "bg-green-700",
    linkText: "text-white",
  },
  sunset: {
    bg: "bg-red-600",
    text: "text-white",
    linkBg: "bg-red-700",
    linkText: "text-white",
  },
  lavender: {
    bg: "bg-indigo-600",
    text: "text-white",
    linkBg: "bg-indigo-500",
    linkText: "text-white",
  },
};

const Profile: React.FC = () => {
  const router = useRouter();
  const { username: userLinkName } = router.query;

  const [shareModal, setShareModal] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userLinkName) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `https://prettybioo.up.railway.app/profile/${userLinkName}`
        );
        const data = await res.json();

        if (res.ok) {
          setUserData(data);

          // Anonymous Page View Tracking
          await fetch(`https://prettybioo.up.railway.app/analytics/page-view`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: userLinkName,
            }),
          });
        } else {
          router.push("/404");
        }
      } catch (err) {
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userLinkName, router]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );

  if (!userData) return null;

  const shareUrl = `https://prettybio.netlify.app/${userLinkName}`;
  const theme = themes[userData.theme] || themes.light;

  const socialLinks = userData.socials?.length ? (
    <div
      className={`flex justify-center space-x-4 ${
        userData.socialPosition === "top" ? "mt-4" : "mt-6"
      }`}
    >
      {userData.socials.map((social: any) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noreferrer"
          onClick={async () => {
            await fetch(
              `https://prettybioo.up.railway.app/analytics/click/social/${social.id}`,
              {
                method: "POST",
              }
            );
          }}
          className={`${theme.text} hover:scale-110 transition transform duration-300 text-3xl`}
        >
          {platformIcons[social.platform]}
        </a>
      ))}
    </div>
  ) : null;

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} flex flex-col p-4`}>
      <div className="fixed top-5 left-5 lg:left-[300px] z-50">
        <button
          className={`${theme.text} hover:scale-105 transition rounded-full shadow-md w-10 h-10 flex items-center justify-center`}
          onClick={() => setShareModal(true)}
        >
          <AiOutlineShareAlt size={24} />
        </button>
      </div>

      {shareModal && (
        <ShareModal
          theme={theme}
          onClose={() => setShareModal(false)}
          shareUrl={shareUrl}
        />
      )}

      <main className="flex-grow flex flex-col items-center text-center max-w-xl mx-auto w-full">
        <div className="w-28 h-28 rounded-full shadow-md overflow-hidden mt-16">
          <Image
            src={userData.image || "/default.png"}
            alt="User"
            width={112}
            height={112}
            className="object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold mt-4">{userData.username}</h1>
        <p className="mt-2">{userData.bio}</p>

        {userData.socialPosition === "top" && socialLinks}

        {userData.links?.length > 0 && (
          <div className="mt-6 mb-5 space-y-4 px-4 w-full">
            {userData.links.map((link: any) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                onClick={async () => {
                  await fetch(
                    `https://prettybioo.up.railway.app/analytics/click/link/${link.id}`,
                    {
                      method: "POST",
                    }
                  );
                }}
                className={`block ${theme.linkBg} ${theme.linkText} shadow-md py-3 px-6 rounded-full text-[18px] hover:scale-105 transition duration-300`}
              >
                {link.title}
              </a>
            ))}
          </div>
        )}

        <div className="mb-5">
          {userData.socialPosition === "bottom" && socialLinks}
        </div>
      </main>

      <footer className="text-center pb-4">
        <a
          href="http://prettybio.netlify.app"
          className={`text-sm ${theme.linkText} hover:underline transition duration-300`}
        >
          PrettyBio
        </a>
      </footer>
    </div>
  );
};

export default Profile;
