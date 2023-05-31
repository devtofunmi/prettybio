import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import GradientBorder from "../components/GradientBorder";
import AddLinkModal from "./AddLinkModal";
import LinkDisplay from "./LinkDisplay";

const Links = () => {
  const [showModal, setShowModal] = useState(false);
  const [links, setLinks] = useState([]);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Fetch the user's links from the Link table
    const fetchLinks = async () => {
      try {
        const storedData = localStorage.getItem("data");
        const dataArray = JSON.parse(storedData);
        const userId = dataArray[0]?.id;
        setUserId(userId);

        const { data, error } = await supabase
          .from("links")
          .select("*")
          .eq("user_id", userId);

        if (error) {
          console.error("Error fetching links:", error.message);
        } else {
          console.log("Links fetched successfully:", data);
          setLinks(data);
        }
      } catch (error) {
        console.error("Error fetching links:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="mt-5 lg:mt-0 md:mt-0">
      <AddLinkModal closeModal={closeModal} showModal={showModal} />

      <div className="flex justify-center">
        <GradientBorder>
          <button
            className="text-xl text-white px-10"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            Add Link
          </button>
        </GradientBorder>
      </div>

      <div className="mt-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : links.length === 0 ? (
          <p>Link is empty</p>
        ) : (
          links.map((link) => (
            <div key={link.id}>
              <div className="bg-gray-200 my-5 mx-5 p-6 hover:bg-pink-500 hover:text-white">
                <h1>{link.link_name}</h1>
                <a href={link.link_url} target="_blank" rel="noreferrer">
                  <p>{link.link_url}</p>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Links;
