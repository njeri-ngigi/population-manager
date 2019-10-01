const { insertOne, findOne } = require('../models/location');

module.exports = {
  createLocation: async (req, res) => {
    const { location, female, male } = req.body;

    const response = await insertOne({ location, female, male });

    if (!response) return res.status(500).send({ message: 'Something went wrong. Try again.' });

    return res.status(200).send({ message: response });
  },

  getLocationByName: async (req, res) => {
    const { name } = req.params;
    const data = await findOne(name);
    if (!data) return res.status(404).send({ message: 'Location not found' });
    return res.status(200).send({ data });
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
