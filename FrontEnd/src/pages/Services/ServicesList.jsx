import React, { useEffect, useState } from "react";
import { PageHeader } from "../../components";

import { FiPlusCircle, FiEdit, FiTrash, FiEye } from "react-icons/fi";
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
import AddService from "./Forms/AddService";
import EditService from "./Forms/EditService";
import ViewService from "./Forms/ViewService";

const ServicesList = () => {
  const [Data, setData] = useState(null);
  const [EditIsOpen, setEditIsOpen] = useState(false);
  const [AddIsOpen, setAddIsOpen] = useState(false);
  const [ViewOpen, setViewOpen] = useState(false);
  const [SelectedService, setSelectedService] = useState(null);
  useEffect(() => {
    getAll("/Services")
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
            <FiEdit className="h-5 w-5" />
          </button>
        </div>
        <div className="bg-blue-500 rounded-full flex w-10 h-10 text-white justify-center items-center hover:bg-blue-600 transition ">
          <button onClick={() => handleViewClick(props)}>
            <FiEye className="h-5 w-5" />
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
    setEditIsOpen(true);
    setSelectedService(props);
    console.log(props);
  };
  const handleViewClick = (props) => {
    setViewOpen(true);
    setSelectedService(props);
  };
  const handleDeleteClick = (props) => {
    Delete(`/Services/${props.id}`)
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
  return (
    <div className="control-pane m-2 md:mx-10 p-2 md:p-10 bg-white drop-shadow-xl rounded-lg">
      <div className="p-4 flex justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Services Management</h1>
          <h6 className="my-2 text-sm text-gray-500">Page</h6>
        </div>
        <div
          className="bg-red-500 p-1 w-8 h-8 rounded-full flex items-center justify-center text-xl text-white"
        >
          <button onClick={handleAddClick}>
            <FiPlusCircle />
          </button>
        </div>
      </div>
      {AddIsOpen && <AddService onClose={() => setAddIsOpen(false)} />}
      {EditIsOpen && (
        <EditService
          selectedService={SelectedService}
          onClose={() => setEditIsOpen(false)}
        />
      )}

      {ViewOpen && (
        <ViewService
          selectedService={SelectedService}
          onClose={() => setViewOpen(false)}
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
              field="name"
              headerText="Name"
              width={150}
              textAlign="center"
            ></ColumnDirective>
            <ColumnDirective
              field="price"
              headerText="Price"
              width={80}
              format="c2"
              textAlign="Left"
            ></ColumnDirective>
            <ColumnDirective
              field="description"
              headerText="Description"
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

export default ServicesList;
