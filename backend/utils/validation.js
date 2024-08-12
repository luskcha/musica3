
const { check, validationResult } = require('express-validator');

exports.validateSignup = [
  check('email', 'Por favor, proporciona un email válido').isEmail(),
  check('password', 'Por favor, proporciona un password de al menos 6 caracteres').isLength({ min: 6 }),
];

exports.validateLogin = [
  check('email', 'Por favor, proporciona un email válido').isEmail(),
  check('password', 'La contraseña es requerida').exists(),
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
