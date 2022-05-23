import { makeSum, makeSubstraction } from './calculator.model.js';

// eslint-disable-next-line no-use-before-define
export { addVar, subsctractVar };

function addVar(a, b) {
  if (!a || !b) {
    throw new Error('Missing arguments');
  }
  return { result: makeSum({ a, b }) };
}

function subsctractVar(a, b) {
  if (!a || !b) {
    throw new Error('Missing arguments');
  }
  return { result: makeSubstraction({ a, b }) };
}
