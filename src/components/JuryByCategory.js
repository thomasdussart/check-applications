import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";

const JuryByCategory = () => {
  let [data, setData] = useState([]);
  let [isLoading, setisLoading] = useState(true);
  let [isEditing, setisEditing] = useState(false);

  let instagramURL = "https://www.instagram.com/";
  let facebookURL = "https://www.facebook.com/";
  let linkedinURL = "https://www.linkedin.com/";

  const fetchByCategory = () => {
    let categorie = document.getElementById("categories").value;
    const cate = {
      categorie: categorie,
    };
    fetch("https://parallaxawards.herokuapp.com/getJuryCategory", {
      method: "POST",
      body: JSON.stringify(cate),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((cat) => {
        setData(cat);
      })
      .catch((error) => {
        console.error("Error fetching cat :", error);
      })
      .finally((fin) => {
        setisLoading(false);
      });
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

  if (localStorage.getItem("isLoggedIn")) {
    if (isLoading) {
      return (
        <div>
          <h1>Juries by category</h1>
          <select name="" id="categories">
            <option value="default">Choisissez votre catégorie</option>
            <option value="photo">Photo</option>
            <option value="video">Vidéo</option>
            <option value="graphisme">Graphisme</option>
            <option value="animation">Animation 3D</option>
            <option value="meme">Meme & GIF</option>
          </select>
          <button id="category" onClick={() => fetchByCategory()}>
            Par catégorie
          </button>
        </div>
      );
    }
    if (!isLoading) {
      return (
        <div>
          <h1>Applications by category</h1>
          <select name="" id="categories">
            <option value="default">Choisissez votre catégorie</option>
            <option value="photo">Photo</option>
            <option value="video">Vidéo</option>
            <option value="graphisme">Graphisme</option>
            <option value="animation">Animation 3D</option>
            <option value="meme">Meme & GIF</option>
          </select>
          <button id="category" onClick={() => fetchByCategory()}>
            Par catégorie
          </button>
          <div className="data">
            <h2>
              {data.data.length <= 1
                ? `${data.data.length} candidature dans la catégorie`
                : `${data.data.length} candidatures dans la catégorie`}
            </h2>
            {data.data.map((cat) => (
              <ul key={cat._id}>
                <button
                  className="deleteButton"
                  onClick={() => confirmDelete(cat._id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="delete" />
                </button>
                <input value={cat._id} hidden disabled />
                <li>
                  Catégorie: <span id="cat">{cat.categorie}</span>{" "}
                  {isEditing ? (
                    <input type="submit" value="Modifier" />
                  ) : (
                    <button className="editButton">
                      <FontAwesomeIcon icon={faPenAlt} className="edit" />
                    </button>
                  )}
                </li>
                <li>
                  Specialité: {cat.specialite}
                  <button className="editButton">
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
                  Nom: {cat.name}
                  <button className="editButton">
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
                  Prénom: {cat.firstname}
                  <button className="editButton">
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
                  Email: {cat.email}
                  <button className="editButton">
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
                  Téléphone: {cat.phone}
                  <button className="editButton">
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
                  Adresse: {cat.adress}
                  <button className="editButton">
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
                  Instagram: {""}
                  {cat.instaHandle.match(
                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm
                  ) ? (
                    <a href={cat.instaHandle} target="_blank">
                      {cat.instaHandle}
                    </a>
                  ) : (
                    <a
                      href={
                        instagramURL +
                        cat.instaHandle.replace(/[^a-zA-Z0-9_-]/g, "")
                      }
                      target="_blank"
                    >
                      {cat.instaHandle}
                    </a>
                  )}
                  <button className="editButton">
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
                  Facebook: {""}
                  {cat.facebookHandle.match(
                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm
                  ) ? (
                    <a href={cat.facebookHandle} target="_blank">
                      {cat.facebookHandle}
                    </a>
                  ) : (
                    <a href={facebookURL + cat.facebookHandle} target="_blank">
                      {cat.facebookHandle}
                    </a>
                  )}
                  <button className="editButton">
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
                <li>
                  LinkedIn: {""}
                  {cat.linkedinHandle.match(
                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm
                  ) ? (
                    <a href={cat.linkedinHandle} target="_blank">
                      {cat.linkedinHandle}
                    </a>
                  ) : (
                    <a href={linkedinURL + cat.linkedinHandle} target="_blank">
                      {cat.linkedinHandle}
                    </a>
                  )}
                  <button className="editButton">
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>

                <li>
                  Website:{" "}
                  <a href={cat.website} target="_blank">
                    {cat.website}
                  </a>
                  <button className="editButton">
                    <FontAwesomeIcon icon={faPenAlt} className="edit" />
                  </button>
                </li>
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

export default JuryByCategory;
