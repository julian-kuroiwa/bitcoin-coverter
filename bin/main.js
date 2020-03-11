#!/usr/bin/env node
"use strict";

const program = require('commander');

const pkg = require('../package.json');

const convertBTC = require('./ConvertBTC');

program.version(pkg.version).description('Convert Bitcoin to any currency defined').option('-C, --currency <currency>', 'Currency to be converted (Default: USD)').option('-A, --amount <amount>', 'value in Bitcoin to convert (Default: 1)').parse(process.argv);
console.log(convertBTC(program.currency, program.amount));