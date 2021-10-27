const db = require("../models");
const Applications = require("../models/application.model");

module.exports = function (app) {
  app.post("/send", (req, res) => {
    const application = new Applications({
      category: req.body.category,
      name: req.body.name,
      firstname: req.body.firstname,
      birthdate: req.body.birthdate,
      birthLocation: req.body.birthLocation,
      nationality: req.body.nationality,
      email: req.body.email,
      phone: req.body.phone,
      adress: req.body.adress,
      instaHandle: req.body.instaHandle,
      facebookHandle: req.body.facebookHandle,
      website: req.body.website,
      category: req.body.category,
      title: req.body.title,
      artDate: req.body.artDate,
      context: req.body.context,
      link: req.body.link,
      rules: req.body.rules,
      criteres: req.body.criteres,
      ccAccept: req.body.ccAccept,
    });

    let message = `<div style="margin: 1rem;">
        <p>
          Bonjour et merci pour ta participation !
          <br />
          <br />
          Ton œuvre est présélectionnée !
          <br />
          <br />
          Comme mentionné dans
          <a href="https://parallaxawards.be/reglement">notre règlement</a>, que
          nous t'invitons à consulter attentivement si cela n'est pas déjà fait,
          nous reviendrons vers toi si ton œuvre ne rencontrait pas nos critères
          légaux et/ou techniques.
          <br />
          <br />
          Sans nouvelle de notre part, il ne te restera plus qu'à croiser les
          doigts pour que ton œuvre soit sélectionnée par notre jury indépendant
          en tant que lauréate de sa catégorie ! En attendant, suis-nous sur
          <a href="https://www.facebook.com/parallax.creativity.awards">Facebook</a
          > et
          <a href="https://www.instagram.com/parallax_awards">Instagram</a> afin
          d'être tenu(e) au courant des préparatifs, surprises, et du lancement
          du vote du public (auquel tes proches pourront participer 😉) ... !
          <br />
          En tout, ce sont 5 prix de 200€ et 1 prix du public qui sont à gagner
          ! Feras-tu partie des 6 lauréats ? Réponse samedi 27/11 au Pôle Image
          de Liège, dès 16h30 ...
          <br />
          <br />
          À ton agenda !
          <br />
          <br />
          Si tu as la chance d'être sélectionné, cela sera également pour toi
          l'occasion de te présenter au public ainsi que ton œuvre numérique et
          la vision qui se cache derrière :
        </p>
        <div style="">
          <li>Qui es-tu ?</li>
          <li>Pourquoi avoir choisi cette catégorie ?</li>
          <li>
            En quoi ton œuvre exprime une préoccupation sociale ou environnementale ?
          </li>
          <li>En quoi ce thème t'est-il cher ?</li>
          <li>...</li>
        </ul>
        </div>
        <br />
        <div style="">
          <p>
            En tant qu'artiste en compétition, ta place est déjà réservée mais, à
            titre de rappel, le Covid Safe Ticket sera obligatoire ! Merci de
            prendre tes dispositions afin de pouvoir accéder à l'événement. Idem
            pour tes invités, à la différence près qu'ils devront réserver
            (gratuitement) leur place sur notre site.
            <br />
            <br />
            Au plaisir de faire ta connaissance,
            <br />
            <br />
            <span>Créativement,</span>
            <br />
            <br />
            <span>L'équipe des Parallax Creativity Awards</span>
          </p>
        </div>
      </div>`;

    const confirmData = {
      from: '"Parallax candidatures" inscriptions@parallaxawards.be',
      to: req.body.email,
      subject:
        "Candidature Parallax 2021 dans la section " + req.body.category + ".",
      html: message,
    };

    const mailData = {
      from: '"Parallax candidatures" inscriptions@parallaxawards.be',
      to: "inscriptions@parallaxawards.be",
      subject:
        "Candidature Parallax 2021 dans la section " + req.body.category + ".",
      html:
        "<p>Categorie: " +
        req.body.category +
        "</p><p>Nom: " +
        req.body.name +
        "</p><p>Prénom: " +
        req.body.firstname +
        "</p><p>Date de naissance: " +
        req.body.birthdate +
        "</p><p>Lieu de naissance: " +
        req.body.birthLocation +
        "</p><p>Nationalité: " +
        req.body.nationality +
        "</p><p>Email: " +
        req.body.email +
        "</p><p>Téléphone: " +
        req.body.phone +
        "</p><p>Adresse: <br>" +
        req.body.adress +
        "</p><p>Instagram: " +
        req.body.instaHandle +
        "</p><p>Facebook: " +
        req.body.facebookHandle +
        "</p><p>Website: " +
        req.body.website +
        "</p><p>Categorie: " +
        req.body.category +
        "</p><p>Titre de l'oeuvre: " +
        req.body.title +
        "</p><p>Date de création: " +
        req.body.artDate +
        "</p><p>Pourquoi?: " +
        req.body.context +
        "</p><p>Lien: " +
        req.body.link +
        "</p><p>Rules: " +
        req.body.rules +
        "</p><p>Criteres: " +
        req.body.criteres +
        "</p><p>CC Accept: " +
        req.body.ccAccept +
        "</p>",
    };

    //mail to parallax
    transporter.sendMail(mailData, (error, info) => {
      console.log("sent");
      if (error) {
        return console.log(error);
      }
      res
        .status(200)
        .send({ message: "Mail send", message_id: info.messageId });
    });

    //mail to user
    transporter.sendMail(confirmData, (error, info) => {
      console.log("sent");
      if (error) {
        return console.log(error);
      }
      res
        .status(200)
        .send({ message: "Mail send", message_id: info.messageId });
    });

    application.save();
  });
};
