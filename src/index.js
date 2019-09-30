const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes');

dotenv.config();

const app = express();
const { PORT = '3000' } = process.env;

app.use(express.json());
app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT} ...`)
});
