import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";

const ViewDoctor = ({ onClose, selectedDoctor }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center form`}
      style={{ position: "absolute", zIndex: 1000000 }}
    >
      <div className="bg-white max-w-5xl mx-auto rounded shadow-2xl drop-shadow-2xl overflow-hidden">
        <div className="px-4 pb-12">
          <div className="flex justify-between items-center mb-2 border-b-2 my-3">
            <h1 className="text-2xl font-light">User Details</h1>
            <button
              className="h-10 w-10 rounded-full hover:bg-light-gray flex justify-center items-center"
              onClick={onClose}
            >
              <MdCancel />
            </button>
          </div>
          <div className="flex-col justify-center items-center">
          <div className="flex w-full justify-center items-center my-4">
              <img
                src={selectedDoctor.user.avatar}
                alt={`${selectedDoctor.user.name}'s Image`}
                className="rounded-full w-64"
              />
            </div>
            <div className="flex justify-center items-center">
              <h2> Dr. {selectedDoctor.user.name}</h2>
            </div>
            <div className="flex flex-col justify-start mt-4 gap-2">
              <h1 className="text-gray-600">
                Email:
                <span className="text-gray-900"> {selectedDoctor.user.email}</span>
              </h1>
              <h1 className="capitalize text-gray-600">
                Speciality:
                <span className="text-gray-900">
                  {selectedDoctor.speciality}
                </span>
              </h1>
              <h1 className="capitalize text-gray-600">
                Phone No:
                <span className="text-gray-900">{selectedDoctor.phoneNo}</span>
              </h1>
              <h1 className="capitalize text-gray-600">
                Created Date:
                <span className="text-gray-900">
                  {selectedDoctor.createdAt}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctor;
