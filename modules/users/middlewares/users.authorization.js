const { response } = require('../../../config/response');

const updateUsersAuthorization = (req, res, next) => {
  const editedUser = req.params.id;
  const loggedUser = req.jwt.payload.details.id.toString();

  if (editedUser === loggedUser) {
    next();
  } else {
    res.status(response.invalidData.status).json(response.invalidData.EN);
  }
};

module.exports = {
  updateUsersAuthorization,
};
