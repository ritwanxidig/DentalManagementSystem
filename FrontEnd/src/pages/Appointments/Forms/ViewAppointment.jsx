import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { Badge } from "@material-tailwind/react";
import { selfClosingTags } from "@syncfusion/ej2-react-richtexteditor";

const ViewAppointment = ({ onClose, selectedAppointment }) => {
  const primaryColor = () => {
    if (selectedAppointment.status == "Pending") return "yellow-500";
    if (selectedAppointment.status == "Progress") return "blue-500";
    if (selectedAppointment.status == "Completed") return "green-500";
  };
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center form`}
      style={{ position: "absolute", zIndex: 1000000 }}
    >
      <div className="bg-white max-w-5xl mx-auto rounded shadow-2xl drop-shadow-2xl overflow-hidden">
        <div className="px-4 pb-12">
          <div className="flex justify-between items-center mb-2 border-b-2 my-3">
            <h1 className="text-2xl font-light">Appointment Details</h1>
            <button
              className="h-10 w-10 rounded-full hover:bg-light-gray flex justify-center items-center"
              onClick={onClose}
            >
              <MdCancel />
            </button>
          </div>
          <div className="flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-6xl">
                {selectedAppointment.appointmentNumber}
              </h2>
              <h2>Appointment Data </h2>
              <h5
                className={`px-4 py-1.5 rounded-full text-white bg-${primaryColor()}`}
              >
                {selectedAppointment.status}
              </h5>
            </div>
            <div className="flex flex-col justify-start mt-4 gap-2">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-light">Patient Data</h1>
                <table className="w-full">
                  <thead>
                    <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Age</th>
                      <th className="px-4 py-3">Gender</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 border">
                        {selectedAppointment.patient.patientName}
                      </td>
                      <td className="px-4 py-3 border">
                        {selectedAppointment.patient.age}
                      </td>
                      <td className="px-4 py-3 border">
                        {selectedAppointment.patient.sex}
                      </td>
                      <td className="px-4 py-3 border">
                        {selectedAppointment.patientStatus}
                      </td>
                      <td className="px-4 py-3 border">
                        <div
                          className="inline break-words"
                          style={{
                            inlineSize: "650px",
                            overflowWrap: "break-word",
                          }}
                        >
                          <span className="mx-4 text-black font-medium">
                            {selectedAppointment.patient.description}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-light">Doctor Data</h1>
                <table className="w-full">
                  <thead>
                    <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Speciality</th>
                      <th className="px-4 py-3">Phone No</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 border">
                        {selectedAppointment.doctor.user.name}
                      </td>
                      <td className="px-4 py-3 border">
                        {selectedAppointment.doctor.speciality}
                      </td>
                      <td className="px-4 py-3 border">
                        {selectedAppointment.doctor.phoneNo}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h1 className="px-2 ">
                Ticket Price:{" "}
                <span className={`font-bold mx-4 text-${primaryColor()} capitalize`}>
                  {selectedAppointment.ticketPrice}
                </span>
              </h1>
              <h1 className="px-2 ">
                Invoice No:{" "}
                <span className={`font-bold mx-4 text-${primaryColor()} capitalize`}>
                  {selectedAppointment.invoice_No}
                </span>
              </h1>
              <h1 className="px-2 ">
                Created Date:{" "}
                <span className={`font-bold mx-4 text-${primaryColor()} capitalize`}>
                  {selectedAppointment.createdAt}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointment;
