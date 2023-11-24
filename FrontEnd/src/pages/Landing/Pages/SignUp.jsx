import React from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { Link, json, useNavigate } from "react-router-dom";
import Dashboard from "../../Dashboard";
import httpCommon from "../../../http-common";
import { useStateContext } from "../../../contexts/AppContext";

const ValidSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  name: Yup.string().required("Required"),
  profile: Yup.mixed().required("Required"),
  password: Yup.string().required("Required"),
});
const SignUp = () => {
  const initialValues = {
    email: "",
    password: "",
    profile: "",
    name: "",
  };
  const { Error, setError, ErrorMessage, setErrorMessage } = useStateContext();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ValidSchema,
    onSubmit: async () => {
      try {
        const response = await httpCommon.post(`/Users/Patient`, {
          name: values.name,
          email: values.email,
          password: values.password,
          avatar: values.profile,
        });
        if (response.status !== 201) {
          throw new Error(response.data);
        }
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/");
        window.location.reload();
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        } else {
          setErrorMessage("This Request doesnot reach the server !");
          alert("This Request doesnot reach the server !");
        }
        console.log(error);
      }
    },
  });
  const { handleSubmit, handleChange, values, touched, errors } = formik;
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name:
            </label>
            <input
              type="name"
              name="name"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <div name="name" className="text-sm text-red-500" component="div">
              {errors.name}
            </div>
          </div>

          <div>
            <label
              htmlFor="profile"
              className="block text-sm font-semibold text-gray-800"
            >
              Picture:
            </label>
            <input
              type="file"
              name="profile"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <div
              name="profile"
              className="text-sm text-red-500"
              component="div"
            >
              {errors.profile}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <div name="email" className="text-sm text-red-500" component="div">
              {errors.email}
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />

            <div
              name="password"
              className="text-sm text-red-500"
              component="div"
            >
              {" "}
              {errors.password}{" "}
            </div>
          </div>

          <button
            type="submit"
            className="text-purple-500 border-2 mt-4 border-purple-500 w-full px-4 py-2 tracking-wide hover:text-white transition-colors duration-200 transform rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
          >
            Submit
          </button>
        </form>

        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">Or</div>
        </div>
        <div className="flex mt-4 gap-x-2">{/* Social media buttons */}</div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Don't have an account?
          <Link
            to="/login"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
