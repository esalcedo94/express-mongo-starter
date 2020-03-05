const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../model/user.js");

sessions.get("/new", (req, res) => {
  res.render("session/new.ejs",
    {
      currentUser: req.session.currentUser
    });
});

sessions.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log("Oops the db had a problem");
    } else if (!foundUser) {
      res.send('<a href ="/">Sorry, no user found</a>');
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        console.log("yay log in works");

        res.redirect("/");
      } else {
        res.send('<a href ="/">Password does not match</a>');
      }
    }
  });
});

sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = sessions;
