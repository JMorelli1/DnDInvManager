const router = require("express").Router();
let User = require("../models/users.model");

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(400).json("Error finding Users" + err);
    });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json(`Could not find User at ID: ${req.params.id}`);
    });
});

router.post("/", function (req, res) {
  const user = new User({
    username: req.body.username,
  });
  user
    .save()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
