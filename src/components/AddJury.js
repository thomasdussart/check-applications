import React from "react";

const AddJury = () => {
  const add = () => {
    let categorie = document.getElementById("juryCategory").value;
    let spec = document.getElementById("spec").value;
    let name = document.getElementById("name").value;
    let firstname = document.getElementById("firstname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let adress = document.getElementById("adress").value;
    let linkedinHandle = document.getElementById("linkedinHandle").value;
    let instaHandle = document.getElementById("instaHandle").value;
    let facebookHandle = document.getElementById("facebookHandle").value;
    let website = document.getElementById("website").value;

    const jury = {
      categorie: categorie,
      spec: spec,
      name: name,
      firstname: firstname,
      email: email,
      phone: phone,
      adress: adress,
      linkedinHandle: linkedinHandle,
      instaHandle: instaHandle,
      facebookHandle: facebookHandle,
      website: website,
    };

    console.log(jury);

    fetch("https://parallaxawards.herokuapp.com/addJury", {
      method: "POST",
      body: JSON.stringify(jury),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      alert("Succesfully added");
    });
  };

  if (localStorage.getItem("isLoggedIn")) {
    return (
      <div className="addJury">
        <select name="" id="juryCategory">
          <option value="default">Choisissez votre catégorie</option>
          <option value="photo">Photo</option>
          <option value="video">Vidéo</option>
          <option value="graphisme">Graphisme</option>
          <option value="animation">Animation 3D</option>
          <option value="meme">Meme & GIF</option>
        </select>
        <label>Spécificité</label>
        <input type="text" id="spec" placeholder="" />
        <label>Nom</label>
        <input type="text" name="name" id="name"></input>
        <label>Prénom</label>
        <input type="text" name="firstname" id="firstname"></input>
        <label>Email</label>
        <input type="email" name="email" id="email"></input>
        <label>Phone</label>
        <input type="text" name="phone" id="phone"></input>
        <label>Adress</label>
        <input type="text" name="adress" id="adress"></input>
        <label>LinkedIn (facultatif)</label>
        <input
          type="text"
          name="linkedinHandle"
          id="linkedinHandle"
          placeholder="parallax_awards"
        />
        <label>Instagram (facultatif)</label>
        <input
          type="text"
          name="instaHandle"
          id="instaHandle"
          placeholder="@parallax_awards"
        />
        <label>Facebook (facultatif)</label>
        <input
          type="text"
          name="facebookHandle"
          id="facebookHandle"
          placeholder="parallax_awards"
        />
        <label>Site web (facultatif)</label>
        <input
          type="text"
          name="website"
          id="website"
          placeholder="www.parallaxawards.be"
        />
        <input
          type="submit"
          id="submitForm"
          onClick={() => add()}
          value="Enregistrer"
        ></input>
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

export default AddJury;
