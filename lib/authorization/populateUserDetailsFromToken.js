const { Users } = require('../../modules/users/users.model');

const populateUserDetailsFromToken = async (req, res, next) => {
  const { tokenPayload } = res.locals;

  const user = await Users.findById(tokenPayload.id);

  req.jwt = {
    payload: {
      details: {
        name: user.name,
        email: user.email,
      },
    },
  };

  next();
};

module.exports = {
  populateUserDetailsFromToken,
};
