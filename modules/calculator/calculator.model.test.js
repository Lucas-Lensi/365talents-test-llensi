/* eslint-disable no-undef */
import chai from 'chai';

import { makeSum, makeSubstraction } from './calculator.model.js';

const { expect } = chai;

describe('calculator', () => {
  describe('addVar', () => {
    it('should add 2 number from data', () => {
      expect(makeSum({ a: 5, b: 6 })).to.equal(11);
    });
  });

  describe('substractVar', () => {
    it('should substract 2 number from data', () => {
      expect(makeSubstraction({ a: 11, b: 6 })).to.equal(5);
    });
  });
});
