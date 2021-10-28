import React, { useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import Pagination from "@mui/material/Pagination";

const AllJuries = () => {
  let [data, setData] = useState([]);
  let [isLoading, setisLoading] = useState(true);
  let [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const perPage = 5;

  const handleChange = (event, value) => {
    setPage(value);
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
        setError(error);
      })
      .finally(() => {
        setisLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>All Applications</h1>
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
              <input value={app._id} hidden disabled />
              <li key={data.category}>Catégorie: {app.category}</li>
              <li key={data.name}>Nom: {app.name}</li>
              <li key={data.firstname}>Prénom: {app.firstname}</li>
              <li key={data.email}>Email: {app.email}</li>
              <li key={data.phone}>Téléphone: {app.phone}</li>
              <li key={data.adress}>Adresse: {app.adress}</li>
              <li key={data.instaHandle}>Instagram: {app.instaHandle}</li>
              <li key={data.facebookHandle}>Facebook: {app.facebookHandle}</li>
              <li key={data.website}>Website: {app.website}</li>
            </ul>
          ))}
        </div>
      )}
      <div className="pagination">
        <Pagination
          count={data.length / perPage}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export default AllJuries;
