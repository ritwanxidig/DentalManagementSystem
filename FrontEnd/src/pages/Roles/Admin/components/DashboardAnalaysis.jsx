import React from "react";

const DashboardAnalaysis = ({ title, data, Icon }) => {
  return (
    <div className="bg-gradient-to-r mb-2 from-red-700 to-primary flex justify-between items-center drop-shadow-xl p-5 rounded">
      <div className="">
        <h1 className="font-medium text-2xl tracking-tight text-white">
          {title}
        </h1>
        <p className="text-sm text-gray-100 font-thin tracking-widest">
          {data}
        </p>
      </div>
      <div className="text-4xl">{Icon}</div>
    </div>
  );
};

export default DashboardAnalaysis;
