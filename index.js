const express = require('express');
const app = express();

const { config } = require('./config/index');
const animalsApi = require('./routes/animals');

animalsApi(app);


app.listen(config.port, () => {
  console.log(`listen at http://localhost:${config.port}`);
});
