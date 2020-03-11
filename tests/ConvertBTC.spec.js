const convertBTC = require('../src/ConvertBTC');

describe('ConvertBTC', () => {
  test('should return USD as currency and 1 as amount default', () => {
    expect(convertBTC()).toEqual('1 BTC to USD = 2000.00');
  });

  test('should return BRL as currency and 1 as amount default', () => {
    expect(convertBTC('BRL', 10)).toEqual('10 BTC to BRL = 2000.00');
  });
});
