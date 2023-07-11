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


let cards = document.querySelectorAll(".card");
let currentPlayer = "Player 1"
let currentPlayer2 = "Player 2"
let currentPlayerName = document.querySelector(".currentPlayer");
let gameOver = false;
let firstCard = null;
let secondCard = null;
let gameMode = null;
let matchedPairs = 0;
let cardTypes = [];
let p1score = document.querySelector(".p1score");
let p2score = document.querySelector(".p2score");
let player1Score = 0;
let player2Score = 0;
let choice = document.querySelector(".choice");


document.querySelector(".singlePlayer").addEventListener("click", () => {
  gameMode = "single player";
  startGame();
});

document.querySelector(".twoPlayer").addEventListener("click", () => {
  gameMode = "two players";
  currentPlayer = "Player 1";
  startGame();
});

currentPlayerName.classList.add("hidden");

function startGame() {
  p1score.classList.add("hidden");
  p2score.classList.add("hidden");
  choice.classList.add("hidden");
  currentPlayerName.classList.add("hidden");
  restart();
  if (gameMode === "single player") {
    cards.forEach((card) => {
      card.addEventListener("click", () => {

        if (!card.classList.contains("flipped") && firstCard !== card && secondCard !== card) {
          card.classList.add("flipped");
        }

        if (!firstCard) {
          firstCard = card;
        } else if (!secondCard && firstCard !== card) {
          secondCard = card;

          if (firstCard.dataset.cardType !== secondCard.dataset.cardType) {
            setTimeout(() => {
              if (!firstCard.classList.contains("matched") && !secondCard.classList.contains("matched")) {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
              }
              firstCard = null;
              secondCard = null
            }, 500);
          } else {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = null;
            secondCard = null;
            matchedPairs++;
          }
          if (matchedPairs === cardTypes.length / 2) {
            gameOver = true;
            setTimeout(() => {
              alert("Congratulations! You beat the game!");
            }, 100);
          }
        }
      });
    });
  } else if (gameMode === "two players") {
    currentPlayer = "Player 1"; // not necessary for current iteration of the game, but useful if there's a way to access Two Player Mode *other* than clicking on the Two Player button
    p1score.classList.remove("hidden");
    p2score.classList.remove("hidden");
    currentPlayerName.classList.remove("hidden");

    // assignCards();

    cards.forEach((card) => {
      card.addEventListener("click", () => {

        if (card.classList.contains("matched")) {
          return
        }

        if (!gameOver) {

          if (!card.classList.contains("flipped") && firstCard !== card && secondCard !== card) {
            card.classList.add("flipped");
          }

          if (!firstCard) {
            firstCard = card;
          } else if (!secondCard && firstCard !== card) {
            secondCard = card;

            if (firstCard.dataset.cardType !== secondCard.dataset.cardType) {
              setTimeout(() => {
                if (!firstCard.classList.contains("matched") && !secondCard.classList.contains("matched")) {
                  firstCard.classList.remove("flipped");
                  secondCard.classList.remove("flipped");
                }
                firstCard = null;
                secondCard = null
              }, 500);

              currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";

              if (currentPlayer === "Player 1") { // this block of code displays the current player at the top of the page
                document.getElementById("currentPlayer").textContent = currentPlayer;
              } else {
                document.getElementById("currentPlayer").textContent = currentPlayer2;
              }

            } else {
              firstCard.classList.add("matched");
              secondCard.classList.add("matched");
              firstCard = null;
              secondCard = null;
              matchedPairs++

              if (currentPlayer === "Player 1") {
                player1Score++;
                document.getElementById("player1Score").textContent = player1Score;
              } else {
                player2Score++;
                document.getElementById("player2Score").textContent = player2Score;
              }
            }

            if (matchedPairs === cardTypes.length / 2) {
              gameOver = true;
              setTimeout(() => {
                if (player1Score > player2Score) {
                  alert("player 1 is the winner");
                } else if (player2Score > player1Score) {
                  alert("player 2 is the winner");
                } else {
                  alert("it's a tie");
                }
              }, 100);
            }
          }
        }
      });
    });
  }
}


let resetButton = () => {
  currentPlayer = "Player 1";
  document.querySelector("#currentPlayer").textContent = currentPlayer;
};

let restart = () => {
  document.querySelector('#currentPlayer').textContent = currentPlayer; // this makes sure when the reset button is pressed, Player 1 starts
  gameOver = false;
  player1Score = 0;
  player2Score = 0;
  document.getElementById("player1Score").textContent = player1Score;
  document.getElementById("player2Score").textContent = player2Score;
  cards.forEach((card) => { // this is a loop that goes through each card. forEach card, it removes
    card.dataset.cardType = ""; // the cardType data attribute (sets it to an empty string)
    card.classList.remove("matched"); // and removes the "matched" class. This effectively resets
    card.classList.remove("flipped"); // the state of each card "erasing" what type of card it is and whether it's been matched or not.
  }); // finally, card.classList.remove("flipped") removes the "flipped" status of the cards, so when the 
  // Restart Game button is pressed, the cards shuffle and get flipped to their front side (black side)
  assignCards(); // finally, calls assignCards function which assigns new card types to each card in a shuffled order
}
resetButton.addEventListener("click", restart);

function assignCards() {
  cardTypes = [];
  for (let i = 0; i < 10; i++) { // this populates the cardTypes array with numbers up to but not including 10
    cardTypes.push(i, i); // we're pushing the same number twice to create a matching pair
  }

  cardTypes = shuffle(cardTypes);
  let cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].dataset.cardType = cardTypes[i]; // assigns each of the cards a cardType from the shuffled cardTypes array
  } // dataset.cardType is a way to set a custom data attribute ('data-card-type') on each card element
  // the dataset.cardType is assigning the value of the card to a number in an array from 0-9, and then in the CSS,
  // we have said "the card with the data-card-type of [0] - [9] gets this color."
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) { // this starts at the end of the array and decrements "i" until it hits the beginning of the array
    const j = Math.floor(Math.random() * (i + 1));
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array;
}

assignCards();

// if (player1Score > player1Score) {
//   alert("player 1 is the winner");
// } else if (player2Score > player1Score) {
//   alert("player 2 is the winner");
// } else {
//   alert("it's a tie");
// }

  // include the condition player must have flipped 2 cards whether they match or not
      // } else if (checkForWin()) {
      //   gameOver = true;
      //   setTimeout(() => {
      //     alert(`${currentPlayer} wins!`);
      //   }, 10);
      // } else (checkForTie()) {
      //   setTimeout(() => {
      //     alert("It's a tie!");
      //   }, 10);

// function gameOver() { // check for game over after every turn
//   // have all cards been matched
//   // if yes - check for winner
// }

// function checkForWin() {
//   // even if there are still cards on the board, game 
//   // should continue until all cards are matched
//   // alert(`${playerX} is the winner!`)
// }

// function checkForTie() {
//   // alert(`It's a tie`);
// }

// function errorHandling() {
//   // cannot click the same card during same hand
//   // cannot click 3+ cards
// }

// function playerScores() {
//   // needs to increment the score when a match is made
//   // needs to display the score to the appropriate player
// }

