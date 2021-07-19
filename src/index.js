const express = require('express');
const app = express();
const { config } = require('../config/index');
const animalsApi = require('./controller/animals-routes');
const { logErrors, errorHandler } = require('./utils/middleware/errorHandlers');

app.use(express.json());

animalsApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`listen at http://localhost:${config.port}`);
});
