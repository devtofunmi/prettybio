import React, { useEffect, useState } from "react";
import GradientBorder from "./GradientBorder";
import { supabase } from "../supabaseClient";
import Link from "next/link";
// import Image from "next/image";

const DashBoardNav = () => {
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const storedData = localStorage.getItem("data");
      const dataArray = JSON.parse(storedData);
      const userId = dataArray[0]?.id;

      if (userId) {
        const { data, error } = await supabase
          .from("users")
          .select("image")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching user data:", error);
          return;
        }

        if (data) {
          setUserImage(data.image);
        }
      }
    }

    fetchUserData();
  }, []);

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0">
      <div>
        <Link href="/">
          <h2 className="text-3xl">PrettyBio</h2>
        </Link>
      </div>

      <GradientBorder>
        <div className="w-10 h-10 rounded-full">
          {userImage && (
            <img
              src={userImage}
              alt="User Image"
              width={40}
              height={40}
              crossOrigin="anonymous"
            />
          )}
        </div>
      </GradientBorder>
    </div>
  );
};

export default DashBoardNav;
