import React, { useRef } from "react";
import ReactDOM from "react-dom";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./Tools";

const Modal = ({ isShowing, hide }) => {
  const instanceRef = useRef(null);

  async function handleSave() {
    const savedData = await instanceRef.current.save();
    console.log(savedData);
  }

  if (isShowing) {
    return ReactDOM.createPortal(
      <>
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <div className="modal">
              <div className="modal-header">
                <h4>Entrez le texte à envoyer</h4>
                <button
                  type="button"
                  className="modal-close-button"
                  onClick={hide}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div id="editorjs">
                  <EditorJs
                    instanceRef={(instance) => (instanceRef.current = instance)}
                    tools={EDITOR_JS_TOOLS}
                  />
                </div>
              </div>
              <button id="send-email" className="" onClick={handleSave}>
                Send emails
              </button>
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

export default Modal;
