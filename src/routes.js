const express = require('express');
const { validateLocation } = require('./middlewares/validator');
const {
  createLocation, getLocationById, getAllLocations, deleteLocation,
} = require('./controllers/location');

const router = express();

router.post('/location', validateLocation, createLocation);
router.get('/location', getAllLocations);
router.get('/location/:id', getLocationById);
router.delete('/location/:id', deleteLocation);

module.exports = router;
