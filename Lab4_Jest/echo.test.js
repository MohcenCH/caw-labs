const exf = require('./echo'); 

test('prints the value n times', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
  
    exf('hello', 3);
  
    expect(spy).toHaveBeenCalledTimes(3);
  
  });