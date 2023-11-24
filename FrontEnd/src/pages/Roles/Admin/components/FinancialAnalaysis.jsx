import React, { useState, useEffect } from "react";

import { getAll } from "../../../../ApiServices/CrudeApiCalls";
import { useStateContext } from "../../../../contexts/AppContext";

const FinancialAnalaysis = () => {
  const { setError, setErrorMessage } = useStateContext();
  const [AppointmentIncom, setAppointmentIncom] = useState(null);
  const [TreatmentIncom, setTreatmentIncom] = useState(null);
  useEffect(() => {
    try {
      getAll("/TotalIncome/Appointments")
        .then((res) => {
          if (res.response) {
            setError(true);
            setErrorMessage(res.response.data);
            return;
          }
          setAppointmentIncom(res);
        })
        .catch((er) => {
          console.log(er);
        });
    } catch (error) {
      throw new Error("Error is", error);
    }

    try {
      getAll("/TotalIncome/Treatments")
        .then((res) => {
          if (res.response) {
            setError(true);
            setErrorMessage(res.response.data);
            return;
          }
          setTreatmentIncom(res);
        })
        .catch((er) => {
          console.log(er);
        });
    } catch (error) {
      throw new Error("Error is", error);
    }
  }, []);
  return (
    <div className="bg-gradient-to-br from-red-700 to-primary text-white drop-shadow-xl w-72 mx-8 md:-12 h-auto rounded">
      <div className="flex w-full bg-white text-red-700 p-4 justify-center rounded-t">
        <h1 className="text-xl font-medium">Financial Analaysis</h1>
      </div>
      <div className="flex flex-col gap-3 my-5 px-2">
        <div className="flex justify-between items-center mt-1 p-2.5 shadow-md rounded">
          <p className="capitalize font-medium tracking-wide">
            {AppointmentIncom ? AppointmentIncom.title : "Title"}
          </p>
          <p className="font-medium">
            {AppointmentIncom
              ? AppointmentIncom.total.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 1,
                }) + " $"
              : "$ 4.0"}
          </p>
        </div>

        <div className="flex justify-between items-center mt-1 p-2.5 shadow-md rounded">
          <p className="capitalize font-medium tracking-wide">
            {TreatmentIncom ? TreatmentIncom.title : "Title"}
          </p>
          <p className="font-medium">
            {TreatmentIncom
              ? TreatmentIncom.total.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 1,
                }) + " $"
              : "$ 4.0"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalaysis;
