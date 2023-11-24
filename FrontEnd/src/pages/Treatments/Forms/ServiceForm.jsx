import React from "react";

import { FaPlusCircle } from "react-icons/fa";

const ServiceForm = ({
  setQtyField,
  setServiceField,
  ServicesData,
  handleAddService,
  SetAddServiceForm,
}) => {
  return (
    <div className="mb-2 border px-4 py-2 rounded flex flex-col w-full">
      <label
        htmlFor="service"
        className="block mb-2 text-sm font-medium text-gray mt-4"
      >
        Service
      </label>
      <div className="flex w-full justify-between gap-2">
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
          name="service"
          onChange={(e) => setServiceField(e.target.value)}
          id="service"
        >
          <option value="">Select One</option>
          {ServicesData && ServicesData.length > 0 ? (
            ServicesData.map((d) => (
              <option value={d.id} key={d.id}>
                {d.name}
              </option>
            ))
          ) : (
            <option value=""> No Services </option>
          )}
        </select>
        <button
          type="button"
          className="w-10 h-10 flex justify-center items-center rounded border-2 border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition duration-500"
          onClick={() => SetAddServiceForm(true)}
        >
          <FaPlusCircle className="w-6 h-6" />
        </button>
      </div>
      <label
        htmlFor="quantity"
        className="block mb-2 text-sm font-medium text-gray mt-4"
      >
        Number of Teeth
      </label>
      <input
        type="number"
        name="quantity"
        id="quantity"
        onChange={(e) => setQtyField(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
      />

      <button
        className="flex w-full px-4 justify-center my-4 py-2 text-blue-500 border-2 border-blue-500 bg-blue-500 rounded hover:bg-blue-600 hover:text-white transition duration-500"
        type="button"
        onClick={handleAddService}
      >
        Add
      </button>
    </div>
  );
};

export default ServiceForm;
