import Link from "next/link";
import React, { useEffect, useState } from "react";
import GradientBorder from "./GradientBorder";
import dynamic from "next/dynamic";
import { supabase } from "../supabaseClient";

const DashBoardNav = () => {
  const [userImage, setUserImage] = useState(null);
  const Image = dynamic(() => import("next/image"), { ssr: false });

  useEffect(() => {
    async function fetchUserData() {
      const currentUser = supabase.auth.user();

      if (currentUser) {
        const { data, error } = await supabase
          .from("users")
          .select("image")
          .eq("username", currentUser.username)
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
            <Image src={userImage} alt="User Image" width={40} height={40} />
          )}
        </div>
      </GradientBorder>
    </div>
  );
};

export default DashBoardNav;
