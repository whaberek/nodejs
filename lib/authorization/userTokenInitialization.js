const jwt = require('jwt-express');
const jwtLib = require('jsonwebtoken');

const { Users } = require('../../modules/users/users.model');

const tokenSecret = process.env.COOKIES_TOKEN;
const oneHourInMs = 3600000;
const defaultStaleTime = oneHourInMs * process.env.DEFAULT_STALE_TIME;

const userTokenInitialization = () => async (req, res, next) => {
  try {
    const token = req.cookies['x-jwt-token'];

    const payload = token && await jwtLib.verify(token, tokenSecret);

    const userEmail = (payload && payload.email) || req.body.email;
    const user = await Users.findOne({ email: userEmail });

    req._user = user;

    return jwt.init(tokenSecret, {
      cookie: 'x-jwt-token',
      cookies: true,
      cookieOptions: {
        sameSite: true,
        secure: (process.env.NODE_ENV && process.env.NODE_ENV !== 'development'),
      },
      stales: defaultStaleTime,
      refresh: true,
    })(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  userTokenInitialization,
  tokenSecret,
  defaultStaleTime,
};
