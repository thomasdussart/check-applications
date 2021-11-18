import React, { useState } from "react";

const ByCategory = () => {
  let [data, setData] = useState([]);
  let [isLoading, setisLoading] = useState(true);

  let instagramURL = "https://www.instagram.com/";
  let facebookURL = "https://www.facebook.com/";

  const fetchByCategory = () => {
    let categorie = document.getElementById("categories").value;
    const cate = {
      categorie: categorie,
    };

    fetch("https://parallaxawards.herokuapp.com/getCategory", {
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

  if (localStorage.getItem("isLoggedIn")) {
    if (isLoading) {
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
                <li>Catégorie: {cat.category}</li>
                <li>Nom: {cat.name}</li>
                <li>Prénom: {cat.firstname}</li>
                <li>Date de naissance: {cat.birthdate}</li>
                <li>Lieu de naissance: {cat.birthLocation}</li>
                <li>Nationalité: {cat.nationality}</li>
                <li>Email: {cat.email}</li>
                <li>Téléphone: {cat.phone}</li>
                <li>Adresse: {cat.adress}</li>
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
                    <a
                      href={
                        facebookURL +
                        cat.facebookHandle.replace(/[^a-zA-Z0-9_-]/g, "")
                      }
                      target="_blank"
                    >
                      {cat.facebookHandle}
                    </a>
                  )}
                </li>
                <li>
                  Website:{" "}
                  <a href={"//" + cat.website} target="_blank">
                    {cat.website}
                  </a>
                </li>
                <li>Titre de l'oeuvre: {cat.title}</li>
                <li>Date de création de l'oeuvre: {cat.artDate}</li>
                <li>Contexte: {cat.context}</li>
                {cat.link ? (
                  <li>
                    Lien de l'oeuvre:{" "}
                    <a href={cat.link} target="_blank">
                      WeTransfer
                    </a>
                  </li>
                ) : null}
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

export default ByCategory;
