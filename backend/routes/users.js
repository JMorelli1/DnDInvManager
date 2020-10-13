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

router.put("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.username = req.body.username;

      user
        .save()
        .then((response) => {
          res.json("Successfully updated user");
        })
        .catch((err) => {
          res.status(400).json(`Error updating user at ID: ${req.params.id}`);
        });
    })
    .catch((err) => {
      res.status;
    });
});

router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.json("Successfully deleted user");
    })
    .catch((err) => {
      res.status(400).json(`Error deleting user at ID: ${req.params.id}`);
    });
});

module.exports = router;
