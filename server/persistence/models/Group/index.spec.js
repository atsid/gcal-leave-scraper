const { expect } = require('chai');
const Group = require('../../../persistence').models.Group;

describe('Group models', () => {
  describe('name method', () => {
    it('returns correctly formatted group name', () => {
      const testUser = new Group({'id': 'id1', 'name': 'All'});

      expect(testUser.name).to.equal('All');
    });
  });
});
