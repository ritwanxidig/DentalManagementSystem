import React from "react";
import FormComponent from "./components/FormComponent";
import { useFormik } from "formik";
import * as yup from "yup";

import { useStateContext } from "../../contexts/AppContext";

const validSchema = yup.object().shape({
  startDate: yup.date().required("Start Date Is required"),
  endDate: yup.date().required("End Date Is required"),
});

const ReportHomePage = () => {
  const { Role } = useStateContext();

  const FormikPatient = useFormik({
    initialValues: { startDate: "", endDate: "" },
    validationSchema: validSchema,
    onSubmit: (values, { resetForm }) => {
      const queryString = new URLSearchParams({
        date1: values.startDate,
        date2: values.endDate,
      });
      resetForm();
      window.location.href = `/reports/patients?${queryString}`;
    },
  });

  const FormikPrescription = useFormik({
    initialValues: { startDate: "", endDate: "" },
    validationSchema: validSchema,
    onSubmit: (values, { resetForm }) => {
      const queryString = new URLSearchParams({
        date1: values.startDate,
        date2: values.endDate,
      });
      resetForm();
      window.location.href = `/reports/prescriptions?${queryString}`;
    },
  });

  const FormikTreatments = useFormik({
    initialValues: { startDate: "", endDate: "" },
    validationSchema: validSchema,
    onSubmit: (values, { resetForm }) => {
      const queryString = new URLSearchParams({
        date1: values.startDate,
        date2: values.endDate,
      });
      resetForm();
      window.location.href = `/reports/Treatments?${queryString}`;
    },
  });

  const FormikAppointments = useFormik({
    initialValues: { startDate: "", endDate: "" },
    validationSchema: validSchema,
    onSubmit: (values, { resetForm }) => {
      const queryString = new URLSearchParams({
        date1: values.startDate,
        date2: values.endDate,
      });
      resetForm();
      window.location.href = `/reports/Appointments?${queryString}`;
    },
  });

  const FormikInvoices = useFormik({
    initialValues: { startDate: "", endDate: "" },
    validationSchema: validSchema,
    onSubmit: (values, { resetForm }) => {
      const queryString = new URLSearchParams({
        date1: values.startDate,
        date2: values.endDate,
      });
      resetForm();
      window.location.href = `/reports/invoices?${queryString}`;
    },
  });
  return (
    <div className="control-pane m-2 md:mx-10 p-2 md:p-10 bg-white drop-shadow-xl rounded-lg">
      <div className="p-4 flex justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Reports</h1>
          <h6 className="my-2 text-sm text-gray-500">Page</h6>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <FormComponent title="Patients" formik={FormikPatient} />
        <FormComponent title="Prescriptions" formik={FormikPrescription} />
        <FormComponent title="Treatments" formik={FormikTreatments} />
        <FormComponent title="Appointments" formik={FormikAppointments} />
        {Role === "Admin" ? (
          <FormComponent title="Invoices" formik={FormikInvoices} />
        ) : null}
      </div>
    </div>
  );
};

export default ReportHomePage;
