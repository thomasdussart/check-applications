const db = require("../models");
const Applications = require("../models/application.model");

module.exports = function (app) {
  app.post("/bulkEmail", (req, res) => {
    req.body.emails.map((email) => {
      console.log(email);
      transporter.sendMail(
        {
          from: '"Parallax candidatures" inscriptions@parallaxawards.be',
          to: email,
          subject: "TY",
          text: "TY",
        },
        (error, info) => {
          console.log("sent");
          if (error) {
            return console.log(error);
          }
          res
            .status(200)
            .send({ message: "Mail send", message_id: info.messageId });
        }
      );
    });
  });

  app.post("/getCategory", (req, res) => {
    let categorie = req.body.categorie;
    Applications.find({ category: categorie }).exec((err, category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!category) {
        res.status(404).send({ message: "Not found." });
        return;
      }

      return res.status(200).json({
        data: category,
      });
    });
  });

  app.get("/getAll", (req, res) => {
    Applications.find({}).exec((err, getAll) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!getAll) {
        res.status(404).send({ message: "Users Not found." });
        return;
      }

      res.json(getAll);
    });
  });

  app.get("/getEmail", (req, res) => {
    Applications.find({ email }).exec((err, getAll) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!getAll) {
        res.status(404).send({ message: "Users Not found." });
        return;
      }

      res.json(getAll);
    });
  });
};
