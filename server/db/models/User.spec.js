/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const User = db.model('user');

describe('user model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('Validations', () => {});
});
