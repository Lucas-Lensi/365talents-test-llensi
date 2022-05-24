/* eslint-disable no-undef */
import chai from 'chai';

import { checkParams, createUriString } from './company.service.js';

const { expect } = chai;

describe('company', () => {

  const goodParams = { nom: 'hg', dir: 'paul' };
  const nonExistingParams = { nom: 'hg', test: 'paul' };
  const wrongTypeParams = { nom: ['hg', 'paul'] };
  describe('checkParams', () => {
    it('check if all params are valid', () => {
      expect(checkParams(goodParams)).to.equal(true);
      expect(checkParams(nonExistingParams)).to.equal(false);
      expect(checkParams(wrongTypeParams)).to.equal(false);
    });
  });

  const params1 = { nom: 'hg', dir: 'paul' };
  const params2 = { nom: 'societe', dir: 'xavier', ape: '3700Z', debut: '10', nbrep: '10' };
  let uriStr = 'https://api.societe.com/pro/dev/societe/search?format=json&token=FAKETOKEN';
  describe('createUriString', () => {
    it('create uri string to make the request', () => {
      expect(createUriString(params1, undefined)).to.equal(null);
      expect(createUriString(params1, '')).to.equal(null);
      expect(createUriString(params1, null)).to.equal(null);
      expect(createUriString(params1, 'FAKETOKEN')).to.equal(uriStr + '&nom=hg&dir=paul');
      expect(createUriString(params2, 'FAKETOKEN')).to.equal(uriStr + '&nom=societe&dir=xavier&ape=3700Z&debut=10&nbrep=10');
    });
  });

});
