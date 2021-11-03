import React, { useState } from "react";
import Login from "./Login";

const ByCategory = () => {
  let [data, setData] = useState([]);
  let [isLoading, setisLoading] = useState(true);

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
              <ul>
                <li key={data.category}>Catégorie: {cat.category}</li>
                <li key={data.name}>Nom: {cat.name}</li>
                <li key={data.firstname}>Prénom: {cat.firstname}</li>
                <li key={data.birthdate}>Date de naissance: {cat.birthdate}</li>
                <li key={data.birthLocation}>
                  Lieu de naissance: {cat.birthLocation}
                </li>
                <li key={data.nationality}>Nationalité: {cat.nationality}</li>
                <li key={data.email}>Email: {cat.email}</li>
                <li key={data.phone}>Téléphone: {cat.phone}</li>
                <li key={data.adress}>Adresse: {cat.adress}</li>
                <li key={data.instaHandle}>Instagram: {cat.instaHandle}</li>
                <li key={data.facebookHandle}>
                  Facebook: {cat.facebookHandle}
                </li>
                <li key={data.website}>Website: {cat.website}</li>
                <li key={data.title}>Titre de l'oeuvre: {cat.title}</li>
                <li key={data.artDate}>
                  Date de création de l'oeuvre: {cat.artDate}
                </li>
                <li key={data.context}>Contexte: {cat.context}</li>
                <li key={data.link}>Lien de l'oeuvre: {cat.link}</li>
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
