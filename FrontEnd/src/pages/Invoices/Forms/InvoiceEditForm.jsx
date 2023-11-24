import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { get } from "../../../ApiServices/InvoicesApiCalls";
import { update } from "../../../ApiServices/CrudeApiCalls";

const InvoiceEditForm = ({ onClose, selectedInvoice }) => {
  const initialValues = {
    totalPrice: selectedInvoice.total,
    paymentType: selectedInvoice.paymentType,
  };

  useEffect(() => {}, []);

  const validationSchema = Yup.object({
    totalPrice: Yup.number().required("Total Price is required"),
    paymentType: Yup.string().required("Payment Type is required"),
  });

  const onSubmit = (values) => {
    if (values.paymentType === "Series") {
      update(`/Invoices/${selectedInvoice.id}`, {
        status: "Series",
        paymentType: values.paymentType,
      })
        .then((res) => {
          alert("Updates this Invoice");
          window.location.reload();
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      update(`/Invoices/${selectedInvoice.id}`, {
        status: "Paid",
        paymentType: values.paymentType,
      })
        .then((res) => {
          alert("Paid this Invoice");
          window.location.reload();
        })
        .catch((er) => {
          console.log(er);
        });
    }
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
                <label htmlFor="totalPrice" className="block mb-1 font-medium">
                  Total Price
                </label>
                <Field
                  type="number"
                  id="totalPrice"
                  name="totalPrice"
                  className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                  disabled
                />
                <ErrorMessage
                  component="div"
                  name="totalPrice"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="paymentType" className="block mb-1 font-medium">
                  Payment Type
                </label>
                <Field
                  as="select"
                  id="paymentType"
                  name="paymentType"
                  className="w-full px-3 py-2 border-2 bg-gray-300 rounded focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select Payment Type</option>
                  <option value="Zaad">ZAAD</option>
                  <option value="e-Dahab">e-DAHAB</option>
                  <option value="Cash">Cash</option>
                  <option value="Series">Series</option>
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

export default InvoiceEditForm;
