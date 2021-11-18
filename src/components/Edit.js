import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";

import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  return (
    <div className="container">
      <FontAwesomeIcon icon={faPenAlt} className="edit" />
    </div>
  );
};

export default Edit;
