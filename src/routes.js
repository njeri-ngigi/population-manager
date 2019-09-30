const express = require('express');
const {
  createLocation, getLocationById, getAllLocations, deleteLocation,
} = require('./controllers/locationController');

const router = express();

router.post('/location', createLocation);
router.get('/location', getAllLocations);
router.get('/location/:id', getLocationById);
router.delete('/location/:id', deleteLocation);

module.exports = router;
