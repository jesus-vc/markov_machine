import fs from "fs";

const createRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const createRandomNumber2 = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const input = fs.readFileSync("./files/eggs.txt", "utf8");
const regex = /[ \r\n?"“‘”()_,:!;.]+/g;
const tempWords = input.split(regex);
const words = tempWords.filter((c) => c !== regex);

console.log("words");
console.log(words);

let chainMap = new Map();
// chainMap.set("1", ["a", "b", "c"]);
// chainMap.set("2", ["a", "b", "c"]);
// chainMap.set("3", ["a", "b", null]);
const tempMap = new Map();
for (let i = 0; i < words.length; i++) {
  let word = words[i];
  let nextWord = words[i + 1] || null;

  if (tempMap.has(word)) {
    tempMap.get(word).push(nextWord);
  } else {
    tempMap.set(word, [nextWord]);
  }
}
chainMap = tempMap;

console.log("chain");
console.log(chainMap);

const numWords = 1588;
const randomText = [];

// Get first random key from chainMap.
// let randomIndex = createRandomNumber(0, chainMap.size);
// let randomKey = [...chainMap.keys()][randomIndex];

let mapKeys = [...chainMap.keys()];
let randomKey = createRandomNumber2(mapKeys);

// Get subsequent random keys
while (randomText.length < numWords && randomKey !== null) {
  randomText.push(randomKey);

  let valueKeys = chainMap.get(randomKey);
  randomKey = createRandomNumber2(valueKeys);

  randomIndex = createRandomNumber(0, chainMap.get(randomKey).length);
  randomKey = chainMap.get(randomKey)[randomIndex];
}

return randomText.join(" ");
