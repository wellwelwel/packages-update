const { exec } = require('child_process');

const cmd = (command) =>
   new Promise((resolve, reject) => exec(command, (error, stdout) => (!!error ? reject(error) : resolve(stdout))));

module.exports = cmd;
