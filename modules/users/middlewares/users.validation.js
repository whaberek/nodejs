const Joi = require('joi');

const { usersSchema } = require('./users.schema');
const { response } = require('../../../config/response');

const registerUsersValidation = (req, res, next) => (
  Joi.validate({ ...req.body }, usersSchema.registerUsersSchemaValidation)
    .then(() => next())
    .catch(() => {
      res
        .status(response.invalidData.status)
        .json(response.invalidData.EN);
    })
);

const updateUsersValidation = (req, res, next) => (
  Joi.validate({ ...req.body }, usersSchema.updateUsersSchemaValidation)
    .then(() => next())
    .catch(() => {
      res
        .status(response.invalidData.status)
        .json(response.invalidData.EN);
    })
);

module.exports = {
  registerUsersValidation,
  updateUsersValidation,
};
