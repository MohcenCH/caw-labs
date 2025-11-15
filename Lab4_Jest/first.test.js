const first = require('./functions').first;


test('returns [] if array is null or n <= 0', () => {
    expect(first(null, 3)).toEqual([]);
    expect(first([], 0)).toEqual([]);
    expect(first([1,2,3], -2)).toEqual([]);
  });


test('returns first element if n is null or undefined', () => {
    expect(first([1,2,3])).toBe(1);
  });
  
  test('returns first n elements if n is given', () => {
    expect(first([1,2,3,4,5], 2)).toEqual([1,2]);
  });