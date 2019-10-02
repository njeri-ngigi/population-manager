const { findOne } = require('../models/location');

module.exports = {
  validateLocation: async (req, res, next) => {
    const { location = '', female, male } = req.body;

    if (!location.trim() || !female || !male) {
      return res.status(400).send({
        error: 'location, female and male fields are required',
      });
    }

    if (female < 0 || male < 0) {
      return res.status(400).send({
        error: 'female and male fields need to be numbers greater or equal to 0',
      });
    }

    const locationFound = await findOne(location);
    if (locationFound) return res.status(409).send({ message: 'Location already exists. Nothing changed' });

    return next();
  },

  validateLocationExists: async (req, res, next) => {
    const { name } = req.params;
    const locationFound = await findOne(name);
    if (!locationFound) return res.status(404).send({ message: 'Location not found' });

    return next();
  },

  validateUpdate: async (req, res, next) => {
    const { male, female } = req.body;
    if (male) {
      if (!parseInt(male, 10) || male < 0) {
        return res.status(400).send({ message: 'male field needs to be an integer greater than or equal to 0' });
      }
    }

    if (female) {
      if (!parseInt(female, 10) || female < 0) {
        return res.status(400).send({ message: 'female field needs to be an integer greater than or equal to 0' });
      }
    }

    return next();
  },
};
