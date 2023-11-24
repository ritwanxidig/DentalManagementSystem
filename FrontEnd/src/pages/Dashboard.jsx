import {
  BrowserRouter,
  Route,
  Routes,
  json,
  redirect,
  useNavigate,
} from "react-router-dom";
import React, { useReducer, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";

import Toasts from "../components/Ridwan";

import "../App.css";
import { Navbar, Sidebar } from "../components";
import {
  TreatmentList,
  PatientList,
  ServicesList,
  TreatmentAdd,
  AppointmentList,
  InvoiceList,
  MedicinesList,
  Home,
  DoctorHome,
  UsersList,
  DoctorsList,
  PrescriptionList,
  ReportHomePage,
  SpecificReport,
  UserHome,
} from "../pages";
import { useStateContext } from "../contexts/AppContext";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { boolean } from "yup";
import { getAll } from "../ApiServices/CrudeApiCalls";
import { MdCancel, MdCheckBox } from "react-icons/md";

import { Toaster } from "react-hot-toast";
import Ridwan from "../components/Ridwan";

const Dashboard = () => {
  const navigate = useNavigate(); // Import useNavigate hook to perform redirects
  // const { token, setToken } = useStateContext(); // Import the application context for token management
  const {
    activeMenu,
    setactiveMenu,
    setRole,
    User,
    setUser,
    Error,
    setError,
    ErrorMessage,
    setErrorMessage,
    Success,
    SuccessMessage,
    setSuccess,
    setSuccessMessage,
  } = useStateContext();
  const [IsDoctor, setIsDoctor] = useState(false);
  const [Users, setUsers] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const toCheckToken = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      await getAll("/Users")
        .then((res) => {
          if (res && res.length > 0) {
            setUsers(res);
            return;
          }
          setError(true);
          setErrorMessage(res.message);
        })
        .catch((er) => {
          setError(true);
          setErrorMessage("An error occurred while fetching data:" + er);
        });
    };

    fetchData();

    if (toCheckToken === null) {
      navigate("/login"); // Use navigate() to redirect to login page
    } else {
      const decodedToken = jwt_decode(toCheckToken);
      const isTokenValid = checkTokenValidity(decodedToken);

      if (isTokenValid) {
        if (decodedToken.doctorId) {
          setIsDoctor(true);
        }
      } else {
        // Token is either expired or invalid
        navigate("/login");
      }
    }
  }, []); // Only run this effect on initial render

  function checkTokenValidity(decodedToken) {
    try {
      const currentTime = Date.now() / 1000; // Convert current time to seconds

      // If the token expiration time is less than the current time, it is expired
      if (decodedToken.exp < currentTime) {
        return false;
      }

      // Otherwise, the token is valid
      return true;
    } catch (error) {
      // An error occurred while decoding the token, meaning it is invalid
      return false;
    }
  }

  let name = "";
  let Role = "";

  if (toCheckToken === null) {
    navigate("/login");
  }

  if (toCheckToken) {
    const decodedToken = jwt_decode(toCheckToken);
    const isTokenValid = checkTokenValidity(decodedToken);

    if (isTokenValid) {
      // Token is valid
      name = decodedToken.FullName;
      Role = decodedToken.Role;
      setRole(decodedToken.Role);
      if (Users && Users.length > 0) {
        const user = Users.find((d) => d.email === decodedToken.email);
        setUser(user);
      }
    } else {
      // Token is expired or invalid
      navigate("/login");
    }
  } else {
    navigate("/login");
  }
  // Rest of the code...

  return (
    <div className="flex relative">
      {Error && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all">
          <div className="bg-white rounded shadow p-4">
            <div className="flex justify-between items-center -mt-3">
              <span>Error</span>
              <button
                className="hover:bg-light-gray flex justify-center items-center p-2 rounded-full"
                onClick={() => setError(false)}
              >
                <MdCancel className="w-6 h-6" />
              </button>
            </div>
            <p>
              Error:
              <span className="text-sm text-red-500">{ErrorMessage}</span>
            </p>
          </div>
        </div>
      )}

      {Success && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity">
          <div className="bg-white rounded shadow p-4">
            <div className="flex flex-col items-center -mt-3">
              <div className="flex w-full justify-center items-center">
                <h2 className="flex justify-center items-center p-2 rounded-full">
                  <MdCheckBox className="w-24 h-24 text-green-600" />
                </h2>
              </div>
              <span>SuccessFull Message</span>
            </div>
            <p>
              <span className="text-sm text-green-700">{SuccessMessage}</span>
            </p>
            <button className="flex justify-center w-full  items-center">
              <span
                className="py-3 rounded text-lg font-bold text-white px-3 mt-5 bg-green-500"
                onClick={() => setSuccess(false)}
              >
                OK
              </span>
            </button>
          </div>
        </div>
      )}

      <Ridwan />





      {activeMenu ? (
        <div
          className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white "
          style={{ position: "absolute", zIndex: 10000000 }}
        >
          <Sidebar IsDoctor={IsDoctor} />
        </div>
      ) : (
        <div className="w-0">
          <Sidebar IsDoctor={IsDoctor} />
        </div>
      )}
      <div
        className={`min-h-screen w-full ${activeMenu ? "md:ml-72" : "flex-2"}`}
      >
        <div
          className="fixed md:static w-full shadow-md mb-4"
          style={{ zIndex: 10000 }}
        >
          <Navbar />
        </div>
        <div>
          {User && IsDoctor ? (
            <Routes>
              <Route exact element={<DoctorHome />} path="/" />
              <Route exact element={<DoctorHome />} path="/home" />

              <Route element={<TreatmentAdd />} path="/Treatments/add" />
              <Route element={<TreatmentList />} path="/Treatments" />
              <Route element={<PatientList />} path="/patients/" />
              <Route element={<MedicinesList />} path="/medicines" />
              <Route element={<PrescriptionList />} path="/prescriptions" />
              <Route element={<ServicesList />} path="/services/" />
              <Route element={<ReportHomePage />} path="/reports/" />
              <Route element={<SpecificReport />} path="/reports/:type" />
            </Routes>
          ) : User && Role === "Admin" ? (
            <Routes>
              <Route exact element={<Home />} path="/" />
              <Route exact element={<Home />} path="/home" />
              <Route element={<PatientList />} path="/patients/" />
              <Route element={<ServicesList />} path="/services/" />
              <Route element={<TreatmentList />} path="/Treatments" />
              <Route element={<MedicinesList />} path="/medicines" />
              <Route element={<PrescriptionList />} path="/prescriptions" />
              <Route element={<ReportHomePage />} path="/reports/" />

              <Route element={<AppointmentList />} path="/Appointments" />

              <Route element={<InvoiceList />} path="/Invoices" />
              <Route element={<UsersList />} path="/Users" />
              <Route element={<DoctorsList />} path="/doctors" />
              <Route element={<SpecificReport />} path="/reports/:type" />
            </Routes>
          ) : (
            User &&
            User.role == "Reception" && (
              <Routes>
                <Route exact element={<UserHome />} path="/" />
                <Route exact element={<UserHome />} path="/home" />
                <Route element={<PatientList />} path="/patients/" />
                <Route element={<TreatmentList />} path="/Treatments" />
                <Route element={<PrescriptionList />} path="/prescriptions" />
                <Route element={<AppointmentList />} path="/Appointments" />
                <Route element={<InvoiceList />} path="/Invoices" />
              </Routes>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
