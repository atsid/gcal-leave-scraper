//converts json files results from google contacts api dump to only include info we need
'use strict';

let fs = require('fs');
let filename = '../server/middleware/group/data/30.json';

fs.readFile(filename, (err, content) => {
  let json = JSON.parse(content);
  console.log(json.length);

  let fixed = json.map((user) => {
    return {
      name: {fullName: user.name.fullName},
      primaryEmail: user.primaryEmail,
      thumbnailPhotoUrl: user.thumbnailPhotoUrl
    };
  });

  fs.writeFile(filename, JSON.stringify(fixed, null, 2));

});
