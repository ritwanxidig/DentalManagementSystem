import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";

const ToPrintInvoice = ({
  onClose,
  selectedInvoice,
  MedicinesData,
  handleDeleteMedicine,
  SelectedPayments,
}) => {
  console.log(SelectedPayments);
  return (
    <div className="bg-white max-w-5xl mx-auto rounded overflow-hidden">
      <div className="px-4 pb-12">
        <div className="flex flex-col text-xl tracking-tight font-light py-2">
          <h1>Rejo Dental Clinic</h1>
          <h1>Date: {new Date().toLocaleDateString()}</h1>
          <h1>Address: Hargeisa, Near Hargeisa Group Hospital</h1>
          <hr className="mt-5 border-2" />
          <h1 className="text-md py-2 tracking-tight">
            Invoice Code:{" "}
            <span className="font-medium">{selectedInvoice.invoice_No}</span>
          </h1>
          <h1 className="text-md py-2 tracking-tight">
            Total Price:{" "}
            <span className="font-medium">{selectedInvoice.total}</span>
          </h1>
          {SelectedPayments && SelectedPayments.length > 0 ? (
            <div className="flex flex-col gap-4 items-start">
              <h1>Payments</h1>
              <table className="w-full">
                <thead>
                  <tr className="border-2">
                    <th className="border py-2 px-4 text-left text-sm">
                      Paid Amount
                    </th>
                    <th className="border py-2 px-4 text-left text-sm">
                      Payment Method
                    </th>
                    <th className="border py-2 px-4 text-left text-sm">
                      Remaining
                    </th>
                    <th className="border py-2 px-4 text-left text-sm">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {SelectedPayments && SelectedPayments.length > 0 ? (
                    SelectedPayments.map((d, i) => (
                      <tr
                        className="border-2 border-white hover:bg-transparent transition duration-500 bg-red-200"
                        key={d.i}
                      >
                        <td className="border-2 py-2 px-4 text-sm">
                          {d.paidAmount}
                        </td>
                        <td className="border-2 py-2 px-4 text-sm">
                          {d.paymentType}
                        </td>
                        <td className="border-2 py-2 px-4 text-sm">
                          {d.remaining}
                        </td>
                        <td className="border-2 py-2 px-4 text-sm">
                          {d.createdAt}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No Payments Data </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <h1 className="text-md py-2 tracking-tight">
                Payment Method:{" "}
                <span className="font-medium">
                  {selectedInvoice.paymentType}
                </span>
              </h1>
              <h1 className="text-md py-2 tracking-tight">
                Payment Status:{" "}
                <span className="font-medium">{selectedInvoice.status}</span>
              </h1>
            </div>
          ) : (
            <div>
              <h1 className="text-md py-2 tracking-tight">
                Payment Method:{" "}
                <span className="font-medium">
                  {selectedInvoice.paymentType}
                </span>
              </h1>
              <h1 className="text-md py-2 tracking-tight">
                Payment Status:{" "}
                <span className="font-medium">{selectedInvoice.status}</span>
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToPrintInvoice;
