"use strict";

const chalk = require('chalk');

const request = require('request');

const ora = require('ora');

const spinner = ora({
  text: 'Retrivieng Bitcoin data...',
  color: 'yellow'
});
const TOKEN_API = 'NzlmODlmYzkyNDczNDljNGEyMWI5OGYwOTgwMjdiZjk';
const HEADERS = {
  headers: {
    'x-ba-key': TOKEN_API
  }
};

function convertBTC(currency = 'USD', amount = 1) {
  const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;
  spinner.start();
  request({
    url,
    HEADERS
  }, (error, response, body) => {
    let apiResponse;
    spinner.stop();

    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log(chalk.red('Something went wrong in the API. Try in a few minutes.'));
      return parseError;
    }

    console.log(`${chalk.red(amount)} BTC to ${chalk.cyan(currency)} = ${chalk.yellow(apiResponse.price)}`);
  });
}

module.exports = convertBTC;