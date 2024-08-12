const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;
console.log('MONGO_URI:',process.env.MONGO_URI);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error al conectar con MongoDB:', err.message);
  });
