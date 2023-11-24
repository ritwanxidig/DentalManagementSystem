import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";

const ViewMedicine = ({ onClose, selectedMedicine }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center form`}
      style={{ position: "absolute", zIndex: 1000000 }}
    >
      <div className="bg-white max-w-5xl mx-auto rounded shadow-2xl drop-shadow-2xl overflow-hidden">
        <div className="px-4 pb-12">
          <div className="flex justify-between items-center mb-2 border-b-2 my-3">
            <h1 className="text-2xl font-light">Medicine Details</h1>
            <button
              className="h-10 w-10 rounded-full hover:bg-light-gray flex justify-center items-center"
              onClick={onClose}
            >
              <MdCancel />
            </button>
          </div>
          <div className="flex-col justify-center items-center">
            <div>
              <img
                src={selectedMedicine.name}
                alt={`${selectedMedicine.name}'s Image`}
                className="h-64 w-64 rounded-full"
              />
            </div>
            <div className="flex justify-center items-center">
              <h2>{selectedMedicine.name}</h2>
            </div>
            <div className="flex flex-col justify-start mt-4 gap-2">
              <h1 className="capitalize text-gray-600">
                Manufacturer:
                <span className="text-black mx-2">
                  {selectedMedicine.manufacturer}
                </span>
              </h1>
              <h1 className="text-gray-600">
                Dosage:
                <span className="text-black mx-2">
                  {" "}
                  {selectedMedicine.dosage}
                </span>
              </h1>

              <h1 className="capitalize text-gray-600">
                Description:
                <div
                  style={{ inlineSize: "280px", overflowWrap: "break-word" }}
                  className="px-4 text-center text-black"
                >
                  {selectedMedicine.description}
                </div>
              </h1>
              <h1 className="capitalize text-gray-600">
                Created Date:
                <span className="text-black mx-2">
                  {selectedMedicine.createdAt}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMedicine;
