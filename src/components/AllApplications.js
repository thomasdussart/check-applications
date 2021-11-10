import React, { useState, useEffect } from "react";
import Loading from "./Loading";

const AllApplications = () => {
  let [data, setData] = useState([]);
  let [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetch("https://parallaxawards.herokuapp.com/getAll")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
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

  if (localStorage.getItem("isLoggedIn")) {
    return (
      <div>
        <h1>All Applications</h1>
        <h2>
          {data.length <= 1
            ? `Il y a ${data.length} candidature`
            : `Il y a ${data.length} candidatures`}
        </h2>
        {isLoading ? (
          <div className="fetching">
            <Loading />
          </div>
        ) : (
          <div className="data">
            {data.map((app) => (
              <ul>
                <input value={app._id} hidden disabled />
                <li key={data.category}>Catégorie: {app.category}</li>
                <li key={data.name}>Nom: {app.name}</li>
                <li key={data.firstname}>Prénom: {app.firstname}</li>
                <li key={data.birthdate}>Date de naissance: {app.birthdate}</li>
                <li key={data.birthLocation}>
                  Lieu de naissance: {app.birthLocation}
                </li>
                <li key={data.nationality}>Nationalité: {app.nationality}</li>
                <li key={data.email}>Email: {app.email}</li>
                <li key={data.phone}>Téléphone: {app.phone}</li>
                <li key={data.adress}>Adresse: {app.adress}</li>
                <li key={data.instaHandle}>Instagram: {app.instaHandle}</li>
                <li key={data.facebookHandle}>
                  Facebook: {app.facebookHandle}
                </li>
                <li key={data.website}>Website: {app.website}</li>
                <li key={data.title}>Titre de l'oeuvre: {app.title}</li>
                <li key={data.artDate}>
                  Date de création de l'oeuvre: {app.artDate}
                </li>
                <li key={data.context}>Contexte: {app.context}</li>
                {app.link ? (
                  <li key={data.link}>
                    Lien de l'oeuvre:{" "}
                    <a href={app.link} target="_blank">
                      WeTransfer
                    </a>
                  </li>
                ) : null}
              </ul>
            ))}
          </div>
        )}
      </div>
    );
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

export default AllApplications;
