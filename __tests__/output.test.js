import { describe, expect, it } from '@jest/globals';
import fancyOutput from '../utils/fancyOutputCompare.js';
import flatOutput from '../utils/flatOutputCompare.js';
import JSONOutput from '../utils/JSONOutputCompare.js';
import compare from '../utils/compare.js';

describe('outputs', () => {
  const originalObj1 = { a: 1, b: { c: 2, d: 3 }, e: 4, l: 5 };
  const originalObj2 = { a: 1, b: { c: 2, d: 4 }, e: 5, f: 6 };
  const comparisonObj = compare(originalObj1, originalObj2);
  it('fancyOutput', () => {
    const output = fancyOutput(comparisonObj, originalObj1, originalObj2);
    expect(output).toBe(
      '  a: 1\n  b: {\n    c: 2\n-   d: 3\n+   d: 4\n  }\n- e: 4\n+ e: 5\n- l: 5\n+ f: 6\n}',
    );
  });
  it('flatOutput', () => {
    const output = flatOutput(comparisonObj, originalObj1, originalObj2);
    /* eslint-disable-next-line quotes */
    expect(output).toBe("Property 'b.d' was updated. From 3 to 4\nProperty 'e' was updated. From 4 to 5\nProperty 'l' was removed\nProperty 'f' was added with value: 6");
  });
  it('JSONOutput', () => {
    const output = JSONOutput(originalObj1, originalObj2);
    /* eslint-disable-next-line quotes */
    expect(output).toBe("{\"a\":1,\"b\":{\"c\":2,\"d\":3},\"e\":4,\"l\":5}");
  });
});
