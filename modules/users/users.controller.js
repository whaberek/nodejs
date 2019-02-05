const bcrypt = require('bcrypt');

const { Users } = require('./users.model');
const { userMapper } = require('../../lib/mappers/userMapper');
const { response } = require('../../config/response');

const usersController = {
  /**
   * Register new user in app
   * @param { req } req object from UI
   * @param { res } res object
   * @var { user } user payload from UI
   */
  async register(req, res) {
    const user = req.body;

    user.password = await bcrypt.hash(user.password, 10);

    try {
      const newUser = await Users.create(user);

      res.json(newUser);
    } catch (err) {
      if (err.code === response.duplicateEmail.errorCode) {
        res.status(response.duplicateEmail.status).json(response.duplicateEmail.EN);
      } else {
        res.status(response.invalidData.status).json(response.invalidData.EN);
      }
    }
  },

  /**
   * Update only for logged self user
   * @param { req } req object from UI
   * @param { res } res object
   * @var { name } name payload from UI
   * @var { user } user populated data from database
   */
  async update(req, res) {
    const { name } = req.body;
    const { user } = res.locals;

    user.name = name;

    try {
      const newUser = await user.save();

      res.json(newUser);
    } catch (error) {
      res.status(response.invalidData.status).json(response.invalidData.EN);
    }
  },

  /**
   * Get user profile
   * @param { req } req object from UI
   * @param { res } res object
   */
  getProfile(req, res) {
    res.json(userMapper(res.locals.user));
  },
};

module.exports = {
  usersController,
};
