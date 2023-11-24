import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import React, { useEffect } from "react";
import { TbDental } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";

import {
  AdminPageLinks,
  DoctorPageLinks,
  PageLinks,
  ReceptionPageLinks,
} from "../data/Structures";
import { useStateContext } from "../contexts/AppContext";

const Sidebar = ({ IsDoctor }) => {
  const {
    activeMenu,
    activeLink,
    setactiveMenu,
    setactiveLink,
    screenSize,
    Role,
  } = useStateContext();

  const normalLinkStyle =
    "flex items-center  gap-2 p-3 hover:bg-light-gray m-2 mr-8 text-xl capitalize rounded-md";
  const activeLinkStyle =
    "flex items-center  gap-2 p-3 bg-red-600 text-white hover:bg-red-700 m-2 mr-8 text-xl capitalize rounded-md transition";

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" className="flex gap-1.5 py-2">
              <TbDental size="35" color="red" fill="red" />{" "}
              <span className="text-red-500 text-3xl font-extrabold">
                Dental Clinic
              </span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => {
                  setactiveMenu(!activeMenu);
                }}
                className="text-xl rounded-full hover:bg-light-gray p-3 mt-1 mr-3 block"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {IsDoctor
              ? DoctorPageLinks.map((link) => (
                  <div key={link.id}>
                    <Link
                      to={`/${link.id}`}
                      onClick={() => setactiveLink(link.title)}
                      className={
                        activeLink === link.title
                          ? activeLinkStyle
                          : normalLinkStyle
                      }
                    >
                      {link.icon} {link.title}
                    </Link>
                  </div>
                ))
              : Role === "Admin"
              ? AdminPageLinks.map((link) => (
                  <div key={link.id}>
                    <Link
                      to={`/${link.id}`}
                      onClick={() => setactiveLink(link.title)}
                      className={
                        activeLink === link.title
                          ? activeLinkStyle
                          : normalLinkStyle
                      }
                    >
                      {link.icon} {link.title}
                    </Link>
                  </div>
                ))
              : Role === "Reception"
              ? ReceptionPageLinks.map((link) => (
                  <div key={link.id}>
                    <Link
                      to={`/${link.id}`}
                      onClick={() => setactiveLink(link.title)}
                      className={
                        activeLink === link.title
                          ? activeLinkStyle
                          : normalLinkStyle
                      }
                    >
                      {link.icon} {link.title}
                    </Link>
                  </div>
                ))
              : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
