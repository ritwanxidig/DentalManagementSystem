import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";

const ViewTreatment = ({
  onClose,
  selectedTreatment,
  MedicinesData,
  handleDeleteMedicine,
}) => {
  useEffect(() => { }, []);
  return (
    <div className="bg-white max-w-5xl mx-auto rounded overflow-hidden">
      <div className="px-4 pb-12">
        <div className="flex flex-col text-xl tracking-tight font-light py-2">
          <h1>Rejo Dental Clinic</h1>
          <h1>Date: {new Date().toLocaleDateString()}</h1>
          <h1>Address: Hargeisa, Near Hargeisa Group Hospital</h1>
          <hr className="mt-5 border-2" />
          <h1 className="text-md py-2 tracking-tight">
            Doctor:{" "}
            <span className="font-medium">
              {selectedTreatment.treatmentPlan.appointment.doctor.user.name}
            </span>
          </h1>
          <h1 className="text-md py-2 tracking-tight">
            Prescription Code:{"   "}
            <span className="font-medium">
              {selectedTreatment.prescription.prescriptionNumber}
            </span>
          </h1>
          <h1 className="text-md py-2 tracking-tight">
            Invoice Code:{"   "}
            <span className="font-medium">
              {selectedTreatment.treatmentPlan.invoiceNo}
            </span>
          </h1>
          <h1 className="text-md py-2 tracking-tight">
            Created Date:{"   "}
            <span className="font-medium">
              {selectedTreatment.createdAt}
            </span>
          </h1>
          <div className="flex justify-between items-center w-full gap-12 py-2">
            <h1 className="text-md font-medium">
              Patient:
              <span className="font-light capitalize">
                {selectedTreatment.prescription.patient.patientName}
              </span>
            </h1>
            <h2 className="text-md font-medium">
              Age:
              <span className="font-light capitalize">
                {selectedTreatment.prescription.patient.age}
              </span>
            </h2>
            <h2 className="text-md font-medium">
              Gender:
              <span className="font-light capitalize">
                {selectedTreatment.prescription.patient.sex}
              </span>
            </h2>
          </div>
          <h1 className="mt-12">Services</h1>
          <div>
            <table className="w-full">
              <thead>
                <tr className="border-2">
                  <th className="border py-2 px-4 text-left text-sm">Name</th>
                  <th className="border py-2 px-4 text-left text-sm">Price</th>
                  <th className="border py-2 px-4 text-left text-sm">
                    Quantity
                  </th>
                  <th className="border py-2 px-4 text-left text-sm">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedTreatment.treatmentPlan.treatmentPlanServices &&
                  selectedTreatment.treatmentPlan.treatmentPlanServices.length >
                  0 ? (
                  selectedTreatment.treatmentPlan.treatmentPlanServices.map(
                    (d, i) => (
                      <tr
                        className="border-2 border-white hover:bg-transparent transition duration-500 bg-red-200"
                        key={i}
                      >
                        <td className="border-2 py-2 px-4 text-sm">
                          {d.service.name}
                        </td>
                        <td className="border-2 py-2 px-4 text-sm">
                          {d.service.price}
                        </td>
                        <td className="border-2 py-2 px-4 text-sm">
                          {d.quantity}
                        </td>
                        <td className="border-2 py-2 px-4 text-sm">
                          {parseFloat(d.quantity) * parseFloat(d.service.price)}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td>No Medicines Data </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <h1 className="mt-12 tracking-tight">Total: <span className="font-medium">{selectedTreatment.treatmentPlan.totalPrice} $</span></h1>
          <h1 className="mt-12 tracking-tight">Clinical Features: <span className="">{selectedTreatment.clinicalFeatures}</span></h1>
          <h1 className="mt-12 tracking-tight">Notes: <span className="">{selectedTreatment.note}</span></h1>
        </div>
      </div>
    </div>
  );
};

export default ViewTreatment;
