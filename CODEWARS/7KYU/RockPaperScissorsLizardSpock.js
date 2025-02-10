// In this kata, your task is to implement an extended version of the famous rock-paper-scissors game. The rules are as follows:

//     Scissors cuts Paper
//     Paper covers Rock
//     Rock crushes Lizard
//     Lizard poisons Spock
//     Spock smashes Scissors
//     Scissors decapitates Lizard
//     Lizard eats Paper
//     Paper disproves Spock
//     Spock vaporizes Rock
//     Rock crushes Scissors

// Task:

// Given two values from the above game, return the Player result as "Player 1 Won!", "Player 2 Won!", or "Draw!".
// Inputs

// Values will be given as one of "rock", "paper", "scissors", "lizard", "spock".

// Object containing each choice and its weaknesses

function rpsls(pl1, pl2) {
  let playObjs = {
    rock: {
      weakness: ["paper", "spock"],
    },
    paper: {
      weakness: ["scissors", "lizard"],
    },
    scissors: {
      weakness: ["rock", "spock"],
    },
    spock: {
      weakness: ["paper", "lizard"],
    },
    lizard: {
      weakness: ["rock", "scissors"],
    },
  };
  // Conditional check if player 1 and player 2 choices are the same
  if (pl1 === pl2) {
    console.log("Draw");
    return;
  }
  if (playObjs[pl1].weakness[0] == pl2) {
    // Conditional check if player 2 choice is a weakness of player 1 choice
    console.log("Player 2 Won!");
    return;
  } else if (playObjs[pl1].weakness[1] == pl2) {
    // Conditional check if player 2 choice is a weakness of player 1 choice
    console.log("Player 2 Won!");
    return;
  } else {
    // Since player 2 choice is not player 1 choice then that means player 2 is inferior
    console.log("Player 1 Won!");
  }
}
var choice = "rock";
var choice1 = "spock";
rpsls(choice, choice1);
