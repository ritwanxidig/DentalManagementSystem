import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { redirect, useParams } from "react-router-dom";
import { getAll } from "../../../ApiServices/CrudeApiCalls";
import { useStateContext } from "../../../contexts/AppContext";

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [patientData, setPatientData] = useState(null);
  const [DoctorsData, setDoctorsData] = useState([]);

  const initialValues = {
    name: "",
    age: "",
    sex: "",
    phoneNo: "",
    complaint: "",
    doctor: "",
  };

  //   const { setError, setErrorMessage, Error, ErrorMessage } = useStateContext();

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    age: Yup.number().required("Required").positive().integer(),
    sex: Yup.string().required("Required"),
    phoneNo: Yup.string().required("Required"),
    complaint: Yup.string().required("Required"),
  });

  const handlePatientFormSubmit = (values, { setSubmitting }) => {
    setCurrentStep(2);
    setPatientData(values);
    setSubmitting(false);
  };

  const handleAppointmentFormSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify({ ...patientData, ...values }, null, 2));
      setSubmitting(false);
    }, 400);
  };

  const { doctorId } = useParams();

  useEffect(() => {
    if (!doctorId) {
      redirect("/*");
    }
    getAll("Doctors").then((res) => {
      if (res.response) {
        setError(true);
        setErrorMessage(res.response.data);
        return;
      }
      setDoctorsData(res);
    });
  }, [doctorId]);
  console.log(DoctorsData);
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="transition-opacity">
            <h2 className="text-2xl font-bold">Patient Form:</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handlePatientFormSubmit}
            >
              <Form className="mt-5">
                <div>
                  <label htmlFor="name" className="block">
                    Name:
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="mt-3">
                  <label htmlFor="age" className="block">
                    Age:
                  </label>
                  <Field
                    id="age"
                    name="age"
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="mt-3">
                  <label htmlFor="sex" className="block">
                    Sex:
                  </label>
                  <Field
                    id="sex"
                    name="sex"
                    as="select"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage
                    name="sex"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="mt-3">
                  <label htmlFor="phoneNo" className="block">
                    Phone Number:
                  </label>
                  <Field
                    id="phoneNo"
                    name="phoneNo"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="phoneNo"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="mt-3">
                  <label htmlFor="complaint" className="block">
                    Complaint:
                  </label>
                  <Field
                    id="complaint"
                    name="complaint"
                    as="textarea"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="complaint"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="mt-5 flex gap-4">
                  <button
                    type="submit"
                    className="text-primary border-2 border-primary hover:bg-primary hover:text-white hover:text-xl font-medium transition-all p-2 rounded w-full"
                  >
                    Next
                  </button>
                  <button
                    type="submit"
                    className="text-primary border-2 border-primary hover:bg-primary hover:text-white hover:text-xl font-medium transition-all p-2 rounded w-full"
                  >
                    Next
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        );
      case 2:
        return (
          <div className="transition-opacity">
            <h2 className="text-2xl font-bold">Appointment Form:</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleAppointmentFormSubmit}
            >
              <Form className="mt-5">
                <div className="mt-3">
                  <label htmlFor="doctor" className="block">
                    Select Doctor:
                  </label>
                  <Field
                    id="doctor"
                    name="doctor"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                  />

                  <ErrorMessage
                    name="doctor"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="mt-5">
                  <button
                    type="submit"
                    className="text-primary border-2 border-primary hover:bg-primary hover:text-white hover:text-xl font-medium transition-all p-2 rounded w-full"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="w-1/2 p-5 bg-white rounded-lg shadow-md before:animate-spin">
        {renderStep()}
      </div>
    </div>
  );
};

export default BookingPage;
