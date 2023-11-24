import React from "react";
import { MdCheck } from "react-icons/md";
import { update } from "../../../../ApiServices/CrudeApiCalls";

const AppointmentCard = ({ patient, No, patientStatus, status, date, id }) => {
  const createdDate = new Date(date);
  const day = createdDate.getDate().toString().padStart(2, "0");
  const month = (createdDate.getMonth() + 1).toString().padStart(2, "0");
  const year = createdDate.getFullYear().toString().slice(-2);
  const hours = createdDate.getHours().toString().padStart(2, "0");
  const minutes = createdDate.getMinutes().toString().padStart(2, "0");
  const seconds = createdDate.getSeconds().toString().padStart(2, "0");

  const formattedDate = day + "-" + month + "-" + year;
  const formattedTime = hours + ":" + minutes + ":" + seconds;

  const approveApps = () => {
    update(`Appointments/ChangeStatus/${id}`, {
      status: "Progress",
    })
      .then((res) => {
        alert(res);
        window.location.reload();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <div
      className={`flex flex-col w-full p-2 bg-gradient-to-tr rounded  text-white font-medium ${
        patientStatus === "Old"
          ? "from-blue-500 to-purple-500"
          : "from-red-500 to-pink-500"
      }`}
    >
      <h1 className="text-5xl font-black">{No}</h1>
      <h1 className="text-lg  mt-4 capitalize" title="name">
        {patient.patientName}
      </h1>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-300 capitalize" title="gender">
            {patient.sex}
          </p>
          <p className="text-sm text-gray-300" title="Age">
            Age: {patient.age}
          </p>
          <p className="text-sm text-gray-300" title="date">
            {formattedDate + " " + formattedTime}
          </p>
        </div>
        <button
          className={`px-4 text-2xl ${
            status === "Progress" || status === "Completed" ? "hidden" : ""
          }`}
          onClick={approveApps}
        >
          <MdCheck className="stroke-2 hover:bg-blue-500 hover:stroke-none transition duration-500 " />
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
