const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model('user', UsersSchema);

module.exports = {
  Users,
};
