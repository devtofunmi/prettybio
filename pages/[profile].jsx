import React, { useEffect, useState } from "react";
import ProfileLinks from "../components/ProfileLinks";
import GradientBorder from "../components/GradientBorder";
import ShareLinkModal from "../components/ShareLinkModal";
import { GrShare } from "react-icons/gr";
import Image from "next/image";
import { supabase } from "../supabaseClient";
// import LinkLoadingSpinner from "./LinkLoadingSpinner";

const Profile = () => {
  const [shareModal, setShareModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userLinks, setUserLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userImage, setUserImage] = useState(null);

  const closeModal = () => {
    setShareModal(false);
  };

  useEffect(() => {
    setLoading(true);
    // Fetch the user's data from the Link table
    const fetchUserData = async () => {
      try {
        const pathname = window.location.pathname;
        const userlinkname = pathname.replace("/", "");
        console.log(userlinkname);

        const { data, error } = await supabase
          .from("users")
          .select("userlink_name, name, bio, profile_image")
          .eq("userlink_name", userlinkname);

        if (error) {
          console.error("Error fetching links:", error.message);
        } else {
          console.log("Links fetched successfully:", data);
          setUserData(data);
          setUserImage(data.length > 0 ? data[0].profile_image : null);
        }
      } catch (error) {
        console.error("Error fetching links:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData.length > 0) {
      setLoading(true);
      // Fetch the user's links from the Link table
      const fetchLinks = async () => {
        try {
          const userId = userData[0].user_id;
          const { data, error } = await supabase
            .from("links")
            .select("*")
            .eq("user_id", userId);

          if (error) {
            console.error("Error fetching links:", error.message);
          } else {
            console.log("Links fetched successfully:", data);
            setUserLinks(data);
          }
        } catch (error) {
          console.error("Error fetching links:", error.message);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchLinks();
    }
  }, [userData]);

  return (
    <div className="w-[80%] md:w-[60%] text-sm lg:w-[50%] rounded-xl m-auto p-8 mt-2 font-abc">
      <ShareLinkModal closeModal={closeModal} shareModal={shareModal} />
      {error && (
        <div className="fixed top-0 left-0 right-0 items-center bg-red-500 text-white p-4">
          <div className="flex justify-between">
            <p>{error}</p>
            <button className="px-2 py-1" onClick={() => setError("")}>
              X
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed top-0 left-0 right-0 items-center bg-green-500 text-white p-4">
          <div className="text-center">
            <p>{success}</p>
          </div>
        </div>
      )}
      <div className="flex justify-start">
        <button
          className="text-xl text-whi px-10"
          onClick={() => {
            setShareModal(!shareModal);
          }}
        >
          <div>
            <GrShare className="text-[15px] md:text-[20px] hover:bg-gray-200" />
          </div>
        </button>
      </div>
      <div className="flex flex-col items-center mt-5 md:mt-0">
        <GradientBorder>
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full">
            <img
              src={userImage}
              alt="user image"
              width={500}
              height={500}
              crossOrigin="anonymous"
            />
          </div>
        </GradientBorder>

        <h1 className="text-[20px] my-2 md:my-3">
          {userData.length > 0 ? userData[0].userlink_name : ""}
        </h1>
        <p className="text-[15px]">
          {userData.length > 0 ? userData[0].bio : ""}
        </p>
      </div>

      <div className="mt-5">
        {loading ? (
          // <LinkLoadingSpinner />
          <p>loading...</p>
        ) : userLinks.length === 0 ? (
          <p className="text-center">Link is empty</p>
        ) : (
          userLinks.map((link) => (
            <div key={link.id}>
              <div className="bg-gray-200 my-5 p-5 rounded-xl cursor-pointer hover:bg-pink-500 hover:text-white text-center">
                <a href={link.link_url} target="_blank" rel="noreferrer">
                  <h1>{link.link_name}</h1>
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      <div>
        <a href="http://prettybio.netlify.app">
          <h1 className="text-center mt-10">PrettyBio</h1>
        </a>
      </div>
    </div>
  );
};

export default Profile;
