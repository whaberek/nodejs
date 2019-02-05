const Joi = require('joi');

const { EMAIL_REGEX } = require('../../config/regularExpressions');

const Schema = Joi.object().keys({
  email: Joi.string().regex(EMAIL_REGEX).max(100).required(),
  password: Joi.string().required(),
});

module.exports = Schema;
