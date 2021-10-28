import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

const AllApplications = () => {
  let [data, setData] = useState([]);
  let [isLoading, setisLoading] = useState(true);
  let [error, setError] = useState(null);
  let emails = [];

  useEffect(() => {
    axios
      .get("https://parallaxawards.herokuapp.com/getAll")
      .then((app) => {
        setData(app);
      })
      .catch((error) => {
        console.error("Error fetching data :", error);
        setError(error);
      })
      .finally(() => {
        setisLoading(false);
      });
  }, []);

  const bulkEmail = () => {
    const mails = {
      emails: emails,
    };
    fetch("https://parallaxawards.herokuapp.com/bulkEmail", {
      method: "POST",
      body: JSON.stringify(mails),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(console.log("mail sent"));
  };

  if (isLoading) {
    return (
      <div>
        <h1>All Emails</h1>
        <button onClick={() => bulkEmail()}>Send Thanks mail</button>
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
        <button id="email_button" onClick={() => bulkEmail()}>
          Send Thanks mail
        </button>
        <div className="data">
          <h2>
            {data.length <= 1
              ? `Il y a ${data.length} adresse email`
              : `Il y a ${data.length} adresses email`}
          </h2>
          {data.map(
            (app) => (
              emails.push(app.email),
              (
                <ul>
                  <li key={data.email}>Email: {app.email}</li>
                </ul>
              )
            )
          )}
        </div>
      </div>
    );
  }
};

export default AllApplications;
