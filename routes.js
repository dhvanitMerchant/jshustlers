const express = require('express');
const app = express();

const pageRoutes = require('./routes/pages');
const musicsRoutes = require('./routes/musics');
const authorRoutes = require('./routes/authors')
const artistRoutes = require('./routes/artists')

const sessionRoutes = require('./routes/sessions')
// Registering our pageRoutes
app.use('/', pageRoutes);
app.use('/musics', musicsRoutes);
app.use('/authors', authorRoutes);
app.use('/artists', artistRoutes);
app.use('/',sessionRoutes);
// Exporting the chang

module.exports = app;