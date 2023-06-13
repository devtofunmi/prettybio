import React, { useEffect, useState } from "react";
import GradientBorder from "../components/GradientBorder";
import ShareLinkModal from "../components/ShareLinkModal";
import { AiOutlineShareAlt } from "react-icons/ai";
import Image from "next/image";
import { supabase } from "../supabaseClient";
import LinkLoadingSpinner from "../components/LinkLoadingSpinner";

const Profile = () => {
  const [shareModal, setShareModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userLinks, setUserLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [userID, setUserId] = useState(null);
  const [userLinkName, setUserLinkName] = useState("");

  const closeModal = () => {
    setShareModal(false);
  };

 useEffect(() => {
   setLoading(true);
   // Fetch the user's data from the users table
   const fetchUserData = async () => {
     try {
       const pathname = window.location.pathname;
       const userlinkname = pathname.replace("/", "");

       const { data, error } = await supabase
         .from("users")
         .select("userlink_name, name, bio, image, id")
         .eq("userlink_name", userlinkname);

       if (error) {
         console.error("Error fetching links:", error.message);
       }

       if (data && data.length > 0) {
         setUserImage(data[0].image);
         setUserData(data);
         setUserId(data[0].id);
         setUserLinkName(data[0].userlink_name);

       } else {
        // console.log("Links fetched successfully:", data);
        console.log("Links fetched successfully:");
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
  if (userData && userData.length > 0) {
    setLoading(true);
    // Fetch the user's links from the Link table
    const fetchLinks = async () => {
      try {
        const { data, error } = await supabase
          .from("links")
          .select("*")
          .eq("user_id", userID);

        if (error) {
          console.error("Error fetching links:", error.message);
          setError(error.message);
        } else {
          // console.log("Links fetched successfully:", data);
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
}, [userData, userID]);
  return (
    <div className="w-full md:w-[60%] text-text text-sm lg:w-[50%] rounded-xl m-auto md:p-8 p-5 mt-2 font-abc">
      <ShareLinkModal
        closeModal={closeModal}
        shareModal={shareModal}
        userLinkName={userLinkName}
      />
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
          className="text-xl md:px-10 px-0"
          onClick={() => {
            setShareModal(!shareModal);
          }}
        >
          <div>
            <AiOutlineShareAlt className="text-[20px] hover:bg-btntext" />
          </div>
        </button>
      </div>
      <div className="flex flex-col items-center mt-5 md:mt-0">
        <GradientBorder>
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full">
            {userImage && (
              <img
                src={userImage}
                alt="User Image"
                className="w-full h-full rounded-full"
                crossOrigin="anonymous"
              />
            )}
          </div>
        </GradientBorder>

        <h1 className="text-[20px] my-2 md:my-3">
          {userData && userData.length > 0 ? userData[0].userlink_name : ""}
        </h1>
        <p className="text-[15px]">
          {userData && userData.length > 0 ? userData[0].bio : ""}
        </p>
      </div>

      <div className="mt-5 h-[500px] md:h-[400px]">
        {loading ? (
          <LinkLoadingSpinner />
        ) : (
          userLinks.map((link) => (
            <div key={link.id}>
              <div className="bg-[#303135] my-5 p-5 rounded-xl cursor-pointer hover:bg-btntext hover:text-white text-center">
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
          <h1 className="text-center mt-10 hover:text-white">PrettyBio</h1>
        </a>
      </div>
    </div>
  );
};

export default Profile;