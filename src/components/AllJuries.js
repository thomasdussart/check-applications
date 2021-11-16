import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";

const AllJuries = () => {
  let [data, setData] = useState([]);
  let [id, setId] = useState(0);
  let [isLoading, setisLoading] = useState(true);
  let [isEditing, setisEditing] = useState(false);

  let youtubeURL = "https://www.youtube.com/channel/";
  let instagramURL = "https://www.instagram.com/";
  let facebookURL = "https://www.facebook.com/";
  let linkedinURL = "https://www.linkedin.com/";

  const handleChange = () => {
    setisEditing(true);
    let span = document.getElementById("cat");
    span.setAttribute("contenteditable", "true");
  };

  const handleModify = () => {
    setisEditing(false);
    let newData = document.getElementById("cat").textContent;
    console.log(newData);
  };

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
              <ul key={app._id}>
                <button
                  className="deleteButton"
                  onClick={() => confirmDelete(app._id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="delete" />
                </button>
                <input value={app._id} hidden disabled />
                <li>
                  Catégorie: <span id="cat">{app.categorie}</span>{" "}
                  {isEditing ? (
                    <input
                      type="submit"
                      value="Modifier"
                      onClick={() => handleModify()}
                    />
                  ) : (
                    <button
                      className="editButton"
                      onClick={() => handleChange()}
                    >
                      <FontAwesomeIcon icon={faPenAlt} className="edit" />
                    </button>
                  )}
                </li>
                <li>
                  Specialité: {app.specialite}
                  <button className="editButton" onClick={() => handleChange()}>
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
                  Nom: {app.name}
                  <button className="editButton" onClick={() => handleChange()}>
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
                  Prénom: {app.firstname}
                  <button className="editButton" onClick={() => handleChange()}>
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
                  Email: {app.email}
                  <button className="editButton" onClick={() => handleChange()}>
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
                  Téléphone: {app.phone}
                  <button className="editButton" onClick={() => handleChange()}>
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
                  Adresse: {app.adress}
                  <button className="editButton" onClick={() => handleChange()}>
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
                  Youtube: {""}
                  {app.youtubeHandle.match(
                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm
                  ) ? (
                    <a href={app.youtubeHandle} target="_blank">
                      {app.youtbeHandle}
                    </a>
                  ) : (
                    <a href={youtubeURL + app.youtubeHandle} target="_blank">
                      {app.youtubeHandle}
                    </a>
                  )}
                  <button className="editButton" onClick={() => handleChange()}>
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
                  Instagram: {""}
                  {app.instaHandle.match(
                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm
                  ) ? (
                    <a href={app.instaHandle} target="_blank">
                      {app.instaHandle}
                    </a>
                  ) : (
                    <a href={instagramURL + app.instaHandle} target="_blank">
                      {app.instaHandle}
                    </a>
                  )}
                  <button className="editButton" onClick={() => handleChange()}>
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
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
                  <button className="editButton" onClick={() => handleChange()}>
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
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
                  <button className="editButton" onClick={() => handleChange()}>
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>

                <li>
                  Website:{" "}
                  <a href={app.website} target="_blank">
                    {app.website}
                  </a>
                  <button className="editButton" onClick={() => handleChange()}>
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
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
