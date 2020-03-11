const exec = require('child_process').exec;
const pkg = require('../package.json');

describe('Main', () => {
  test('should return version of btc-converter', (done) => {
    exec('./src/main.js --version', (err, stdout, stderr) => {
      if(err) throw err;

      expect(stdout.replace('\n', '')).toEqual(pkg.version);
      done();
    });
  });

  test('should return the description when btc-converter --help', (done) => {
    exec('./src/main.js --help', (err, stdout, stderr) => {
      if(err) throw err;

      expect(stdout.includes('Convert Bitcoin to any currency defined')).toBeTruthy();
      done();
    });
  });

  test('should return the currency option when bt-converter --help', (done) => {
    exec('./src/main.js --help', (err, stdout, stderr) => {
      if(err) throw err;

      expect(stdout.includes('--currency')).toBeTruthy();
      done();
    });
  });

  test('should return the amount option when bt-converter --help', (done) => {
    exec('./src/main.js --help', (err, stdout, stderr) => {
      if(err) throw err;

      expect(stdout.includes('--amount')).toBeTruthy();
      done();
    });
  });
});
