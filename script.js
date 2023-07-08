// Function gameStart - The game should start with the cards already
//    shuffled & face down & scores set to 0
// Create a deck of cards
// Each card should have an identifiable image - the image will be in the deck twice
// Function to Restart + Shuffle
// Each player gets to select 2 cards each turn
// Function for error handling
//   - players can't flip a third card & MUST flip 2 cards
//   - players can't select the same card twice in one turn - if the card is flipped up
//     it can't be selected again
// Function to flip the cards
// If the cards match, they get removed from the board
// If the cards don't match, they flip back over - maybe use setTimeout
//    so the users can actually see the cards before they are removed or flip back over
// Function to remove the cards from the board
// Function to switch players each turn
// Function to track the players' scores
// Display whose turn it currently is
// Function to determine gameEnd - check if all pairs have been found
// Computer will announce the winner or if there is a tie

let cards = document.querySelectorAll(".cell");
let currentPlayer = "X"
let gameOver = false;

cards.forEach((card) => {
  card.addEventListener("click", (clickEventFunction) => {
    // function should go here for what happens when a user clicks a card
    // function to flip a card?

    if (checkForWin()) {
      gameOver = true;
      setTimeout(() => {
        alert(`${currentPlayer} wins!`);
      }, 10);
    } else if (checkForTie()) {
      setTimeout(() => {
        alert("It's a tie!");
      }, 10);
    }
    if (!gameOver) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      // include the condition player must have flipped 2 cards whether they match or not
    }
  });
});

let resetButton = document.querySelector(".restart");

resetButton.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
  });
  currentPlayer = "X";
  gameOver = false;
})


function gameOver() { // check for game over after every turn
  // have all cards been matched
  // if yes - check for winner
  function checkForWin() {
    // even if there are still cards on the board, game 
    // should continue until all cards are matched
  }
  // elsex - check for a tie

  function checkForTie() {

  }
  alert(`${x player} is the winner` or `It's a tie`);
}

function shuffle() {
  // must be truly random
}

function errorHandling() {
  // cannot click the same card during same hand
  // cannot click 3+ cards
}

function playerScores() {
  // needs to increment the score when a match is made
  // needs to display the score to the appropriate player
}

function checkForMatch() {
  // if (card1 !== card2) {
  // flip back over
  // }
  //
  // else {
  // remove them or mark them as unavailable / unclickable
  // }
}

