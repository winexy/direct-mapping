const input = require('./input');
const fs = require('fs');
const {isPowerOfTwo, fillMainMemory} = require("./utils");
const Cache = require('./Cache');

let mainMemory;


(async function () {
  let N = 0;
  let M = 0;
  let K = 0;


  while (!isPowerOfTwo(N))
    N = await input('input N: ');
  while (!isPowerOfTwo(M))
    M = await input('input M: ');

  mainMemory = fillMainMemory(N, M);

  while (!isPowerOfTwo(K) || !K || (K > N * M / 4))
    K = await input('input K (K <= N * M / 4): ');

  const cache = new Cache(K);
  let result = cache.fill(mainMemory);
  fs.writeFileSync("./result.json", JSON.stringify({...result, N, M, K,}));

})();






