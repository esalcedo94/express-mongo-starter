const mongoose = require('mongoose')

const lax = new mongoose.Schema({
  team1: ["Carlsbad", "El Camino", "La Jolla Country Day", "CCA", "LCC", "Fallbrook"],
  team2: ["Carlsbad", "El Camino", "La Jolla Country Day", "CCA", "LCC", "Fallbrook"],
  score: String,
  location: String

}, {timestamps: true})

const Lax = mongoose.model('Lax', lax)

module.exports = Lax
