module.exports = {
  createLocation: (req, res) => {
    res.status(200).send({
      data: { ...req.body },
      message: 'Location added',
    });
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
