module.exports = {
  id: {
    type: String,
    required: true,
    unique: true,
  },

  status: {
    type: String,
    required: true,
  },

  summary: {
    type: String,
    required: true,
  },

  gmailUser: {
    type: String,
    ref: 'GmailUser',
  },

  startDate: {
    type: Date,
  },

  endDate: {
    type: Date,
  },
};
