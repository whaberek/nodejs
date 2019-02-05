const mapUserDetails = user => user && ({
  id: user._id,
  name: user.name,
  email: user.email,
});

module.exports = {
  mapUserDetails,
};
