const router = require("express").Router();
let Item = require("../models/item.model");

router.get("/", (req, res) => {
  Item.find()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.status(400).json("Error finding Items" + err);
    });
});

router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      res.status(400).json(`Could not find Item at ID: ${req.params.id}`);
    });
});

router.post("/", (req, res) => {
  const item = new Item({
    itemname: req.body.itemname,
    description: req.body.description,
    quantity: req.body.quantity,
  });

  item
    .save()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

router.put("/:id", (req, res) => {
  Item.findById(req.params.id).then((item) => {
    item.itemname = req.body.itemname;
    item.description = req.body.description;
    item.quantity = Number(req.body.quantity);

    item
      .save()
      .then((response) => {
        res.status(200).json("Item updated successfully");
      })
      .catch((err) => {
        res
          .status(400)
          .json(
            `Error updating item at ID: ${req.params.id} \nError Generated: ` +
              err
          );
      });
  });

  router.delete("/:id", (req, res) => {
    Item.findByIdAndDelete(req.params.id)
      .then((response) => {
        res.json("Successfully deleted Item at given ID");
      })
      .catch((err) => {
        res
          .status(400)
          .json(
            `Error deleting item at ID: ${req.params.id} \nError Generated: ` +
              err
          );
      });
  });
});

module.exports = router;
