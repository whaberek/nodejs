const Joi = require('joi');

const Schema = require('./auth.schema');
const { response } = require('../../config/response');

const authIsValid = (req, res, next) => (
  Joi.validate({ ...req.body }, Schema)
    .then(() => next())
    .catch(() => {
      res
        .status(response.invalidData.status)
        .json(response.invalidData.EN);
    })
);

module.exports = {
  authIsValid,
};
