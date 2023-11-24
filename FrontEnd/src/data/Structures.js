import { MdDashboard, MdInventory, MdReport, MdMedicalServices } from "react-icons/md";
import {
  FaUser,
  FaLaptopMedical,
  FaPrescriptionBottle,
  FaCalendar,
  Fa,
  FaFileInvoice,
  FaNotesMedical,
  FaUserInjured,
  FaUserNurse
  
  
} from "react-icons/fa";
import { BiUser, } from "react-icons/bi";

export const AdminPageLinks = [
  {
    id: "home",
    title: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    id: "Patients",
    title: "Patients",
    icon: <FaUserInjured />,
  },
  {
    id: "Services",
    title: "Services",
    icon: <MdMedicalServices />,
  },
  {
    id: "Medicines",
    title: "Medicines",
    icon: <FaLaptopMedical />,
  },
  {
    id: "prescriptions",
    title: "Prescriptions",
    icon: <FaPrescriptionBottle />,
  },
  {
    id: "Treatments",
    title: "Treatments",
    icon: <FaNotesMedical />,
  },
  {
    id: "appointments",
    title: "Appointments",
    icon: <FaCalendar />,
  },
  {
    id: "Invoices",
    title: "Invoices",
    icon: <MdInventory />,
  },
  {
    id: "Users",
    title: "Users Management",
    icon: <BiUser />,
  },
  {
    id: "doctors",
    title: "Doctors",
    icon: <FaUserNurse />,
  },
  {
    id: "reports",
    title: "Reports",
    icon: <MdReport />,
  },
];

export const DoctorPageLinks = [
  {
    id: "home",
    title: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    id: "Patients",
    title: "Patients",
    icon: <FaUserInjured />,
  },
  {
    id: "Services",
    title: "Services",
    icon: <MdMedicalServices />,
  },

  {
    id: "Medicines",
    title: "Medicines",
    icon: <FaLaptopMedical />,
  },
  {
    id: "prescriptions",
    title: "Prescriptions",
    icon: <FaPrescriptionBottle />,
  },
  {
    id: "Treatments",
    title: "Treatments",
    icon: <FaNotesMedical />,
  },
  {
    id: "reports",
    title: "Reports",
    icon: <MdReport />,
  },
];

export const ReceptionPageLinks = [
  {
    id: "home",
    title: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    id: "Patients",
    title: "Patients",
    icon: <FaUserInjured />,
  },
  {
    id: "appointments",
    title: "Appointments",
    icon: <FaCalendar />,
  },

  {
    id: "Treatments",
    title: "Treatments",
    icon: <FaNotesMedical />,
  },

  {
    id: "prescriptions",
    title: "Prescriptions",
    icon: <FaPrescriptionBottle />,
  },

  {
    id: "invoices",
    title: "Invoices",
    icon: <FaFileInvoice />,
  },
];

export const contextMenuItems = [
  "AutoFit",
  "AutoFitAll",
  "SortAscending",
  "SortDescending",
  "Copy",
  "Edit",
  "Delete",
  "Save",
  "Cancel",
  "PdfExport",
  "ExcelExport",
  "CsvExport",
  "FirstPage",
  "PrevPage",
  "LastPage",
  "NextPage",
];
