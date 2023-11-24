import { FaCalendar } from "react-icons/fa";
import React from "react";

const AnalaysisComponent = ({title, data, Icon}) => {
  return (
    <div className="p-4 bg-light-gray rounded shadow-md text-red-500 flex justify-between items-center w-full">
      <div>
        <h2 className="text-light text-sm text-black">{title}</h2>
        <h1 className="text-5xl font-medium mt-2">{data}</h1>
      </div>
     {Icon}
    </div>
  );
};

export default AnalaysisComponent;
