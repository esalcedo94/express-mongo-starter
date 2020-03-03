const mongoose = require('mongoose')

const lax = new mongoose.Schema({
  team1: String,
  team2: String,
  score1: Number,
  score2: Number,
  location: String

}, {timestamps: true})

const Lax = mongoose.model('Lax', lax)

module.exports = Lax
