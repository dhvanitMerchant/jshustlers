const mongoose = require('mongoose');

// Our Schema
const MusicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  category: {
    type: String,
    enum: ['ROCK', 'JAZZ', 'COUNTRY'],
    default: 'ROCK'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  }
}, {
  timestamps: true
});

// Query Helper
MusicSchema.query.comics = function () {
  return this.where({
    category: 'ROCK'
  });
};

MusicSchema.query.sports = function () {
  return this.where({
    category: 'JAZZ'
  });
};

MusicSchema.query.travels = function () {
  return this.where({
    category: 'COUNTRY'
  });
};



module.exports = mongoose.model('Music', MusicSchema);
