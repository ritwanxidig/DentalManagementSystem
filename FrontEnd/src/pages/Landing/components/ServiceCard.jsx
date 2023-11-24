import React, { useState, useEffect } from "react";
import { FaTeethOpen } from "react-icons/fa";
import Button from "./Button";
import styles from "../styles";
import { getAll } from "../../../ApiServices/CrudeApiCalls";

const ServiceCard = ({ service, index }) => {
  const [ServicesData, setServicesData] = useState([]);

  useEffect(() => {
    getAll(`/Services`)
      .then((res) => {
        if (res.message || res.response) {
          setServicesData([]);
          return;
        }
        setServicesData(res);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);
  return (
    <div
      className={`flex flex-row p-6 rounded-[20px] hover:bg-red-300 transition ${
        index !== ServicesData.length - 1 ? "mb-6" : "mb-0"
      } `}
    >
      <div
        className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-gray-200`}
      >
        <FaTeethOpen className="w-[50%] h-[50%] object-contain text-primary" />
      </div>
      <div className="flex-1 flex flex-col ml-3">
        <h4 className="font-poppins font-semibold text-primary w-full text-[18px] leading-[23.4px] mb-1">
          {service ? service.name : "Service Name"}
        </h4>
        <p className="font-poppins font-normal text-gray-400 text-[16px] leading-[24px]">
          {service ? service.price + " $" : "0 $"}
        </p>
        <p className="font-poppins font-normal text-gray-400 text-[16px] leading-[24px]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique,
          ea porro. Nobis, consequuntur? Debitis, quas?
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
