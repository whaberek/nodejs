const bcrypt = require('bcrypt');

const { Users } = require('../../modules/users/users.model');

const { response } = require('../../config/response');
const { mapUserDetails } = require('../../lib/authorization/userDetailsMapper');

const authController = {
  /**
   * Login user to the system
   * @param { req } req object from UI
   * @param { res } res object
   * @var { email } user email from UI
   * @var { password } user password from UI
   */
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ email });

      if (!bcrypt.compareSync(password, user.password)) {
        res
          .status(response.authentication.status)
          .json(response.authentication.EN);
      } else {
        /**
         * User data sent to client and available in all requests
         */
        const jwt = res.jwt({
          id: user._id,
          email: user.email,
        });
        /** Send cookie token with User data
         * @param { jwt } send cookie and user data to client
         */
        jwt.payload = {
          ...jwt.payload,
          details: mapUserDetails(user),
        };
        res.send(jwt);
      }
    } catch (err) {
      res.status(response.authentication.status).json(response.authentication.EN);
    }
  },

  /**
   * Logout user from the system
   * @param { req } req object from UI
   * @param { res } res object
   */
  logout(req, res) {
    res
      .clearCookie('x-jwt-token')
      .status(response.logout.status)
      .json({
        message: response.logout.EN.message,
      });
  },
};

module.exports = {
  authController,
};
