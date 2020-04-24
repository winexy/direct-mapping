module.exports = {
  fillMainMemory,
  isPowerOfTwo
};


function isPowerOfTwo(number) {
  number = +number;
  if ((number < 2 && number !== 1) || number === 0 || Number.isNaN(number))
    return false;
  else if (number === 1)
    return true;
  return isPowerOfTwo(number / 2);
}


function fillMainMemory(n, m) {
  let res = [];
  for (let i = 0; i < n; i++) {
    res[i] = [];
    for (let j = 0; j < m; j++) {
      res[i][j] = cmyk();
    }
  }
  return res
}

function cmyk() {
  return {
    c: "c",
    m: "m",
    y: "y",
    k: "k"
  }
}







