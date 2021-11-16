import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const AllApplications = () => {
  let [data, setData] = useState([]);
  let [isLoading, setisLoading] = useState(true);

  let instagramURL = "https://www.instagram.com/";
  let facebookURL = "https://www.facebook.com/";

  const confirmDelete = (id) => {
    let isConfirm = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cettte candidature?"
    );
    if (isConfirm) {
      handleDelete(id);
    }
  };

  const handleDelete = (id) => {
    fetch(`https://parallaxawards.herokuapp.com/deleteApplication/${id}`, {
      method: "DELETE",
    }).then((res) => {
      window.location.reload();
    });
  };

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
            ? `Il y a ${data.length} oeuvre`
            : `Il y a ${data.length} oeuvres`}
        </h2>
        {isLoading ? (
          <div className="fetching">
            <Loading />
          </div>
        ) : (
          <div className="data">
            {data.map((app) => (
              <ul key={app._id}>
                <input value={app._id} hidden disabled />
                <li>Catégorie: {app.category}</li>
                <li>Nom: {app.name}</li>
                <li>Prénom: {app.firstname}</li>
                <li>Date de naissance: {app.birthdate}</li>
                <li>Lieu de naissance: {app.birthLocation}</li>
                <li>Nationalité: {app.nationality}</li>
                <li>Email: {app.email}</li>
                <li>Téléphone: {app.phone}</li>
                <li>Adresse: {app.adress}</li>
                <li>
                  Instagram: {""}
                  {app.instaHandle.match(
                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm
                  ) ? (
                    <a href={app.instaHandle} target="_blank">
                      {app.instaHandle}
                    </a>
                  ) : (
                    <a
                      href={
                        instagramURL +
                        app.instaHandle.replace(/[^a-zA-Z0-9_-]/g, "")
                      }
                      target="_blank"
                    >
                      {app.instaHandle}
                    </a>
                  )}
                </li>
                <li>
                  Facebook: {""}
                  {app.facebookHandle.match(
                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm
                  ) ? (
                    <a href={app.facebookHandle} target="_blank">
                      {app.facebookHandle}
                    </a>
                  ) : (
                    <a
                      href={
                        facebookURL +
                        app.facebookHandle.replace(/[^a-zA-Z0-9_-]/g, "")
                      }
                      target="_blank"
                    >
                      {app.facebookHandle}
                    </a>
                  )}
                </li>
                <li>
                  Website:{" "}
                  <a href={app.website} target="_blank">
                    {app.website}
                  </a>
                </li>
                <li>Titre de l'oeuvre: {app.title}</li>
                <li>Date de création de l'oeuvre: {app.artDate}</li>
                <li>Contexte: {app.context}</li>
                {app.link ? (
                  <li>
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
