{
  const chainMap = new Map();
  const words = ["bar", "hey", "no", "bar", "yes", "last", "nope", "trulylast"];

  for (let i = 0; i < words.length; i++) {
    let currentWord = words[i];
    let nextWord = words[i + 1] || null;

    if (chainMap.has(currentWord)) {
      chainMap.get(currentWord).push(nextWord);
    } else {
      chainMap.set(currentWord, [nextWord]);
    }
  }
}
