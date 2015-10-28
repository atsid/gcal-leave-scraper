const { expect } = require('chai');
const rewire = require('rewire');
const path = require('path');

describe('Init section static content', () => {
  let content;

  beforeEach(() => {
    content = rewire('./staticContent');
  });

  it('should set correct name', () => {
    expect(content.name).to.equal('static content');
  });

  describe('configure function', () => {
    it('should configure app', () => {
      let useValue;
      let useCalled = false;
      const app = {
        use: (value) => {
          useCalled = true;
          useValue = value;
        },
      };
      const express = {
        static: (pathString) => {
          return pathString;
        },
      };

      content.__set__('express', express);
      content.configure(app);

      expect(useCalled).to.equal(true);
      expect(useValue).to.equal(path.join(__dirname, '../../../public'));
    });
  });
});
