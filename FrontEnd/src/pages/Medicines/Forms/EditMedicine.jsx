import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as yup from "yup";

import { update } from "../../../ApiServices/CrudeApiCalls";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(4, "Please Provide proper noun"),
  manufacturer: yup
    .string()
    .required("manufacturer is required")
    .min(0, "please enter correct manufacturer"),
  dosage: yup
    .string()
    .required("please enter dosage")
    .min(3, "dosage must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(3, "description must be at least 10 characters"),
});

const EditMedicine = ({ onClose, selectedMedicine }) => {
  const initialValues = {
    name: selectedMedicine.name,
    manufacturer: selectedMedicine.manufacturer,
    dosage: selectedMedicine.dosage,
    description: selectedMedicine.description,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await update(`/Medicines/${selectedMedicine.id}`, values)
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

  useEffect(() => {
    formik.setFieldValue({
      name: selectedMedicine.name,
      manufacturer: selectedMedicine.manufacturer,
      dosage: selectedMedicine.dosage,
      description: selectedMedicine.description,
    });
  }, [selectedMedicine]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center form w-2/3`}
      style={{ position: "absolute", zIndex: 1000000 }}
    >
      <div className="bg-white max-w-md mx-auto rounded shadow-2xl drop-shadow-2xl overflow-hidden">
        <div className="p-12">
          <div className="flex justify-between items-center mb-2 border-b-2 my-3 -mt-8">
            <h1 className="text-2xl font-light">Edit Medicine</h1>
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
                <label htmlFor="name" className="block mb-1 font-medium">
                  Medicine Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                {errors.name && touched.name && (
                  <div component="div" name="name" className="text-red-500">
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="manufacturer"
                  className="block mb-1 font-medium"
                >
                  Manufacturer
                </label>
                <input
                  type="text"
                  id="manufacturer"
                  name="manufacturer"
                  value={values.manufacturer}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                {errors.manufacturer && touched.manufacturer && (
                  <div
                    component="div"
                    name="manufacturer"
                    className="text-red-500"
                  >
                    {errors.manufacturer}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="dosage" className="block mb-1 font-medium">
                Dosage
              </label>
              <textarea
                id="dosage"
                name="dosage"
                value={values.dosage}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
              />

              {errors.dosage && touched.dosage && (
                <div component="div" name="dosage" className="text-red-500">
                  {errors.dosage}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center gap-4"></div>
            <div className="mb-4">
              <label htmlFor="description" className="block mb-1 font-medium">
                Description
              </label>
              <textarea
                style={{ minHeight: 15 }}
                id="description"
                value={values.description}
                onChange={handleChange}
                name="description"
                className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
              />
              {errors.description && touched.description && (
                <div
                  component="div"
                  name="description"
                  className="text-red-500"
                >
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

export default EditMedicine;
