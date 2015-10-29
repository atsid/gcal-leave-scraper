module.exports = {
  /**
   * The user's email address, which is their unique login
   */
  email: {
    type: String,
    index: true,
  },

  /**
   * A name by which we can address the user
   */
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  /**
   * A user's unique Google profile ID
   */
  googleId: {
    type: String,
    index: true,
  },

  /**
   * A user's Google OAuth Token
   */
  googleToken: {
    type: String,
  },
};
