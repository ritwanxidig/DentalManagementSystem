import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, json, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import httpCommon from "../http-common";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await httpCommon.post(`/Login`, values);
      if (response.status !== 200) {
        throw new Error(response.data);
      }
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      } else {
        alert("This Request doesnot reach the server !");
      }
      console.log(error);
    }
    setSubmitting(false);
  };

  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          Sign in
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email:
                </label>
                <Field
                  type="email"
                  name="email"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <ErrorMessage
                  name="email"
                  className="text-sm text-red-500"
                  component="div"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <ErrorMessage
                  name="password"
                  className="text-sm text-red-500"
                  component="div"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="text-purple-500 border-2 border-purple-500 w-full px-4 py-2 tracking-wide hover:text-white transition-colors duration-200 transform rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">Or</div>
        </div>
        <div className="flex mt-4 gap-x-2">{/* Social media buttons */}</div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            to={`/SignUp`}
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
