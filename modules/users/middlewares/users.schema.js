const Joi = require('joi');

const { EMAIL_REGEX } = require('../../../config/regularExpressions');

const usersSchema = {
  registerUsersSchemaValidation: {
    email: Joi.string().max(100).regex(EMAIL_REGEX).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
  },
  updateUsersSchemaValidation: {
    name: Joi.string().max(100).required(),
  },
};

module.exports = {
  usersSchema,
};
