const fs = require('fs');

module.exports = class Cache {
  constructor(size) {
    this.size = +size;
    this.data = this.init();
    this._index = 0;
  }


  * loop() {
    while (true) {
      yield {
        data: this.data[this._index],
        index: this._index
      };

      this.inc();

      if (this.getSize() === this._index) {
        this.clear();
        this._index = 0;
      }
    }
  }


  fill(mainMemory) {
    Cache.clearLogFile();

    let total = 0;
    let hits = 0;
    let misses = 0;

    const gen = this.loop();

    for (let row = 0; row < mainMemory.length; row++) {
      for (let col = 0; col < mainMemory[row].length; col++) {
        const block = mainMemory[row][col];

        const c = Cache.toString(row, col, block.c);
        const m = Cache.toString(row, col, block.m);
        const y = Cache.toString(row, col, block.y);
        const k = Cache.toString(row, col, block.k);

        let {value} = gen.next();

        if (!value.data) {
          misses++;
        }

        this.set(value.index, c);
        this.log();

        this.write(gen, m);
        this.write(gen, y);
        this.write(gen, k);

        hits += 3;
        total++;
      }
    }

    total *= 4;

    return {
      total,
      misses,
      hits,
      hitRate: `${hits / total} %`,
      missRate: `${misses / total} %`
    };
  }

  clear() {
    this.data = this.init();
  }

  init() {
    return [...Array(this.getSize())].map(_ => '');
  }

  getSize() {
    return this.size;
  }

  inc() {
    this._index += 1;
  }

  set(index, value) {
    this.data[index] = value;
  }


  log() {
    fs.appendFileSync("./cache.txt", JSON.stringify(this.data) + "\n");
  }


  write(gen, data) {
    const value = gen.next().value;
    this.set(value.index, data);
    this.log();
  }

  static toString(row, col, data) {
    return `${row}${col}${data}`;
  }

  static clearLogFile() {
    fs.writeFileSync("./cache.txt", "");
  }

};