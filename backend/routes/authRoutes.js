const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');


const router = express.Router();

// Ruta para el registro de usuarios
router.post(
  '/signup',
  [
    check('email', 'Por favor incluye un email válido').isEmail(),
    check('password', 'Por favor ingresa un password con 6 o más caracteres').isLength({ min: 6 })
  ],
  authController.signup
);

// Ruta para el inicio de sesión
router.post(
  '/login',
  [
    check('email', 'Por favor incluye un email válido').isEmail(),
    check('password', 'La contraseña es requerida').exists()
  ],
  authController.login
);

// Ruta para obtener el perfil del usuario
router.get('/profile', authController.getProfile);

module.exports = router;
