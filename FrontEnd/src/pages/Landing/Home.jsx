import React from "react";
import styles from "./styles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Doctors from "./components/Doctors";
import Footer from "./components/Footer";
import { useStateContext } from "../../contexts/AppContext";

const HomeLandinPage = () => {
  const { Error, ErrorMessage, setError, setErrorMessage } = useStateContext();
  return (
    <div className="bg-secondary w-full overflow-hidden">
      {Error && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all">
          <div className="bg-white rounded shadow p-4">
            <div className="flex justify-between items-center -mt-3">
              <span>Error</span>
              <button
                className="hover:bg-light-gray flex justify-center items-center p-2 rounded-full"
                onClick={() => setError(false)}
              >
                <MdCancel className="w-6 h-6" />
              </button>
            </div>
            <p>
              Error:{" "}
              <span className="text-sm text-red-500">{ErrorMessage}</span>
            </p>
          </div>
        </div>
      )}
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-secondary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>

      <div className={`bg-secodary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <Services />
          <Doctors />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomeLandinPage;
