import React, { useEffect, useReducer, useState } from "react";
import { Form, Formik, Field } from "formik";
import { FaEdit, FaEye, FaPlusSquare, FaTrash, FaSave } from "react-icons/fa";
import * as yup from "yup";

import {
  Specialcreate,
  create,
  getAll,
  update,
} from "../../ApiServices/CrudeApiCalls";
import AppointmentForm from "./Forms/AppointmentForm";
import ServiceForm from "./Forms/ServiceForm";
import ServicesTable from "./Tables/ServicesTable";

import AddService from "../Services/Forms/AddService";
import AddPrescription from "../Prescriptions/Forms/AddPrescription";
import ViewPatient from "../Patients/Forms/ViewPatient";
import TreatmentForm from "./Forms/TreatmentForm";
import { useStateContext } from "../../contexts/AppContext";

const TreatmentAdd = () => {
  const [appointmentField, setAppointmentField] = useState("");
  const [prescriptionField, setPrescriptionField] = useState("");
  const [patientField, setPatientField] = useState("");
  const [serviceField, setServiceField] = useState("");
  const [QtyField, setQtyField] = useState("");
  const [ComplientField, setComplientField] = useState("");
  const [ClinicalFeaturesField, setClinicalFeaturesField] = useState("");
  const [NotesField, setNotesField] = useState("");
  const [AppointmentData, setAppointmentData] = useState([]);
  const [PrescriptionData, setPrescriptionData] = useState([]);
  const [ServicesData, setServicesData] = useState(null);
  const [Total, setTotal] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [selectedService, setselectedService] = useState(null);
  const [selectedAppointment, setselectedAppointment] = useState(null);
  const [selectedPatient, setselectedPatient] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [createdTP, setCreatedTP] = useState(null);

  const [InvoiceNo, setInvoiceNo] = useState(
    Math.floor(100000 + Math.random() * 900000)
  );

  const [ServiceFormIsOpen, setServiceFormIsOpen] = useState(false);
  const [PatientViewIsOpen, setPatientViewIsOpen] = useState(false);
  const [PrescriptionFormIsOpen, setPrescriptionFormIsOpen] = useState(false);

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const { setError, setErrorMessage, setSuccess, setSuccessMessage } =
    useStateContext();

  useEffect(() => {
    getAll("/Services")
      .then((res) => {
        if (res.response || res.message) {
          setError(true);
          setErrorMessage(res.response ? res.response.data : res.message);
          return;
        }
        setServicesData(res);
      })
      .catch((er) => {
        setError(true);
        setErrorMessage(er.message);
        console.log(er);
      });

    getAll("/TodayAppointments")
      .then((res) => {
        if (res.response || res.message) {
          setError(true);
          setErrorMessage(res.response ? res.response.data : res.message);
          return;
        }
        setAppointmentData(res);
      })
      .catch((er) => {
        setError(true);
        setErrorMessage(er.message);
        console.log(er);
      });
  }, []);

  const handleServiceChange = (id) => {
    if (ServicesData && ServicesData.length > 0) {
      const selected = ServicesData.find((i) => {
        return i.id === parseInt(id);
      });
      setselectedService(selected);
    }
  };

  const handleAppointmentChange = (id) => {
    if (
      AppointmentData &&
      AppointmentData.length > 0 &&
      appointmentField.length > 0
    ) {
      const selected = AppointmentData.find((i) => {
        return i.id === parseInt(id);
      });
      if (selected) {
        setselectedAppointment(selected);
        setselectedPatient(selected.patient);
        setPatientField(selected.patient.patientName);
        getAll(`/Prescriptions/Patients/${selected.patient.id}`)
          .then((res) => {
            if (res.response || res.message) {
              setError(true);
              setErrorMessage(res.message);
              return;
            }
            setPrescriptionData(res);
          })
          .catch((er) => {
            setError(true);
            setErrorMessage(er.message);
            console.log(er);
          });
      } else if (appointmentField === "") {
        setselectedAppointment(null);
        setselectedPatient(null);
        setPatientField("");
      }
    }
  };

  useEffect(() => {
    handleAppointmentChange(appointmentField);
    forceUpdate();
  }, [PrescriptionFormIsOpen])

  useEffect(() => {
    handleServiceChange(serviceField);
    handleAppointmentChange(appointmentField);
  }, [serviceField, appointmentField]);

  const handleAddService = () => {
    if (selectedService !== null && QtyField !== "") {
      setSelectedServices([
        ...selectedServices,
        {
          uniqId:
            selectedServices.length +
            1 +
            Math.floor(100000 + Math.random() * 900000),
          id: selectedService.id,
          name: selectedService.name,
          price: selectedService.price,
          quantity: QtyField,
          total: selectedService.price * parseFloat(QtyField),
          description: selectedService.description,
          createdAt: selectedServices.createdAt,
        },
      ]);
      setTotal(Total + selectedService.price * parseFloat(QtyField)),
        forceUpdate();
    }
  };

  const handleDeleteService = (id) => {
    if (selectedServices) {
      const toDeleteItem = selectedServices.find((i) => {
        return i.uniqId == id;
      });
      setTotal(Total - toDeleteItem.total);
      const updatedServices = selectedServices.filter(
        (service) => service.uniqId !== id
      );
      setSelectedServices(updatedServices);

      forceUpdate();
      return;
    }
  };

  const AddComplient = () => {
    if (selectedPatient && ComplientField !== "") {
      update(`/Patients/ChangeDescription/${selectedPatient.id}`, {
        cheifComplient: ComplientField,
      })
        .then((res) => {
          if (res.response || res.message) {
            setError(true);
            setErrorMessage(res.response.data);
            return;
          }
          setSuccess(true);
          setSuccessMessage("Cheif Complients Added Successfully");
        })
        .catch((er) => {
          setError(true);
          setErrorMessage(er.message);
          console.log(er);
        });
    } else {
      alert("Please Fill the Points");
      return;
    }
  };

  const invoiceNo = `TSS:${InvoiceNo}${selectedServices.length}`;

  const createInvoice = () => {
    create("/Invoices", {
      invoice_No: invoiceNo,
      total: Total,
      status: "Pending",
      paymentType: "",
    })
      .then((res) => {
        if (res.response || res.message) {
          setError(true);
          setErrorMessage(res.response.data);
          return;
        }
        console.log(res);
      })
      .catch((er) => {
        setError(true);
        setErrorMessage(er.message);
        console.log(er);
      });
  };

  const createTreatment = () => {
    if (createdTP !== null) {
      Specialcreate("/Treatments", {
        treatmentPlanId: createdTP.data.id,
        clinicalFeatures: ClinicalFeaturesField,
        prescriptionId: parseInt(prescriptionField),
        note: NotesField,
      })
        .then((res) => {
          if (res.response || res.message) {
            setError(true);
            setErrorMessage(res.response.data);
            return;
          }
          console.log(res);
          alert("This Treatment Is successfully Finishid");
          window.location.href = "/treatments";
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      alert("Please Wait the process of treatment plan");
      return;
    }
  };
  const createTreatmentPlan = () => {
    const selectedOnes = selectedServices.map((service) => {
      const {
        uniqId,
        id,
        name,
        price,
        quantity,
        total,
        description,
        createdAt,
      } = service;
      return { id, name, description, price, quantity, createdAt };
    });

    if (
      selectedOnes !== null &&
      appointmentField !== "" &&
      selectedOnes 
    ) {
      Specialcreate("/TreatmentPlans", {
        appointmentId: parseInt(appointmentField),
        services: selectedOnes,
        invoiceNo: invoiceNo,
      })
        .then((res) => {
          if (res.response || res.message) {
            setError(true);
            setErrorMessage(res.message);
            console.log(res);
            return;
          }
          setSuccess(true);
          setSuccessMessage(
            "Treatment Plan is Created let's submit the below button "
          );
          setCreatedTP(res);
        })
        .catch((er) => {
          setError(true);
          setErrorMessage(er.message);
          console.log(er);
        });
      return;
    }
    setError(true);
    setErrorMessage("Please Complete the required Inforamtion");
  };

  const updateTheAppointmentStatus = () => {
    update(`Appointments/ChangeStatus/${appointmentField}`, {
      status: "Completed",
    })
      .then((res) => {
        if (res.response || res.message) {
          setError(true);
          setErrorMessage(res.response.data);
          return;
        }
        console.log(res);
      })
      .catch((er) => {
        setError(true);
        setErrorMessage(er.message);
        console.log(er);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      ClinicalFeaturesField !== "" &&
      NotesField !== "" &&
      appointmentField !== "" &&
      createdTP !== null
    ) {
      createInvoice();
      createTreatment();
      updateTheAppointmentStatus();
    } else {
      setError(true);
      setErrorMessage(
        "Compelete the required Information & Save the treatment plan"
      );
      return;
    }
  };

  return (
    <div className="m-2 px-5 md:m-4 md:p-8 bg-white drop-shadow-xl rounded-lg">
      <h1 className="text-2xl font-medium tracking-tighter ">Add Treatment</h1>

      {ServiceFormIsOpen && (
        <AddService onClose={() => setServiceFormIsOpen(false)} />
      )}

      {PrescriptionFormIsOpen && (
        <AddPrescription onClose={() => setPrescriptionFormIsOpen(false)} />
      )}

      {selectedAppointment && PatientViewIsOpen ? (
        <ViewPatient
          selectedPatient={selectedPatient}
          onClose={() => setPatientViewIsOpen(false)}
        />
      ) : null}

      <span className="text-red-500 text-sm">Page</span>
      <form>
        <div className="p-2">
          <div className="flex justify-between gap-3">
            <AppointmentForm
              setAppointmentField={setAppointmentField}
              setComplientField={setComplientField}
              setPatientField={setPatientField}
              appointmentData={AppointmentData}
              PatientField={patientField}
              setViewOpen={setPatientViewIsOpen}
              AddComplient={AddComplient}
              presctiptionData={PrescriptionData}
              setPrescriptionField={setPrescriptionField}
              setPrescriptionFormIsOpen={setPrescriptionFormIsOpen}
            />

            <ServiceForm
              ServicesData={ServicesData}
              handleAddService={handleAddService}
              setQtyField={setQtyField}
              setServiceField={setServiceField}
              SetAddServiceForm={setServiceFormIsOpen}
            />

            <TreatmentForm
              setClinicalFeaturesField={setClinicalFeaturesField}
              setNotesField={setNotesField}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center w-full">
              <h4 className="text-2xl font-light">Services</h4>
              <button
                type="button"
                onClick={createTreatmentPlan}
                className="flex gap-2 items-center border-2 rounded-lg border-blue-500 text-md text-blue-500 px-4 py-1 hover:bg-blue-600 hover:text-white transition duration-600"
              >
                <FaSave /> Treatment Plan
              </button>
            </div>

            <ServicesTable
              handleDeleteService={handleDeleteService}
              selectedServices={selectedServices}
            />
            <div className="flex justify-between items-center">
              <h5>Total: {Total}</h5>
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="px-8 py-2 border-2 border-blue-500 text-blue-500 text-md font-medium rounded hover:bg-blue-600 hover:text-white transition duration-600 "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TreatmentAdd;
