const Music = require('../models/music');
const Artist = require('../models/artist');

exports.index = async (req, res) => {
  req.isAuthenticated();

  Music.find({
      author: req.session.userId
    })
    .populate('author')
    .populate('artist')
    .then(musics => {
      res.render('musics/index', {
        musics: musics,
        title: 'Musics'
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.jazz = (req, res) => {
  req.isAuthenticated();

  Music.find({
      author: req.session.userId
    }).jazz()
    .populate('author')
    .populate('artist')
    .then(musics => {
      res.render('musics/index', {
        musics: musics,
        title: 'Comics'
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.rock = (req, res) => {
  req.isAuthenticated();

  Music.find({
      author: req.session.userId
    }).rock()
    .populate('author')
    .populate('artist')
    .then(musics => {
      res.render('musics/index', {
        musics: musics,
        title: 'Sports'
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.country = (req, res) => {
  req.isAuthenticated();

  Music.find({
      author: req.session.userId
    }).country()
    .populate('author')
    .populate('artist')
    .then(musics => {
      res.render('musics/index', {
        musics: musics,
        title: 'Travels'
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.show = (req, res) => {
  req.isAuthenticated();

  Music.findOne({
      _id: req.params.id,
      author: req.session.userId
    })
    .then(music => {
      res.render('musics/show', {
        music: music,
        title: music.title
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.new = async (req, res) => {
  req.isAuthenticated();

  const artists = await Artist.find({});
  res.render('musics/new', {
    title: 'New Music Post',
    artists,
  });
};

exports.edit = async (req, res) => {
  req.isAuthenticated();
  const artists = await Artist.find({});
  Music.findOne({
      _id: req.params.id,
      author: req.session.userId
    })
    .populate('artist')
    .then((music) => {
      return music; 
    })
    .then(music => {
      res.render('musics/edit', {
        music: music,
        title: music.title,
        artists
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.create = (req, res) => {
  req.isAuthenticated();

  req.body.music.author = req.session.userId;
  Music.create(req.body.music)
    .then(() => {
      req.flash('success', 'New music was created successfully.');
      res.redirect('/musics');
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/musics/new');
    });
};

exports.update = (req, res) => {
  req.isAuthenticated();
  
  Music.updateOne({
      _id: req.body.id,
      author: req.session.userId
    }, req.body.music, {
      runValidators: true
    })
    .then(() => {
      req.flash('success', 'The music was updated successfully.');
      res.redirect(`/musics/${req.body.id}`);
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect(`/musics/${req.body.id}/edit`);
    });
};

exports.destroy = (req, res) => {
  req.isAuthenticated();

  Music.deleteOne({
      _id: req.body.id,
      author: req.session.userId
    })
    .then(() => {
      req.flash('success', 'The music was deleted successfully.');
      res.redirect('/musics');
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect(`/musics`);
    });
};