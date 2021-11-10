import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const AllJuries = () => {
  let [data, setData] = useState([]);
  let [isLoading, setisLoading] = useState(true);

  let instagramURL = "https://www.instagram.com/";
  let facebookURL = "https://www.facebook.com/";
  let linkedinURL = "https://www.linkedin.com/";

  const confirmDelete = (id) => {
    let isConfirm = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce membre du jury?"
    );
    if (isConfirm) {
      handleDelete(id);
    }
  };

  const handleDelete = (id) => {
    fetch(`https://parallaxawards.herokuapp.com/deleteJury/${id}`, {
      method: "DELETE",
    }).then((res) => {
      window.location.reload();
    });
  };

  useEffect(() => {
    fetch("https://parallaxawards.herokuapp.com/getJury")
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
        <h1>All Juries</h1>
        <h2>
          {data.length <= 1
            ? `Il y a ${data.length} jury`
            : `Il y a ${data.length} juries`}
        </h2>
        {isLoading ? (
          <div className="fetching">
            <Loading />
          </div>
        ) : (
          <div className="data">
            {data.map((app) => (
              <ul>
                <button
                  className="deleteButton"
                  onClick={() => confirmDelete(app._id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="delete" />
                </button>
                <input value={app._id} hidden disabled />
                <li key={data.categorie}>Catégorie: {app.categorie}</li>
                <li key={data.name}>Nom: {app.name}</li>
                <li key={data.firstname}>Prénom: {app.firstname}</li>
                <li key={data.email}>Email: {app.email}</li>
                <li key={data.phone}>Téléphone: {app.phone}</li>
                <li key={data.adress}>Adresse: {app.adress}</li>
                <li key={data.instaHandle}>
                  Instagram:{" "}
                  <a
                    href={
                      instagramURL +
                      app.instaHandle.replace(/[^a-zA-Z0-9_-]/g, "")
                    }
                    target="_blank"
                  >
                    {app.instaHandle}
                  </a>
                </li>
                <li key={data.facebookHandle}>
                  Facebook: {""}
                  {app.facebookHandle.match(
                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm
                  ) ? (
                    <a href={app.facebookHandle} target="_blank">
                      {app.facebookHandle}
                    </a>
                  ) : (
                    <a href={facebookURL + app.facebookHandle} target="_blank">
                      {app.facebookHandle}
                    </a>
                  )}
                </li>
                <li key={data.linkedinHandle}>
                  LinkedIn: {""}
                  {app.linkedinHandle.match(
                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm
                  ) ? (
                    <a href={app.linkedinHandle} target="_blank">
                      {app.linkedinHandle}
                    </a>
                  ) : (
                    <a href={linkedinURL + app.linkedinHandle} target="_blank">
                      {app.linkedinHandle}
                    </a>
                  )}
                </li>

                <li key={data.website}>
                  Website:{" "}
                  <a href={app.website} target="_blank">
                    {app.website}
                  </a>
                </li>
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

export default AllJuries;
