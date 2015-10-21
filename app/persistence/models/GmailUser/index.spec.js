const { expect } = require('chai');
const GmailUser = require('../../../persistence').models.GmailUser;

describe('GmailUser models', () => {
  describe('displayName method', () => {

    it('returns correctly formatted name', () => {
      const testUser = new GmailUser({'id': 'id1', 'email': 'test@example.com', 'firstName': 'fn', 'lastName': 'ln'});

      expect(testUser.getDisplayName()).to.equal('fn ln');
    });
  });
});
