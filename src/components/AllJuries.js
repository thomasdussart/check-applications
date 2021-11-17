import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EasyEdit from "react-easy-edit";

const AllJuries = () => {
  let [data, setData] = useState([]);
  let [isLoading, setisLoading] = useState(true);

  let youtubeURL = "https://www.youtube.com/channel/";
  let instagramURL = "https://www.instagram.com/";
  let facebookURL = "https://www.facebook.com/";
  let linkedinURL = "https://www.linkedin.com/";

  const cancel = () => {
    console.log("Cancelled");
  };

  const save = async (value, id, cat) => {
    const data = {
      categorie: cat,
      text: value,
      id: id,
    };

    https: await toast.promise(
      fetch("https://parallaxawards.herokuapp.com/modifyJury", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        window.location.href = "/getJuries";
      }),
      {
        pending: "Ajout en cours",
        success: "Ajouté 👌",
        error: "Oops, il y a eu une erreur 🤯",
      }
    );
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
                  Catégorie: {app.categorie}
                  <EasyEdit
                    className="easy-edit"
                    type="text"
                    onSave={(value) =>
                      save(value, app._id, Object.keys(app)[1])
                    }
                    onCancel={cancel}
                    saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                    cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                    attributes={{ name: "awesome-input", id: 1 }}
                  />
                </li>
                <li className="specialite">
                  Spécialité: {app.specialite}{" "}
                  <EasyEdit
                    className="easy-edit"
                    type="textarea"
                    onSave={(value) =>
                      save(value, app._id, Object.keys(app)[2])
                    }
                    onCancel={cancel}
                    saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                    cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                    attributes={{ name: "awesome-input", id: 1 }}
                  />
                </li>
                <li>
                  Nom: {app.name}{" "}
                  <EasyEdit
                    className="easy-edit"
                    type="text"
                    onSave={(value) =>
                      save(value, app._id, Object.keys(app)[3])
                    }
                    onCancel={cancel}
                    saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                    cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                    attributes={{ name: "awesome-input", id: 1 }}
                  />
                </li>
                <li>
                  Prénom: {app.firstname}{" "}
                  <EasyEdit
                    className="easy-edit"
                    type="text"
                    onSave={(value) =>
                      save(value, app._id, Object.keys(app)[4])
                    }
                    onCancel={cancel}
                    saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                    cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                    attributes={{ name: "awesome-input", id: 1 }}
                  />
                </li>
                <li>
                  Email: {app.email}{" "}
                  <EasyEdit
                    className="easy-edit"
                    type="text"
                    onSave={(value) =>
                      save(value, app._id, Object.keys(app)[5])
                    }
                    onCancel={cancel}
                    saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                    cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                    attributes={{ name: "awesome-input", id: 1 }}
                  />
                </li>
                <li>
                  Téléphone:{app.phone}{" "}
                  <EasyEdit
                    className="easy-edit"
                    type="text"
                    onSave={(value) =>
                      save(value, app._id, Object.keys(app)[6])
                    }
                    onCancel={cancel}
                    saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                    cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                    attributes={{ name: "awesome-input", id: 1 }}
                  />
                </li>
                <li>
                  Adresse:{app.adress}{" "}
                  <EasyEdit
                    className="easy-edit"
                    type="text"
                    onSave={(value) =>
                      save(value, app._id, Object.keys(app)[7])
                    }
                    onCancel={cancel}
                    saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                    cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                    attributes={{ name: "awesome-input", id: 1 }}
                  />
                </li>
                <li>
                  Youtube: {""}
                  <EasyEdit
                    className="easy-edit"
                    type="textarea"
                    onSave={(value) =>
                      save(value, app._id, Object.keys(app)[13])
                    }
                    onCancel={cancel}
                    saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                    cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                    attributes={{ name: "awesome-input", id: 1 }}
                  />
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
                </li>
                <li>
                  Instagram: {""}
                  <EasyEdit
                    className="easy-edit"
                    type="textarea"
                    onSave={(value) =>
                      save(value, app._id, Object.keys(app)[9])
                    }
                    onCancel={cancel}
                    saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                    cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                    attributes={{ name: "awesome-input", id: 1 }}
                  />
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
                </li>
                <li>
                  Facebook: {""}
                  <EasyEdit
                    className="easy-edit"
                    type="textarea"
                    onSave={(value) =>
                      save(value, app._id, Object.keys(app)[10])
                    }
                    onCancel={cancel}
                    saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                    cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                    attributes={{ name: "awesome-input", id: 1 }}
                  />
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
                  LinkedIn: {""}
                  <EasyEdit
                    className="easy-edit"
                    type="textarea"
                    onSave={(value) =>
                      save(value, app._id, Object.keys(app)[8])
                    }
                    onCancel={cancel}
                    saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                    cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                    attributes={{ name: "awesome-input", id: 1 }}
                  />
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

                <li>
                  Website:{" "}
                  <EasyEdit
                    className="easy-edit"
                    type="textarea"
                    onSave={(value) =>
                      save(value, app._id, Object.keys(app)[11])
                    }
                    onCancel={cancel}
                    saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                    cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                    attributes={{ name: "awesome-input", id: 1 }}
                  />
                  {app.website.match(/https?:\/\//g) ? (
                    <a href={app.website} target="_blank">
                      {app.website}
                    </a>
                  ) : (
                    <a href={"https://" + app.website} target="_blank">
                      {"https://" + app.website}
                    </a>
                  )}
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
