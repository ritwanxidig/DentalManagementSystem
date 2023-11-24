import React from "react";

const FormComponent = ({ title, formik }) => {
  const { handleSubmit, handleChange, values, errors, touched } = formik;
  return (
    <div className="p-4 border-2 rounded bg-gradient-to-tl from-white to-gray-200">
      <h1 className="text-2xl font-medium mb-4"> {title} </h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label
              htmlFor="startDate"
              className="block mb-2 text-sm font-medium text-gray"
            >
              From: 
            </label>
            <input
              type="datetime-local"
              name="startDate"
              id="startDate"
              onChange={handleChange}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ${
                errors.startDate ? "border-2 border-red-500" : ""
              }`}
            />
            {errors.startDate && touched.startDate && (
              <div name="startDate" className="text-sm text-red-500">
                {" "}
                {errors.startDate}{" "}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="endDate"
              className="block mb-2 text-sm font-medium text-gray"
            >
              To: 
            </label>
            <input
              type="datetime-local"
              name="endDate"
              id="endDate"
              onChange={handleChange}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ${
                errors.endDate ? "border-2 border-red-500" : ""
              }`}
            />
            {errors.endDate && touched.endDate && (
              <div name="endDate" className="text-sm text-red-500">
                {" "}
                {errors.endDate}{" "}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="border-2 border-blue-500 py-1 rounded text-xl text-blue-500 font-bold hover:bg-blue-500 hover:text-white duration-700"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
