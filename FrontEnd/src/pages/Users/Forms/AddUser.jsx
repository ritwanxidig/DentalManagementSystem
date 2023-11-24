import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as yup from "yup";

import { create, update } from "../../../ApiServices/CrudeApiCalls";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  name: yup.string().required("Name Type is required"),
  role: yup.string().required("Please select valid Role"),
  avatar: yup.mixed().required("Please select valid Image"),
  password: yup
    .string()
    .required("Please enter strong Password")
    .min(4, "Password must be at least 4 digits"),
});

const AddUser = ({ onClose }) => {
  const [uploadedImage, setuploadedImage] = useState(undefined);
  const initialValues = {
    name: "",
    role: "",
    email: "",
    avatar: "vzcxv",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (uploadedImage) {
        const formData = new FormData();
        formData.append("image", uploadedImage, values.name);
        values.avatar = values.name;
        await create(`/Image/SaveImage/Users`, formData);
        await create(`/Users`, values)
          .then((res) => {
            alert(res);
            window.location.reload();
            onClose();
          })
          .catch((er) => {
            console.log(er);
          });
      }
    },
  });

  const { handleChange, handleSubmit, values, touched, errors } = formik;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center form w-full`}
      style={{ position: "absolute", zIndex: 1000000 }}
    >
      <div className="bg-white max-w-2xl mx-auto rounded shadow-2xl drop-shadow-2xl overflow-hidden">
        <div className="p-12">
          <div className="flex justify-between items-center mb-2 border-b-2 my-3 -mt-8">
            <h1 className="text-2xl font-light">Add User</h1>
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
                  Name
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
                <label htmlFor="email" className="block mb-1 font-medium">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                {errors.email && touched.email && (
                  <div component="div" name="email" className="text-red-500">
                    {" "}
                    {errors.email}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block mb-1 font-medium">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={values.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">Select One</option>
                <option value="Admin">Admin</option>
                <option value="Reception">Reception</option>
                <option value="Doctor">Doctor</option>
              </select>
              {errors.role && touched.role && (
                <div component="div" name="role" className="text-red-500">
                  {" "}
                  {errors.role}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center gap-4">
              <div className="mb-4">
                <label htmlFor="avatar" className="block mb-1 font-medium">
                  Avatar
                </label>
                <input
                  type="file"
                  id="avatar"
                  onChange={(e) => setuploadedImage(e.target.files[0])}
                  name="avatar"
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                {errors.avatar && touched.avatar && (
                  <div component="div" name="avatar" className="text-red-500">
                    {errors.avatar}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block mb-1 font-medium">
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                {errors.password && touched.password && (
                  <div component="div" name="password" className="text-red-500">
                    {errors.password}
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

export default AddUser;
