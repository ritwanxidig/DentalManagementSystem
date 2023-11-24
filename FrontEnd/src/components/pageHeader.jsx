import React from "react";
import { Link } from "react-router-dom";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

const pageHeader = ({ title, icon, content, link }) => {
  return (
    <div className="p-4 flex justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <h6 className="my-2 text-sm text-gray-500">Page</h6>
      </div>
      <div
        content={content}
        className="bg-red-500 p-1 w-8 h-8 rounded-full flex items-center justify-center text-xl text-white"
      >
        <Link to={`/${link}/Add`}>{icon}</Link>
      </div>
    </div>
  );
};

export default pageHeader;
