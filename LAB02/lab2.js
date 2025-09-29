// lab2.js 
// Rock-Paper-Scissors game in Node.js console using "prompt" package
// Fabiana Correa
// StudentID: 200600190

const prompt = require("prompt");

// Start prompt
prompt.start();

// Ask the user for input its option Rock, Paper, or Scissors
prompt.get(["userSelection"], function (err, result) {
  if (err) {
    console.error(err);
    return;
  }

  // Normalize user input (uppercase for easier comparison with the computer choice)
  const userSelection = result.userSelection.toUpperCase();

  // Generate computer choice by random method
  const randomNum = Math.random();
  let computerSelection = "";

// Depends on the random number the rule asked in the assignment
// will be applied as below.

  if (randomNum <= 0.34) {
    computerSelection = "PAPER";
  } else if (randomNum <= 0.67) {
    computerSelection = "SCISSORS";
  } else {
    computerSelection = "ROCK";
  }
// Print the user and computer selection
  console.log(`\nUser chose: ${userSelection}`);
  console.log(`Computer chose: ${computerSelection}`);

  // Decide the winner by comparation method of text between user screen
  // and computer selection
  let outcome = "";

  // The rules of the game is been comparing below throught the If and Else commands
  // When the user digits something different from Rock, Paper or Scissors 
  // a error message will be displayed to choose only one of the options.

  if (userSelection === computerSelection) {
    outcome = "It's a tie!";
  } else if (
    (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (userSelection === "PAPER" && computerSelection === "ROCK") ||
    (userSelection === "SCISSORS" && computerSelection === "PAPER")
  ) {
    outcome = "User Wins!";
  } else if (
    (computerSelection === "ROCK" && userSelection === "SCISSORS") ||
    (computerSelection === "PAPER" && userSelection === "ROCK") ||
    (computerSelection === "SCISSORS" && userSelection === "PAPER")
  ) {
    outcome = "Computer Wins!";
  } else {
    outcome = "Invalid input. Please type ROCK, PAPER, or SCISSORS.";
  }
// print the output with result of who wins the game, ties or invalid input
  console.log(outcome);
});
