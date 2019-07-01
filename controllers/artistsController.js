const Artist = require('../models/artist');

exports.index = (req, res) => {
  req.isAuthenticated();

  Artist.find({
      author: req.session.userId
    })
    .populate('author')
    .then(artists => {
      res.render('artists/index', {
        artists: artists,
        title: 'Artist'
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.show = (req, res) => {
  req.isAuthenticated();

  Artist.findOne({
      _id: req.params.id,
      author: req.session.userId
    })
    .then(artist => {
      res.render('artists/show', {
        artist: artist,
        title: artist.title
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.new = (req, res) => {
  req.isAuthenticated();

  res.render('artists/new', {
    title: 'New Artist Post'
  });
};

exports.edit = (req, res) => {
  req.isAuthenticated();

  Artist.findOne({
      _id: req.params.id,
      author: req.session.userId
    })
    .then(artist => {
      res.render('artists/edit', {
        artist: artist,
        title: artist.title
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.create = (req, res) => {
  req.isAuthenticated();

  req.body.artist.author = req.session.userId;
  Artist.create(req.body.artist)
    .then(() => {
      req.flash('success', 'New artist was created successfully.');
      res.redirect('/artists');
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/artists/new');
    });
};

exports.update = (req, res) => {
  req.isAuthenticated();

  Artist.updateOne({
      _id: req.body.id,
      author: req.session.userId
    }, req.body.artist, {
      runValidators: true
    })
    .then(() => {
      req.flash('success', 'The artist was updated successfully.');
      res.redirect(`/artists/${req.body.id}`);
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect(`/artists/${req.body.id}/edit`);
    });
};

exports.destroy = (req, res) => {
  Artist.deleteOne({
    _id: req.body.id
  })
  .then(() => {
    res.redirect('/artists');
  })
  .catch(err => {
    console.error(`ERROR: ${err}`);
  });
};

exports.destroy = (req, res) => {
  req.isAuthenticated();

  Artist.deleteOne({
      _id: req.body.id,
      author: req.session.userId
    })
    .then(() => {
      req.flash('success', 'The artist was deleted successfully.');
      res.redirect('/artists');
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect(`/artists`);
    });
};