import React, { createContext, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Layout from "../layout/Layout";

export const ValueContext = createContext();

const Wrapper = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  return (
    <div className="flex max-w-[1280px] mx-auto w-full h-[725px]">
      <ValueContext.Provider value={{ sidebarToggle, setSidebarToggle }}>
        <Sidebar />
        <Layout />
      </ValueContext.Provider>
    </div>
  );
};

export default Wrapper;
