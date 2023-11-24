import styles from "../styles";
import GetStarted from "./GetStarted";
import { MdDiscount } from "react-icons/md";
import { FaMoneyBill, FaSmile } from "react-icons/fa";
import { doctor } from "../../../data";

const Hero = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="flex flex-row items-center py-[6px] px-4 bg-gradient-to-tr from-primary to-red-300 rounded-[10px] mb-2">
          <FaSmile className="w-[32px] h-[32px] text-white" />
          <p className={`font-poppins font-normal text-[18px] leading-[30.8px]} ml-2`}>
            <span className="text-white">SmileSaver: </span> Revolutionizing
            <span className="text-white"> 1 Month</span> Only
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-primary ss:leading-[100.8px] leading-[75px]">
            Dental Clinic Management Online! <br className="sm:block hidden" />
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>

        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Rajo Dental Clinics: Where Smiles Come to Life! Experience exceptional
          dental care tailored to your needs, with a range of services including
          routine cleanings, teeth whitening, orthodontics, and more. Trust our
          team of skilled professionals to deliver comprehensive, gentle, and
          personalized care for your whole family.
        </p>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <img src={doctor} className="w-[100%] h-[100%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
