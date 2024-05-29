import { test, expect } from '@jest/globals';
import compare from '../utils/compare.js';

test('not find shared', () => {
  const obj1 = {
    hexl: true,
    num: 100,
    str: 'samosval',
  };
  const obj2 = {
    hexl: false,
    num: 200,
    str: 'sam',
  };
  expect(compare(obj1, obj2)).toEqual({
    hexl: {
      nested: false,
      type: 'changed',
      value: true,
    },
    num: {
      nested: false,
      type: 'changed',
      value: 100,
    },
    str: {
      nested: false,
      type: 'changed',
      value: 'samosval',
    },
  });
});

test('find shared', () => {
  const obj1 = {
    hexl: true,
    num: 100,
    str: 'samosval',
    obj: {
      dima: 'dima',
      obj2: { vasha: 'myat' },
    },
  };
  const obj2 = {
    hexl: true,
    num: 200,
    str: 'sam',
  };
  expect(compare(obj1, obj2)).toEqual({
    shared: { hexl: true },
    exclusiveObj1: {
      num: 100,
      str: 'samosval',
      obj: {
        dima: 'dima',
        obj2: { vasha: 'myat' },
      },
    },
    exclusiveObj2: {
      num: 200,
      str: 'sam',
    },
  });
});

test('find all', () => {
  const obj1 = {
    hexl: true,
    num: 100,
    str: 'samosval',
  };
  expect(compare(obj1, obj1)).toEqual({
    shared: obj1,
    exclusiveObj1: {},
    exclusiveObj2: {},
  });
});
