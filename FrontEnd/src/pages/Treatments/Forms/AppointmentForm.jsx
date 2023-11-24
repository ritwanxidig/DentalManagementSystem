import React from "react";

import { FaEye, FaPlusCircle, FaPlusSquare } from "react-icons/fa";
import { update } from "../../../ApiServices/CrudeApiCalls";

const AppointmentForm = ({
  setAppointmentField,
  setPatientField,
  setComplientField,
  appointmentData,
  presctiptionData,
  PatientField,
  setPrescriptionField,
  setViewOpen,
  setPrescriptionFormIsOpen,
  AddComplient,
}) => {
  return (
    <div className="mb-2 border px-4 py-2 rounded flex-col w-full">
      <label
        htmlFor="appointment"
        className="block mb-2 text-sm font-medium text-gray"
      >
        Appointment Number
      </label>
      <select
        name="appointment"
        id="appointment"
        onChange={(e) => setAppointmentField(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
      >
        <option value="">Select One</option>
        {appointmentData && appointmentData.length > 0 ? (
          appointmentData.map((d) => (
            <option value={d.id} key={d.id}>
              {d.appointmentNumber}
            </option>
          ))
        ) : (
          <option value=""> No Appointments Today </option>
        )}
      </select>

      <label
        htmlFor="patient"
        className="block mb-2 text-sm font-medium text-gray mt-4"
      >
        Patient
      </label>
      <div className="flex justify-between gap-3">
        <input
          name="patient"
          id="patient"
          value={PatientField}
          onChange={(e) => e.target.value}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
          disabled
        />
        <button
          className="h-10 w-10 flex justify-center items-center rounded border-2 border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition duration-500"
          type="button"
          onClick={() => {
            setViewOpen(true);
          }}
        >
          <FaEye className="h-6 w-6" />
        </button>
      </div>

      <label
        htmlFor="CheifComplient"
        className="block mb-2 text-sm font-medium text-gray mt-4"
      >
        Cheif Complient
      </label>
      <textarea
        style={{ minHeight: 10 }}
        id="CheifComplient"
        onChange={(e) => setComplientField(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
      />
      <label
        htmlFor="prescription"
        className="block mb-2 mt-2 text-sm font-medium text-gray"
      >
        Prescription
      </label>
      <div className="flex  justify-between gap-2">
        <select
          name="prescription"
          id="prescription"
          onChange={(e) => setPrescriptionField(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
        >
          <option value="">Select One</option>
          {presctiptionData && presctiptionData.length > 0 ? (
            presctiptionData.map((d) => (
              <option value={d.id} key={d.id}>
                {d.prescriptionNumber}
              </option>
            ))
          ) : (
            <option value=""> No Prescriptions for the above patient </option>
          )}
        </select>

        <button
          className="h-10 w-10 flex justify-center items-center rounded border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white transition duration-500"
          type="button"
          onClick={() => {
            setPrescriptionFormIsOpen(true);
          }}
        >
          <FaPlusCircle className="h-6 w-6" />
        </button>
      </div>

      <button
        className="flex w-full border-2 border-blue-500 text-center text-blue-500 py-2 my-2 rounded justify-center items-center hover:bg-blue-600 hover:text-white transition duration-500"
        type="button"
        onClick={AddComplient}
      >
        Update
      </button>
    </div>
  );
};

export default AppointmentForm;
