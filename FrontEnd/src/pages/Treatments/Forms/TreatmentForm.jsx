import React from "react";

const TreatmentForm = ({setClinicalFeaturesField, setNotesField}) => {
  return (
    <div className="mb-2 p-2 rounded border-2 flex w-full flex-col">
      <div className="mb-2 p-2 rounded flex-1 flex-col">
        <label
          htmlFor="clinicalFeatures"
          className="block mb-2 font-medium text-sm"
        >
          Clinical Features
        </label>
        <textarea
          id="clinicalFeatures"
          onChange={(e) => setClinicalFeaturesField(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 h-full"
        />
      </div>

      <div className="p-2 rounded flex-1 my-4 w-full flex-col">
        <label
          htmlFor="notes"
          className="block mb-2 font-medium text-sm"
        >
          Notes
        </label>
        <textarea
          id="notes"
          onChange={(e) => setNotesField(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 h-full"
        />
      </div>
    </div>
  );
};

export default TreatmentForm;
