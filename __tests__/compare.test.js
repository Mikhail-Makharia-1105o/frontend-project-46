import { describe, expect, it } from '@jest/globals';

import compare from '../utils/compare.js';

describe('compare', () => {
  it('should return an empty object when comparing two empty objects', () => {
    const obj1 = {};
    const obj2 = {};
    const output = compare(obj1, obj2);
    expect(output).toEqual({});
  });

  it('should return an object with the added keys', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1, b: 2 };
    const output = compare(obj1, obj2);
    expect(output).toEqual({ a: { value: 1, type: 'shared', nested: false }, b: { value: 2, type: 'added', nested: false } });
  });

  it('should return an object with the removed keys', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1 };
    const output = compare(obj1, obj2);
    expect(output).toEqual({ a: { value: 1, type: 'shared', nested: false }, b: { value: 2, type: 'removed', nested: false } });
  });

  it('should return an object with the changed keys', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    const output = compare(obj1, obj2);
    expect(output).toEqual({ a: { value: 1, type: 'shared', nested: false }, b: { value: 2, type: 'changed', nested: false } });
  });

  it('should return an object with the shared keys', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const output = compare(obj1, obj2);
    expect(output).toEqual({ a: { value: 1, type: 'shared', nested: false }, b: { value: 2, type: 'shared', nested: false } });
  });

  it('should return an object with the nested changed keys', () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { b: 2 } };
    const output = compare(obj1, obj2);
    expect(output).toEqual({ a: { value: { b: { value: 1, type: 'changed', nested: false } }, nested: true, type: 'changed' } });
  });
});
