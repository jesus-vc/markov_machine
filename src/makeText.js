/** Command-line tool to generate Markov text. */

import { MarkovMachine } from "./markov.js";
import fs from "fs";
import axios from "axios";
import { stripHtml } from "string-strip-html";

const makeTextFromFile = (file) => {
  const chain = new MarkovMachine(file);
  const textGenerated = chain.makeText(process.argv[4]);
  const desiredLength = process.argv[4] || 100;

  if (textGenerated.length < desiredLength) {
    console.log(
      `We reached the end of the allowed chain before ${
        process.argv[4]
          ? `your desired text length of ${process.argv[4]}`
          : "the default text length of 100"
      }.\nHere is what we were able to buid:\n`
    );
    console.log(textGenerated);
  } else {
    console.log(textGenerated);
  }
  //return; //PEER makeTextFromFile() is void function, so return probably isn't needed?
};

const makeTextFromURL = async () => {
  try {
    const reqInstance = axios.create({
      headers: {
        Accept: "text/html",
      },
    });
    const input = await reqInstance.get(`${process.argv[3]}`);
    const strippedInput = stripHtml(input.data);
    const chain = new MarkovMachine(strippedInput.result);
    const textGenerated = chain.makeText(process.argv[4]);

    const desiredLength = process.argv[4] || 100;

    if (textGenerated.length < desiredLength) {
      console.log(
        `We reached the end of the allowed chain before ${
          process.argv[4]
            ? `your desired text length of ${process.argv[4]}`
            : "the default text length of 100"
        }.\nHere is what we were able to buid:\n`
      );
      console.log(textGenerated);
    } else {
      console.log(textGenerated);
    }
  } catch (error) {
    const urlRequsted = new URL(`${process.argv[3]}`);

    if (error.code === "ERR_BAD_REQUEST") {
      throw new Error(
        `The server could not find the resource you requested.\nPossibly your ${urlRequsted.pathname} path does not exist on that host.\nTry another pathname for that same host or first verify the URL actually exists via your browser.\n`
      );
    } else if (error.code === "ENOTFOUND") {
      throw new Error(
        `It appears the ${urlRequsted.hostname} does not exist. Fix and/or change the hostname\n`
      );
    } else {
      console.log(error);
      throw new Error(
        "The URL you provided is triggering an unknown error. Fix and/or change the URL.\n"
      );
    }
  }
};

//PEER Is it best to validate data before running the actual program? For example, to ensure url is valid before my programs attempts to process it?
//PEER- Would it be helpful to write error classes in validateData() to reduce any repetitive code, or any other ideas to optimize code?
const validateData = () => {
  if (process.argv[2] !== "file" && process.argv[2] !== "url") {
    throw new Error(
      "Malformed request. Proper structure:\nnode [path to makeText.js] [file or url] [filename or full url]\n"
    );
  }

  if (process.argv[2] === "file" && process.argv[3] === undefined) {
    throw new Error(
      "Malformed request.'file' must be followed by a file name.\nFor example: node makeText.js file eggs.txt.\n"
    );
  }

  if (isNaN(process.argv[4])) {
    throw new Error(
      `Malformed request. Your argument ${process.argv[4]} is not a number. Please correct it.\n`
    );
  }

  if (process.argv[2] === "file" && process.argv[3] !== undefined) {
    let input = "";
    try {
      input = fs.readFileSync(`./files/${process.argv[3]}`, "utf8");
    } catch (e) {
      throw new Error(
        "The file name you provided does not exist in our database. Try another file.\n"
      );
    }
    if (input.length === 0) {
      throw new Error("The file provided is empty. Try another file.\n");
    } else {
      return input;
    }
  }

  if (process.argv[2] === "url" && process.argv[3] === undefined) {
    throw new Error(
      "Malformed request. 'url' must be followed by a full url path.\nFor example: node makeText.js url  http://www.gutenberg.org/files/11/11-0.txt\n"
    );
  }

  if (process.argv[2] === "url" && process.argv[3] !== undefined) {
    try {
      new URL(`${process.argv[3]}`);
    } catch (e) {
      throw new Error(
        "The URL you provided is invalid. Fix and/or change the URL.\nEnsure the URL is prefixed with 'https://www'. For example: https://www.nba.com.\n"
      );
    }
  }
};

const main = () => {
  /* validateData() will return value only upon success.
  Otherwise, the program will be terminated within validateData() if an error is thrown from user input.*/
  const input = validateData();
  if (process.argv[2] === "file") {
    makeTextFromFile(input);
  } else {
    makeTextFromURL();
  }
};

main();
