const convertBTC = require('../src/ConvertBTC');
const nock = require('nock');

describe('ConvertBTC', () => {
  let consoleStub;

  const responseMock = {
    'success': true,
    'time': '2019-03-11 10:30:29',
    'price': 2490.78
  }

  beforeEach(() => {
    consoleStub = jest.spyOn(global.console, 'log');
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  test('should use currency USD and 1 as amount default', (done) => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({from: 'BTC', to: 'USD', amount: 1})
      .reply(200, responseMock);

    convertBTC();

    setTimeout(() => {
      expect(consoleStub).toHaveBeenCalledWith('1 BTC to USD = 2490.78');
      done();
    }, 300);
  });

  test('should use currency USD and 10 as amount default', (done) => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({from: 'BTC', to: 'USD', amount: 10})
      .reply(200, responseMock);

    convertBTC('USD', 10);

    setTimeout(() => {
      expect(consoleStub).toHaveBeenCalledWith('10 BTC to USD = 2490.78');
      done();
    }, 300);
  });

  test('should use currency BRL and 1 as amount default', (done) => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({from: 'BTC', to: 'BRL', amount: 1})
      .reply(200, responseMock);

    convertBTC('BRL');

    setTimeout(() => {
      expect(consoleStub).toHaveBeenCalledWith('1 BTC to BRL = 2490.78');
      done();
    }, 300);
  });

  test('should message user when api reply with error', (done) => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({from: 'BTC', to: 'BRL', amount: 1})
      .replyWithError('Error');

    convertBTC('BRL');

    setTimeout(() => {
      expect(consoleStub).toHaveBeenCalledWith('Something went wrong in the API. Try in a few minutes.');
      done();
    }, 300);
  });
});
