import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { get } from "../../../ApiServices/InvoicesApiCalls";
import { create } from "../../../ApiServices/CrudeApiCalls";

const AddPayment = ({ onClose, selectedInvoice }) => {
  const initialValues = {
    paidAmount: 0,
    paymentType: "",
  };

  useEffect(() => {}, []);

  const validationSchema = Yup.object({
    paidAmount: Yup.number()
      .required("Payment Amount is required")
      .min(1, "Paid Amount can not be 0 or less than 0"),
    paymentType: Yup.string().required("Payment Type is required"),
  });

  const onSubmit = (values) => {
    console.log(selectedInvoice.invoice_No);
    create(`/Payments`, {
      invoiceNo: selectedInvoice.invoice_No,
      paidAmount: values.paidAmount,
      paymentType: values.paymentType,
    })
      .then((res) => {
        console.log(res);
        alert("Paid this Invoice");
        window.location.reload();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center form`}
      style={{ position: "absolute", zIndex: 1000000 }}
    >
      <div className="bg-white max-w-md mx-auto rounded shadow-2xl drop-shadow-2xl overflow-hidden">
        <div className="p-12">
          <h2 className="text-2xl font-bold mb-4">Add Payment Details</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="mb-4">
                <label htmlFor="paidAmount" className="block mb-1 font-medium">
                  Paid Amount
                </label>
                <Field
                  type="number"
                  id="paidAmount"
                  name="paidAmount"
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  component="div"
                  name="paidAmount"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="paymentType" className="block mb-1 font-medium">
                  Payment Method
                </label>
                <Field
                  as="select"
                  id="paymentType"
                  name="paymentType"
                  className="w-full px-3 py-2 border-2 bg-gray-300 rounded focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select Payment Method</option>
                  <option value="Zaad">ZAAD</option>
                  <option value="e-Dahab">e-DAHAB</option>
                  <option value="Cash">Cash</option>
                </Field>
                <ErrorMessage
                  component="div"
                  name="paymentType"
                  className="text-red-500"
                />
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
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddPayment;
