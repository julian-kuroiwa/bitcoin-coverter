const convertBTC = require('../src/ConvertBTC');
const nock = require('nock');
const chalk = require('chalk');

describe('ConvertBTC', () => {
  let consoleStub;

  const responseMock = {
    'success': true,
    'time': '2019-03-11 10:30:29',
    'price': 2490.78
  }

  beforeEach(() => {
    consoleStub = jest.spyOn(global.console, 'info');
  });

  afterEach(() => {
    console.info.mockRestore();
  });

  test('should use currency USD and 1 as amount default', async() => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({from: 'BTC', to: 'USD', amount: 1})
      .reply(200, responseMock);

    await convertBTC();

    expect(consoleStub).toHaveBeenCalledWith(`${chalk.red(1)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(2490.78)}`);
  });

  test('should use currency USD and 10 as amount default', async() => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({from: 'BTC', to: 'USD', amount: 10})
      .reply(200, responseMock);

    await convertBTC('USD', 10);

    expect(consoleStub).toHaveBeenCalledWith(`${chalk.red(10)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(2490.78)}`);
  });

  test('should use currency BRL and 1 as amount default', async() => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({from: 'BTC', to: 'BRL', amount: 1})
      .reply(200, responseMock);

    await convertBTC('BRL');

    expect(consoleStub).toHaveBeenCalledWith(`${chalk.red(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(2490.78)}`);
  });

  test('should message user when api reply with error', async() => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({from: 'BTC', to: 'BRL', amount: 1})
      .replyWithError('Error');

    await convertBTC('BRL');

    expect(consoleStub).toHaveBeenCalledWith(chalk.red('Something went wrong in the API. Try in a few minutes.'));
  });
});
