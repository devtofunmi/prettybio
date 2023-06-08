import React, { useEffect, useState } from "react";
import GradientBorder from "./GradientBorder";
import { supabase } from "../supabaseClient";
import Link from "next/link";

const DashBoardNav = () => {
  const [userImage, setUserImage] = useState(null);
  const [userLinkName, setUserLinkName] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const storedData = localStorage.getItem("data");
      const dataArray = JSON.parse(storedData);
      const userId = dataArray[0]?.id;

      if (userId) {
        const { data, error } = await supabase
          .from("users")
          .select("image,userlink_name")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching user data:", error);
          return;
        }

        if (data) {
          setUserImage(data.image);
          setUserLinkName(data.userlink_name);
        }
      }
    }

    fetchUserData();
  }, []);

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0">
      <div>
        <div>
          <Link href="/">
            <h2 className="text-3xl">PrettyBio</h2>
          </Link>
        </div>
        <div className="text-[12px] block md:hidden mt-2">
          <a
            href={`https://prettybio.netlify.app/${userLinkName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://prettybio.netlify.app/{userLinkName}
          </a>
        </div>
      </div>
      <div className="flex gap-[10px] items-center">
        <div className="text-[13px] hidden md:block">
          <a
            href={`https://prettybio.netlify.app/${userLinkName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-underline"
            style={{ textDecoration: "underline" }}
          >
            https://prettybio.netlify.app/{userLinkName}
          </a>
        </div>
        <GradientBorder>
          <div className="w-10 h-10 rounded-full">
            {userImage && (
              <img
                src={userImage}
                className="w-full h-full rounded-full"
                alt="User Image"
                crossOrigin="anonymous"
              />
            )}
          </div>
        </GradientBorder>
      </div>
    </div>
  );
};

export default DashBoardNav;
