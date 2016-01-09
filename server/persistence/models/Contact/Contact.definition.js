module.exports = {
  id: {
    type: String,
    required: true,
    unique: true,
  },
  first: {
    type: String,
    required: false,
    unique: false,
  },
  last: {
    type: String,
    required: false,
    unique: false,
  },
};
