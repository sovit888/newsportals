const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { MONGOURI } = require("../config/key");

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
require("../models/Posts");
const Posts = mongoose.model("tblpost");

router.get("/all", (req, res) => {
  Posts.find()
    .then((data) => {
      res.json({ data: data });
    })
    .catch((e) => {
      res.status(422).json({ error: "an error" });
    });
});
router.get("/fetchid/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((e) => {
      res.status(422).json({ error: "an error" });
    });
});

router.get("/fetch/:category", (req, res) => {
  Posts.find({ category: req.params.category })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((e) => {
      res.status(422).json({ error: "an error" });
    });
});

router.post("/insertpost", (req, res) => {
  const { title, body, author, picture, category } = req.body;
  if (!title || !body || !author || !picture || !category) {
    res.status(422).json({ error: "please fill all inputs" });
  } else {
    const blogs = new Posts({
      title,
      body,
      author,
      category,
      picture,
    });
    blogs
      .save()
      .then((data) => {
        res.json({ data: data });
      })
      .catch((e) => {
        res.status(422).json({ error: "couldnot insert" });
      });
  }
});

module.exports = router;
