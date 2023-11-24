import React from "react";
import { FaCalendar, FaUserAlt, FaDollarSign } from "react-icons/fa";

import { getAll } from "../../../ApiServices/CrudeApiCalls";

import AppointmentCard from "./components/AppointmentCard";
import AnalaysisComponent from "./components/AnalaysisComponent";
import { useEffect, useState } from "react";

const DoctorHome = () => {
  const [PendingApps, setPendingApps] = useState([]);
  const [StatusField, setStatusField] = useState("All");
  const [error, seterror] = useState("");
  const [TotalApps, setTotalApps] = useState(0);
  const [TotalPatients, setTotalPatients] = useState(0);
  const [TotalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    getAll("/Appointments/doctor")
      .then((res) => {
        if (res.message || res.response) {
          console.log(res);
          return;
        }
        setTotalApps(res)
      })
      .catch((er) => {
        console.log(er);
      });

    getAll("/Appointments/doctor/patients")
      .then((res) => {
        setTotalPatients(res);
      })
      .catch((er) => {
        console.log(er);
      });

    getAll("Appointments/doctor/Income")
      .then((res) => {
        setTotalIncome(res);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  useEffect(() => {
    if (StatusField === "TodayPending") {
      getAll(`PendingAppointments/specificDoctor`)
        .then((res) => {
          setPendingApps(res);
          if (res.response.status == 400) {
            seterror(res.response.data);
          }
        })
        .catch((Er) => {
          console.log(Er);
        });
      return;
    }
    if (StatusField === "All") {
      getAll(`/Appointments/specificDoctor`)
        .then((res) => {
          setPendingApps(res);
          if (res.response.status == 400) {
            seterror(res.response.data);
          }
        })
        .catch((Er) => {
          console.log(Er);
        });
      return;
    }
    getAll(`/Appointments/Get/${StatusField}`)
      .then((res) => {
        setPendingApps(res);
        if (res.response.status == 400) {
          seterror(res.response.data);
        }
      })
      .catch((er) => {
        // seterror(er);
        console.log(er);
      });
  }, [StatusField]);

  return (
    <div>
      <div className="flex items-center gap-4 px-4 pb-4">
        <AnalaysisComponent
          title="Appointments"
          data={TotalApps}
          Icon={
            <FaCalendar className="w-12 h-12 bg-white p-2 rounded shadow-md" />
          }
        />

        <AnalaysisComponent
          title="Patients"
          data={TotalPatients}
          Icon={
            <FaUserAlt className="w-12 h-12 bg-white p-2 rounded shadow-md" />
          }
        />

        <AnalaysisComponent
          title="Income"
          data={TotalIncome.toLocaleString("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
          })}
          Icon={
            <FaDollarSign className="w-12 h-12 bg-white p-2 rounded shadow-md" />
          }
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mx-12">
          <div className="">

            <h1>Filter By Status: </h1>
          </div>
          <div className="flex-1">
            <select
              name="StatusField"
              id="StatusField"
              onChange={(e) => {
                setStatusField(e.target.value);
              }}
              className="bg-gray-50 w-52 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block p-2.5"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Progress">Progress</option>
              <option value="Completed">Completed</option>
              <option value="TodayPending">Today Pending</option>
            </select>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 border-2 bg-gradient-to-tr from-blue-500 to-purple-500"></div>
            <h1>Old Patient</h1>
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 border-2  bg-gradient-to-tr from-red-500 to-pink-500"></div>
            <h1>New Patient</h1>
          </div>
        </div>
        <div className="px-12">
          <h1 className="font-medium">
            Total: {PendingApps && PendingApps.length > 0 ? PendingApps.length : 0}
          </h1>
        </div>
      </div>
      <div className="grid md:grid-cols-4 mx-4 px-2 gap-3 mt-4 my-3">
        {PendingApps && PendingApps.length > 0 ? (
          PendingApps.map((d, i) => (
            <AppointmentCard
              key={i}
              No={d.appointmentNumber}
              patient={d.patient}
              patientStatus={d.patientStatus}
              status={d.status}
              date={d.createdAt}
              id={d.id}
            />
          ))
        ) : (
          <div className="flex w-full">{error}</div>
        )}
      </div>
    </div>
  );
};

export default DoctorHome;
