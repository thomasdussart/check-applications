import React, { useState, useEffect } from "react";
import Loading from "./Loading";

const AllJuries = () => {
  let [data, setData] = useState([]);
  let [isLoading, setisLoading] = useState(true);

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
            {console.log(data)}
            {data.map((app) => (
              <ul>
                <input value={app._id} hidden disabled />
                <li key={data.categorie}>Catégorie: {app.categorie}</li>
                <li key={data.name}>Nom: {app.name}</li>
                <li key={data.firstname}>Prénom: {app.firstname}</li>
                <li key={data.email}>Email: {app.email}</li>
                <li key={data.phone}>Téléphone: {app.phone}</li>
                <li key={data.adress}>Adresse: {app.adress}</li>
                <li key={data.linkedinHandle}>
                  LinkedIn: {app.linkedinHandle}
                </li>
                <li key={data.instaHandle}>Instagram: {app.instaHandle}</li>
                <li key={data.facebookHandle}>
                  Facebook: {app.facebookHandle}
                </li>
                <li key={data.website}>Website: {app.website}</li>
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
