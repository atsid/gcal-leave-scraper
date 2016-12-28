const contacts = require('../../middleware/contacts');

function errorNoUserFound(res) {
  res.status(404).json({message: 'No authenticated user found'});
}

// This was using hard-coded users in a set of json files. Now it only supports the "all" group, which is everyone in the google domain
function fetchAllUsers(req, res) {
  contacts.listAllContacts(req, res);
}

module.exports = (req, res) => {
  if (!req.user) {
    errorNoUserFound(res);
  } else {
    fetchAllUsers(req, res);
  }
};
