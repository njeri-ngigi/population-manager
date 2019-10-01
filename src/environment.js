const dotenv = require('dotenv');

dotenv.config();

const { PORT = '3000', DATABASE_URL } = process.env;

module.exports = {
  PORT, DATABASE_URL,
};
