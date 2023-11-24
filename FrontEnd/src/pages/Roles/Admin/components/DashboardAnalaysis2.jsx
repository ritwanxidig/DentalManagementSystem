import React from "react";

const DashboardAnalaysis2 = ({ list, title }) => {
  return (
    <div className="bg-gradient-to-br from-red-700 to-primary text-white drop-shadow-xl w-72 mx-8 md:-12 h-auto rounded">
      <div className="flex w-full bg-white text-red-700 p-4 justify-center rounded-t">
       
        <h1 className="text-xl font-medium">{title}</h1>
      </div>
      <div className="flex flex-col gap-3 my-5 px-2">
        {list && list.length > 0
          ? list.map((d, i) => (
              <div className="flex justify-between items-center mt-1 p-2.5 shadow-md rounded" key={i}>
                <p className="capitalize font-medium tracking-wide">{d.type}</p>
                <p className="font-medium">{d.quantity}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default DashboardAnalaysis2;
