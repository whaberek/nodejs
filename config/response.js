const response = {
  /**
   * Global responses
   */
  authorization: {
    status: 403,
    EN: {
      message: 'Forbidden access.',
    },
  },
  invalidData: {
    status: 400,
    EN: {
      message: 'Invalid request data.',
    },
  },
  authentication: {
    status: 401,
    EN: {
      message: 'Incorrect email or password. Please re-enter your email and password.',
    },
  },
  notFound: {
    status: 404,
    EN: {
      message: 'Resource not found.',
    },
  },
  serverError: {
    status: 500,
    EN: {
      message: 'Something went wrong with the server.',
    },
  },
  userCreated: {
    status: 200,
    EN: {
      message: 'User has been created.',
    },
  },
  logout: {
    status: 200,
    EN: {
      message: 'User has been logout successfully.',
    },
  },
  duplicateEmail: {
    errorCode: 11000,
    status: 400,
    EN: {
      message: 'Invalid request data. Duplicate email.',
    },
  },
};

module.exports = {
  response,
};
