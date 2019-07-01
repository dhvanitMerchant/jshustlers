const router = require('express').Router();

const ArtistsController = require('../controllers/artistsController');

//Begin routes
router.get('/', ArtistsController.index);
router.get('/new', ArtistsController.new);
router.get('/:id', ArtistsController.show);
router.get('/:id/edit', ArtistsController.edit);
router.post('/', ArtistsController.create);
router.post('/update', ArtistsController.update);
router.post('/destroy', ArtistsController.destroy);
//End routes

module.exports = router;