const chunk = require('./functions').chunk;


test('splits array into chunks of given size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]); 
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]); 
    expect(chunk([], 3)).toEqual([]); 
  });