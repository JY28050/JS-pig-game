'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//we want the variables to live out here, and in the init function we want to re-assign their values- scoping.

//Starting Conditions

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  //set to 0 since we are starting with player 0. We will store the final scores of each player in an array.

  playing = true;
  //in the beginning we are playing so it is true, when we are done, set playing to false.

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
//init- initialization, restarting code- we want this function to be executed in 2 situations- loading page for first time, and clicking the new game button.

init();
//starts game

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Roling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    //generate dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;

    //check of rolled a 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
//all of this logic should only be executed if "playing" is true. playing is a boolean variable so we don't need to check any conditions. Now if we are no longer playing, button roll won't work.

btnHold.addEventListener('click', () => {
  if (playing) {
    //Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    switchPlayer();
  }
});

btnNew.addEventListener('click', init);

/* 
btnRoll

1) Generate a random dice roll. Wrap in trunc to get rid of decimal, and then + 1 on the entire thing to give us 6 total since Math.random only gives us up to 5. 

2) Display the dice on UI. First remove hiden class. Want to render picture of correct dice with what user rolled, so use a template literal. Can attach src element to diceEl. 

3) Check for a rolled 1. If the dice is NOT a rolled 1, add the number that the user rolled (dice) onto currentScore like this- currentScore = currentScore + dice. Could simplify it like this currentScore += dice. 

The result: If we roll a 2 with dice, number 2 will be rendered in current score box, next if we roll a 4, it will be added onto that, and 6 will be rendered. 

dynamically select score based on who the active player is right now.

4) Else: if 1 was rolled, we want to switch to next player. If activeplayer is equal to 0, switch to 1, otherwise back to 0. Re-assigning active player.  

toggle is a method that will add a class if it is there, or remove it. We can do it manually with "contains" like we did in the modal project, but toggle makes it easier. 
*/

/*
btnHold

1) Add current score to active player's score. 


2) Check if a player's score is >= 100, if that's the case- finish the game, if not- switch to next player. To store the scores, we have a score variable with an array at [0, 0]. We can use activePlayer variable to get the correct score. 

When it is player 1, it will be scores[1] then add currentScore to it. 
EX: scores[1] = scores[1] + currentScore 

We need to switch to the next player after clicking the hold button. Still need to reset currentScore to 0, we need to switch player from 0 to 1 or 1 to 0, and we need to toggle the active classes. 
*/

/*
btnNew

To reset the Game, using the new Game button, we need to remove the winner class and set the scores back to 0. 

player0 should be the one restarting the game over, so player--active can stay "add" on him. 


*/
