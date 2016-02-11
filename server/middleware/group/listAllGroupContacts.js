const contacts = require('../../middleware/contacts');

const allId = '0';
const fs = require('fs');

function errorNoUserFound(res) {
  res.status(404).json({message: 'No authenticated user found'});
}

function errorGeneric(res) {
  // (res, err) {
  // TODO: Add debug logging for the err message
  res.status(500).send({ error: 'Unable to fetch all users' });
}

function fetchAllUsers(req, res) {
  if (allId === req.query.groupId) {
    contacts.listAllContacts(req, res);
  } else {
    fs.readFile(__dirname + '/data/' + req.query.groupId + '.json', 'utf8', (err, data) => {
      if (err) {
        errorGeneric(res);
      } else {
        res.json(JSON.parse(data));
      }
    });
  }
}

module.exports = (req, res) => {
  if (!req.user) {
    errorNoUserFound(res);
  } else {
    fetchAllUsers(req, res);
  }
};
