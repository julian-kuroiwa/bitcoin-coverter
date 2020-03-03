const exec = require('child_process').exec;
const btcConverter = require('../src/main.js');

describe('Main', () => {
  test('should return Hello World', (done) => {
    exec('../src/main.js', (err, stdout, stderr) => {
      if(err) throw err;

      expect(stdout).toBe('Hello World');
      done();
    });
  })
});