const { Users } = require('../users.model');
const { response } = require('../../../config/response');

const populateDetails = (req, res, next) => (
  Users.findOne({ _id: req.params.id })
    .then(user => {
      res.locals.user = user;
      next();
    })
    .catch(() => {
      res
        .status(response.invalidData.status)
        .json(response.invalidData.EN);
    })
);

module.exports = {
  populateDetails,
};
