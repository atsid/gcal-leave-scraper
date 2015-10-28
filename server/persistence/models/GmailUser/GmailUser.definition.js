module.exports = {
  /**
   * Users email address.
   */
  email: {
    type: String,
    required: true,
  },

  /**
   * Users first name.
   */
  firstName: {
    type: String,
    required: true,
  },

  /**
   * Users last name.
   */
  lastName: {
    type: String,
    required: true,
  },

  /**
   * Unique ID for user (allows changing of username and email address in the event of name changes).
   */
  userId: {
    type: String,
    index: true,
    required: true,
    unique: true,
    dropDups: true,
  },
};
