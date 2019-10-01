const express = require('express');
const { PORT } = require('./environment');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use('/api/v1', router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${PORT} ...`);
});
