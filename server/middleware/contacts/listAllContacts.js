const models = require('../../persistence/index').models;
const googleAuthFactory = require('../../components/GoogleAuthFactory');
const fetch = require('node-fetch');
const { stringify } = require('querystring');
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
        console.log('***************************************', googleAuthFactory.getCredentials);
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', googleAuthFactory.oauth2Client);
        const queryParams = stringify({
          access_token: googleAuthFactory.oauth2Client.credentials,
          domain: 'atsid.com',
          viewType: 'domain_public',
        });
        return fetch('https://www.googleapis.com/admin/directory/v1/users?' + queryParams)
        .then((res2) => {
          res2.end();
          return res2.json();
        })
        .then((data) => {
          return data.users.map((contact) => {
            return {
              name: contact.name.fullName,
              email: contact.emails.filter(email => email.primary)[0].address,
            };
          });
        });
      // TODO: Make google contacts api call
//        res.json(data);
//        res.json(JSON.parse('{"contacts": [{"id":"1sdba3212","first":"William"},{"id":"223sdav23","last":"Johnson"},{"id":"1adsva4","first":"William","last":"Johnson"},{"id":"2asdvv43"},{"id":"12323fawa","first":"Brian","last":"Math"},{"id":"2345345sa"}]}'));
      }
      res.end();
    });
  }
};
