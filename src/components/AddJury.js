import React from "react";

const AddJury = () => {
  const add = () => {
    let categorie = document.getElementById("categories").value;
    let name = document.getElementById("name").value;
    let firstname = document.getElementById("firstname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let adress = document.getElementById("adress").value;
    let instaHandle = document.getElementById("instaHandle").value;
    let facebookHandle = document.getElementById("facebookHandle").value;
    let website = document.getElementById("website").value;

    const jury = {
      categorie: categorie,
      //perso
      name: name,
      firstname: firstname,
      //contact
      email: email,
      phone: phone,
      adress: adress,
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

  return (
    <div className="addJury">
      <select name="" id="categories">
        <option value="default">Choisissez votre catégorie</option>
        <option value="photo">Photo</option>
        <option value="video">Vidéo</option>
        <option value="graphisme">Graphisme</option>
        <option value="animation">Animation 3D</option>
        <option value="meme">Meme & GIF</option>
      </select>
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
};

export default AddJury;
