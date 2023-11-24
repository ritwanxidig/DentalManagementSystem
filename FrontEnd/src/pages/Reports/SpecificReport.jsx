import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getAll } from "../../ApiServices/CrudeApiCalls";

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Search,
  Sort,
  Resize,
  Toolbar,
  Group,
  Selection,
} from "@syncfusion/ej2-react-grids";

const SpecificReport = () => {
  const [Data, setData] = useState(null);

  const urlSearchParams = new URLSearchParams(window.location.search);

  const startDate = urlSearchParams.get("date1");
  const endDate = urlSearchParams.get("date2");

  console.log(startDate, endDate);

  const { type } = useParams();

  useEffect(() => {
    getAll(`/${type}/${startDate}&${endDate}`)
      .then((res) => {
        setData(res);
      })
      .catch((er) => {
        console.log(er);
      });
  }, [startDate,endDate]);

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
          <h1 className="text-3xl font-semibold tracking-tight capitalize">
            {type} Report
          </h1>
          <h6 className="my-2 text-sm text-gray-500">Page</h6>
        </div>
      </div>
      {Data && Data.length > 0 ? (
        <GridComponent
          ref={(g) => (grid = g)}
          dataSource={Data}
          allowPaging
          allowSorting
          allowResizing
          allowGrouping
          toolbar={["Search", "Print"]}
          toolbarClick={toolbarClick}
          pageSettings={{ currentPage: 1, pageSize: 18, pageCount: 8 }}
        >
         
          <Inject
            services={[Page, Selection, Sort, Search, Resize, Toolbar, Group]}
          />
        </GridComponent>
      ) : (
        <p> Theres no data for {type} </p>
      )}
    </div>
  );
};

export default SpecificReport;
