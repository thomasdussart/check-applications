import React from "react";
import ReactDOM from "react-dom";
import Loading from "./Loading";

const ModalJury = ({ isShowing, hide }) => {
  if (isShowing) {
    return ReactDOM.createPortal(
      <>
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <div className="modal">
              <div className="modal-body">
                <Loading />
              </div>
            </div>
          </div>
        </div>
      </>,
      document.body
    );
  } else {
    return null;
  }
};

export default ModalJury;
