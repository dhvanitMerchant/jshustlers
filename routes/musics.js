const router = require('express').Router();

// controllers
const MusicsController = require('../controllers/musicsController');

// routes
router.get(`/new`, MusicsController.new);
router.get(`/jazz`, MusicsController.jazz);
router.get(`/rock`, MusicsController.rock);
router.get(`/country`, MusicsController.country);
router.get(`/`, MusicsController.index);
router.get(`/:id`, MusicsController.show);
router.post(`/`, MusicsController.create);
router.get(`/:id/edit`, MusicsController.edit);
router.post(`/update`, MusicsController.update);
router.post(`/destroy`, MusicsController.destroy);

module.exports = router;