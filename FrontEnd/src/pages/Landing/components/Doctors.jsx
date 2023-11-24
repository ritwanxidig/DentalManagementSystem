import React, { useEffect, useState } from "react";
import styles, { layout } from "../styles";
import { avatar } from "../../../data";
import { FaPhoneSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import DoctorCard from "./DoctorCard";
import { getAll } from "../../../ApiServices/CrudeApiCalls";

const Doctors = () => {
  const [TotalDoctors, setTotalDoctors] = useState([]);
  useEffect(() => {
    getAll("/Doctors")
      .then((res) => {
        if (res.response || res.message) {
          setTotalDoctors([]);
          return;
        }
        setTotalDoctors(res);
      })
      .catch((Er) => {
        console.log(Er);
      });
  }, []);
  console.log(TotalDoctors);
  return (
    <section id="doctors" className={layout.section}>
      <div className="mt-8 flex flex-col gap-2 w-full ">
        <h1
          className={`text-center font-display xs:text-[48px] text-[40px] text-primary xs:leading-[76.8px] leading-[66.8px] w-full uppercase font-black bg-white shadow-sm `}
        >
          Doctors
        </h1>
        <div className="grid md:grid-cols-4 my-4 gap-7 w-full">
          {TotalDoctors && TotalDoctors.length > 0 ? (
            TotalDoctors.map((d, i) => <DoctorCard Doctor={d} key={i} />)
          ) : (
            <>
              <div>
                <p>No Doctors, There's may be connection error</p>{" "}
                <DoctorCard />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
