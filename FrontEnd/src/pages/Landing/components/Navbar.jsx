import React, { useState } from "react";
import { Link } from "react-router-dom";

import { MdCancel, MdMenu } from "react-icons/md";
import { FaTeeth } from "react-icons/fa";

import { navLinks } from "../index";
import { useStateContext } from "../../../contexts/AppContext";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <div className="flex items-center">
        <FaTeeth className="w-[124px] h-[32px] text-primary" />
        <h1 className="text-3xl uppercase -ml-7 text-red-500 font-semibold">
          Rejo Dental Clinic
        </h1>
      </div>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-primary" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
      <Link to={`/login`} className="flex justify-center items-center rounded-full border-2 border-primary ml-8 font-display px-4 text-primary hover:text-white hover:bg-primary hover:text-lg hover:font-medium transition-all">Sign in</Link >

      <div className="sm:hidden flex flex-1 justify-end items-center">
        {toggle ? (
          <MdCancel
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />
        ) : (
          <MdMenu
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />
        )}

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-gradient-to-tr from-primary to-red-400 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                to={''}
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
