import React, { useEffect, useState } from "react";
import {
  FaUserInjured,
  FaDollarSign,
  FaCalendarAlt,
  FaUserCheck,
  FaCheckDouble,
  FaCheckSquare,
} from "react-icons/fa";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Page,
  Search,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { getAll } from "../../../ApiServices/CrudeApiCalls";
import { Link } from "react-router-dom";

import DashboardAnalaysis from "./components/DashboardAnalaysis";
import DashboardAnalaysis2 from "./components/DashboardAnalaysis2";
import FinancialAnalaysis from "./components/FinancialAnalaysis";
import { useStateContext } from "../../../contexts/AppContext";

const Home = () => {
  const [Data, setData] = useState(null);
  const [error, seterror] = useState("");
  const [totalIncome, settotalIncome] = useState(0);
  const [TotalPatients, setTotalPatients] = useState(0);
  const [TotalAppointments, setTotalAppointments] = useState(0);
  const [TotalUsers, setTotalUsers] = useState(0);
  const [Services, setServices] = useState([]);
  const [Patients, setPatients] = useState([]);
  const [Invoices, setInvoices] = useState([]);

  const { Error, setError, ErrorMessage, setErrorMessage } = useStateContext();

  useEffect(() => {
    try {
      getAll("/Invoices/TotalIncome")
        .then((res) => {
          if (res.response) {
            setError(true);
            setErrorMessage(res.response.data);
            return;
          }
          settotalIncome(res);
        })
        .catch((er) => {
          console.log(er);
        });
    } catch (error) {
      throw new Error("Error is", error);
    }

    try {
      getAll("/Patients/TotalPatients")
        .then((res) => {
          if (res.response) {
            setError(true);
            setErrorMessage(res.response.data);
            return;
          }
          setTotalPatients(res);
        })
        .catch((er) => {
          console.log(er);
        });
    } catch (error) {
      throw new Error("Error is", error);
    }

    try {
      getAll("/Appointments/TotalAppointments")
        .then((res) => {
          if (res.response) {
            setError(true);
            setErrorMessage(res.response.data);
            return;
          }
          setTotalAppointments(res);
        })
        .catch((er) => {
          console.log(er);
        });
    } catch (error) {
      throw new Error("Error is", error);
    }

    try {
      getAll("/Users/TotalUsers")
        .then((res) => {
          if (res.response) {
            setError(true);
            setErrorMessage(res.response.data);
            return;
          }
          setTotalUsers(res);
        })
        .catch((er) => {
          console.log(er);
        });
    } catch (error) {
      throw new Error("Error is", error);
    }

    try {
      getAll("/Services/Quantity")
        .then((res) => {
          if (res.response) {
            setError(true);
            setErrorMessage(res.response.data);
            return;
          }
          setServices(res);
        })
        .catch((er) => {
          console.log(er);
        });
    } catch (error) {
      throw new Error("Error is", error);
    }

    try {
      getAll("/Patients/gender")
        .then((res) => {
          if (res.response) {
            setError(true);
            setErrorMessage(res.response.data);
            return;
          }
          setPatients(res);
        })
        .catch((er) => {
          console.log(er);
        });
    } catch (error) {
      throw new Error("Error is", error);
    }

    try {
      getAll("/Invoices/Status")
        .then((res) => {
          if (res.response) {
            setError(true);
            setErrorMessage(res.response.data);
            return;
          }
          setInvoices(res);
        })
        .catch((er) => {
          console.log(er);
        });
    } catch (error) {
      throw new Error("Error is", error);
    }

    try {
      getAll("/TodayAppointments")
        .then((res) => {
          if (res.response) {
            setError(true);
            setErrorMessage(res.response.data);
            return;
          }
          setData(res);
        })
        .catch((er) => {
          console.log(er);
        });
    } catch (error) {
      throw new Error("Error is", error);
    }
  }, []);

  const approveTemplate = (d) => {
    return (
      <Link to={`/Appointments/${d.id}`} className="text-2xl">
        <FaCheckSquare />
      </Link>
    );
  };

  const rowBound = (args) => {
    const row = args.row;
    const rowData = args.data;

    if (rowData.patientStatus == "Old") {
      row.classList.add("bg-violet-500");
    } else if (rowData.patientStatus == "New") {
      row.classList.add("bg-pink-500");
    }
  };

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-4 mb-5 sm:grid-cols-2 gap-4 px-4">
        <DashboardAnalaysis
          title="Total Income"
          data={totalIncome.toLocaleString("en-US", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 1,
          })}
          Icon={<FaDollarSign className="text-white" stroke="4" />}
        />

        <DashboardAnalaysis
          data={TotalPatients}
          Icon={<FaUserInjured className="text-white" stroke="4" />}
          title="Total Patients"
        />

        <DashboardAnalaysis
          Icon={<FaCalendarAlt className="text-white stroke-20" />}
          title="Appointments"
          data={TotalAppointments}
        />

        <DashboardAnalaysis
          title="Total Users"
          Icon={<FaUserCheck className="text-white stroke-2" />}
          data={TotalUsers}
        />
      </div>

      <div className="flex-1 grid mr-8 sm:grid-cols-2 md:grid-cols-4">
        <DashboardAnalaysis2 list={Patients} title="Patient Analaysis" />

        <DashboardAnalaysis2 list={Services} title="Service Analaysis" />

        <DashboardAnalaysis2 list={Invoices} title="Invoice Analaysis" />
        <FinancialAnalaysis />
      </div>

      <div className="bg-white drop-shadow-xl p-4 m-4 md:mx-6 md:px-6 ">
        <div className="header flex justify-between items-center">
          <h1 className="text-2xl uppercase font-extrabold bg-clip-text text-transparent bg-gradient-to-t from-red-700 to-primary">
            Today Appointments
          </h1>
          <div className="flex gap-6">
            <div className="flex gap-1 items-center">
              <div className="w-4 h-4 border-2 bg-gradient-to-tr from-blue-500 to-purple-500"></div>
              <h1>Old Patient</h1>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-4 h-4 border-2  bg-gradient-to-tr from-red-500 to-pink-500"></div>
              <h1>New Patient</h1>
            </div>
          </div>
        </div>

        {Data && Data.length > 0 ? (
          <div className="container mx-auto">
            <GridComponent
              allowResizing
              allowPaging
              pageSettings={{ pageSize: 2 }}
              toolbar={["Search"]}
              rowDataBound={rowBound}
              style={{}}
              dataSource={Data}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="appointmentNumber"
                  headerText="A.Number"
                  width={100}
                />
                <ColumnDirective
                  field="patient.patientName"
                  headerText="PatientName"
                  width={150}
                />
                <ColumnDirective
                  field="patientStatus"
                  headerText="P.Status"
                  width={150}
                />
                <ColumnDirective
                  field="patient.sex"
                  headerText="Gender"
                  width={100}
                />
                <ColumnDirective
                  field="status"
                  headerText="Status"
                  width={100}
                />
              </ColumnsDirective>
              <Inject services={[Page, Toolbar]} />
            </GridComponent>
          </div>
        ) : (
          <p> No Appointments Today </p>
        )}
      </div>


    </div>
  );
};

export default Home;
