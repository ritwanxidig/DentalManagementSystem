import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { PageHeader } from "../../components";

import { FiPlusCircle, FiEdit, FiTrash, FiPrinter } from "react-icons/fi";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Group,
  Inject,
  Page,
  Resize,
  Search,
  Selection,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { Delete, getAll } from "../../ApiServices/CrudeApiCalls";
import { filter } from "@syncfusion/ej2/maps";
import { Link } from "react-router-dom";
import AddPrescription from "./Forms/AddPrescription";
import EditPrescription from "./Forms/EditPrescription";
import ViewPrescription from "./Forms/ViewPrescription";
import { useStateContext } from "../../contexts/AppContext";

const PrescriptionsList = () => {
  const { User } = useStateContext();
  const [Data, setData] = useState(null);
  const [EditIsOpen, setEditIsOpen] = useState(false);
  const [AddIsOpen, setAddIsOpen] = useState(false);
  const [ViewOpen, setViewOpen] = useState(false);
  const [SelectedPrescription, setSelectedPrescription] = useState(null);
  useEffect(() => {
    getAll("/Prescriptions")
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const actionTemplate = (props) => {
    return (
      <div className="flex gap-2 items-center">
        <div className="bg-blue-500 rounded-full flex w-10 h-10 text-white justify-center items-center hover:bg-blue-600 transition ">
          <button onClick={() => handleViewClick(props)}>
            <FiPrinter className="h-5 w-5" />
          </button>
        </div>
        <div className={`bg-red-500 rounded-full flex w-10 h-10 text-white justify-center items-center hover:bg-red-600 transition ${(User && User.role == "Admin") || User.role == "Reception"
          ? " hidden"
          : ""
          } `}>
          <button onClick={() => handleDeleteClick(props)}>
            <FiTrash className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };

  const handleEditClick = (props) => {
    setEditIsOpen(true);
    setSelectedPrescription(props);
    console.log(props);
  };
  const handleViewClick = (props) => {
    setSelectedPrescription(props);
    handlePrint(props);
  };
  const handleDeleteClick = (props) => {
    Delete(`/Prescriptions/${props.id}`)
      .then((res) => {
        alert(res);
        window.location.reload();
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const handleAddClick = () => {
    setViewOpen(true);
    setAddIsOpen(true);
  };

  const handlePrint = (props) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Prescription Letter</title> <script src='https://cdn.tailwindcss.com'></script></head><body>"
    );
    printWindow.document.write(
      ReactDOMServer.renderToString(
        <ViewPrescription selectedPrescription={props} />
      )
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  let grid;

  const toolbarClick = (arg) => {
    if (grid) {
      if (arg.item.id.includes("Print")) {
        grid.print();
      }
    }
  };
  return (
    <div className="control-pane m-2 md:mx-10 p-2 md:p-10 bg-white drop-shadow-xl rounded-lg">
      <div className="p-4 flex justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Prescriptions Management
          </h1>
          <h6 className="my-2 text-sm text-gray-500">Page</h6>
        </div>
        <div
          className={`bg-red-500 p-1 w-8 h-8 rounded-full flex items-center justify-center text-xl text-white ${(User && User.role == "Admin") || User.role == "Reception"
            ? " hidden"
            : ""
            }`}
        >
          <button onClick={handleAddClick}>
            <FiPlusCircle />
          </button>
        </div>
      </div>
      {AddIsOpen && <AddPrescription onClose={() => setAddIsOpen(false)} />}
      {EditIsOpen && (
        <EditPrescription
          selectedPrescription={SelectedPrescription}
          onClose={() => setEditIsOpen(false)}
        />
      )}

      {Data && Data.length > 0 ? (
        <GridComponent
          ref={(g) => (grid = g)}
          dataSource={Data}
          allowPaging
          allowSorting
          allowResizing
          allowGrouping
          allowExcelExport
          allowPdfExport
          toolbar={["Search", "Print"]}
          toolbarClick={toolbarClick}
          pageSettings={{ currentPage: 1, pageSize: 5, pageCount: 8 }}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="prescriptionNumber"
              headerText="Code"
              width={190}
              textAlign="center"
            ></ColumnDirective>
            <ColumnDirective
              field="patient.patientName"
              headerText="Patient"
              width={180}
              textAlign="Left"
            ></ColumnDirective>
            <ColumnDirective
              field="patient.phoneNo"
              headerText="Phone No"
              width={150}
            ></ColumnDirective>
            <ColumnDirective
              field="createdAt"
              headerText="Date"
              textAlign="center"
            ></ColumnDirective>
            <ColumnDirective
              headerText="Actions"
              template={actionTemplate}
            ></ColumnDirective>
          </ColumnsDirective>
          <Inject
            services={[Page, Selection, Sort, Search, Resize, Toolbar, Group]}
          />
        </GridComponent>
      ) : (
        <p> Theres no data for prescriptions </p>
      )}
    </div>
  );
};

export default PrescriptionsList;
