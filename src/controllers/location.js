const locationsModel = require('../models/location');

module.exports = {
  createLocation: async (req, res) => {
    const { location, female, male } = req.body;

    const response = await locationsModel.insertOne({ location, female, male });

    if (!response) return res.status(500).send({ message: 'Something went wrong. Try again.' });

    return res.status(200).send({ message: response });
  },

  getLocationById: (req, res) => {
    const { id } = req.params;
    res.status(200).send({
      message: `Location ${id}`,
    });
  },

  getAllLocations: (req, res) => {
    res.status(200).send({
      message: 'All locations',
    });
  },

  deleteLocation: (req, res) => {
    const { id } = req.params;
    res.status(200).send({
      message: `Location ${id} delete successfully`,
    });
  },

};
