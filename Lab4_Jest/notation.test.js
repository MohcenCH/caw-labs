const mean = require('./notation'); 

test('calculates the mean of an array of numbers', () => {
    const scores = [10, 20, 60];
    const result = mean(scores);
  
    expect(result).toBe(30);
  });
  