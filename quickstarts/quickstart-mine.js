'use strict';
require('babel/register');
const googleAuthFactory = require('./../server/components/GoogleAuthFactory');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const google = require('googleapis');
const calendarShareHelper = require('./../server/components/GoogleCalendarShareHelper');
const models = require('./../server/persistence/index').models;
const mongoose = require('./../server/persistence/mongoose');
const GmailUser = models.GmailUser;
const EventFilter = require('./../server/components/EventFilter');
const filters = require('./../server/components/filters');
const leaveEventTransformer = require('./../server/components/leaveEventTransformer');
const eventScanner = require('./../server/components/eventScanner');

googleAuthFactory({
  scopes: SCOPES,
  secretsFile: 'client_secret.json',
}).then((auth) => {

  if (auth) {
    console.log('looking for users');
    GmailUser.find((err, users) => {
      if (err) {
        console.log('oops!!!');
      } else {
        if(users.length == 0) {
          var user = GmailUser.createQ({
            'email': 'jon.mclean@atsid.com',
            'firstName': 'Jon',
            'lastName': 'McLean',
            'userId': 12345 // same combination as my luggage
          });

          console.log('Created a new user.  Re-run the quickstart app');

          return;
        }

        console.log('found %d users...', users.length);
        calendarShareHelper.ensureCalendarsAvailable(users, auth).then(() => {
          console.log('all users have been added to shared calendar');
          return eventScanner.scan(users, '2015-10-01T00:00:00Z', '2016-10-30T00:00:00Z', auth).then(() => {
            mongoose.disconnect();
          });
        })
      }
    });

    //const leaveItems = [];
    //
    //calendarShareHelper.processEventsForUser('primary', '2015-10-01T00:00:00Z', '2015-12-01T00:0:00Z', (item) => {
    //  eventFilter.apply([item]).then((items) => {
    //    items.map((leaveItem) => {
    //      leaveItems.push(leaveItem)
    //    });
    //  });
    //}, auth).then(() => {
    //  leaveEventTransformer(leaveItems[0]).then((item) => {
    //    //console.log('Event: ' + JSON.stringify(item, null, 4));
    //    mongoose.disconnect();
    //  });
    //});
  } else {
    mongoose.disconnect();
  }

  //  google.calendar('v3').events.list({
  //      'auth': auth,
  //      'calendarId': 'primary',
  //      'showDeleted': 'true',
  //      'timeMin': '2015-10-10T00:00:00Z',
  //      'timeMax': '2015-10-16T00:00:00Z',
  //    }, (err, response) => {
  //      console.log('Event response: ' + JSON.stringify(response, null, 4));
  //    }
  //  );
  //}

  //  GmailUser.find((err, users) => {
  //    if (err) {
  //      console.log('oops!!!');
  //    } else {
  //      calendarShareHelper.ensureCalendarsAvailable(users, auth).then(() => {
  //        mongoose.disconnect()
  //      });
  //    }
  //  });
  //
  //} else {
  //  mongoose.disconnect();
  //  throw new Error('Did not return valid auth');
  //}
});
