import React from "react";
import styles from "../styles";
import { useEffect } from "react";
import { getAll } from "../../../ApiServices/CrudeApiCalls";
import { useState } from "react";

const Stats = () => {
  const [TotalApps, setTotalApps] = useState(0);
  const [TotalPatients, setTotalPatients] = useState(0);
  const [TotalTreatments, setTotalTreatments] = useState(0);

  useEffect(() => {
    getAll(`/Appointments/TotalAppointments`)
      .then((res) => {
        if (res.response || res.message) {
          setTotalApps(0);
          console.log(res.response.data);
        }
        setTotalApps(res);
      })
      .catch((er) => {
        console.log(er);
      });

    getAll(`Patients/TotalPatients`)
      .then((res) => {
        if (res.response || res.message) {
          setTotalPatients(0);
          console.log(res.response.data);
        }
        setTotalPatients(res);
      })
      .catch((er) => {
        console.log(er);
      });

    getAll(`Treatments/TotalTreatments`)
      .then((res) => {
        if (res.response || res.message) {
          setTotalTreatments(0);
          console.log(res.response.data);
        }
        setTotalTreatments(res);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  const stats = [
    { id: 1, value: TotalApps, title: "Appointments" },
    { id: 2, value: TotalPatients, title: "Patients" },
    { id: 3 , value: TotalTreatments, title: "Treatments" },
  ];

  return (
    <div>
      <section
        className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}
      >
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`flex-1 flex justify-start items-center flex-row m-3`}
          >
            <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-primary">
              {stat.value}+
            </h4>
            <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient uppercase ml-3">
              {stat.title}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Stats;
