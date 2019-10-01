const express = require('express');
const { validateLocation } = require('./middlewares/validator');
const {
  createLocation, getLocationByName: getLocationById, getAllLocations, deleteLocation,
} = require('./controllers/location');

const router = express();

router.post('/location', validateLocation, createLocation);
router.get('/location', getAllLocations);
router.get('/location/:name', getLocationById);
router.delete('/location/:name', deleteLocation);

module.exports = router;
