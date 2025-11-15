const concat = require('./functions').concat;



test('prints concatenated colors correctly', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
  
    concat();
  
    expect(spy).toHaveBeenNthCalledWith(1, 'Red,Green,White,Black'); // toString
    expect(spy).toHaveBeenNthCalledWith(2, 'Red,Green,White,Black'); // join()
    expect(spy).toHaveBeenNthCalledWith(3, 'RedGreenWhiteBlack');     // join('')
  
    spy.mockRestore();
  });