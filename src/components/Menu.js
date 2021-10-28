import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <h2 className="">Rechercher</h2>
      {/* toutes les candidatures */}
      <p className="">
        <Link className="" to={"/all-applications"}>
          Toutes les candidatures
        </Link>
      </p>
      {/* Par catégorie */}
      <p className="">
        <Link className="" to={"/categories"}>
          Par catégorie
        </Link>
      </p>
      <p className="">
        <Link className="" to={"/addJury"}>
          Ajouter membre Jury
        </Link>
      </p>
      <p className="">
        <Link className="" to={"/getJuries"}>
          Membres du Jury
        </Link>
      </p>
      {/* <p className="">
        <Link className="" to={"/all-emails"}>
          Tous les emails
        </Link>
      </p> */}
    </div>
  );
};

export default Menu;
