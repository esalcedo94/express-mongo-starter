const express = require("express");
const Lax = require("../model/lax.js");
const lax = express.Router();

// NEW
lax.get("/new", (req, res) => {
  res.render("new.ejs");
});

//Edit
lax.get("/:id/edit", (req, res) => {
  Lax.findById(req.params.id, (err, foundLax) => {
    res.render("edit.ejs", {
      lax: foundLax
    });
  });
});

//Deleto
lax.delete("/:id", (req, res) => {
  Lax.findByIdAndRemove(req.params.id, (err, foundLax) => {
    res.redirect("/lax");
  });
});

//show
lax.get("/:id", (req, res) => {
  Lax.findById(req.params.id, (err, foundLax) => {
    req.render("show.ejs", {
      lax: foundLax
    });
  });
});

//Update
lax.put("/:id", (req, res) => {
  Lax.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedModel) => {
      res.redirect("/lax");
    }
  );
});

//create
lax.post("/", (req, res) => {
  Lax.create(req.body, (err, createdLax)=>{
    res.redirect('/lax')
  })
})

// INDEX
lax.get("/", (req, res) => {
  console.log();
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
        score1: "15",
        score2: "5",
        location: "Carlsbad"
      },
      {
        team1: "Canyon Crest Academy",
        team2: "El Camino",
        score1: "15",
        score2: "5",
        location: "Carlsbad"
      },
      {
        team1: "Carlsbad",
        team2: "El Camino",
        score1: "15",
        score2: "5",
        location: "Carlsbad"
      },
    ],
    (error, data) => {
      res.redirect("/lax");
    }
  );
});

module.exports = lax;
