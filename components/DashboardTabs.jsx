import React, { useState } from "react";
import Analytics from "./Analytics";
import Bio from "./Bio";
import Links from "./Links";
import Settings from "./Settings";

const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState(1);

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

  return (
    <div className="flex flex-col lg:p-10 p-0 pt-5 md:p-5 ">
      <div className="flex w-full overflow-x-scroll">
        {tabButtons.map((tab, t) => (
          <div className="p-0  lg:p-5 md:p-1 text-lg lg:text-xl" key={t}>
            <button
              className={
                activeTab === tab.id
                  ? "text-text   rounded-md "
                  : "  text-gray-500 " + "relative"
              }
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
              <div
                className={`w-36 h-1 ${
                  activeTab === tab.id ? "bg-text " : "bg-transparent"
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>
      {/* <div className="w-96 h-1 bg-yellow-700"></div> */}
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
