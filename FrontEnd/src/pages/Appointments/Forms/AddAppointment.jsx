import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as yup from "yup";

import { create, getAll, update } from "../../../ApiServices/CrudeApiCalls";
import { useStateContext } from "../../../contexts/AppContext";

const validationSchema = yup.object().shape({
  patientId: yup.number().required("Please select patient"),
  doctorId: yup.number().required("Please select doctor"),
  ticketPrice: yup
    .number()
    .typeError("please enter valid Price")
    .min(0, "Price can no be less than 0")
    .required("Please enter price"),
});

const AddAppointment = ({ onClose }) => {
  const [DoctorsData, setDoctorsData] = useState(null);
  const [PatientsData, setPatientsData] = useState(null);
  const [INo, setINo] = useState(Math.floor(100000 + Math.random() * 900000));

  const { setError, setErrorMessage } = useStateContext();

  useEffect(() => {
    getAll("/Doctors")
      .then((res) => {
        if (res.message || res.response) {
          setError(true);
          setErrorMessage(res.message);
          return;
        }
        setDoctorsData(res);
      })
      .catch((er) => {
        setError(true);
        setErrorMessage(er);
        console.log(er);
      });

    getAll("/Patients")
      .then((res) => {
        if (res.message || res.response) {
          setError(true);
          setErrorMessage(res.message);
          return;
        }
        setPatientsData(res);
      })
      .catch((er) => {
        setError(true);
        setErrorMessage(er);
        console.log(er);
      });
  }, []);

  const initialValues = {
    patientId: 0,
    doctorId: 0,
    ticketPrice: 0,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await create(`/Appointments`, {
        patientId: values.patientId,
        doctorId: values.doctorId,
        ticketPrice: values.ticketPrice,
        invoiceNo: `AN${values.doctorId + INo.toString()}`,
      })
        .then((res) => {
          if (res.response || res.message) {
            setErrorMessage(res.response.data);
            return;
          }
        })
        .catch((er) => {
          console.log(er);
        });

      await create("/Invoices", {
        invoice_No: `AN${values.doctorId + INo.toString()}`,
        total: values.ticketPrice,
        status: "Pending",
        paymentType: "",
      })
        .then((res) => {
          if (res.response || res.message) {
            setError(true);
            setErrorMessage(res.response.data);
            return;
          }
          onClose();
        })
        .catch((er) => {
          setError(true);
          setErrorMessage(er.message);
          console.log(er);
        });
      alert("saved Successfully");
      window.location.reload();
    },
  });

  const { handleChange, handleSubmit, values, touched, errors } = formik;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center form w-2/3`}
      style={{ position: "absolute", zIndex: 1000000 }}
    >
      <div className="bg-white max-w-md mx-auto rounded shadow-2xl drop-shadow-2xl overflow-hidden">
        <div className="p-12">
          <div className="flex justify-between items-center mb-2 border-b-2 my-3 -mt-8">
            <h1 className="text-2xl font-light">Add Appointment</h1>
            <button
              className="h-10 w-10 rounded-full hover:bg-light-gray flex justify-center items-center"
              onClick={onClose}
            >
              <MdCancel />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center gap-4 mt-8">
              <div className="mb-4 flex flex-col w-full">
                <label htmlFor="patientId" className="block mb-1 font-medium">
                  Patient
                </label>
                <select
                  id="patientId"
                  name="patientId"
                  onChange={handleChange}
                  value={values.patientId}
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select One</option>
                  {PatientsData && PatientsData.length > 0 ? (
                    PatientsData.map((d) => (
                      <option value={d.id} key={d.id}>
                        {d.patientName}
                      </option>
                    ))
                  ) : (
                    <option value="">No Patients</option>
                  )}
                </select>
                {errors.patientId && touched.patientId && (
                  <div
                    component="div"
                    name="patientId"
                    className="text-red-500"
                  >
                    {errors.patientId}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4 flex flex-col w-full">
              <label htmlFor="doctorId" className="block mb-1 font-medium">
                Doctor
              </label>
              <select
                id="doctorId"
                name="doctorId"
                value={values.doctorId}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">Select One</option>
                {DoctorsData && DoctorsData.length > 0 ? (
                  DoctorsData.map((d) => (
                    <option value={d.id} key={d.id}>
                      {d.user.name}
                    </option>
                  ))
                ) : (
                  <option> No Doctors </option>
                )}
              </select>

              {errors.doctorId && touched.doctorId && (
                <div component="div" name="doctorId" className="text-red-500">
                  {errors.doctorId}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center gap-4">
              <div className="mb-4">
                <label htmlFor="ticketPrice" className="block mb-1 font-medium">
                  Ticket Price
                </label>
                <input
                  type="number"
                  id="ticketPrice"
                  name="ticketPrice"
                  value={values.ticketPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                {errors.ticketPrice && touched.ticketPrice ? (
                  <div
                    component="div"
                    name="ticketPrice"
                    className="text-red-500"
                  >
                    {errors.ticketPrice}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-4 flex justify-center items-center">
              <button
                type="submit"
                className="px-4 py-2 bg- hover:bg-blue-500 rounded transition"
              >
                Submit
              </button>
              <button
                type="button"
                className="ml-2 px-4 py-2 rounded bg-red-500 text-gray-700 hover:bg-red-500 hover:text-red-100 transition"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAppointment;
