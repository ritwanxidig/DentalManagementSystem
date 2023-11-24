import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import {
  RiNotification3Line,
  RiChat3Line,
  RiShoppingCart2Line,
  RiMenu3Line,
} from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/AppContext";
import { avatar } from "../data";
import { Chat, Profile, Notification } from ".";
import { BiMenu } from "react-icons/bi";

const NavButton = ({ icon, customFun, color, dotColor, title }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFun}
      style={{ color }}
      className="relative p-3 rounded-full text-xl hover:bg-light-gray"
    >
      <span
        style={{ backgroundColor: dotColor }}
        className="absolute inline-flex rounded-full w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = (props) => {
  const {
    activeMenu,
    setactiveMenu,
    isClicked,
    handleClick,
    User,
    screenSize,
    setScreenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setactiveMenu(false);
    } else {
      setactiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setactiveMenu(!activeMenu);
  return (
    <div className="flex justify-between items-center p-2 md:mx-6 relative">
      <TooltipComponent content="Menu" position="BottomCenter">
        <button
          type="button"
          onClick={() => setactiveMenu(!activeMenu)}
          className={`relative p-3 rounded-full text-xl hover:bg-light-gray ${
            activeMenu === false ? " " : " hidden"
          } `}
        >
          <BiMenu />
        </button>
      </TooltipComponent>
      <div className="flex items-center">
        <TooltipComponent content="Profile" className="">
          <div
            onClick={() => handleClick("profile")}
            className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-light-gray"
          >
            <img src={User ? User.avatar : avatar} className="rounded-full w-8 h-8" alt="" />
            <span className="text-sm text-gray-500">
              {User ? User.role : "Role"}
            </span>
            <MdKeyboardArrowDown />
          </div>
        </TooltipComponent>
        {isClicked.chat && <Chat />}
        {isClicked.profile && <Profile />}
        {isClicked.notification && <Notification />}
      </div>
    </div>
  );
};

export default Navbar;
