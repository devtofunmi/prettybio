import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Analytics from "./Analytics";
import Bio from "./Bio";
import Links from "./Links";
import Settings from "./Settings";

const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const tabButtons = [
    {
      id: 1,
      title: "Links",
    },
    {
      id: 2,
      title: "Analytics",
    },
    {
      id: 3,
      title: "Settings",
    },
    {
      id: 4,
      title: "Bio",
    },
  ];
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex flex-col lg:p-10 p-0 pt-5 md:p-5">
      <div className="flex w-full overflow-x-scroll">
        {tabButtons.map((tab) => (
          <div className="p-0 lg:p-5 md:p-1 text-lg lg:text-xl" key={tab.id}>
            <button
              className={
                activeTab === tab.id
                  ? `${
                      currentTheme === "dark"
                        ? "text-text rounded-md"
                        : "text-black rounded-md"
                    }`
                  : `${
                      currentTheme === "dark"
                        ? "text-gray-500 relative"
                        : "text-gray-500"
                    }`
              }
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
              <div
                className={`w-36 h-1 ${
                  activeTab === tab.id
                    ? `${
                        currentTheme === "dark"
                          ? "bg-text"
                          : "bg-gray-500"
                      }`
                    : `${
                        currentTheme === "dark"
                          ? "bg-transparent"
                          : "bg-transparent"
                      }`
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>
      <div>
        {activeTab === 1 && <Links />}
        {activeTab === 2 && <Analytics />}
        {activeTab === 3 && <Settings />}
        {activeTab === 4 && <Bio />}
      </div>
    </div>
  );
};

export default DashboardTabs;
