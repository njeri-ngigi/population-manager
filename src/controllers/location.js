const {
  insertOne, findOne, findAll, updateLocation, deleteLocation,
} = require('../models/location');

module.exports = {
  createLocation: async (req, res) => {
    const { location, female, male } = req.body;

    const response = await insertOne({
      location: location.trim(), female: parseInt(female, 10), male: parseInt(male, 10),
    });

    if (!response) return res.status(500).send({ message: 'Something went wrong. Try again.' });

    return res.status(201).send({ message: response });
  },

  getLocationByName: async (req, res) => {
    const { name } = req.params;
    const data = await findOne(name);
    if (!data) return res.status(404).send({ message: 'Location not found' });
    return res.status(200).send({ data });
  },

  getAllLocations: async (req, res) => {
    const data = await findAll();
    res.status(200).send({ data });
  },

  updateLocation: async (req, res) => {
    const updateData = {};
    const { name } = req.params;
    const { male, female } = req.body;

    if (male >= 0) updateData.male = parseInt(male, 10);
    if (female >= 0) updateData.female = parseInt(female, 10);
    if (Object.values(updateData).length < 1) return res.status(200).send({ message: 'Nothing to update' });

    const { value: data } = await updateLocation(name, updateData);
    if (!data) return res.status(500).send({ message: 'Something went wrong. Try again.' });

    return res.status(200).send({ message: 'Location updated successfully', data });
  },

  deleteLocation: async (req, res) => {
    const { name } = req.params;

    const response = await deleteLocation(name);

    if (!response) return res.status(500).send({ message: 'Something went wrong. Try again.' });

    return res.status(200).send({
      message: `Location (${name}) delete successfully`,
    });
  },
};
