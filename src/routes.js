const express = require('express');
const { validateLocation, validateUpdate, validateLocationExists } = require('./middlewares/validator');
const {
  createLocation, getLocationByName: getLocationById, getAllLocations,
  deleteLocation, updateLocation,
} = require('./controllers/location');

const router = express();

router.post('/location', validateLocation, createLocation);
router.get('/location', getAllLocations);
router.get('/location/:name', getLocationById);
router.patch('/location/:name', validateLocationExists, validateUpdate, updateLocation);
router.delete('/location/:name', validateLocationExists, deleteLocation);

module.exports = router;
