import React, { useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import { AiOutlineMenuFold } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { ValueContext } from "../wrapper/Wrapper";

const Navbar = () => {
  const { sidebarToggle, setSidebarToggle } = useContext(ValueContext);

  return (
    <div className="bg-white pl-14 pr-8 py-3 flex justify-between items-center">
      <button
        onClick={() => setSidebarToggle(!sidebarToggle)}
        className="bg-blue-600 rounded-[8px] px-3 py-2 hover:bg-blue-500"
      >
        <AiOutlineMenuFold className="text-white" />
      </button>
      <Tooltip title="LogOut" arrow>
        <button className="border-[1px] flex items-center text-[#3e3e3e] gap-3 border-[#e2e2e2] px-6 rounded-[10px] py-2">
          <FaRegUser />
          <span className="text-[20px] font-semibold">Admin</span>
        </button>
      </Tooltip>
    </div>
  );
};

export default Navbar;
