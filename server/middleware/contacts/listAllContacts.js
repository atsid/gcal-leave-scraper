const models = require('../../persistence/index').models;
const Contact = models.Contact;

module.exports = (req, res) => {
  if (!req.user) {
    res.status(404).json({message: 'No authenticated user found'});
  } else {
    // TODO: Add back data when used ', data'
    Contact.find((err) => {
      if (err) {
        res.json({message: 'Error loading contacts', detail: err});
      } else {
      // TODO: Make google contacts api call
//        res.json(data);
        res.json(JSON.parse('{"contacts": [{"id":"1sdba3212","first":"William"},{"id":"223sdav23","last":"Johnson"},{"id":"1adsva4","first":"William","last":"Johnson"},{"id":"2asdvv43"},{"id":"12323fawa","first":"Brian","last":"Math"},{"id":"2345345sa"}]}'));
      }
      res.end();
    });
  }
};
