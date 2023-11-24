import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { PageHeader } from "../../components";

import {
  FiPlusCircle,
  FiCheckSquare,
  FiTrash,
  FiPrinter,
} from "react-icons/fi";
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
import AddInvoice from "./Forms/AddInvoice";
import ToPrintInvoice from "./Forms/ToPrintInvoice";
import InvoiceEditForm from "./Forms/InvoiceEditForm";
import AddPayment from "./Forms/AddPayment";

const InvoicesList = () => {
  const [Data, setData] = useState(null);
  const [EditIsOpen, setEditIsOpen] = useState(false);
  const [AddPaymentIsOpen, setAddPaymentIsOpen] = useState(false);
  const [AddIsOpen, setAddIsOpen] = useState(false);
  const [ViewOpen, setViewOpen] = useState(false);
  const [SelectedPayments, setSelectedPayments] = useState([]);
  const [SelectedInvoice, setSelectedInvoice] = useState(null);
  useEffect(() => {
    getAll("/Invoices")
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
        <div className="bg-yellow-500 rounded-full flex w-10 h-10 text-white justify-center items-center hover:bg-yellow-600 transition ">
          <button onClick={() => handleEditClick(props)}>
            <FiCheckSquare className="h-5 w-5" />
          </button>
        </div>
        <div className="bg-blue-500 rounded-full flex w-10 h-10 text-white justify-center items-center hover:bg-blue-600 transition ">
          <button onClick={() => handleViewClick(props)}>
            <FiPrinter className="h-5 w-5" />
          </button>
        </div>
        <div className="bg-red-500 rounded-full flex w-10 h-10 text-white justify-center items-center hover:bg-red-600 transition ">
          <button onClick={() => handleDeleteClick(props)}>
            <FiTrash className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };

  const handleEditClick = (props) => {
    if (props.status === "Paid") {
      alert("Paid Invoice");
      return;
    }
    if (props.status === "Series") {
      setSelectedInvoice(props);
      setAddPaymentIsOpen(true);
      return;
    }

    setEditIsOpen(true);
    setSelectedInvoice(props);
  };
  const handleViewClick = (props) => {
    handlePrint(props);
  };
  const handleDeleteClick = (props) => {
    Delete(`/Invoices/${props.id}`)
      .then((res) => {
        alert(res);

        window.location.reload();
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const handleAddClick = () => {
    setAddIsOpen(true);
  };

  let grid;

  const toolbarClick = (arg) => {
    if (grid) {
      if (arg.item.id.includes("Print")) {
        grid.print();
      }
    }
  };

  const handlePrint = (props) => {
    if (props.paymentType == "Series") {
      getAll(`/Payments/${props.invoice_No}`)
        .then((res) => {
          const printWindow = window.open("", "_blank");
          printWindow.document.write(
            "<html><head><title>Invoice Letter</title> <script src='https://cdn.tailwindcss.com'></script></head><body>"
          );
          printWindow.document.write(
            ReactDOMServer.renderToString(
              <ToPrintInvoice selectedInvoice={props} SelectedPayments={res} />
            )
          );
          printWindow.document.write("</body></html>");
          printWindow.document.close();
          printWindow.print();
        })
        .catch((Er) => {
          console.log(Er);
        });
      return;
    }
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Invoice Letter</title> <script src='https://cdn.tailwindcss.com'></script></head><body>"
    );
    printWindow.document.write(
      ReactDOMServer.renderToString(
        <ToPrintInvoice selectedInvoice={props} SelectedPayments={[]} />
      )
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="control-pane m-2 md:mx-10 p-2 md:p-10 bg-white drop-shadow-xl rounded-lg">
      <div className="p-4 flex justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Invoices Management
          </h1>
          <h6 className="my-2 text-sm text-gray-500">Page</h6>
        </div>

      </div>
      {EditIsOpen && (
        <InvoiceEditForm
          selectedInvoice={SelectedInvoice}
          onClose={() => setEditIsOpen(false)}
        />
      )}

      {AddPaymentIsOpen && (
        <AddPayment
          selectedInvoice={SelectedInvoice}
          onClose={() => setAddPaymentIsOpen(false)}
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
              field="invoice_No"
              headerText="Invoice Code"
              width={150}
              textAlign="center"
            ></ColumnDirective>
            <ColumnDirective
              field="total"
              headerText="Total Price"
              format="c2"
              width={150}
              textAlign="Left"
            ></ColumnDirective>
            <ColumnDirective
              field="paymentType"
              headerText="Payment Type"
            ></ColumnDirective>
            <ColumnDirective
              field="user.name"
              headerText="User Created"
              width={150}
            ></ColumnDirective>
            <ColumnDirective
              field="status"
              headerText="Status"
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
        <p> Theres no data for doctors </p>
      )}
    </div>
  );
};

export default InvoicesList;
