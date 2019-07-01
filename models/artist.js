const mongoose = require('mongoose');

// Our Schema
const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Artist', ArtistSchema);
