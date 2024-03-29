import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import useModal from "./useModal";
import Modal from "./ModalEmail";

const AllEmail = () => {
  let [isShowing, setIsShowing] = useState(false);
  let [data, setData] = useState([]);
  let [isLoading, setisLoading] = useState(true);

  // your code here
  const toggle = () => {
    setIsShowing(!isShowing);
  };

  useEffect(() => {
    axios
      .get("https://parallaxawards.herokuapp.com/getEmail")
      .then((app) => {
        setData(app);
      })
      .catch((error) => {
        console.error("Error fetching data :", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  }, []);

  const bulkEmail = () => {
    let emails = [...document.getElementsByClassName("mail")];
    emails.forEach((mail) => {
      const data = {
        mail: mail.textContent,
      };
      fetch("https://parallaxawards.herokuapp.com/bulkEmail", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(console.log("mail sent"));
    });
  };

  if (localStorage.getItem("isLoggedIn")) {
    if (isLoading) {
      return (
        <div>
          <h1>All Emails</h1>
          {/* <button className="modal-toggle" id="email_button" onClick={toggle}>
            Send Thanks mail
          </button> */}
          <Modal isShowing={isShowing} hide={toggle} />
          <div className="fetching">
            <Loading />
          </div>
        </div>
      );
    }

    if (!isLoading) {
      return (
        <div>
          <h1>All Emails</h1>
          {/* <button className="modal-toggle" id="email_button" onClick={toggle}>
            Send Thanks mail
          </button> */}

          <Modal isShowing={isShowing} hide={toggle} />
          <div className="data">
            <h2>
              {data.data.length <= 1
                ? `Il y a ${data.data.length} adresse email`
                : `Il y a ${data.data.length} adresses email`}
            </h2>
            {data.data.map((app) => (
              <ul key={app}>
                <li className="mail">{app}</li>
              </ul>
            ))}
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="notConnected">
        <h1>Vous n'êtes pas connecté</h1>
        <button onClick={() => (window.location.href = "/")}>
          Se connecter
        </button>
      </div>
    );
  }
};

export default AllEmail;
