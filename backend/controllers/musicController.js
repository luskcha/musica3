
const Music = require('../models/Music');
const { validationResult } = require('express-validator');

// Obtener todas las canciones
exports.getAllMusic = async (req, res) => {
  try {
    const music = await Music.find();
    res.json(music);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

// Obtener detalle de una canción
exports.getMusicDetail = async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    if (!music) {
      return res.status(404).json({ msg: 'Canción no encontrada' });
    }
    res.json(music);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

// Agregar una nueva canción
exports.addMusic = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, artist, genre } = req.body;

  try {
    const newMusic = new Music({
      title,
      artist,
      genre,
    });

    const music = await newMusic.save();
    res.json(music);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

// Editar una canción
exports.editMusic = async (req, res) => {
  const { title, artist, genre } = req.body;

  const musicFields = {};
  if (title) musicFields.title = title;
  if (artist) musicFields.artist = artist;
  if (genre) musicFields.genre = genre;

  try {
    let music = await Music.findById(req.params.id);

    if (!music) return res.status(404).json({ msg: 'Canción no encontrada' });

    music = await Music.findByIdAndUpdate(
      req.params.id,
      { $set: musicFields },
      { new: true }
    );

    res.json(music);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

// Eliminar una canción
exports.deleteMusic = async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);

    if (!music) return res.status(404).json({ msg: 'Canción no encontrada' });

    await Music.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Canción eliminada' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};
