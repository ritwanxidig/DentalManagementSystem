import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as yup from "yup";

import { create, update } from "../../../ApiServices/CrudeApiCalls";

const validationSchema = yup.object().shape({
  patientName: yup
    .string()
    .required("Name is required")
    .min(4, "Please Provide proper noun"),
  age: yup
    .number()
    .required("age is required")
    .min(0, "please enter proper age"),
  sex: yup
    .string()
    .required("Please select Gender")
    .min(3, "Please select correct gender"),
  address: yup
    .string()
    .required("Address is required")
    .min(3, "please enter correct address"),
  phone_No: yup
    .string()
    .required("Phone No is required")
    .min(7, "Phone No must be at least 7 digits"),
  description: yup
    .string()
    .required("description is required")
    .min(7, "please enter correct description"),
});

const AddPatient = ({ onClose }) => {
  const initialValues = {
    patientName: "",
    sex: "",
    address: "",
    description: "",
    age: "",
    phone_No: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await create(`/Patients`, values)
        .then((res) => {
          alert(res);
          window.location.reload();
          onClose();
        })
        .catch((er) => {
          console.log(er);
        });
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
            <h1 className="text-2xl font-light">Add Patient</h1>
            <button
              className="h-10 w-10 rounded-full hover:bg-light-gray flex justify-center items-center"
              onClick={onClose}
            >
              <MdCancel />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center gap-4">
              <div className="mb-4">
                <label htmlFor="patientName" className="block mb-1 font-medium">
                  Patient Name
                </label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  onChange={handleChange}
                  value={values.patientName}
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                {errors.patientName && touched.patientName && (
                  <div component="div" name="patientName" className="text-red-500">
                    {errors.patientName}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block mb-1 font-medium">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                {errors.address && touched.address && (
                  <div component="div" name="address" className="text-red-500">
                    {" "}
                    {errors.address}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="sex" className="block mb-1 font-medium">
                Gender
              </label>
              <select
                id="sex"
                name="sex"
                value={values.sex}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">Select One</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.sex && touched.sex && (
                <div component="div" name="sex" className="text-red-500">
                  {" "}
                  {errors.sex}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center gap-4">
              <div className="mb-4">
                <label htmlFor="age" className="block mb-1 font-medium">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  value={values.age}
                  onChange={handleChange}
                  name="age"
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                {errors.age && touched.age && (
                  <div component="div" name="age" className="text-red-500">
                    {errors.age}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="phone_No" className="block mb-1 font-medium">
                  Phone No
                </label>
                <input
                  type="text"
                  id="phone_No"
                  value={values.phone_No}
                  onChange={handleChange}
                  name="phone_No"
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                {errors.phone_No && touched.phone_No && (
                  <div component="div" name="phone_No" className="text-red-500">
                    {errors.phone_No}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block mb-1 font-medium">
                  Description
                </label>
                <textarea
                  style={{minHeight:15}}
                  id="description"
                  value={values.description}
                  onChange={handleChange}
                  name="description"
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                {errors.description && touched.description && (
                  <div component="div" name="description" className="text-red-500">
                    {errors.description}
                  </div>
                )}
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

export default AddPatient;
