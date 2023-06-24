import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import GradientBorder from "./GradientBorder";
import { supabase } from "../supabaseClient";
import Link from "next/link";

const DashBoardNav = () => {
  const [userImage, setUserImage] = useState(null);
  const [userLinkName, setUserLinkName] = useState(null);
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

 const gradientStyle = {
   background: "linear-gradient(275.79deg, #93c3c4 5.39%, #f2cfad 70.00%)",
 };
 const whiteGradientStyle = {
   background: "linear-gradient(275.79deg, #d758bc  5.39%, #e8588e  70.39%)",
 };

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

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div
      className={`${
        currentTheme === "dark"
          ? "flex items-center justify-between p-4 text-text shadow-lg sticky top-0"
          : "flex items-center justify-between p-4 text-black shadow-lg sticky top-0"
      }`}
    >
      <div>
        <div>
          <Link href="/">
            <h2 className="text-3xl">PrettyBio</h2>
          </Link>
        </div>
        <div className="text-[10px] block md:hidden mt-2">
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
          <div
            className={`style ${
              currentTheme === "dark" ? "dark" : "light"
            } w-10 h-10 rounded-full`}
            style={currentTheme === "dark" ? gradientStyle : whiteGradientStyle}
          >
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
