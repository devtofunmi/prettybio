import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { MdOutlineClose } from "react-icons/md";
import GradientBorder from "./GradientBorder";

const AddLinkModal = ({ showModal, closeModal }) => {
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    const dataArray = JSON.parse(storedData);
    const userId = dataArray[0]?.id;
    setUserId(userId);
  }, []);

  const handleSubmit = async () => {
    if (!linkName) {
      setError("Enter link name");
    } else if (!linkUrl) {
      setError("Enter link URL");
    } else if (!userId) {
      setError("User ID is missing");
    } else {
      setLoading(true);
      try {
        const { data: existingLinks, error: existingLinksError } =
          await supabase
            .from("links")
            .select("*")
            .eq("user_id", userId)
            .eq("link_url", linkUrl);

        if (existingLinksError) {
          console.error(
            "Error fetching existing links:",
            existingLinksError.message
          );
        } else if (existingLinks.length > 0) {
          setError("Link already exists");
        } else {
          const { data: newLinkData, error: newLinkError } = await supabase
            .from("links")
            .insert([
              { user_id: userId, link_name: linkName, link_url: linkUrl },
            ]);

          if (newLinkError) {
            console.error("Error adding link:", newLinkError.message);
          } else {
            console.log("Link added successfully:", newLinkData);
            setSuccess("Link added successfully");
            setLinkName("");
            setLinkUrl("");
            setTimeout(() => {
              setSuccess("");
            }, 2000);

          }
        }
      } catch (error) {
        console.error("Error adding link:", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {/* Modal content */}
      <div
        className={`fixed w-full h-full top-0 left-0 backdrop-blur-sm items-center z-50 ${
          showModal ? "flex" : "hidden"
        }`}
      >
        <div className="w-4/5 md:w-2/4 lg:w-[35%] rounded-xl bg-white m-auto p-8 mt-40">
          <div className="flex justify-between items-center text-base lg:text-xl md:text-sm">
            <h1>Add Link</h1>
            <div>
              <button onClick={() => closeModal()}>
                <MdOutlineClose />
              </button>
            </div>
          </div>
          <div className="text-red-700">
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
          </div>
          <input
            onChange={(e) => setLinkName(e.target.value)}
            value={linkName}
            type="text"
            className="placeholder-black focus:outline-none focus:border-blue-700 border border-gray-400 rounded-md py-2 px-4 block w-full mt-5"
            placeholder="LinkName"
          />
          <div className="mt-4">
            <input
              onChange={(e) => setLinkUrl(e.target.value)}
              value={linkUrl}
              type="text"
              className="placeholder-black focus:outline-none focus:border-blue-700 border border-gray-400 rounded-md py-2 px-4 block w-full"
              placeholder="LinkURL(e.g.,https://twitter.com/yourname)"
            />
          </div>
          <div className="mt-5 justify-center items-center flex">
            <GradientBorder>
              <button
                onClick={handleSubmit}
                className="px-20 lg:px-32 md:px-20 py-2 text-center justify-center text-white text-xl rounded-full focus:border-blue-700"
              >
                {loading ? <p>Loading...</p> : <p>SAVE</p>}
              </button>
            </GradientBorder>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default AddLinkModal;
