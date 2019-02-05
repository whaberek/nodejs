const { mapUserDetails } = require('./userDetailsMapper');

const populateUserInfo = () => (req, res, next) => {
  const user = req._user;
  delete req._user;

  req.jwt = {
    ...req.jwt,
    payload: {
      details: mapUserDetails(user),
    },
  };

  next();
};

module.exports = {
  populateUserInfo,
};
