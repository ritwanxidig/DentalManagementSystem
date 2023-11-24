import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
// import { userProfileData } from '../data/dummy';
import { useStateContext } from "../contexts/AppContext";
import avatar from "../data/images/avatar.jpg";

const Profile = () => {
  const { setIsClicked, User } = useStateContext();
  // const { currentColor } = useStateContext();

  const logOut = () => {
    localStorage.setItem("token", null);
    window.location.reload();
  };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={User ? User.avatar : avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200 capitalize">
            {" "}
            {User ? User.name : "Name"}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400 capitalize">
            {" "}
            {User ? User.role : "Role"}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            {User ? User.email : "Email"}
          </p>
        </div>
      </div>
      <div></div>
      <div className="mt-5">
        <button
          onClick={logOut}
          className="flex w-full bg-blue-500 py-2 justify-center text-white font-medium text-xl rounded-lg hover:bg-blue-600 transition duration-500"
        >
          {" "}
          LogOut{" "}
        </button>
      </div>
    </div>
  );
};

export default Profile;
