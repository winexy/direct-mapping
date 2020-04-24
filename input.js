const readline = require('readline');
let rl;

function init() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function get(msg) {
  return new Promise(resolve => {
    rl = init();
    rl.question(`${msg}\n`, answer => {
      rl.close();
      resolve(answer)
    });
  })
}

module.exports = async function(message) {
  return await get(message);
};




