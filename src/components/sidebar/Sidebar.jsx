import React, { useContext } from "react";
import { NavLink } from "react-router-dom"; //react router dom
import { TbSettingsStar } from "react-icons/tb"; //react icons
import { HiUsers } from "react-icons/hi"; //react icons
import { FaRegNewspaper } from "react-icons/fa6"; //react icons
import { ImBlogger2 } from "react-icons/im"; //react icons
import { GrResources } from "react-icons/gr"; //react icons
import { BiCategory } from "react-icons/bi"; //react icons
import { ValueContext } from "../wrapper/Wrapper"; //react icons
import { TbDeviceIpadMinus } from "react-icons/tb"; //react icons

const Sidebar = () => {
  const { sidebarToggle } = useContext(ValueContext);

  return (
    <div
      className={`bg-[#001529] ${
        sidebarToggle ? "w-[6%]" : "w-1/5"
      } h-full text-[#b4b4b6] px-2 duration-1000 ease-linear`}
    >
      <h2
        className={`hover:text-white ${
          sidebarToggle ? "px-0" : "px-6"
        } text-[24px] font-medium leading-[40px] mt-3 py-2 cursor-pointer`}
      >
        {sidebarToggle ? (
          <TbDeviceIpadMinus className="mx-auto text-red-600 text-[36px]" />
        ) : (
          "UzLoyalAdmin"
        )}
      </h2>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? `flex items-center gap-[10px] ${
                sidebarToggle ? "px-3 py-2" : "px-6 py-2"
              } my-[6px] rounded-[10px] bg-[#1677ff] text-white`
            : `flex items-center gap-[10px] ${
                sidebarToggle ? "px-3 py-2" : "px-6 py-2"
              } my-[6px] hover:text-white`
        }
        to="/categories"
      >
        <BiCategory className={`text-[22px] ${sidebarToggle && "mx-auto"}`} />
        {!sidebarToggle && <span>Categories</span>}
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? `flex items-center gap-[10px] ${
                sidebarToggle ? "px-3 py-2" : "px-6 py-2"
              } my-[6px] rounded-[10px] bg-[#1677ff] text-white`
            : `flex items-center gap-[10px] ${
                sidebarToggle ? "px-3 py-2" : "px-6 py-2"
              } my-[6px] hover:text-white`
        }
        to="/faqs"
      >
        <HiUsers className={`text-[22px] ${sidebarToggle && "mx-auto"}`} />
        {!sidebarToggle && <span>Faqs</span>}
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? `flex items-center gap-[10px] ${
                sidebarToggle ? "px-3 py-2" : "px-6 py-2"
              } my-[6px] rounded-[10px] bg-[#1677ff] text-white`
            : `flex items-center gap-[10px] ${
                sidebarToggle ? "px-3 py-2" : "px-6 py-2"
              } my-[6px] hover:text-white`
        }
        to="/news"
      >
        <FaRegNewspaper
          className={`text-[22px] ${sidebarToggle && "mx-auto"}`}
        />
        {!sidebarToggle && <span>News</span>}
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? `flex items-center gap-[10px] ${
                sidebarToggle ? "px-3 py-2" : "px-6 py-2"
              } my-[6px] rounded-[10px] bg-[#1677ff] text-white`
            : `flex items-center gap-[10px] ${
                sidebarToggle ? "px-3 py-2" : "px-6 py-2"
              } my-[6px] hover:text-white`
        }
        to="/blogs"
      >
        <ImBlogger2 className={`text-[22px] ${sidebarToggle && "mx-auto"}`} />
        {!sidebarToggle && <span>Blogs</span>}
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? `flex items-center gap-[10px] ${
                sidebarToggle ? "px-3 py-2" : "px-6 py-2"
              } my-[6px] rounded-[10px] bg-[#1677ff] text-white`
            : `flex items-center gap-[10px] ${
                sidebarToggle ? "px-3 py-2" : "px-6 py-2"
              } my-[6px] hover:text-white`
        }
        to="/services"
      >
        <TbSettingsStar
          className={`text-[22px] ${sidebarToggle && "mx-auto"}`}
        />
        {!sidebarToggle && <span>Services</span>}
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? `flex items-center gap-[10px] ${
                sidebarToggle ? "px-3 py-2" : "px-6 py-2"
              } my-[6px] rounded-[10px] bg-[#1677ff] text-white`
            : `flex items-center gap-[10px] ${
                sidebarToggle ? "px-3 py-2" : "px-6 py-2"
              } my-[6px] hover:text-white`
        }
        to="/sources"
      >
        <GrResources className={`text-[22px] ${sidebarToggle && "mx-auto"}`} />
        {!sidebarToggle && <span>Sources</span>}
      </NavLink>
    </div>
  );
};

export default Sidebar;
