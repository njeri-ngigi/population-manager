module.exports = {
  validateLocation: (req, res, next) => {
    const { female, male } = req.body;
    let { location = '' } = req.body;
    location = location.trim();

    if (!location || !female || !male) {
      return res.status(400).send({
        error: 'location, female and male fields are required',
      });
    }

    if (female < 0 || male < 0) {
      return res.status(400).send({
        error: 'female and male fields need to be numbers greater or equal to 0',
      });
    }

    return next();
  },
};
