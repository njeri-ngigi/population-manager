const fs = require('fs');
const {
  insertOne, insertMany, findOne, findAll, updateLocation, deleteLocation,
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

  createLocationsFromFile: async (req, res) => {
    try {
      if (!req.files || !req.files.locations) return res.status(400).send({ message: 'Please updload a file with the key "locations"' });

      const { locations } = req.files;

      if (!locations.data.toString().trim()) return res.status(400).send({ message: 'File seems empty. Data in the file should have the format \'[{location, female, male}]\'' });

      const locationsData = JSON.parse(locations.data.toString());

      if (!locationsData || Object.values(locationsData).length < 1) {
        return res.status(400).send({ message: 'File seems empty. Data in the file should have the format \'[{location, female, male}]\'' });
      }

      const locationsArray = [];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < locationsData.length; i++) {
        const { location = '', female, male } = locationsData[i];
        if (!location.trim()) return res.status(400).send({ message: 'location fields shouldn\'t be empty' });
        if (female < 0 || male < 0) return res.status(400).send({ message: 'male and female fields should be integers greater than or equal to 0' });
        // eslint-disable-next-line no-await-in-loop
        const foundLocation = await findOne(location);
        // eslint-disable-next-line no-continue
        if (foundLocation) continue;
        locationsArray.push({
          location: location.trim(),
          female: parseInt(female, 10),
          male: parseInt(male, 10),
        });
      }

      if (locationsArray.length < 1) return res.status(409).send({ message: 'Nothing changed. Locations already exist.' });

      const response = await insertMany(locationsArray);

      if (!response) return res.status(500).send({ message: 'Something went wromng. Try again.' });

      return res.status(201).send({
        message: response,
        data: locationsArray,
      });
    } catch (error) {
      if (error.name === 'SyntaxError') {
        return res.status(400).send({ message: 'Data in the file should have the format \'[{location, female, male}]\'' });
      }
      return res.status(500).send({ message: 'Something went wromng. Try again.' });
    }
  },

  addAllLocationsToFile: async (req, res) => {
    const allLocations = await findAll();
    const directoryName = `${global.appRoot}/tmp`;
    const fileName = `${directoryName}/locations.txt`;

    if (allLocations.length < 0) return res.status(200).send({ message: 'No locations found in the database.' });
    if (!fs.existsSync(directoryName)) fs.mkdirSync(directoryName);
    await fs.writeFile(fileName, JSON.stringify(allLocations), (error) => {
      console.log(error);
    });

    const readStream = fs.createReadStream(fileName);
    readStream.pipe(res);
  },
};
