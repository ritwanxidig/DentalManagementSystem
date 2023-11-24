import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";

import { create, getAll, update } from "../../../ApiServices/CrudeApiCalls";

const validationSchema = Yup.object().shape({
  phoneNo: Yup.string()
    .required("Phone No is required")
    .min(5, "Please enter at lease 6 digits"),
  speciality: Yup.string()
    .required("Speciality is required")
    .min(4, "Please enter valid speciality"),
  userId: Yup.number()
    .typeError("please select")
    .required("Please select valid user")
    .min(0, "please select valid"),
});

const AddDoctor = ({ onClose }) => {
  const [UsersData, setUsersData] = useState(null);

  useEffect(() => {
    getAll("/Users")
      .then((res) => {
        setUsersData(res);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);
  const initialValues = {
    userId: 0,
    speciality: "",
    phoneNo: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await create(`/Doctors`, values)
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
            <h1 className="text-2xl font-light">Add Doctor</h1>
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
                <label htmlFor="userId" className="block mb-1 font-medium">
                  User
                </label>
                <select
                  id="userId"
                  name="userId"
                  onChange={handleChange}
                  value={values.userId}
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select One</option>
                  {UsersData && UsersData.length > 0 ? (
                    UsersData.map((d) => (
                      <option value={d.id} key={d.id}>
                        {d.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Users</option>
                  )}
                </select>
                {errors.userId && touched.userId && (
                  <div component="div" name="userId" className="text-red-500">
                    {errors.userId}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4 flex flex-col w-full">
              <label htmlFor="phoneNo" className="block mb-1 font-medium">
                Secondary Phone
              </label>
              <input
                id="phoneNo"
                name="phoneNo"
                value={values.phoneNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
              />

              {errors.phoneNo && touched.phoneNo && (
                <div component="div" name="phoneNo" className="text-red-500">
                  {errors.phoneNo}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center gap-4">
              <div className="mb-4">
                <label htmlFor="speciality" className="block mb-1 font-medium">
                  Speciality
                </label>
                <input
                  type="text"
                  id="speciality"
                  name="speciality"
                  value={values.speciality}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                {errors.speciality && touched.speciality && (
                  <div
                    component="div"
                    name="speciality"
                    className="text-red-500"
                  >
                    {errors.speciality}
                  </div>
                )}
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

export default AddDoctor;
