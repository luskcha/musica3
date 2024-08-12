const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Registro de usuario
exports.signup = async (req, res) => {
  console.log('Datos recibidos:', req.body);  // Para depuración
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    // Verificar si el nombre de usuario ya existe
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'El nombre de usuario ya existe' });
    }

    // Verificar si el correo electrónico ya está registrado
    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El correo electrónico ya está registrado' });
    }

    // Crear un nuevo usuario
    user = new User({
      username,
      email,
      password,
    });

    // Hashear la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Guardar el usuario en la base de datos
    await user.save();

    // Crear un token de autenticación
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Error en el servidor:', err.message);
    res.status(500).send('Error en el servidor');
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Error en el servidor:', err.message);
    res.status(500).send('Error en el servidor');
  }
};

// Obtener perfil del usuario
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Error en el servidor:', err.message);
    res.status(500).send('Error en el servidor');
  }
};
