const contacts = require('../../middleware/contacts');

const allId = '0';
const mockContacts = {
  '10': [
    {
      'id': '108036615849880164430',
      'primaryEmail': 'aaron.moore@atsid.com',
      'name': {
        'givenName': 'Aaron',
        'familyName': 'Moore',
        'fullName': 'Aaron Moore',
      },
      'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/public/AIbEiAIAAABDCM6whoOS8fLDbyILdmNhcmRfcGhvdG8qKDgzMjUzNzlhYmU3ZmRiNmNhODc1MDYzNWI2MDkyYTBmZmRiMzQxNDEwAcBA2oRrjU9ZvgSYJmUznLtXOQ-4',
    },
    {
      'id': '102751018610668611087',
      'primaryEmail': 'admin@atsid.com',
      'name': {
        'givenName': 'Admin',
        'familyName': 'Account',
        'fullName': 'Admin Account',
      },
      'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/private/AIbEiAIAAABDCI_MkJudm-WWJiILdmNhcmRfcGhvdG8qKDAxNmZiYzIyOWVhYWIyYTBlNTU5ZGM2ZTc4OTBlY2JkMmRmNzJkNWMwAYHY7aE68De_pHTPvWqyWqwSHKMs',
    },
    {
      'id': '112225305622175243715',
      'primaryEmail': 'brad.maupin@atsid.com',
      'name': {
        'givenName': 'Brad',
        'familyName': 'Maupin',
        'fullName': 'Brad Maupin',
      },
      'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/private/AIbEiAIAAABECMO73YKO1sDUqQEiC3ZjYXJkX3Bob3RvKihiZTBkOTNiZmU3OTdiMGViNDc5MWRiYmVjYzYwODM0M2Y4NThkZDBhMAHgRHDAb6wtMVHggooXa9zPQ5FSBg',
    },
    {
      'id': '103305584059832476184',
      'primaryEmail': 'damon.taylor@atsid.com',
      'name': {
        'givenName': 'Damon',
        'familyName': 'Taylor',
        'fullName': 'Damon Taylor',
      },
      'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/public/AIbEiAIAAABDCJjEiOyE5vLvLSILdmNhcmRfcGhvdG8qKGMwZGQ3ZWEzMmMwODk3MzRiNWMzNjBmZGNiMTkzNDZmZjkxNGY3YjYwAVxWRQxpP_dwiBJGpP8q17OvMLVk',
    },
    {
      'id': '104748686093421533812',
      'primaryEmail': 'heather.slusher@atsid.com',
      'name': {
        'givenName': 'Heather',
        'familyName': 'Slusher',
        'fullName': 'Heather Slusher',
      },
      'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/public/AIbEiAIAAABDCPS06aH6mq7zQSILdmNhcmRfcGhvdG8qKDc4OTU0MjM3ODgzODdiN2ViZDUxZTQzYzdkMjg1Njk2OTNiNDcwYzkwAVAeYp7WO4GmKKVDvlJYi8ztfuQ-',
    },
    {
      'id': '108143629428139580075',
      'primaryEmail': 'lacy.dove@atsid.com',
      'name': {
        'givenName': 'Lacy',
        'familyName': 'Dove',
        'fullName': 'Lacy Dove',
      },
      'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/public/AIbEiAIAAABDCKu1tfWW-v6BcSILdmNhcmRfcGhvdG8qKDBhNWMxN2M1NTMzNGM0OThmMzk0Zjk1MTQxYzUzNmI5OGFiOTQ5MGEwAUmD6088OzlmmTrc3KZ-nBBFloCg',
    },
  ],
  '20': [
    {
      'id': '108036615849880164430',
      'primaryEmail': 'aaron.moore@atsid.com',
      'name': {
        'givenName': 'Aaron',
        'familyName': 'Moore',
        'fullName': 'Aaron Moore',
      },
      'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/public/AIbEiAIAAABDCM6whoOS8fLDbyILdmNhcmRfcGhvdG8qKDgzMjUzNzlhYmU3ZmRiNmNhODc1MDYzNWI2MDkyYTBmZmRiMzQxNDEwAcBA2oRrjU9ZvgSYJmUznLtXOQ-4',
    },
    {
      'id': '102751018610668611087',
      'primaryEmail': 'admin@atsid.com',
      'name': {
        'givenName': 'Admin',
        'familyName': 'Account',
        'fullName': 'Admin Account',
      },
      'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/private/AIbEiAIAAABDCI_MkJudm-WWJiILdmNhcmRfcGhvdG8qKDAxNmZiYzIyOWVhYWIyYTBlNTU5ZGM2ZTc4OTBlY2JkMmRmNzJkNWMwAYHY7aE68De_pHTPvWqyWqwSHKMs',
    },
  ],
  '30': [
    {
      'id': '108036615849880164430',
      'primaryEmail': 'aaron.moore@atsid.com',
      'name': {
        'givenName': 'Aaron',
        'familyName': 'Moore',
        'fullName': 'Aaron Moore',
      },
      'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/public/AIbEiAIAAABDCM6whoOS8fLDbyILdmNhcmRfcGhvdG8qKDgzMjUzNzlhYmU3ZmRiNmNhODc1MDYzNWI2MDkyYTBmZmRiMzQxNDEwAcBA2oRrjU9ZvgSYJmUznLtXOQ-4',
    },
  ],
  '40': [
    {
      'id': '102751018610668611087',
      'primaryEmail': 'admin@atsid.com',
      'name': {
        'givenName': 'Admin',
        'familyName': 'Account',
        'fullName': 'Admin Account',
      },
      'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/private/AIbEiAIAAABDCI_MkJudm-WWJiILdmNhcmRfcGhvdG8qKDAxNmZiYzIyOWVhYWIyYTBlNTU5ZGM2ZTc4OTBlY2JkMmRmNzJkNWMwAYHY7aE68De_pHTPvWqyWqwSHKMs',
    },
  ],
};

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
  } else if (mockContacts[req.query.groupId]) {
    res.json(mockContacts[req.query.groupId]);
  } else {
    errorGeneric(res);
  }
}

module.exports = (req, res) => {
  if (!req.user) {
    errorNoUserFound(res);
  } else {
    fetchAllUsers(req, res);
  }
};
