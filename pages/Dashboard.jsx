import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import DashBoardNav from "../components/DashBoardNav";
import DashboardTabs from "../components/DashboardTabs";
import { supabase } from "../supabaseClient";

const Dashboard = () => {
  const [userLinkName, setUserLinkName] = useState(null);
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  

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
    <div className="overflow-y-hidden font-abc relative">
      <div className="sticky top-0 ">
        <DashBoardNav />
      </div>
      <div className="w-full flex">
        <div
          data-aos="fade-right"
          className={`${
            currentTheme === "dark" ? "w-2/5 h-screen bg-[#303135] p-20 shadow-md    hidden lg:block md:block" : "w-2/5 h-screen bg-[#f8f8f8] p-20 shadow-lg    hidden lg:block md:block"
          } `}
         
        >
          <iframe
            scrolling="no"
            className="w-[260px] lg:h-[500px] md:h-3/6  rounded-3xl  border-[#222222] shadow-lg border-[10px] "
            src={`https://prettybio.netlify.app/${userLinkName}`}
          />
        </div>

        <div
          className="lg:w-3/5 w-full md:w-3/5 ml-0"
          // style={{
          //   marginLeft: "40%",
          // }}
        >
          <DashboardTabs />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
