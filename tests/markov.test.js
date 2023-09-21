import { MarkovMachine } from "../src/markov.js";
import { expect, test } from "@jest/globals";

test("makeTest() should result in expected word count", () => {
  const result = new MarkovMachine(
    "the cat in the hat is in the hat jesus testing how am i doing today today i am okay start lakers nba nfl office work school"
  );
  const numWords = 1023;
  const numWords2 = 311;
  const numWords3 = 119;

  expect(result.makeText()).toEqual(expect.any(String));
  expect(result.makeText()).toEqual(expect.any(String));
  expect(result.makeText(numWords).split(" ").length).toBe(numWords);
  expect(result.makeText(numWords).split(" ").length).toBe(numWords);
  expect(result.makeText(numWords2).split(" ").length).toBe(numWords2);
  expect(result.makeText(numWords3).split(" ").length).toBe(numWords3);
});
