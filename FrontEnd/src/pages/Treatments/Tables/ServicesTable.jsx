import React from 'react'
import { FaTrash } from "react-icons/fa";

const servicesTable = ({handleDeleteService, selectedServices}) => {
  return (
    <div>
            <table className="w-full">
              <thead>
                <tr className="border-2">
                  <th className="border py-2 px-4 text-left text-sm">Name</th>
                  <th className="border py-2 px-4 text-left text-sm">Price</th>
                  <th className="border py-2 px-4 text-left text-sm">
                    Num Of Teeth
                  </th>
                  <th className="border py-2 px-4 text-left text-sm">Total</th>
                  <th className="border py-2 px-4 text-left text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedServices && selectedServices.length > 0 ? (
                  selectedServices.map((d) => (
                    <tr
                      className="border-2 border-white hover:bg-transparent transition duration-500 bg-red-200"
                      key={d.uniqId}
                    >
                      <td className="border-2 py-2 px-4 text-sm">{d.name}</td>
                      <td className="border-2 py-2 px-4 text-sm">{d.price}</td>
                      <td className="border-2 py-2 px-4 text-sm">
                        {d.quantity}
                      </td>
                      <td className="border-2 py-2 px-4 text-sm">{d.total}</td>
                      <td className="border-2 py-2 px-4 text-sm">
                        <button
                          className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition duration-500"
                          onClick={() => handleDeleteService(d.uniqId)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <p>
                        No Selected Services for this current treatmentPlan,
                        Please Add More Services.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
  )
}

export default servicesTable