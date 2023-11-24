import React, { useEffect } from "react";
import { render } from "react-dom";
import { useParams } from "react-router-dom";

import { Delete } from "../../ApiServices/InvoicesApiCalls";

const InvoiceDelete = () => {
  const { id } = useParams();
  console.log(id);
  const handleDelete = () => {
    Delete(id)
      .then((msg) => {
        alert(msg);
      })
      .catch((er) => {
        console.log(er);
        alert("Error see console");
      });
  };
  useEffect(() => {
    handleDelete();
  }, [id]);
  return <div></div>;
};

export default InvoiceDelete;
