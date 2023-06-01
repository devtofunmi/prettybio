import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import GradientBorder from "../components/GradientBorder";
import AddLinkModal from "./AddLinkModal";
import { AiOutlineDelete } from "react-icons/ai";

const Links = () => {
  const [showModal, setShowModal] = useState(false);
  const [links, setLinks] = useState([]);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
         setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const deleteLink = async (linkId) => {
    try {
      const { data, error } = await supabase
        .from("links")
        .delete()
        .eq("id", linkId);
        

      if (error) {
        console.error("Error deleting link:", error.message);
         setError(error.message);
      } else {
        console.log("Link deleted successfully");
         setSuccess("Link deleted successfully");
         setTimeout(() => {
           setSuccess("");
         }, 2000);
        // Remove the deleted link from the links state
        setLinks(links.filter((link) => link.id !== linkId));
      }
    } catch (error) {
      console.error("Error deleting link:", error.message);
    }
    
  };

  return (
    <div className="mt-5 lg:mt-0 md:mt-0">
      <AddLinkModal closeModal={closeModal} showModal={showModal} />
      {error && (
        <div className="fixed top-0 left-0 right-0 items-center bg-red-500 text-white p-4 ">
          <div className="flex justify-between">
            <p>{error}</p>
            <button className="px-2 py-1" onClick={() => setError("")}>
              X
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed top-0 left-0 right-0 items-center bg-green-500 text-white p-4 ">
          <div className="text-center">
            <p>{success}</p>
          </div>
        </div>
      )}

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
              <div className="bg-gray-200 my-5 mx-5 p-6 hover:bg-pink-500 hover:text-white flex justify-between">
                <div>
                  <h1>{link.link_name}</h1>
                  <a href={link.link_url} target="_blank" rel="noreferrer">
                    <p>{link.link_url}</p>
                  </a>
                </div>
                <div>
                  <button onClick={() => deleteLink(link.id)}><AiOutlineDelete className="text-[18px] md:text-[20px] " /></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Links;
