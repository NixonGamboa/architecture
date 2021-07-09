const express = require('express');
const app = express();

const { config } = require('./config/index');

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

app.listen(config.port, () => {
  console.log(`listen at http://localhost:${config.port}`);
});
