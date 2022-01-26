'use strict';

//Selecting elements

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');

const btnHold = document.querySelector('.btn--hold');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Starting Conditions
let score;
let currentScore;
let activePlayer;
let playing;
score0El.textContent;
score1El.textContent;

const init = function () {
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];

  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  diceEl.classList.add('hidden');

  document.querySelector(`.player--0`).classList.remove('player--winner');

  document.querySelector(`.player--1`).classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};

//Rolling Dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll

    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: id true, switch to next player

    if (dice === 1) {
      //Switch to next player1

      switchPlayers();
    } else {
      //Add dice to current Score

      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to the active player's score
    score[activePlayer] += currentScore;
    //score[1]=score[1]+currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //2.Check if player's score is >=100

    //Finish the game

    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');

      diceEl.classList.add('hidden');

      //Switch to next player
    } else switchPlayers();
  }
});
btnNew.addEventListener('click', init);
