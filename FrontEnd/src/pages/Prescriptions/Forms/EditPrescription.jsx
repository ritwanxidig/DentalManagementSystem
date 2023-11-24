import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as yup from "yup";

import { create, getAll, update } from "../../../ApiServices/CrudeApiCalls";
import MedicinesTable from "../Tables/MedicinesTable";
import { useReducer } from "react";

const validationSchema = yup.object().shape({
  patientId: yup.string().required("Please select patient"),
  instructions: yup
    .string()
    .required("Please enter instructions")
    .min(5, "instructions must be at least 5 characters"),

  duration: yup
    .string()
    .required("Please enter valid duration Type")
    .min(4, "Duration Type must be at least 5 characters"),
  medicine: yup.string(),
});

const EditPrescription = ({ onClose, selectedPrescription }) => {
  const [PatientsData, setPatientsData] = useState(null);
  const [MedicinesData, setMedicinesData] = useState(null);
  const [SelectedMedicines, setSelectedMedicines] = useState([]);
  const [SelectedMedicine, setSelectedMedicine] = useState(null);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    getAll("/Medicines")
      .then((res) => {
        setMedicinesData(res);
      })
      .catch((er) => {
        console.log(er);
      });

    getAll("/Patients")
      .then((res) => {
        setPatientsData(res);
      })
      .catch((er) => {
        console.log(er);
      });

    selectedPrescription.medicinePrescriptions.map((m) => {
      setSelectedMedicines((prevMedicines) => [
        ...prevMedicines,
        {
          uniqId: Math.floor(Math.random() * 909800) + SelectedMedicines.length,
          id: m.medicine.id,
          name: m.medicine.name,
          manufacturer: m.medicine.manufacturer,
          dosage: m.medicine.dosage,
          description: m.medicine.description,
        },
      ]);
    });
  }, []);

  const handleMedicineChange = (id) => {
    if (MedicinesData && MedicinesData.length > 0) {
      const selected = MedicinesData.find((i) => {
        return i.id === parseInt(id);
      });
      setSelectedMedicine(selected);
      forceUpdate();
    }
  };

  console.log(SelectedMedicines);

  const initialValues = {
    patientId: selectedPrescription.patientId,
    instructions: selectedPrescription.instructions,
    duration: selectedPrescription.duration,
    medicine: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await update(`/Prescriptions/${selectedPrescription.id}`, {
        patientId: values.patientId,
        instruction: values.instructions,
        duration: values.duration,
      })
        .then((res) => {
          alert(res);
          window.location.reload();
        })
        .catch((er) => {
          console.log(er);
        });

      window.location.reload();
      onClose();
    },
  });

  const { handleChange, handleSubmit, values, touched, errors } = formik;
  useEffect(() => {
    if (values.medicine !== "") {
      handleMedicineChange(values.medicine);
    }
  }, [values.medicine]);

  const AddMedicine = () => {
    if (SelectedMedicine !== null) {
      setSelectedMedicines([
        ...SelectedMedicines,
        {
          uniqId: Math.floor(Math.random() * 909800),
          id: SelectedMedicine.id,
          name: SelectedMedicine.name,
          manufacturer: SelectedMedicine.manufacturer,
          dosage: SelectedMedicine.dosage,
          description: SelectedMedicine.description,
        },
      ]);
      forceUpdate();
    }
  };

  const RemoveMedicine = (id) => {
    if (SelectedMedicines) {
      const updatedMedicines = SelectedMedicines.filter((i) => i.uniqId !== id);
      setSelectedMedicines(updatedMedicines);
      forceUpdate();
    }
  };

  console.log(SelectedMedicines);
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center form form `}
      style={{ position: "absolute", zIndex: 1000000 }}
    >
      <div className="bg-white w-full mx-auto rounded shadow-2xl drop-shadow-2xl overflow-hidden">
        <div className="p-12">
          <div className="flex justify-between items-center mb-2 border-b-2 my-3 -mt-8">
            <h1 className="text-2xl font-light">Add Prescription</h1>
            <button
              className="h-10 w-10 rounded-full hover:bg-light-gray flex justify-center items-center"
              onClick={onClose}
            >
              <MdCancel />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
              <div className="border-2 p-4 rounded">
                <div className="mb-4 flex flex-col w-full">
                  <label htmlFor="patientId" className="block mb-1 font-medium">
                    Patient
                  </label>
                  <div className="flex gap-2">
                    <div className="flex flex-col w-full">
                      <select
                        id="patientId"
                        name="patientId"
                        onChange={handleChange}
                        value={values.patientId}
                        className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select One</option>
                        {PatientsData && PatientsData.length > 0 ? (
                          PatientsData.map((d) => (
                            <option value={d.id} key={d.id}>
                              {d.patientName}
                            </option>
                          ))
                        ) : (
                          <option value="">No Patients</option>
                        )}
                      </select>
                      {errors.patientId && touched.patientId && (
                        <div
                          component="div"
                          name="patientId"
                          className="text-red-500"
                        >
                          {errors.patientId}
                        </div>
                      )}
                    </div>
                    <button
                      className="w-10 h-10 flex justify-center items-center rounded bg-blue-500 text-white hover:bg-blue-600 transition durationNumber-500"
                      // onClick={() => SetAddServiceForm(true)}
                    >
                      <FaPlusCircle className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="mb-4 flex flex-col w-full">
                  <label
                    htmlFor="instructions"
                    className="block mb-1 font-medium"
                  >
                    Instructions
                  </label>
                  <input
                    type="text"
                    id="instructions"
                    name="instructions"
                    value={values.instructions}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                  />
                  {errors.instructions && touched.instructions && (
                    <div
                      component="div"
                      name="instructions"
                      className="text-red-500"
                    >
                      {" "}
                      {errors.instructions}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="duration" className="block mb-1 font-medium">
                    Duration
                  </label>
                  <div className="flex gap-2">
                    <div className="flex flex-col w-full">
                      <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={values.duration}
                        onChange={handleChange}
                        className="px-3 py-2 border-2 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
                      />
                      {errors.duration && touched.duration && (
                        <div
                          component="div"
                          name="duration"
                          className="text-red-500"
                        >
                          {" "}
                          {errors.duration}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
              </div>
              <div className="border-2 rounded p-4">
                <MedicinesTable
                  MedicinesData={SelectedMedicines}
                  handleDeleteMedicine={RemoveMedicine}
                />
              </div>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPrescription;
