const userMapper = user => ({
  email: user.email,
  name: user.name,
});

module.exports = {
  userMapper,
};
