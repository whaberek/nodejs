const requireHttps = () => (req, res, next) => {
  const { NODE_ENV } = process.env;
  const production = NODE_ENV && NODE_ENV !== 'development';

  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && production) {
    return res.redirect(`https://${req.get('host')}${req.url}`);
  }

  next();
};

module.exports = { requireHttps };
