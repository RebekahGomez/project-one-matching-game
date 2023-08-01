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
let spMode = document.querySelector(".singlePlayer");
let tpMode = document.querySelector(".twoPlayer");
let clickable = false;
let processingPair = false;

const hideHeader = () => {
  choice.classList.add("hidden");
  spMode.classList.add("hidden");
  tpMode.classList.add("hidden");
}

const showHeader = () => {
  choice.classList.remove("hidden");
  spMode.classList.remove("hidden");
  tpMode.classList.remove("hidden");
}

const hideTwoPlayer = () => {
  currentPlayerName.classList.add("hidden");
  p1score.classList.add("hidden");
  p2score.classList.add("hidden");
}

const showTwoPlayer = () => {
  currentPlayerName.classList.remove("hidden");
  p1score.classList.remove("hidden");
  p2score.classList.remove("hidden");
}

spMode.addEventListener("click", () => {
  gameMode = "single player";
  startGame();
});

tpMode.addEventListener("click", () => {
  gameMode = "two players";
  startGame();
});

currentPlayerName.classList.add("hidden");
p1score.classList.add("hidden");
p2score.classList.add("hidden");


function startGame() {
  // restart();
  hideHeader();

  // SINGLE PLAYER MODE
  if (gameMode === "single player") {
    clickable = true
    console.log(cards);

    cards.forEach((card) => {
      function gameLogic() {
        if (processingPair) return;
        if (gameMode === 'two players') return
        if (clickable === true) {
          if (card.classList.contains("matched")) {
            return
          }
          if (!card.classList.contains("flipped") && firstCard !== card && secondCard !== card) {
            card.classList.add("flipped");
          }
          // SELECTING 2 CARDS
          function selectTwoCards() {
            if (!firstCard) {
              firstCard = card;
              if (firstCard.classList.contains("matched")) {
                firstCard = null;
              } else {
                firstCard = card;
              }
            } else if (!secondCard && firstCard !== card) {

              secondCard = card;
              processingPair = true;
              clickable = false;
              if (secondCard.classList.contains("matched")) {
                secondCard = null;
                firstCard.classList.remove("flipped");
                firstCard = null;
                console.log(clickable)
                clickable = true;
                console.log(clickable)
                selectTwoCards();
              } else {
                secondCard = card;
              }
              console.log(firstCard, secondCard);
              if (firstCard === null && secondCard === null) {
                selectTwoCards();
              }
              processingPair = false;
              // clickable = false;
              console.log(clickable)
            }

            return;
          }
          selectTwoCards();

          // IF CARDS DON'T MATCH, FLIP BACK OVER
          if (firstCard.dataset.cardType !== secondCard.dataset.cardType) {
            // setTimeout(() => {
            if (!firstCard.classList.contains("matched") && !secondCard.classList.contains("matched")) {
              setTimeout(() => {
                firstCard.classList.remove("flipped");
                if (secondCard) {
                  secondCard.classList.remove("flipped");
                }
              }, 500)
            }
            // IF CARDS DON'T MATCH, SET THEIR VALUES BACK TO NULL & MAKE CLICKABLE
            setTimeout(() => {
              firstCard = null;
              secondCard = null
            }, 500)
            setTimeout(() => {
              clickable = true;
              processingPair = false;
            }, 500)

            // OTHERWISE, SET THEIR CLASSLIST TO "MATCHED"
          } else {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard.removeEventListener("click", gameLogic);
            firstCard = null;
            secondCard = null;
            clickable = true;
            processingPair = false;
            matchedPairs++;
          }
          // END GAME
          if (matchedPairs === cardTypes.length / 2) {
            gameOver = true;
            setTimeout(() => {
              alert("Congratulations! You beat the game!");
              restart();
            }, 100);
          }
        }
      }
      card.removeEventListener("click", gameLogic);
      card.addEventListener("click", gameLogic);
    })
  }

  // START TWO PLAYER MODE
  else if (gameMode === "two players") {
    clickable = true
    currentPlayer = "Player 1";
    p1score.classList.remove("hidden");
    p2score.classList.remove("hidden");
    currentPlayerName.classList.remove("hidden");

    // assignCards();

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        if (clickable === true) {

          if (card.classList.contains("matched")) {
            return
          }

          if (!gameOver) {

            if (!card.classList.contains("flipped") && firstCard !== card && secondCard !== card) {
              card.classList.add("flipped");
            }
            // SELECTING 2 CARDS
            if (!firstCard) {
              firstCard = card;
            } else if (!secondCard && firstCard !== card) {
              secondCard = card;
              clickable = false;
              console.log(firstCard, secondCard)
              // IF THE 2 CARDS ARE NOT A MATCH, SET TIMEOUT & FLIP BACK OVER
              if (firstCard.dataset.cardType !== secondCard.dataset.cardType) {
                setTimeout(() => {
                  if (!firstCard.classList.contains("matched") && !secondCard.classList.contains("matched")) {
                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");
                  }
                  firstCard = null;
                  secondCard = null;
                  clickable = true;
                }, 500);

                currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";

                // THIS BLOCK OF CODE DISPLAYS CURRENT PLAYER AT TOP OF PAGE
                if (currentPlayer === "Player 1") {
                  document.getElementById("currentPlayer").textContent = currentPlayer;
                } else {
                  document.getElementById("currentPlayer").textContent = currentPlayer2
                    ;
                }
                // OTHERWISE CARDS MATCH, SET THEM TO NULL, SET CLICKABLE TRUE, INCREASE MATCHED PAIRS BY 1
              } else {
                firstCard.classList.add("matched");
                secondCard.classList.add("matched");
                firstCard = null;
                secondCard = null;
                clickable = true;
                matchedPairs++

                // INCREASE THAT PLAYER'S SCORE
                if (currentPlayer === "Player 1") {
                  player1Score++;
                  document.getElementById("player1Score").textContent = player1Score;
                } else {
                  player2Score++;
                  document.getElementById("player2Score").textContent = player2Score;
                }
              }
              // GAME OVER
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
                  restart()
                }, 100);
              }
            }
          }
        }
      });
    });
  }




  let resetButton = document.querySelector(".restart");


  let restart = () => {
    showHeader();
    hideTwoPlayer();
    currentPlayer = "Player 1"
    document.querySelector('#currentPlayer').textContent = currentPlayer; // this makes sure when the reset button is pressed, Player 1 starts
    gameOver = false;
    gameMode = null;
    matchedPairs = 0;
    player1Score = 0;
    player2Score = 0;
    document.getElementById("player1Score").textContent = player1Score;
    document.getElementById("player2Score").textContent = player2Score;
    cards.forEach((card) => { // this is a loop that goes through each card. forEach card, it removes
      // card.removeEventListener("click", gameLogic);
      card.dataset.cardType = ""; // the cardType data attribute (sets it to an empty string)
      card.classList.remove("matched"); // and removes the "matched" class. This effectively resets
      card.classList.remove("flipped"); // the state of each card "erasing" what type of card it is and whether it's been matched or not.
    }); // finally, card.classList.remove("flipped") removes the "flipped" status of the cards, so when the 
    // Restart Game button is pressed, the cards shuffle and get flipped to their front side (black side)
    assignCards(); // finally, calls assignCards function which assigns new card types to each card in a shuffled order
    clickable = false;
    firstCard = null;
    secondCard = null
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

}