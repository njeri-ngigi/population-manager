const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const { PORT = '3000' } = process.env;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT} ...`)
});
