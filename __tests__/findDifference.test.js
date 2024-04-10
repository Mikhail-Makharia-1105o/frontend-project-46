import { test, expect } from '@jest/globals';
import findDifference from '../bin/findDifference.js';

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
  expect(findDifference(obj1, obj2)).toEqual([{}, obj1, obj2]);
});

test('find shared', () => {
  const obj1 = {
    hexl: true,
    num: 100,
    str: 'samosval',
  };
  const obj2 = {
    hexl: true,
    num: 200,
    str: 'sam',
  };
  expect(findDifference(obj1, obj2)).toEqual([
    { hexl: true },
    { num: 100, str: 'samosval' },
    { num: 200, str: 'sam' },
  ]);
});

test('find all', () => {
  const obj1 = {
    hexl: true,
    num: 100,
    str: 'samosval',
  };
  expect(findDifference(obj1, obj1)).toEqual([obj1, {}, {}]);
});
