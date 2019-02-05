const expressRouter = require('express').Router;

const { authController } = require('./auth.controller');
const { authIsValid } = require('./auth.validator');

const router = expressRouter();

/**
 * Login
 */
router.post(
  '/auth',
  authIsValid,
  authController.login,
);

/**
 * Logout from app
 */
router.post(
  '/logout',
  authController.logout,
);

module.exports = router;
