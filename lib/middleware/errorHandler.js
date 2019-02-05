const chalk = require('chalk');

const additionalHandlers = [
  {
    name: 'MongoError',
    message: err => ({
      status: err.status || 400,
      body: {
        message: err.message,
      },
    }),
  },
  {
    name: 'JWTExpressError',
    message: err => ({
      status: err.status || 401,
      body: {
        message: 'The session has timed out.',
        error: true,
        JWTStale: true,
      },
    }),
  },
  {
    name: 'InternalError',
    message: err => err.toObject(),
  },
];

const defaultHandler = {
  message: err => {
    let error = err;

    if (err instanceof Error) {
      error = err.message;
    }

    return {
      status: err.status || 400,
      body: {
        error,
      },
    };
  },
};

// eslint-disable-next-line no-unused-vars
const errorHandler = () => (err, req, res, next) => {
  const nativeError = err.getNativeError && err.getNativeError();
  const currentHandler = additionalHandlers.find(handler => (
    [err.name, nativeError && nativeError.name].includes(handler.name)
  )) || defaultHandler;
  const { status, body } = currentHandler.message(err, nativeError);

  res.status(status).send(body);
};

process.on('unhandledRejection', (err, promise) => {
  console.error(chalk.underline.red('Unhandled Rejection at:'), promise);
});

module.exports = {
  errorHandler,
};
