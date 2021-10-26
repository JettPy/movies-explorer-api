const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
    },
  },

  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
    },
  },

  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('movie', movieSchema);
