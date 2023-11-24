import React from "react";
import ServiceCard from "./ServiceCard";
import Button from "./Button";
import styles, { layout } from "../styles";
import { FaTeethOpen } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { getAll } from "../../../ApiServices/CrudeApiCalls";

const Services = () => {
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
  const services = [
    {
      icon: (
        <FaTeethOpen className="w-[50%] h-[50%] object-contain text-primary" />
      ),
      title: "Tooth Decay",
      content: "ladskf jdskfld jaljdsl adslf lkdsaf dsa ldk sjflakdsjf ",
    },
    {
      icon: (
        <FaTeethOpen className="w-[50%] h-[50%] object-contain text-primary" />
      ),
      title: "Tooth Decay",
      content: "ladskf jdskfld jaljdsl adslf lkdsaf dsa ldk sjflakdsjf ",
    },
    {
      icon: (
        <FaTeethOpen className="w-[50%] h-[50%] object-contain text-primary" />
      ),
      title: "Tooth Decay",
      content: "ladskf jdskfld jaljdsl adslf lkdsaf dsa ldk sjflakdsjf ",
    },
    {
      icon: (
        <FaTeethOpen className="w-[50%] h-[50%] object-contain text-primary" />
      ),
      title: "Tooth Decay",
      content: "ladskf jdskfld jaljdsl adslf lkdsaf dsa ldk sjflakdsjf ",
    },
    {
      icon: (
        <FaTeethOpen className="w-[50%] h-[50%] object-contain text-primary" />
      ),
      title: "Tooth Decay",
      content: "ladskf jdskfld jaljdsl adslf lkdsaf dsa ldk sjflakdsjf ",
    },
  ];
  return (
    <section id="services" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Optimal Oral Care: <br className="sm:block hidden" /> Unveiling the
          Exceptional Service at Our Dental Clinic.
        </h2>
        <p className={`${styles.paragraph} max-w-[640px] mt-5`}>
          At our dental clinic, we believe that your beautiful smile is a
          reflection of our commitment to providing outstanding quality of
          service. From the moment you step through our doors, our dedicated
          team ensures that you feel welcomed, comfortable, and at ease. Our
          emphasis on personalized care means that we take the time to
          understand your unique dental needs and tailor our treatments
          accordingly. With state-of-the-art technology and a team of highly
          skilled professionals, we deliver exceptional results in a relaxing
          environment. We pride ourselves on our attention to detail, ensuring
          that every procedure is performed with precision and care. At our
          dental clinic, we guarantee a seamless experience, leaving you with a
          healthy and confident smile that will last for years to come.
        </p>

        <Button />
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {ServicesData && ServicesData.length > 0 ? (
          ServicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))
        ) : (
          <p> No Services, I think It is Connection Error </p>
        )}
      </div>
    </section>
  );
};

export default Services;
