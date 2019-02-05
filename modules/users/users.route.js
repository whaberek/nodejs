const expressRouter = require('express').Router;
const jwt = require('jwt-express');

const { usersController } = require('./users.controller.js');
const { updateUsersAuthorization } = require('./middlewares/users.authorization');
const { populateDetails } = require('./middlewares/users.populate');
const { registerUsersValidation, updateUsersValidation } = require('./middlewares/users.validation');

const router = expressRouter();

/**
 * Register a user
 */
router.post(
  '/users',
  jwt.active(),
  registerUsersValidation,
  usersController.register,
);

/**
 * Update only for logged self user
 */
router.put(
  '/users/:id',
  jwt.active(),
  updateUsersAuthorization,
  populateDetails,
  updateUsersValidation,
  usersController.update,
);

/**
 * Get user profile
 */
router.get(
  '/users/:id',
  jwt.active(),
  populateDetails,
  usersController.getProfile,
);

module.exports = router;
