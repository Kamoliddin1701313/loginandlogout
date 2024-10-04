import React, { useContext } from "react";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { ValueContext } from "../wrapper/Wrapper";

const Layout = () => {
  const { sidebarToggle } = useContext(ValueContext);

  return (
    <div
      className={`h-[725px] bg-[#4094f726] flex flex-col ${
        sidebarToggle ? "w-[94%]" : "w-[80%] duration-1000 ease-linear"
      }`}
    >
      <header className="sticky top-0 z-10">
        <Navbar />
      </header>
      <main className="flex-grow overflow-y-auto p-8">
        <Outlet />
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
