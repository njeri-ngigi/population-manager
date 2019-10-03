const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');

const { PORT } = require('./environment');
const router = require('./routes');

const app = express();

global.appRoot = path.resolve(__dirname);

app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use('/api/v1', router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${PORT} ...`);
});
