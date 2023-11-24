import React from "react";
import { avatar } from "../../../data";
import { FaPhoneSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const DoctorCard = ({ Doctor }) => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center rounded-lg shadow-md bg-white p-4">
      <img src={Doctor ? Doctor.user.avatar : avatar} className="w-60 h-64 rounded-full" alt="" />
      <h1 className="text-xl font-medium">
        {Doctor ? Doctor.user.name : "Doctor Name"}
      </h1>
      <p className="text-md text-gray-400 font-light ml-3">
        {Doctor
          ? Doctor.speciality
          : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiistempora ipsam vero debitis velit dolorum minima"}
      </p>
      <div className="flex justify-between items-center w-full gap-2">
        <div className="flex items-center gap-2 shadow-md p-2 rounded-lg">
          <FaPhoneSquare className="w-6 h-6 text-primary" />
          <p>{Doctor ? Doctor.phoneNo : "+23435453"}</p>
        </div>
        <div className="flex items-center gap-2 shadow-md p-2 rounded-lg">
          <MdEmail className="w-6 h-6 text-primary" />
          <p className="font-poppins font-normal text-[13px] leading-[20.8px]">
            {Doctor ? Doctor.user.email : "Sample@gmail.com"}
          </p>
        </div>
      </div>
      {/* <Link
        to={``}
        className="flex w-full py-2 border-2 border-primary justify-center text-primary font-medium font-display rounded-lg hover:bg-primary hover:text-white transition-all hover:text-lg"
      >
        Book Now
      </Link> */}
    </div>
  );
};

export default DoctorCard;
