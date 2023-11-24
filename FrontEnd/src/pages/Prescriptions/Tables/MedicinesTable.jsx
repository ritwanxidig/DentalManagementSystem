import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { getAll } from "../../../ApiServices/CrudeApiCalls";

const MedicinesTable = ({ MedicinesData, handleDeleteMedicine }) => {
  return (
    <div className="flex flex-col w-full">
      <h5 className="text-2xl font-light tracking-tighter">
        List Of Medicines
      </h5>
      <table className="w-full">
        <thead>
          <tr className="border-2">
            <th className="border py-2 px-4 text-left text-sm">Name</th>
            <th className="border py-2 px-4 text-left text-sm">Manufacturer</th>
            <th className="border py-2 px-4 text-left text-sm">Dosage</th>
            <th className="border py-2 px-4 text-left text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
          {MedicinesData && MedicinesData.length > 0 ? (
            MedicinesData.map((d) => (
              <tr
                className="border-2 border-white hover:bg-transparent transition duration-500 bg-red-200"
                key={d.uniqId}
              >
                <td className="border-2 py-2 px-4 text-sm">{d.name}</td>
                <td className="border-2 py-2 px-4 text-sm">{d.manufacturer}</td>
                <td className="border-2 py-2 px-4 text-sm">{d.dosage}</td>
                <td className="border-2 py-2 px-4 text-sm">
                  <button
                    className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition duration-500"
                    type="button"
                    onClick={() => handleDeleteMedicine(d.uniqId)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No Medices Data </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MedicinesTable;
