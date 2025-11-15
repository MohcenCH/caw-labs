const last = require('./functions').last;


test('returns [] if array is null', () => {
    expect(last(null)).toEqual([]);
  });
  
  test('returns last element if n is null or undefined', () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last([10, 20, 30], null)).toBe(30);
  });
  
  test('returns last n elements if n is given', () => {
    expect(last([1, 2, 3, 4, 5], 2)).toEqual([4, 5]);
  });