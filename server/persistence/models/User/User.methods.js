/**
 * Strip out fields from the user that we don't want sent over the wire.
 * @param req
 * @returns {*|{virtuals}|Array|Binary|Object}
 */
function process(req) {
  const result = this.toObject();
  if (!req.user || `${req.user.id}` !== `${result.id}`) {
    delete result.googleId;
  }

  delete result.password;
  delete result._id;
  delete result.__v;
  return result;
}

function getDisplayName() {
  return `${this.firstName} ${this.lastName}`;
}

module.exports = {process, getDisplayName};
