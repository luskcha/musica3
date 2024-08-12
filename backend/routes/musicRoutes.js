const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const musicController = require('../controllers/musicController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', musicController.getAllMusic);

router.get('/:id', musicController.getMusicDetail);

router.post(
  '/',
  [
    authMiddleware,
    [
      check('title', 'El título es requerido').not().isEmpty(),
      check('artist', 'El artista es requerido').not().isEmpty(),
      check('genre', 'El género es requerido').not().isEmpty(),
    ],
  ],
  musicController.addMusic
);

router.put(
  '/:id',
  authMiddleware,
  [
    check('title', 'El título es requerido').not().isEmpty(),
    check('artist', 'El artista es requerido').not().isEmpty(),
    check('genre', 'El género es requerido').not().isEmpty(),
  ],
  musicController.editMusic
);

router.delete('/:id', authMiddleware, musicController.deleteMusic);

module.exports = router;

