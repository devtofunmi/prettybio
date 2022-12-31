import React from "react";
import DashBoardNav from "../components/DashBoardNav";
import DashboardTabs from "../components/DashboardTabs";

const Dashboard = () => {
  return (
    <div className="overflow-y-hidden font-abc relative">
      <div className="sticky top-0 ">
        <DashBoardNav />
      </div>
      <div className="w-full flex">
        <div className=" w-2/5 h-screen p-20 shadow-md    hidden lg:block md:block">
          <iframe
            scrolling="no"
            className="w-60 h-4/5 rounded-2xl  border-gray-900 border-8 "
            src="https://bio.link/devtofunmi"
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
