const express = require("express");
const Lax = require("../model/lax.js");
const lax = express.Router();

// NEW
lax.get("/new", (req, res) => {
  res.render("new.ejs");
});

// INDEX
lax.get("/", (req, res) => {
  console.log()
  Lax.find({}, (err, allLax) => {
    console.log(allLax);
    
    if (err) {
      console.log("Fatal error");
    }
    res.render("index.ejs", {
      lax: allLax
    });
  });
});

// SEED ROUTE
lax.get("/setup/seed", (req, res) => {
  Lax.create(
    [
      {
        team1: "Carlsbad",
        team2: "El Camino",
        score: "15 - 5",
        location: 'Carlsbad'
      }
    ],
    (error, data) => {
      res.redirect("/lax");
    }
  );
});

module.exports = lax;
