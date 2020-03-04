const mongoose = require('mongoose')

const game = new mongoose.Schema({
      team1: String,
      team2: String,
      score1: Number,
      score2: Number,
      location: String
}, {timestamps: true})

const Game = mongoose.model('Game', game)

module.exports = Game
